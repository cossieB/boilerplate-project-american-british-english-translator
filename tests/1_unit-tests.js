const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

const ATB = 'american-to-british'
const BTA = 'british-to-american'

suite('Unit Tests', () => {
    test('Mangoes', function(done) {
        const phrase = 'Mangoes are my favorite fruit.'
        const locale = ATB
        const answer = 'Mangoes are my favourite fruit.'
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Yogurt', function(done) {
        const phrase = 'I ate yogurt for breakfast.'
        const locale = ATB
        const answer = 'I ate yoghurt for breakfast.'
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Condo', function(done) {
        const phrase = "We had a party at my friend's condo."
        const locale = ATB
        const answer = "We had a party at my friend's flat."
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Trashcan', function(done) {
        const phrase = "Can you toss this in the trashcan for me?"
        const locale = ATB
        const answer = "Can you toss this in the bin for me?"
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Parking lot', function(done) {
        const phrase = "The parking lot was full."
        const locale = ATB
        const answer = "The car park was full."
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Rube Goldberg', function(done) {
        const phrase = "Like a high tech Rube Goldberg machine."
        const locale = ATB
        const answer = "Like a high tech Heath Robinson device."
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Bunk', function(done) {
        const phrase = "To play hooky means to skip class or work."
        const locale = ATB
        const answer = "To bunk off means to skip class or work."
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Mr. Bond', function(done) {
        const phrase = "No Mr. Bond, I expect you to die."
        const locale = ATB
        const answer = "No Mr Bond, I expect you to die."
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Dr. Grosh', function(done) {
        const phrase = "Dr. Grosh will see you now."
        const locale = ATB
        const answer = "Dr Grosh will see you now."
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Lunch', function(done) {
        const phrase = "Lunch is at 12:15 today."
        const locale = ATB
        const answer = "Lunch is at 12.15 today."
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Soccer', function(done) {
        const phrase = "We watched the footie match for a while."
        const locale = BTA
        const answer = "We watched the soccer match for a while."
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Paracetamol', function(done) {
        const phrase = "Paracetamol takes up to an hour to work."
        const locale = BTA
        const answer = "Tylenol takes up to an hour to work."
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Caramel', function(done) {
        const phrase = "First, caramelise the onions."
        const locale = BTA
        const answer = "First, caramelize the onions."
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Public Holiday', function(done) {
        const phrase = "I spent the bank holiday at the funfair."
        const locale = BTA
        const answer = "I spent the public holiday at the carnival."
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Fish and Chips', function(done) {
        const phrase = "I had a bicky then went to the chippy."
        const locale = BTA
        const answer = "I had a cookie then went to the fish-and-chip shop."
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Bum Bag', function(done) {
        const phrase = "I've just got bits and bobs in my bum bag."
        const locale = BTA
        const answer = "I've just got odds and ends in my fanny pack."
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Swap Meet', function(done) {
        const phrase = "The car boot sale at Boxted Airfield was called off."
        const locale = BTA
        const answer = "The swap meet at Boxted Airfield was called off."
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Mrs Kalyani', function(done) {
        const phrase = "Have you met Mrs Kalyani?"
        const locale = BTA
        const answer = "Have you met Mrs. Kalyani?"
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Proj Joyner', function(done) {
        const phrase = "Prof Joyner of King's College, London."
        const locale = BTA
        const answer = "Prof. Joyner of King's College, London."
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('Tea time', function(done) {
        const phrase = "Tea time is usually around 4 or 4.30."
        const locale = BTA
        const answer = "Tea time is usually around 4 or 4:30."
        const translator = new Translator(phrase, locale)
        assert.equal(translator.translate(), answer)
        done()
    })
    test('highlight mangoes', function(done) {
        const phrase = "Mangoes are my favorite fruit."
        const locale = ATB
        const translator = new Translator(phrase, locale)
        assert.include(translator.highlight(), '<span class=\"highlight\">')
        assert.include(translator.highlight(), '</span>')
        done()
    })
    test('highlight yogurt', function(done) {
        const phrase = "I ate yogurt for breakfast."
        const locale = ATB
        const translator = new Translator(phrase, locale)
        assert.include(translator.highlight(), '<span class=\"highlight\">')
        assert.include(translator.highlight(), '</span>')
        done()
    })
    test('highlight soccer', function(done) {
        const phrase = "We watched the footie match for a while."
        const locale = BTA
        const translator = new Translator(phrase, locale)
        assert.include(translator.highlight(), '<span class=\"highlight\">')
        assert.include(translator.highlight(), '</span>')
        done()
    })
    test('highlight paracetamol', function(done) {
        const phrase = "Paracetamol takes up to an hour to work."
        const locale = BTA
        const translator = new Translator(phrase, locale)
        assert.include(translator.highlight(), '<span class=\"highlight\">')
        assert.include(translator.highlight(), '</span>')
        done()
    })
});
