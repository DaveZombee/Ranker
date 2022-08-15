let itemArray; // the items to rank
let arrayLength = 0; // length of the array

// user presses submit
function submit() {
    // capture input
    const userInput = document.getElementById("input").value;

    // separate input into array
    itemArray = userInput.split(/\r?\n/);
    arrayLength = itemArray.length;

    // make sure there's not an empty string at the end or anywhere
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
        // opens ranking page
        window.location.replace("ranking.html");
    }

}
// when user clicks button, submit() takes place
document.querySelector("button").addEventListener("click", submit, false);

// exports itemArray and arrayLength for the other js file
export { itemArray, arrayLength };
