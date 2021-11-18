/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior - 2021
*/
// Imports ——————————————————————————————————————————————————————————————————
const fs = require('fs'),
r = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
}),
YAML = require('yaml'),
fetch = require('node-fetch');


// Interface ——————————————————————————————————————————————————————————————————
/**
 * Colorizes the text.
 * @param {string} str The text to colorize.
 * @param {number} r red - a number from 0 to 255.
 * @param {number} g green - a number from 0 to 255.
 * @param {number} b blue - a number from 0 to 255.
 * @returns {string}
 */
const rgb = (str, r, g, b) => `\u001b[38;2;${r};${g};${b}m${str}\u001b[0m`;
const [ yellow, orange, green, cyan, violet ] = [
    s => rgb(s, 255, 255, 0),
    s => rgb(s, 255, 184, 41),
    s => rgb(s, 92, 235, 52),
    s => rgb(s, 52, 235, 232),
    s => rgb(s, 201, 135, 255)
];


let reg = !!+fs.readFileSync(`./regist/LANG`, 'utf8');
const strings = {
    get qLang() {
        return reg ? `\n${yellow('Selecione o idioma do programa:\n    [0]')} - Português do Brasil (PT-BR)\n    ${yellow('[1]')} - Inglês (EN)\n${cyan('>')} `
        : `\n${yellow('Select the program language:\n    [0]')} - Brazilian Portuguese (PT-BR)\n    ${yellow('[1]')} - English (EN)\n${cyan('>')} ` ;
    },
    get aLang() {
        return reg ? `\n${green('Português selecionado!')}\n`
        : `\n${green('English selected!')}\n`;
    },
    get q0() {
        return reg ? `\n${yellow('Entre com o valor em BAT')}\n${cyan('>')} `
        : `\n${yellow('Enter the BAT value')}\n${cyan('>')} `
    },
    get q1() {
        return reg ? `\n${yellow('Entre com o valor em USD')}\n${cyan('>')} `
        : `\n${yellow('Enter the USD value')}\n${cyan('>')} `;
    },
    get q2() {
        return reg ? `\n${orange('Deseja inserir uma entrada ao banco de dados? [y/n]')}\n${cyan('>')} `
        : `\n${orange('Do you want to insert a entry in database? [y/n]')}\n${cyan('>')} `;
    },
    get q3() {
        return reg ? `${yellow('Deseja inserir uma nova entrada? [y/n]')}\n${cyan('>')} `
        : `${yellow('Do you want to insert another entry? [y/n]')}\n${cyan('>')} `;
    },
    get a0() {
        return reg ? `\n${green('Dados inseridos no banco de dados com sucesso!')}\n`
        : `\n${green('Data inserted in database successfully!')}\n`;
    },
    get a1() { return reg ? 'Fechando...' : 'Closing...' },
    table: {
        get batV() { return reg ? 'Valor em BAT' : 'BAT value' },
        get usdV() { return reg ? 'Valor em USD' : 'USD value' },
        get brlV() { return reg ? 'Valor em BRL' : 'BRL value' },
        get price() { return reg ? 'Preço BRL/USD' : 'Price BRL/USD' }
    }
};


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
const inputCreate = entry => {
    fs.appendFileSync(`./database/db.yml`, YAML.stringify(entry));
    fs.writeFileSync(`./database/db.json`,
        JSON.stringify(
            YAML.parse(fs.readFileSync(`./database/db.yml`, 'utf8')), null, 4
        )
    );
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

    const obj = isNaN(brl) ? {
        [`no data found - ${timestamp}`]: {
            BAT: v[0],
            USD: v[1],
            BRL: '?',
            'BAT/USD': '?',
            'BAT/BRL': '?'
        }
    } 
    : {
        [timestamp]: {
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
 *        BAT: number,
 *        USD: number,
 *        BRL: number,
 *        'BAT/USD': number,
 *        'BAT/BRL': number
 *    }
 * }}
 */
const currentTable = () => YAML.parse(fs.readFileSync(`./database/db.yml`, 'utf8'));
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
        case 'lang': qLang();
            break;
        case 'info': info();
            break;
        case 'report':
            const rep = Object.entries(report());
            const start = rep.length > 10 ? rep.length - 10 : 0;
            console.table(Object.fromEntries(rep.slice(start, rep.length)));
            q0();
            break
        case 'report-full':
            console.table(report());
            q0();
            break
        default: V();
            break;
    }
};

/** Alerts and closes the program. */
const close = () => (console.log(strings.a1), r.close());


/** Info about the program */
const info = () => {
    const info = reg ? fs.readFileSync('./regist/pt-br/INFO', 'utf8')
    : fs.readFileSync('./regist/en/INFO', 'utf8');
    console.log(info.replace(/^(\w+.*)/gm, violet('$1')));
    q0();
};


/** Help interface */
const help = () => {
    const info = reg ? fs.readFileSync('./regist/pt-br/HELP', 'utf8')
    : fs.readFileSync('./regist/en/HELP', 'utf8');
    console.log(info.replace(/(".*")/g, yellow('$1')));
    q0();
};


const qLang = () => r.question(strings.qLang, a => {
    const regChange = v => fs.writeFileSync('./regist/LANG', v);

    +a === 0 ? (
        reg = true,
        regChange('1'),
        console.log(strings.aLang),
        q0()
    )
    : +a === 1 ? (
        reg = false,
        regChange('0'),
        console.log(strings.aLang),
        q0()
    )
    : qLang() ;

});


/** @type {number[]} */
const values = Array(3);

const q0 = () => r.question(strings.q0, a => {
    mainOpt(a, () => 
        +a ? (values[0] = +a, q1())
        : q0()
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
        ) : q1()
    );
});


const q2 = () => r.question(strings.q2, a => {
    a = a.toLowerCase();

    mainOpt(a, () => 
        a === 'y' ? (
            inputCreate(calc(values)),
            console.log(strings.a0),
            q3()
        )
        : a === 'n' ? close()
            : q2()
    );
});


const q3 = () => r.question(strings.q3,
a => {
    a = a.toLowerCase();

    mainOpt(a, () => 
        a === 'y' ? q0()
        : a === 'n' ? (console.table(report()), close())
            : q3()
    );
});


console.log(reg ? `${violet('BAT Register 1.0 ')}\nDigite ${yellow(`"help"`)} para lista de comandos.`
: `${violet('BAT Register 1.0 ')}\nType ${yellow(`"help"`)} to command list.`);
q0();
