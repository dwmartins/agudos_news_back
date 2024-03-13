class HelperString {

    // Retorna A primer letra maiúscula da primeira palavra da string
    firstLetterCapitalized = (text) => {
        if(!text || text[0] === text[0].toUpperCase()) {
            return text;
        }

        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    // Retorna com todas as palavras com a primeira letra maiúscula
    firstLetterCapitalizedAll = (text) => {
        const words = text.split(' ');

        const capitalizedWords = words.map(word => {
            if (!word || word[0] === word[0].toUpperCase()) {
              return word;
            }
            
            return word.charAt(0).toUpperCase() + word.slice(1);
        });

        return capitalizedWords.join(' ');
    }
}

module.exports = new HelperString();