//Converting morsecode to text and these are roman script and numbers used for morsecode
const morseToEnglishMap = {
    "-----": "0", ".----": "1", "..---": "2", "...--": "3", "....-": "4", ".....": "5",
     "-....": "6", "--...": "7", "---..": "8", "----.": "9", ".-": "A", "-...": "B", "-.-.": "C",
    "-..": "D", ".": "E", "..-.": "F", "--.": "G", "....": "H", "..": "I", ".---": "J", "-.-": "K",
    ".-..": "L", "--": "M", "-.": "N", "---": "O", ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S",
    "-": "T", "..-": "U", "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y", "--..": "Z",
    "-.-.--": "!", ".-.-.-": ".", "--..--": ","
};



//this function uses ge tinput function which is where we capture the what user entered. 
//this function checks for the input status for morsecode making sure it is not null or error
//if the input is error then it will give alert message if not the it will convert to text in uppercase.
function mc2c() {
    const inputStatus = getInput();
    if (inputStatus.result.err) {
        alert(inputStatus.result.message);
        return;
    }
    const input = inputStatus.result.data;

    const validityStatus = checkValidCharactersForMorse(input);
    if (validityStatus.result.err) {
        alert(validityStatus.result.message);
        return;
    }

    const outputStatus = covertToEnglish(input);
    if (validityStatus.result.err) {
        alert(validityStatus.result.message);
        return;
    }

    writeToOutput(outputStatus.result.data);
}

// check for only valid characters
////whatever the user enters will be tranformed if it is anything other than what is allowed for texts 
// it will show alert 
function checkValidCharactersForMorse(input) {
    const allowedCharacters = [".", "-", " ", "|", "\n"];
    for (const c of input) {
        if (allowedCharacters.indexOf(c) < 0) {
            return new Status(true,"Please enter value " + c + " is not allowed", null);
        }
    }
    return new Status(false, null, null);
}
//thisis where spaces, pipes and escapes comes into play
//this function will handle any of those 
//if none of characters then it will show alert message
function covertToEnglish(input) {
    try {
        let output = "";
        let morseWord = "";
        for (const c of input) {
            if (c == "\n") {
                output += "\n";
            } else if (c == " ") {
                if (morseWord.length === 0) {
                    output += " ";
                } else if (morseWord === "|") {
                    output += " ";
                    morseWord = "";
                } else {
                    output += morseToEnglishMap[morseWord];
                    morseWord = "";
                }
            } else {
                morseWord += c;
            }
        }
        return new Status(false, null, output);
    } catch (e) {
        return new Status(true, e.message, null);
    }
}
//func to check the status of the input like if it is null 
//declared some status variable
//handles the errors
class Status {
    err;
    message;
    data;
    constructor(e, m, d) {
        this.err = e;
        this.message = m;
        this.data = d;
    }
    get result() {
        return { err: this.err, message: this.message, data: this.data };
    }
}
//getting input from the user and using fuction status to checkk to make it is not null however if it then it 
//it will return message which will say the input cannot be null and entry the actual text
function getInput() {
    const input = document.getElementById("input").value;
    if (input.length === 0) {
        return new Status(true, 'Enter the acutal value because input cannot be empty, Thanks', null);
    
    }
    return new Status(false, null, input);
}
//Gets the outout and stores it into the data and we using called data up there to in status
function writeToOutput(data) {
    const outputArea = document.getElementById("output");
    outputArea.value = data;
}
//when user is done then they hit clear to input and output and this function allows clear to execute
function clearArea() {
    const inputArea = document.getElementById("input");
    const outputArea = document.getElementById("output");
    inputArea.value = "";
    outputArea.value = "";
}