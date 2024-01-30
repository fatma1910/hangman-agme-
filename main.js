//letters
const letters = "abcdefghijklmnopqrstuvwxyz";

//Get Array 
let letterArray = Array.from(letters);

let letter_container=document.querySelector(".letters");

letterArray.forEach (letters => {
    // create span 
    let span=document.createElement("span");
    //create text Node
    let textNode= document.createTextNode(letters);
    //append the Textnode to span
    span.appendChild(textNode);
    //add class into span
    span.className="letter-box"
    // append span to container
    letter_container.appendChild(span);
    
});

// object of words 
const words = {
    programming: ["php","java script","mysql","java","python","css","html"],
    movies: ["the godfather","departed","mama","dayes","barbie","the conjering", "openhaimer"],
    people: ["amr diab","ahmed helmy","Alexander","Tamer Hosny","Angham"],
    countries: ["Syria","Palastine","Egypt","Qatar","Russia","China"]
}

// get random property 
let allKeys=Object.keys(words);

let randomProperty=Math.floor(Math.random() * allKeys.length);
let randomName=allKeys[randomProperty];
let randomValue=words[randomName];
// console.log(`${randomName}: ${randomValue}`);

let randomValuNum=Math.floor(Math.random() * randomValue.length);

//chosen word
let randomValName=randomValue[randomValuNum];
// console.log(`${randomName}: ${randomValName}`);

document.querySelector(".game-info .category span").innerHTML = randomName;

// Seleect letters to guss element 

let letterGuess = document.querySelector(".letters-guess");

//cconvert chosen word to array
let letterAndSpace = Array.from(randomValName);
console.log(letterAndSpace);
//create span depend on word0
letterAndSpace.forEach(letters => {
    // create span
    let spanLetter=document.createElement("span");

    //if letter is space 
    if (letters === ' ') {

        //add class to span
        spanLetter.className= "with-space";
    }
    //append span to the letters guess 
    letterGuess.appendChild(spanLetter);
});

//select guess span 
let guessSpans = document.querySelectorAll(".letters-guess span");

let wronAttempts= 0 ;
let rightAttempts=0;

let theDraw= document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {

    //set the status
    let theStatus= false ;

    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked");

        //Get Clicked letters
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        // console.log(theClickedLetter)

        let theChosenWord=Array.from(randomValName.toLowerCase());
        theChosenWord.forEach((wordLetter, wordIndex) => {

            if(theClickedLetter == wordLetter) {
                theStatus = true;
                //Loop on All guess
                guessSpans.forEach((span, spanIndex) => {

                    if(wordIndex === spanIndex) {
                        span.innerHTML = theClickedLetter;
                        rightAttempts++;
                    }
                })
            }
        });

        if (theStatus != true) {
            //increase wrong attemps 
            wronAttempts++;

            //add class wrong on the draw element 
            theDraw.classList.add(`wrong-${wronAttempts}`);

            //play fail sound 
            document.getElementById("fail").play();
            if (wronAttempts === 8 ) {
                endGame();

                letter_container.classList.add("finished");
            }
        }else {
            //play success sound 
            document.getElementById("success").play();

            // guessSpans.forEach((span) => {

            //     if(span.innerHTML === '') {
            //         successFunc();
            //     }
            // })
            // randomValName=randomValName.replace(/\s+/g, '');

            if (rightAttempts === randomValName.replace(/\s+/g, '').length) {
                successFunc();
                letter_container.classList.add("finished");
            }
        }
    }
});

function endGame() {

    //create popup div 
    let div = document.createElement("div");

    //create text 
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValName}`);
    div.appendChild(divText);

    div.className = 'popup';
    //append to body
    document.body.appendChild(div);

}

function successFunc () {
    //create popup div 
    let div = document.createElement("div");
     //create text 
    let divText = document.createTextNode(`Congratulations, Num Of Mistakes= ${wronAttempts} `);
    div.appendChild(divText);

    div.className = 'popup';
     //append to body
    document.body.appendChild(div);


}