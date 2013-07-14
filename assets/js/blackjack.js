// create deck
var Card = function(value, suit) {
    this.value = value;
    this.suit = suit;
}

var Player = function(name) {
    this.name = name;
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

console.log(deck);

// assign dealer their first card
// assign players their first cards
// each player gets turn (hit, stick)
// when end player reached, dealer gets turn
// after dealer’s turn, calculate results
// rinse and repeat