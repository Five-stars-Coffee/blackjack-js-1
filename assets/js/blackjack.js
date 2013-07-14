// create deck
var Card = function(value, suit) {
    this.value = value;
    this.suit = suit;
}

var Player = function(name) {
    this.name = name;
    this.hand = [];
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

for (var i = 0; i < players.length; i++) {
    players[i].hand.push(deck.pop());
}

console.log(deck, dealer, players);

// each player gets turn (hit, stick)
// when end player reached, dealer gets turn
// after dealer’s turn, calculate results
// rinse and repeat