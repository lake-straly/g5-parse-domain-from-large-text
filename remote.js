javascript:(function() {
    var rawFileUrl = 'https://raw.githubusercontent.com/lake-straly/g5-parse-domain-from-large-text/main/parser.js';
    fetch(rawFileUrl)
        .then(response => response.text())
        .then(code => {
            eval(code);
        })
        .catch(error => console.error('Error fetching code:', error));
})();
