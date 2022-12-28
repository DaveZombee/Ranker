import { submit } from "/Ranker/submit.js"
import { iterateIJ, isAlreadyCompared, isRanked, sortArrays, drawFinalRanking, drawRankScreen } from "/Ranker/ranking.js"

let itemArray
let arrayLength
let rankArray = []
let battleArray = []

let comparisons = 0
let totalComparisons

// to loop through array
let i = 0
let j = 1

document.querySelector("button").addEventListener("click", function () {
    let arrayOfStuff = submit()
    itemArray = arrayOfStuff[0]
    arrayLength = arrayOfStuff[1]

    for (let i = 0; i < arrayLength; i++) {
        rankArray.push(arrayLength); // arrayLength = last place
        battleArray.push([]); /// creating 2d array
    }

    drawRankScreen()

    totalComparisons = getTotalComparisons(arrayLength)

    document.getElementById("left").addEventListener("click", function() {
        choiceMade(1)
    }, false)
    document.getElementById("right").addEventListener("click", function() {
        choiceMade(2)
    }, false)

    compareRanks()

}, false);

function compareRanks() {
    if (rankArray[i] == rankArray[i + j]) {
        startBattle()
    } else {
        let vals = iterateIJ(i, j, arrayLength)
        i = vals.i, j = vals.j

        if (i == arrayLength) { // i is outside scope
            if (isRanked(rankArray, arrayLength)) { // Ranking complete
                sortArrays(rankArray, itemArray, arrayLength)
                drawFinalRanking(rankArray, itemArray, arrayLength)
            } else { // Ranking not complete, go again
                i = 0
                compareRanks() 
            }
            
        } else {
            compareRanks() // continue ranking as normal
        }
    }
}

/** Start a battle between two items */
function startBattle() {
    let compared = isAlreadyCompared(i, i + j, battleArray)
    comparisons++

    if (compared) {
        if (battleArray[i][i + j] == i) { // first item won
            rankArray[i]--;
        } else { // second item won
            rankArray[i + j]--;
        }
        compareRanks()
    } else {
        document.getElementById("leftButton").innerText = itemArray[i];
        document.getElementById("rightButton").innerText = itemArray[i+j];

        // update percentage ranked
        document.getElementById("percentage").innerText = "Percentage ranked: " + getPercentageRanked(comparisons, totalComparisons) + "%"
    }
}

function choiceMade(winner) {
    let winnerIndex

    if (winner == 1) {
        winnerIndex = i; // i is firstItem
    } else {
        winnerIndex = i + j; // i + j is secondItem
    }
    // change rank array
    rankArray[winnerIndex]--;

    // change battle array
    battleArray[i][i + j] = winnerIndex;

    compareRanks()
}

function getPercentageRanked(comparisons, totalComparisons) {
    return Math.round((comparisons - 1) / totalComparisons * 100)
}

function getTotalComparisons(n) {
    n--

    return (n * (n+1)) / 2
}