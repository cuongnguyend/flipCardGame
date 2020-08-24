// cards array
let card = document.getElementsByClassName("card");
let cards = [...card];
const game = document.getElementById("card-game");

// $(window).on('load', function() {
//         $.getJSON("./data.json", function(data) {
//             $.each(data.dataJson, function(key, val) {
//                 game.innerHTML += `
//                 <div class="card" id="${val.id}">
//                      <img src="${val.url}" alt="a">
//                  </div>
//             `
//             });
//         });
//     })
// move
let moves = 0;
let counter = document.querySelector(".moves");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// close modal
let closeicon = document.querySelector(".close");

// modal
let modal = document.getElementById("congra");

// open cards
var openedCards = [];

// random array 
function random(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// star onLoad 
document.body.onload = startGame();

// start Game 
function startGame() {

    openedCards = [];
    cards = random(cards);

    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++) {
        game.innerHTML = "";
        [].forEach.call(cards, function(item) {
            game.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }

    // reset moves
    moves = 0;
    counter.innerHTML = moves;

    // reset timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

// display cards    
var displayCard = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// add opened cards to OpenedCards and check match or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if (len === 2) {
        moveCounter();
        if (openedCards[0].id === openedCards[1].id) {
            matched();
        } else {
            unmatched();
        }
    }
};

function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}

function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function() {
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        enable();
        openedCards = [];
    }, 1100);
}

// disable cards temporarily
function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add('disabled');
    });
}

// enable cards and disable matched cards
function enable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}

// move count 
function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    //start time
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
}

// time
var second = 0,
    minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

function congratulations() {
    if (matchedCard.length == 24) {
        clearInterval(interval);
        finalTime = timer.innerHTML;

        modal.classList.add("show");
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("totalTime").innerHTML = finalTime;

        // close modal
        closeModal();
    };
}

// close modal
function closeModal() {
    closeicon.addEventListener("click", function(e) {
        modal.classList.remove("show");
        startGame();
    });
}

// play Again 
function playAgain() {
    modal.classList.remove("show");
    startGame();
}

// add event to each card
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
};