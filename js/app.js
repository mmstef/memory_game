// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}






function shuffle_deck() {
  // Clear the deck
  document.querySelector(".deck").innerHTML = ""

  // List of our available cards
  let cards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "anchor",
               "leaf", "bicycle", "diamond", "bomb", "leaf", "bomb", "bolt",
               "bicycle", "paper-plane-o", "cube"];

  // Card html template
  const card_html = '<li class="card" data-card-name="REPLACE"><i class="fa fa-REPLACE"></i></li>';

  // Do the truffle shuffle!!
  cards = shuffle(cards)

  // Walk through the shuffled cards
  for (let card of cards) {
    // Add the card to the deck
    document.querySelector(".deck").insertAdjacentHTML('beforeend', card_html.replace(/REPLACE/g, card))
  }

  // Reattach event listener
  listen_for_clicks()
}

shuffle_deck()








// Set up our event listeners
function listen_for_clicks() {
  // Walk through all the existing cards
  for (let card of document.querySelectorAll(".card")) {
    // Create our onclick event
    card.onclick = function(event) {
      // Find the name of the card that was clicked
      let name = event.target.dataset.cardName

      // Change the class of the clicked card to open it
      event.target.className = "card open show"
    }
  }
}

listen_for_clicks()


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
