// create deck
var Card = function(value, suit) {
    this.value = value;
    this.suit = suit;
    this.getValue = function() {
        return (this.value > 10) ? 10 : this.value;
    };
}

var Player = function(name) {
    this.name = name;
    this.hand = [];
    this.handTotal = 0;
    this.calculateHandTotal = function() {
        this.handTotal = 0;
        for (var i = 0; i < this.hand.length; i++) {
            this.handTotal += (this.hand[i].value > 10) ? 10 : this.hand[i].value;
        }
    };
    this.isBust = function() {
        this.calculateHandTotal();
        return (this.handTotal > 21);
    };
}

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
dealer.hand.push(deck.pop());

// assign players their first card
var players = [
    new Player('Martin')
];
for (var i = 0; i < players.length; i++) {
    players[i].hand.push(deck.pop());
}

// assign dealer and players their seconds cards
dealer.hand.push(deck.pop());
dealer.calculateHandTotal();

for (var i = 0; i < players.length; i++) {
    players[i].hand.push(deck.pop());
    players[i].calculateHandTotal();
}

console.log('Player’s hand total: ' + players[0].handTotal);

// each player gets turn (hit, stick)
$('.hit').on('click', function(e) {
    e.preventDefault();
    players[0].hand.push(deck.pop());
    players[0].calculateHandTotal();
    console.log('Player hit');
    console.log('Player’s new hand total: ' + players[0].handTotal);
    if (players[0].handTotal > 20) {
        if (players[0].handTotal > 21) {
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
    console.log('Dealer’s hand total: ' + dealer.handTotal);
    while (dealer.handTotal < 18) {
        dealer.hand.push(deck.pop());
        dealer.calculateHandTotal();
        console.log('Dealer’s new hand total: ' + dealer.handTotal);
    }
    
    // calculate results
    console.log('Dealer’s hand total at end of game: ' + dealer.handTotal);
    console.log('Dealer bust: ' + dealer.isBust());
    
    for (var i = 0; i < players.length; i++) {
        console.log('Player ' + i + '’s hand total at end of game: ' + players[i].handTotal);
        console.log('Player ' + i + ' bust: ' + players[i].isBust());
        
        // if player is not bust and player’s hand is greater than dealer’s, player wins
        if (!players[i].isBust() && players[i].handTotal > dealer.handTotal) {
            console.log('Player ' + i + ' wins');
            // here we would pay out to player
        }
        else {
            console.log('Player ' + i + ' loses');
            if (dealer.isBust()) {
                // dealer is bust, so return stakes to players
            }
            else {
                // dealer is still in the game so takes players’ stakes
            }
        }
    }
    
    console.log('Game over');
}