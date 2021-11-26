/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior - 2021
 * @license MIT
 *//***/
// Imports ——————————————————————————————————————————————————————————————————
const fs = require('fs'),
{ REGIST_LANG, REGIST_PTBR_HELP, REGIST_EN_HELP, REGIST_PTBR_INFO, REGIST_EN_INFO } = require('./path'),
{ yellow, orange, green, cyan, violet } = require('./colors');


/** @param {string} str */
const box = str => {
    str = `\n│ ${str} │\n`;
    const x = '─'.repeat(str.length - 4);
    return `╭${x}╮${str}╰${x}╯`;
};

const strings = {
    arrow: `\n${cyan('>')} `,
    get reg() {
        return !!+fs.readFileSync(REGIST_LANG, 'utf8');
    },
    get aInit() {
        return this.reg ? `${violet(box('BAT Register 1.0'))}\nDigite ${yellow(`"help"`)} para lista de comandos.`
        : `${violet(box('BAT Register 1.0'))}\nType ${yellow(`"help"`)} to command list.`;
    },
    get aInfo() {
        return this.reg ? fs.readFileSync(REGIST_PTBR_INFO, 'utf8')
        : fs.readFileSync(REGIST_EN_INFO, 'utf8');
    },
    get aHelp() {
        return this.reg ? fs.readFileSync(REGIST_PTBR_HELP, 'utf8')
        : fs.readFileSync(REGIST_EN_HELP, 'utf8');
    },
    get qLang() {
        return this.reg ? `\n${yellow('Selecione o idioma do programa:\n    [0]')} - Português do Brasil (PT-BR)\n    ${yellow('[1]')} - Inglês (EN)${this.arrow}`
            : `\n${yellow('Select the program language:\n    [0]')} - Brazilian Portuguese (PT-BR)\n    ${yellow('[1]')} - English (EN)${this.arrow}`;
    },
    get aLang() {
        return this.reg ? `\n${green('Português selecionado!')}\n`
            : `\n${green('English selected!')}\n`;
    },
    get q0() {
        return this.reg ? `\n${yellow('Entre com o valor em BAT')}${this.arrow}`
            : `\n${yellow('Enter the BAT value')}${this.arrow}`
    },
    get q1() {
        return this.reg ? `\n${yellow('Entre com o valor em USD')}${this.arrow}`
            : `\n${yellow('Enter the USD value')}${this.arrow}`;
    },
    get q2() {
        return this.reg ? `\n${orange('Deseja inserir esta entrada ao banco de dados? [y/n]')}${this.arrow}`
            : `\n${orange('Do you want to insert this entry into database? [y/n]')}${this.arrow}`;
    },
    get q3() {
        return this.reg ? `${yellow('Deseja inserir uma nova entrada? [y/n]')}${this.arrow}`
            : `${yellow('Do you want to insert another entry? [y/n]')}${this.arrow}`;
    },
    get a0() {
        return this.reg ? `\n${green('Dados inseridos no banco de dados com sucesso!')}\n`
            : `\n${green('Data inserted in database successfully!')}\n`;
    },
    get a1() { return this.reg ? 'Fechando...' : 'Closing...' },
    get restored() {
        return this.reg ? `\n${green('Dados restaurados do último backup!')}\n`
            : `\n${green('Data restored from the last backup!')}\n`;
    },
    table: {
        get batV() { return strings.reg ? 'Valor em BAT' : 'BAT value' },
        get usdV() { return strings.reg ? 'Valor em USD' : 'USD value' },
        get brlV() { return strings.reg ? 'Valor em BRL' : 'BRL value' },
        get price() { return strings.reg ? 'Preço BRL/USD' : 'Price BRL/USD' }
    },
    eraseEntry: {
        get qMain() {
            return strings.reg ? `\n${yellow('Digite a ID para deletar:')}${strings.arrow}`
                : `\n${yellow('Enter the ID to delete:')}${strings.arrow}`
        },
        get qConfirm() {
            return strings.reg ? `\n${yellow('Tem certeza que deseja deletar esta entrada? [y/n]')}${strings.arrow}`
                : `\n${yellow('Are you sure you want do delete this entry? [y/n]')}${strings.arrow}`
        },
        get asw() {
            return strings.reg ? `\n${green('Entrada deletada com sucesso!')}\n`
                : `\n${green('Entry deleted successfully!')}\n`;
        },
    }
};

module.exports = strings;