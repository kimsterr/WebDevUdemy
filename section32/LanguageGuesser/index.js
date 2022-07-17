import {franc} from 'franc'

const minLength = 10;

const languageNames = new Intl.DisplayNames(['en'], {
    type: 'language'
  });

// Grab the arguments
let foreignPhrase = process.argv[2];
if (!foreignPhrase) {
    console.log("Please type in an actual foreign phrase as:  $ node index.js <foreignPhrase>");
}
else if (foreignPhrase.length < minLength) {
    console.log(`Please type a foreign phrase that is at least ${minLength} chars long.`);
}
else {
    let countryCode = franc(foreignPhrase, {minLength: minLength});
    console.log(languageNames.of(countryCode))
}