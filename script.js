let itemArray; // the items to rank
let rankArray = []; // rank of the items
let battleArray = []; // battle history
let arrayLength = 0;

let i = 0; // to loop through array
let j = 1; // also to loop through array

// user submits
function submit() {
    // capture input
    const userInput = document.getElementById("input").value;

    // separate input into array
    itemArray = userInput.split(/\r?\n/);
    arrayLength = itemArray.length;

    // make sure there's not an empty string at the end or anywhere ///////////////////////////////// do this
    if (itemArray[arrayLength - 1] === "") {
        itemArray.pop();
        arrayLength--;
    }

    // validating input
    if (arrayLength === 0 || arrayLength === 1) {
        switch (arrayLength) {
            case 0:
                alert("You didn't input any items, try again");
                break;
            case 1:
                alert("You only input one item, try again");
        }

    } else {
        // populating rankArray and battleArray
        for (let i = 0; i < arrayLength; i++) {
            rankArray.push(arrayLength); // arrayLength = last place
            battleArray.push([]); /// creating 2d array
        }

        // begin ranking process
        compareRanks();
    }
}

// looping through the array
function compareRanks() {
    if (rankArray[i] == rankArray[i + j]) { // ranks are the same
        initiateBattle(i, i + j);
    } else { // ranks aren't the same
        iterateIJ();
    }
}

// iterating i and j, checking validity
function iterateIJ() {
    j++;

    if (i + j >= arrayLength) { // i+j is outside scope of array, raise i
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
        // draws the boxes
        document.getElementById("content").innerHTML = "Click on the one you like more<br><div class='button' onclick='onChoiceMade(1)'><p>"
            + itemArray[firstItem] + "</p></div><div class='button' onclick='onChoiceMade(2)'><p>" + itemArray[secondItem] + "</p></div>";
    } else { // if the items have already battled
        if (battleArray[firstItem][secondItem] == firstItem) { // first item won
            rankArray[firstItem]--;
        } else { // second item won
            rankArray[secondItem]--;
        }

        compareRanks();
    }
}

// when a choice is made (aka a button is clicked)
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

    // if the none of the ranks are the same, therefore ranking is done
    if (anySameRanks == false) {
        sortArrays();
        // fake loading circle
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

        for (let n = x + 1; n < arrayLength; n++) {
            if (rankArray[n] < rankArray[lowest]) {
                lowest = n;
            }
        }
        
        if (lowest !== x) { // if x isn't the lowest value
            // swap both
            [rankArray[x], rankArray[lowest]] = [rankArray[lowest], rankArray[x]];
            [itemArray[x], itemArray[lowest]] = [itemArray[lowest], itemArray[x]];
        }
    }
}

// draw the ranking on the page
function drawFinalRanking() {
    let resultStr = "Your final ranking:<br>";
    
    for (let i = 0; i < arrayLength; i++) {
        resultStr += rankArray[i]+'. '+itemArray[i]+"<br>";
    }

    document.getElementById("content").innerHTML = resultStr;
}