/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    
    // loop over each item in the data
    for(let i=0;i<games.length;i++){

        // create a new div element, which will become the game card
        const card = document.createElement('div')
        
        // add the class game-card to the list
        card.className = "game-card"

        // set the inner HTML using a template literal to display some info 
        // about each game
        card.innerHTML= `
            <img  class="game-img"  src = "${games[i].img}" />
            <h2>Game: ${games[i].name}</h2>
            <p>Description: ${games[i].description}</p>
            <p>Progress: ${games[i].pledged} / ${games[i].goal}</p>
            <p>Backers: ${games[i].backers}</p>`
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
        gamesContainer.append(card)
    }   
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const total_backers = GAMES_JSON.reduce((acc,game)=>{
    return acc + game.backers;
},0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML=`${total_backers.toLocaleString('en-US')}`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const total_raised = GAMES_JSON.reduce((acc,game)=>{
    return acc + game.pledged;
},0);

// set inner HTML using template literal
raisedCard.innerHTML=`$${total_raised.toLocaleString('en-US')}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const total_games = GAMES_JSON.reduce((acc,game)=>{
    return acc + 1;
},0);
gamesCard.innerHTML=`   ${total_games.toLocaleString('en-US')}`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfunded = GAMES_JSON.filter((games)=>{
        return games.pledged < games.goal;
    })

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfunded);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let funded = GAMES_JSON.filter((games)=>{
        return games.pledged > games.goal;
    })


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(funded);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click",filterUnfundedOnly);
fundedBtn.addEventListener("click",filterFundedOnly);
allBtn.addEventListener("click",showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfunded=GAMES_JSON.filter((games)=>{
    return games.pledged<games.goal;
})
const total_unfunded = unfunded.length;


// create a string that explains the number of unfunded games using the ternary operator
const num_unfunded_one = `A total of $${total_raised.toLocaleString('en-US')} has been raised for ${total_games} games. `+ 
`Currently 1 game remains unfunded. We need your help to fund this amazing game!`
const num_unfunded_more = `A total of $${total_raised.toLocaleString('en-US')} has been raised for ${total_games}  games. `+ 
`Currently ${total_unfunded} games remain unfunded. We need your help to fund these amazing games!`
let final_string = total_unfunded > 1 ? num_unfunded_more:num_unfunded_one;

// create a new DOM element containing the template string and append it to the description container
const des = document.createElement('p');
des.textContent=final_string;
descriptionContainer.append(des);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
var a,b;
[a,b,]=sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
let top = document.createElement('p')
top.textContent = a.name;
firstGameContainer.append(top);
// do the same for the runner up item
let runner_up = document.createElement('p');
runner_up.textContent=b.name;
secondGameContainer.append(runner_up);


function query(){
    deleteChildElements(gamesContainer);
    const Name=document.getElementById("search").value;
    const found=GAMES_JSON.filter((games)=>{
        if(games.name.toLowerCase().includes(Name.toLowerCase())){
            return games;
        }
    })

    addGamesToPage(found);
}

let Search=document.getElementById("submit")
Search.addEventListener("click",query)
