const { Given, When, Then } = require ('@cucumber/cucumber')
const Person = require('../../src/shouty.js')
const { assertThat, is } = require('hamjest')

Given('a person named {person}' , function( person ) {
    if (!( this[person.name] )){
        this[person.name] = person
        console.log(this)
    }
})


When('{person} shouts {string}', function (person, message) {
    this[ person.name ].shout(message)
    this.Lucy.messageHeard = message
    this.message = message
});


Then('{person} hears Sean\'s message', function (person) {
    assertThat(this[person.name].messageHeard, is (this.message))
});

