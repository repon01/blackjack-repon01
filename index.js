
const { uuid } = require('uuid');
const { v1 } = require('comb-sort-repon01');
const { v2 } = require('multiples-of-a-number-repon01');

// blackjack.js
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function drawCard() {
    return Math.floor(Math.random() * 13) + 1; // Ace to King
}

function calculateScore(cards) {
    let score = 0;
    let hasAce = false;
    for (const card of cards) {
        if (card === 1) {
            hasAce = true;
            score += 11;
        } else if (card >= 10) {
            score += 10;
        } else {
            score += card;
        }
    }
    if (hasAce && score > 21) {
        score -= 10;
    }
    return score;
}

function printCards(cards) {
    console.log('Cards:', cards.join(', '));
}

function printScore(score) {
    console.log('Score:', score);
}

rl.question('Welcome to Blackjack! Press Enter to start.', () => {
    const playerCards = [drawCard(), drawCard()];
    const dealerCards = [drawCard(), drawCard()];

    console.log('Your cards:');
    printCards(playerCards);
    console.log('Dealer shows:', dealerCards[0]);

    let playerScore = calculateScore(playerCards);
    let dealerScore = calculateScore(dealerCards);

    if (playerScore === 21) {
        console.log('Blackjack! You win!');
        rl.close();
        return;
    }

    rl.question('Hit (h) or Stand (s)? ', answer => {
        while (answer.toLowerCase() === 'h') {
            const card = drawCard();
            playerCards.push(card);
            playerScore = calculateScore(playerCards);
            console.log('You draw:', card);
            printCards(playerCards);
            if (playerScore > 21) {
                console.log('Bust! You lose.');
                rl.close();
                return;
            } else if (playerScore === 21) {
                console.log('21! You win!');
                rl.close();
                return;
            }
            rl.question('Hit (h) or Stand (s)? ', input => {
                answer = input;
            });
        }

        while (dealerScore < 17) {
            const card = drawCard();
            dealerCards.push(card);
            dealerScore = calculateScore(dealerCards);
            console.log('Dealer draws:', card);
            printCards(dealerCards);
            if (dealerScore > 21) {
                console.log('Dealer busts! You win!');
                rl.close();
                return;
            }
        }

        console.log('Dealer score:', dealerScore);
        console.log('Your score:', playerScore);

        if (playerScore > dealerScore) {
            console.log('You win!');
        } else if (playerScore < dealerScore) {
            console.log('Dealer wins.');
        } else {
            console.log('It\'s a tie.');
        }

        rl.close();
    });
});


module.exports = { printBoard };
