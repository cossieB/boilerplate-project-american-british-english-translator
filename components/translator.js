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
        const translationArray = [...this.searchAndTranslate(this.titles), ...this.searchAndTranslate(this.spelling), ...this.searchAndTranslate(this.only)]
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
            let regex = new RegExp(`[^a-zA-Z]${key}[^a-zA-Z]`); let regex2 = new RegExp(`\b${key}\b`)
            
            if (regex.test(this.phrase.toLowerCase()))  {
                matches.push({original: key, translated: obj[key]})
            }
        }
        return matches
    }
}

let phrase = 'RuBe GoldBerg'

const translator = new Translator(phrase, 'american-to-british');


console.log(/\bMr\.\b/.test('Mr. Bond'))

module.exports = Translator;