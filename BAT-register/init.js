/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior - 2021
 *//***/
// Imports ——————————————————————————————————————————————————————————————————
const fs = require('fs'),
r = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
}),
YAML = require('yaml'),
fetch = require('node-fetch'),
{ BACKUP_YML, DATABASE_YML, DATABASE_JSON,  REGIST_LANG} = require('./res/path'),
{ yellow, violet } = require('./res/colors'),
strings = require('./res/strings');


// Database manipulation ————————————————————————————————————————————————————————————
/**
 * Creates a YML and a JSON file database.
 * @param {{
 *    [timestamp]: {
 *        BAT: number,
 *        USD: number,
 *        BRL: number,
 *        'BAT/USD': number,
 *        'BAT/BRL': number
 *    }
 * }} entry 
 */
const createEntry = entry => {
    fs.appendFileSync(DATABASE_YML, YAML.stringify(entry));
    fs.writeFileSync(DATABASE_JSON,
        JSON.stringify(
            YAML.parse(fs.readFileSync(DATABASE_YML, 'utf8')), null, 4
        )
    );
};


const eraseEntry = () => r.question(strings.eraseEntry.qMain, id => {
    mainOpt(id, () => {
        id = id.toUpperCase();
    
        const table = currentTable();
        const obj = Object.entries(table).filter(e => e[1].ID == id).flat();
        const entry = table[obj[0]];

        const afterTable = () => Object.entries(table).map((e, i) => {
            e[1].ID = i < 10 ? `K00${i}` : i < 100 ? `K0${i}` : `K${i}`;
            return e;
        });

        if (id === 'BACK') {
            greeter();
            q0();
            return;
        }
    
        if (entry) {
            console.table({ [obj[0]]: obj[1] });
            const qDel = () => r.question(strings.eraseEntry.qConfirm, a => {
                mainOpt(a, () => {
                    a = a.toLowerCase();
    
                    a === 'y' ? (
                        delete table[obj[0]],
                        fs.writeFileSync(BACKUP_YML, fs.readFileSync(DATABASE_YML, 'utf8')),
                        fs.writeFileSync(DATABASE_YML, YAML.stringify(
                            Object.fromEntries(afterTable())
                        )),
                        console.log(strings.eraseEntry.asw),
                        console.table(table),
                        q0()
                    )
                    : a === 'n' ? q0()
                    : qDel();
                });
            });
            qDel();
        } else {
            console.clear();
            console.table(currentTable());
            eraseEntry();
        };
    });
});


const restore = () => {
    fs.writeFileSync(DATABASE_YML, fs.readFileSync(BACKUP_YML, 'utf8'));
    console.log(strings.restored);
    console.table(currentTable());
    q0();
};


// Data request ——————————————————————————————————————————————————————————————————
/**
 * Requires the current USD and BRL currency.
 * @returns {Promise<{ high: number, low: number }>}
 */
const USDBRL = async () => {
    try {
        /** @type {{ high: string, low: string }} */
        let data = await (
            await fetch(`https://economia.awesomeapi.com.br/usd-brl/`)
        ).json();
        data = data[0];

        return {
            high: +data?.high,
            low: +data?.low
        };

    } catch {
        return { high: NaN, low: NaN };
    }
};


// Calculation ——————————————————————————————————————————————————————————————————
/**
 * Calculates the BAT/USD and BAT/BRL.
 * @param {number[]} v 
 * @returns {{
 *    [timestamp]: {
 *        BAT: number,
 *        USD: number,
 *        BRL: number,
 *        'BAT/USD': number,
 *        'BAT/BRL': number
 *    }
 * }}
 */
const calc = v => {
    const date = new Date();
    let timestamp = [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ].map(e => e < 10 ? `0${e}` : e);

    timestamp = `${timestamp.slice(0, 3).join('/')} - ${timestamp.slice(3, 6).join(':')}`;
    
    const brl = +(v[1] * v[2]).toFixed(2);
    const idNum = Object.keys(currentTable()).length++;

    const id = idNum < 10 ? `K00${idNum}` : idNum < 100 ? `K0${idNum}` : `K${idNum}`;

    const obj = isNaN(brl) ? {
        [`no data found - ${timestamp}`]: {
            ID: id,
            BAT: v[0],
            USD: v[1],
            BRL: '?',
            'BAT/USD': '?',
            'BAT/BRL': '?'
        }
    } 
    : {
        [timestamp]: {
            ID: id,
            BAT: v[0],
            USD: v[1],
            BRL: brl,
            'BAT/USD': +(v[0] / v[1]).toFixed(3),
            'BAT/BRL': +(v[0]/ brl).toFixed(3)
        }
    };
    return obj;
};


