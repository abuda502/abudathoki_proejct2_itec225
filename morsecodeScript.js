//Converting text to morsecode and these are roman script and numbers used for morsecode
//I have it in both uppercase and lowercase
const textToMorse =
{ 'A':'.-', 'B':'-...', 'C':'-.-.' , 'D':'-..', 'E':'.', 'F':'..-.', 'G':'--.', 'H':'....', 
'I':'..', 'J':'.---', 'K':'-.-', 'L':'.-..', 'M':'--', 'N':'-.', 'O':'---', 'P':'.--.', 'Q':'--.-', 
'R':'.-.', 'S':'...', 'T':'-', 'U':'..-', 'V':'...-', 'W':'.--', 'X':'-..-', 'Y':'-.--', 'Z':'--..', 
'1':'.----', '2':'..---', '3':'...--', '4':'....-', '5':'.....', '6':'-....', '7':'--...', '8':'---..', 
'9':'----.', '0':'-----', ',':'--..--', '.':'.-.-.-', '?':'..--..', '/':'-..-.', '-':'-....-', 
'(':'-.--.', ')':'-.--.-', ' ':'|', 'a':'.-', 'b':'-...', 'c':'-.-.' , 'd':'-..', 'e':'.', 
'f':'..-.', 'g':'--.', 'h':'....', 'i':'..', 'j':'.---', 'k':'-.-', 'l':'.-..', 'm':'--', 'n':'-.', 
'o':'---', 'p':'.--.', 'q':'--.-', 'r':'.-.', 's':'...', 't':'-', 'u':'..-', 'v':'...-', 'w':'.--', 
'x':'-..-', 'y':'-.--', 'z':'--..' };
//this function uses getinput function which is where we capture the what user entered. 
//this function checks for the input status for english text making sure it is not null or error
//if the input is error then it will give alert message if not the it will convert to morsecode.
function c2mc() {
    const inputStatus = getInput();
    if (inputStatus.result.err) {
        alert(inputStatus.result.message);
        return;
    }
    const input = inputStatus.result.data;

    const validityStatus = checkValidCharactersForEnglish(input);
    if (validityStatus.result.err) {
        alert(validityStatus.result.message);
        return;
    }
//Same as above, the only difference is that if output is null or error
//if not then output will be displayed
    const outputStatus = covertToMorse(input);
    if (validityStatus.result.err) {
        alert(validityStatus.result.message);
        return;
    }
    writeToOutput(outputStatus.result.data);

}

// check for only valid characters
//whatever the user enters will be tranformed if it is anything other than what is allowed for morse code 
// it will show alert 
function checkValidCharactersForEnglish(input) {
    const allowedCharacters = Object.keys(textToMorse)
    allowedCharacters.push(" ");
    allowedCharacters.push("\n");

    for (const c of input) {
        if (allowedCharacters.indexOf(c) < 0) {
            return new Status(true, "Please enter allowed characters only "+ c + " is not allowed", null);
        }
    }
    return new Status(false, null, null);
}
//thisis where spaces, pipes and escapes comes into play
//this function will handle any of those 
//if none of characters then it will show alert message
function covertToMorse(input) {
    try {
        let output = "";
        for (const c of input) {
            if (c == "\n") {
                output += "\n";
            } else if (c == " ") {
                output += "| ";
            } else {
                output += textToMorse[c] + " ";
            }
        }
        return new Status(false, null, output);
    } catch (e) {
        return new Status(true, e.message, null);
    }
}