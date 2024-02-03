'use strict';
//selcting the elements
const player0El=document.querySelector('.player--0');
const player1El=document.querySelector('.player--1');
const score0El =document.querySelector('#score--0');
const score1El =document.querySelector('#score--1');
const current0El=document.getElementById('current--0');
const current1El=document.getElementById('current--1');
const diceEl   =document.querySelector('.dice');
const btnNew   =document.querySelector('.btn--new');
const btnRoll   =document.querySelector('.btn--roll');
const btnHold   =document.querySelector('.btn--hold');

let scores,currentScore,activePlayer,playing;
const init=function()
{
     scores=[0,0];
     currentScore=0;
     activePlayer=0;
     playing=true;
    diceEl.classList.add('hidden');
    playing=true;
    score0El.textContent=0;
    score1El.textContent=0;
    current0El.textContent=0;
    current1El.textContent=0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
//calling the initialization function
init();

const switchPlayer=function()
{
    document.getElementById(`current--${activePlayer}`).textContent=0;
        currentScore=0;
        activePlayer=activePlayer=== 0 ? 1 : 0 ;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
};

//rolling dice
btnRoll.addEventListener('click',function()
{
    if (playing)
    {
        //generate random dice
    const dice=Math.trunc(Math.random()*6)+1;
    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src=`dice-${dice}.png`;
    //if dice=1 then switch player
    if(dice!==1)
    {
        //add dice to current score
        currentScore+=dice;
        document.getElementById(`current--${activePlayer}`).textContent=currentScore;
    }
    //switching the player
    else{
        switchPlayer();
    }
    }
    
});

//when user clicks the hold button
btnHold.addEventListener('click',function()
{
    if(playing)
    {
        //add currentscore to global score
    scores[activePlayer]+=currentScore;
    document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];

    //check if players score>=20
    if(scores[activePlayer]>=20)
    {
        //finish the game
        playing=false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    }
    else
    {
        //switch to next player
        switchPlayer();
    }
    }
    
});

//when user clicks on the new button
btnNew.addEventListener('click',init);