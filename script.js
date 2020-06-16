const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}
console.log('Number:', randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// // initalize a new instance of the window.Speech recognition object
let recognition = new window.SpeechRecognition();

// // start recognition and game
recognition.start();

// // Listen for the result event
recognition.addEventListener('result', onSpeak);

function onSpeak(e) {
    const msg = e. results[0][0].transcript;
    console.log(msg);

    writeMessage(msg);
    checkNumber(msg);
}
//display msg to the screen
function writeMessage(msg) {
    msgEl.innerHTML = `
        <div> You said: </div>
        <span class="box"> ${msg} </span>`;
}
//check the msg against the number.
function checkNumber(msg) {
    const num = +msg;
    if(Number.isNaN(num)) {
        msgEl.innerHTML += '<div> that is not valid </div>';
        return;
    }
    //check i number is in range
    if (num > 100 || num < 1) {
        msgEl.innerHTML += '<div> tMust be between 1-100 </div>';
        return;
    }
    //check number against Randomly generated number 
    if (num === randomNum) {
        document.body.innerHTML = `
        <h2>Congrats! You guessed the number <br><br>
        It was ${num} </h2>
        <button class="play-again" id="play-again"> Play again </button>`;
    } else if (num > randomNum) {
       msgEl.innerHTML += '<div> GO LOWER </div>';
    } else {
        msgEl.innerHTML += '<div> GO HIGHER </div>';
    }
}

//allow user to continue to guess - End
recognition.addEventListener('end', ()=> recognition.start());

// Make the play button work
document.body.addEventListener('click', e =>  {
    if (e.target.id == 'play-again') {
        window.location.reload();
    }
})