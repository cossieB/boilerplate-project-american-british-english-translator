const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    test('Both fields', function(done) {
        chai.request(server)
        .post('/api/translate')
        .send({
            text: 'boot bank holiday lorry hello',
            locale: 'british-to-american'
        })
        .end((err, res) => {
            assert.isObject(res.body)
            assert.property(res.body, 'text')
            assert.property(res.body, 'translation')
            done()
        })
    })
    test('invalid locale', function(done) {
        chai.request(server)
        .post('/api/translate')
        .send({
            text: 'boot bank holiday lorry hello',
            locale: 'british'
        })
        .end((err, res) => {
            assert.isObject(res.body)
            assert.deepEqual(res.body, {error: 'Invalid value for locale field'})
            done()
        })
    })
    test('Missing text field', function(done) {
        chai.request(server)
        .post('/api/translate')
        .send({
            locale: 'british-to-american'
        })
        .end((err, res) => {
            assert.isObject(res.body)
            assert.deepEqual(res.body, { error: 'Required field(s) missing' })
            done()
        })
    })
    test('Missing locale field', function(done) {
        chai.request(server)
        .post('/api/translate')
        .send({
            text: 'boot bank holiday lorry hello',
        })
        .end((err, res) => {
            assert.isObject(res.body)
            assert.deepEqual(res.body, { error: 'Required field(s) missing' })
            done()
        })
    })
    test('Empty text field', function(done) {
        chai.request(server)
        .post('/api/translate')
        .send({
            text: '',
            locale: 'american-to-british'
        })
        .end((err, res) => {
            assert.isObject(res.body)
            assert.deepEqual(res.body, {error: 'No text to translate'})
            done()
        })
    })
    test('No translation need', function(done) {
        chai.request(server)
        .post('/api/translate')
        .send({
            text: 'Hello World',
            locale: 'american-to-british'
        })
        .end((err, res) => {
            assert.isObject(res.body)
            assert.property(res.body, 'translation')
            assert.property(res.body, 'text')
            assert.propertyVal(res.body, 'translation', "Everything looks good to me!")
            done()
        })
    })
});