// Report ——————————————————————————————————————————————————————————————————
/** 
 * @returns {{
 *    [timestamp]: {
 *        ID: string,
 *        BAT: number,
 *        USD: number,
 *        BRL: number,
 *        'BAT/USD': number,
 *        'BAT/BRL': number
 *    }
 * }}
 */
const currentTable = () => YAML.parse(fs.readFileSync(DATABASE_YML, 'utf8'));


/**
 * @returns {{
 *     [timestamp]: {
 *         ['Valor em BAT'|'BAT value']: string,
 *         ['Valor em USD'|'USD value']: string,
 *         ['Valor em BRL'|'BRL value']: string,
 *         ['Preço BRL/USD'|'Price BRL/USD']: string
 *    }
 * }}
 */
const report = () => {
    const table = Object.entries(currentTable()).map(e => {
        const [key, value] = [e[0], e[1]];

        return [
            key, {
                [strings.table.batV]: `${(value.BAT).toFixed(3)} BAT`,
                [strings.table.usdV]: `US$ ${(value.USD).toFixed(2)}`,
                [strings.table.brlV]: `R$ ${(value.BRL).toFixed(2)}`,
                [strings.table.price]: `R$ ${(value.BRL / value.USD).toFixed(2)}`
            }
        ];
    });

    return Object.fromEntries(table);
};


// Navigation ——————————————————————————————————————————————————————————————————
/**
 * Main options.
 * @param {string} K Keyword.
 * @param {()=> {}} V Action.
 */
const mainOpt = (K, V) => {
    switch (K.toLowerCase().replace(/\s+/g, '')) {
        case 'exit': close();
            break;
        case 'help': help();
            break;
        case 'lang':
            clearInterface();
            qLang();
            break;
        case 'info': info();
            break;
        case 'delete':
            clearInterface();
            console.table(currentTable());
            eraseEntry();
            break;
        case 'restore': restore();
            break;
        case 'report':
            clearInterface();
            const rep = Object.entries(report());
            const start = rep.length > 10 ? rep.length - 10 : 0;
            console.table(Object.fromEntries(rep.slice(start, rep.length)));
            q0();
            break
        case 'report -full':
            clearInterface();
            console.table(report());
            q0();
            break
        default: V();
            break;
    }
};

const clearInterface = () => process.stdout.cursorTo(0, 0);

/** Clears the console and shows greetings. */
const greeter = () => (console.clear(), console.log(strings.aInit));


/** Alerts and closes the program. */
const close = () => (console.log(strings.a1), setTimeout(r.close, 1000));


/** Info about the program */
const info = () => {
    console.log(strings.aInfo.replace(/^(│)(\s\w+.*?)(\s*│)/gm, `$1${violet('$2')}$3`));
    q0();
};


/** Help interface */
const help = () => {
    console.log(strings.aHelp.replace(/(".*")/g, yellow('$1')));
    q0();
};


const qLang = () => r.question(strings.qLang, a => {
    const regChange = v => fs.writeFileSync(REGIST_LANG, v);

    +a === 0 ? (
        regChange('1'),
        console.log(strings.aLang),
        q0()
    )
    : +a === 1 ? (
        regChange('0'),
        console.log(strings.aLang),
        q0()
    )
    : a.toLowerCase() === 'back' ? (
        greeter(),
        q0()
    )
    : (
        console.clear(),
        qLang()
    );

});


/** @type {number[]} */
const values = Array(3);


const q0 = () => r.question(strings.q0, a => {
    mainOpt(a, () => 
    +a ? (values[0] = +a, q1())
    : (
        clearInterface(),
        greeter(),
        q0()
        )
    );
});


const q1 = () => r.question(strings.q1, a1 => {
    mainOpt(a1, () => 
        +a1 ? (
            values[1] = +a1,
            USDBRL()
                .then(a2 => {
                    values[2] = +((a2.high + a2.low) / 2).toFixed(2);
                    console.table(calc(values));
                })
                .then(() => q2())
        ) : (
                process.stdout.cursorTo(0, 5),
                q1()
            )
    );
});


const q2 = () => r.question(strings.q2, a => {
    a = a.toLowerCase();

    mainOpt(a, () => 
        a === 'y' ? (
            createEntry(calc(values)),
            console.log(strings.a0),
            q3()
        )
        : a === 'n' ? close()
        : (
            clearInterface(),
            greeter(),
            q0()
        )
    );
});


const q3 = () => r.question(strings.q3,
a => {
    a = a.toLowerCase();

    mainOpt(a, () => 
        a === 'y' ? q0()
        : a === 'n' ? (console.table(report()), close())
        : (
            clearInterface(),
            q3()
        )
    );
});


console.log(strings.aInit);
q0();

