// create Card object
var Card = function(value, suit) {
    this.value = value;
    this.suit = suit;
}

Card.prototype.getValue = function() {
    return (this.value > 10) ? 10 : this.value;
};

// create Player object
var Player = function(name) {
    this.name = name;
    this.hand = [];
    this.purse = 100;
    this.stake = 0;
}

Player.prototype.getHandTotal = function() {
    var handTotal = 0;
    for (var i = 0; i < this.hand.length; i++) {
        handTotal += (this.hand[i].value > 10) ? 10 : this.hand[i].value;
    }
    return handTotal;
};

Player.prototype.isBust = function() {
    return (this.getHandTotal() > 21);
};

Player.prototype.setStake = function(stake) {
    stake = parseInt(stake);
    if (isNaN(stake)) {
        throw new Error('Bad amount');
    }
    if (stake > this.purse) {
        throw new Error('Can’t stake more than purse');
    }
    this.stake = stake;
    this.decrementPurse(stake);
};

Player.prototype.decrementPurse = function(amount) {
    amount = parseInt(amount);
    if (isNaN(amount)) {
        throw new Error('Bad amount');
    }
    this.purse -= amount;
}

Player.prototype.incrementPurse = function(amount) {
    amount = parseInt(amount);
    if (isNaN(amount)) {
        throw new Error('Bad amount');
    }
    this.purse += amount;
}

// create deck
var deck = [];

for (var i = 1; i < 14; i++) {
    deck.push(new Card(i, 'Club'));
    deck.push(new Card(i, 'Diamond'));
    deck.push(new Card(i, 'Heart'));
    deck.push(new Card(i, 'Spade'));
}

/**
 * @link http://css-tricks.com/snippets/javascript/shuffle-array/
 */
deck.sort(function() { return (0.5 - Math.random()); });

// create dealer and assign them their first card
var dealer = new Player('Dealer');

// assign players their first card
var players = [
    new Player('Martin')
];

// prompt player for stake
var stake = prompt('Enter stake amount (numbers only)');

try {
    players[0].setStake(stake);
    
    console.log('Player has staked ' + stake);
    console.log('Player’s purse is now ' + players[0].purse);
}
catch (e) {
    console.error(e.message);
}

// assign dealer and players their first card
dealer.hand.push(deck.pop());

for (var i = 0; i < players.length; i++) {
    players[i].hand.push(deck.pop());
}

// assign dealer and players their second cards
dealer.hand.push(deck.pop());

for (var i = 0; i < players.length; i++) {
    players[i].hand.push(deck.pop());
}

console.log('Player’s hand total: ' + players[0].getHandTotal());

// each player gets turn (hit, stick)
$('.hit').on('click', function(e) {
    e.preventDefault();
    players[0].hand.push(deck.pop());
    console.log('Player hit');
    console.log('Player’s new hand total: ' + players[0].getHandTotal());
    if (players[0].getHandTotal() > 20) {
        if (players[0].getHandTotal() > 21) {
            console.log('Player bust');
        }
        else {
            console.log('Player has 21; moving to next player');
        }
        dealersTurn();
    }
});

$('.stick').on('click', function(e) {
    e.preventDefault();
    console.log('Player stuck');
    dealersTurn();
});

// when end player reached, dealer gets turn
function dealersTurn() {
    console.log('Dealer’s turn');
    console.log('Dealer’s hand total: ' + dealer.getHandTotal());
    while (dealer.getHandTotal() < 18) {
        dealer.hand.push(deck.pop());
        console.log('Dealer’s new hand total: ' + dealer.getHandTotal());
    }
    
    // calculate results
    console.log('Dealer’s hand total at end of game: ' + dealer.getHandTotal());
    console.log('Dealer bust: ' + dealer.isBust());
    
    for (var i = 0; i < players.length; i++) {
        // check if player is bust
        if (players[i].isBust()) {
            console.log('Player ' + i + ' bust (' + players[i].getHandTotal() + ')');
        }
        else {
            // check if dealer bust or if player’s hand is greater than dealer’s
            if (dealer.isBust() || players[i].getHandTotal() > dealer.getHandTotal()) {
                console.log('Player ' + i + ' wins');
                players[i].incrementPurse(players[i].stake * 2);
            }
            else {
                console.log('Player ' + i + ' loses');
            }
        }
        
        // reset player’s stake to zero
        players[i].setStake(0);
        
        console.log('Player’s new purse is ' + players[i].purse);
    }
    
    console.log('Game over');
}