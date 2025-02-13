const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

let britishToAmericanSpelling = {}
let britishToAmericanTitles = {}

for (let key in americanToBritishSpelling) {
    const value = americanToBritishSpelling[key]
    britishToAmericanSpelling[value] = key
}

for (let key in americanToBritishTitles) {
    const value = americanToBritishTitles[key]
    britishToAmericanTitles[value] = key
}

class Translator {
    constructor(phrase, locale) {
        this.phrase = phrase;
        this.locale = locale;
        this.only = locale === 'british-to-american' ? britishOnly : americanOnly
        this.spelling = locale === 'british-to-american' ? britishToAmericanSpelling : americanToBritishSpelling
        this.titles = locale === 'british-to-american' ? britishToAmericanTitles : americanToBritishTitles
    }
    translate() {
        const translationArray = [...this.searchAndTranslate(this.titles), ...this.searchAndTranslate(this.spelling), ...this.searchAndTranslate(this.only), ...this.translateTime()]
        if (translationArray.length == 0) return 'Everything looks good to me!'
        let translation = this.phrase
        translationArray.forEach(item => {
            let regex = new RegExp(`${item.original}`, 'i')
            translation = translation.replace(regex, item.translated)
        })
        
        return translation
    }
    searchAndTranslate(obj) {
        let matches = []
        
        for (let key in obj) {
            let regex = new RegExp(`(^|\\s)${key}(\\s|$|\\.)`);
            
            if (regex.test(this.phrase.toLowerCase()))  {
                let translated = obj[key]
                if (obj == this.titles) {
                    translated = obj[key][0].toUpperCase() + obj[key].slice(1)
                }
                matches.push({original: key, translated})
            }
        }

        return matches
    }
    translateTime() {
        let matches = [];
        
        if (this.locale == 'american-to-british' && /\d{1,2}:\d{2}/.test(this.phrase.toLowerCase())) {
            this.phrase.match(/\d{1,2}:\d{2}/g).forEach(match => {
                matches.push({original: match, translated: match.replace(':', '.')})
            })
        }
        if (this.locale == 'british-to-american' && /\d{1,2}\.\d{2}/.test(this.phrase.toLowerCase())) {
            this.phrase.match(/\d{1,2}\.\d{2}/g).forEach(match => {
                matches.push({original: match, translated: match.replace('.', ':')})
            })            
        }
        return matches
    }
    highlight() {
        const translationArray = [...this.searchAndTranslate(this.titles), ...this.searchAndTranslate(this.spelling), ...this.searchAndTranslate(this.only), ...this.translateTime()]
        if (translationArray.length == 0) return 'Everything looks good to me!'
        let translation = this.phrase
        translationArray.forEach(item => {
            let regex = new RegExp(`${item.original}`, 'i')
            translation = translation.replace(regex, `<span class=\"highlight\">${item.translated}</span>`)
        })
        
        return translation
    }
}

let phrase = 'Paracetamol takes up to an hour to work 1.30.'

const translator = new Translator(phrase, 'british-to-american');

console.log(translator.highlight())

module.exports = Translator;