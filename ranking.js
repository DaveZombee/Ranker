// get itemArray from cookie
fromCookie = document.cookie;
itemArray = fromCookie.split("=")[1];

console.log("from cookie"+fromCookie);
console.log("itemarray: "+itemArray);

let rankArray = []; // rank of the items
let battleArray = []; // battle history
let arrayLength = itemArray.length; // length of itemArray

let i = 0; // to loop through array
let j = 1; // also to loop through array

// get the buttons from DOM
const leftButton = document.querySelector("#leftButton");
const rightButton = document.querySelector("#rightButton");

// populating rankArray and battleArray
function createArrays() {
    for (let i = 0; i < arrayLength; i++) {
        rankArray.push(arrayLength); // arrayLength = last place
        battleArray.push([]); /// creating 2d array
    }
}

// compare ranks and iterate through the array
function compareRanks() {
    if (rankArray[i] == rankArray[i + j]) { // ranks are the same
        initiateBattle(i, i + j);
    } else { // ranks aren't the same
        iterateIJ();
    }
}

// manually iterating i and j, checking i and j's validity
function iterateIJ() {
    j++;

    if (i + j >= arrayLength) { // i+j is outside scope of array, raise i reset j
        i++;
        j = 1;

        if (i >= arrayLength) { // i is outside scope of array, check if ranking is done
            checkAllRanks();
        } else { // i is inside scope of array, continue comparing
            compareRanks();
        }
    } else { // i + j is inside scope of array, continue comparing
        compareRanks();
    }
}

// starts a battle between two items when needed
function initiateBattle(firstItem, secondItem) {
    // check if the two items haven't already battled
    if (battleArray[firstItem][secondItem] === undefined) {
        // changes text in buttons
        leftButton.innerText = itemArray[firstItem];
        rightButton.innerText = itemArray[secondItem];
    } else { // items have already battled
        if (battleArray[firstItem][secondItem] == firstItem) { // first item won
            rankArray[firstItem]--;
        } else { // second item won
            rankArray[secondItem]--;
        }
        compareRanks();
    }
}

// when a choice is made (a button is clicked)
function onChoiceMade(winner) {
    let winnerIndex;

    if (winner == 1) {
        winnerIndex = i; // i is firstItem
    } else {
        winnerIndex = i + j; // i + j is secondItem
    }
    // change rank array
    rankArray[winnerIndex]--;

    // change battle array
    battleArray[i][i + j] = winnerIndex;

    iterateIJ();
}

// check if any of the items have the same ranking
function checkAllRanks() {
    let anySameRanks = false;

    // compare each item with the other
    for (let y = 0; y < arrayLength - 1; y++) {
        for (let z = 1; y + z < arrayLength; z++) {
            if (rankArray[y] == rankArray[y + z]) {
                anySameRanks = true;
            }
        }
    }

    // none of the ranks are the same, ranking is done
    if (anySameRanks == false) {
        sortArrays();
        drawFinalRanking();
    } else { // continue ranking process
        i = 0;
        compareRanks();
    }
}

// sorting the arrays to reflect actual order (selection sort)
function sortArrays() {
    for (let x = 0; x < arrayLength; x++) {
        let lowest = x;

        // find the lowest element
        for (let n = x + 1; n < arrayLength; n++) {
            if (rankArray[n] < rankArray[lowest]) {
                lowest = n;
            }
        }

        if (lowest !== x) { // if x isn't the lowest value
            // swap rank and item array indexes
            [rankArray[x], rankArray[lowest]] = [rankArray[lowest], rankArray[x]];
            [itemArray[x], itemArray[lowest]] = [itemArray[lowest], itemArray[x]];
        }
    }
}

// draw the ranking on the page
function drawFinalRanking() {
    let resultStr = "Your final ranking:<br>";

    for (let i = 0; i < arrayLength; i++) {
        resultStr += rankArray[i] + '. ' + itemArray[i] + "<br>";
    }

    document.getElementById("content").innerHTML = resultStr;
}

createArrays();
compareRanks();

// button event listeners for when user picks
leftButton.addEventListener("click", function () { onChoiceMade(1); }, false);
rightButton.addEventListener("click", function () { onChoiceMade(2); }, false);
