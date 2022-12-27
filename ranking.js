// manually iterating i and j
export function iterateIJ(i, j, arrayLength) {
    j++;

    if (i + j >= arrayLength) { // i+j is outside scope of array, raise i reset j
        i++;
        j = 1;
    }

    return {i , j}
}

/** Return true if the two items have already battled before */
export function isAlreadyCompared(firstItem, secondItem, battleArray) {
    // check if the two items haven't already battled
    if (battleArray[firstItem][secondItem] === undefined) {
        return false
    } else { // items have already battled
        return true
    }
}

/** Return true if the items are all ranked */ 
export function isRanked(rankArray, arrayLength) {
    let anySameRanks = true

    for (let i = 0; i < arrayLength - 1; i++) {
        for (let j = 1; i + j < arrayLength; j++) {
            if (rankArray[i] == rankArray[i + j]) {
                anySameRanks = false;
            }
        }
    }

    return anySameRanks
}

// sorting the arrays to reflect actual order (selection sort)
export function sortArrays(rankArray, itemArray, arrayLength) {
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
export function drawFinalRanking(rankArray, itemArray, arrayLength) {
    let resultStr = "Your final ranking:<br>";

    for (let i = 0; i < arrayLength; i++) {
        resultStr += rankArray[i] + '. ' + itemArray[i] + "<br>";
    }

    document.getElementById("content").innerHTML = resultStr;
}

// draw boxes for ranking
export function drawRankScreen() {
    let element = document.getElementById("content")

    element.innerHTML = "<h2>Click the one you like more</h2>"

    let buttonA = document.createElement("div")
    let buttonB = document.createElement("div")

    buttonA.id = "left"
    buttonB.id = "right"
    
    buttonA.classList.add("button")
    buttonB.classList.add("button")

    let buttonAText = document.createElement('p')
    let buttonBText = document.createElement('p')

    buttonAText.id = "leftButton"
    buttonBText.id = "rightButton"

    buttonA.appendChild(buttonAText)
    buttonB.appendChild(buttonBText)

    element.appendChild(buttonA)
    element.appendChild(buttonB)
}