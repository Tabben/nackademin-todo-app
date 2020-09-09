function encode (text) {
    const vocals = ['a', 'e', 'i', 'o', 'u', 'y', 'å', 'ä', 'ö']
    

    console.log(newText)
}




function decrypt(text) {
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v','w', 'x','z']

    let newText = ''

    for(let char = 0; char < text.length; char++) {
        let letter = text[char].toLowerCase()
        if(consonants.includes(letter)) {
            char = char +2;
            newText += text[char]
        } else {
            newText += text[char]
        }
    }

    console.log(newText)
}

decrypt('hoholola, hoho')