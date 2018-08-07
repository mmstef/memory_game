/* BEGIN */

  // Set up default vars
  let open_cards = []

  // First, shuffle our deck
  shuffle_deck()

/* CARD MANAGEMENT */
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
  }

  // Open the given card
  function open_card(element) {
    // If we are opening a "third" card, close any open ones
    if (open_cards.length == 2) { close_open_cards() }

    // Save the current card name in the open_cards array
    open_cards.push(element.dataset.cardName)

    // Set the css class to open the card
    element.className = "card open show"
  }

  // Close any open cards and reset the open cards var
  function close_open_cards() {
    open_cards = []
    for (let card of document.querySelectorAll(`.open.show`)) {
      card.className = "card"
    }
  }

  // Lock winning cards
  function lock_cards() {
    for (let card of document.querySelectorAll(`.open.show`)) {
      card.className = "card open match"
    }
  }

  // Mark cards as failed
  function fail_cards() {
    if (open_cards.length == 2) {
      for (let card of document.querySelectorAll(`.open.show`)) {
        card.className = "card open show fail"
      }
    }
  }

/* GAME LOGIC */

  function cards_match() {
    return open_cards[0] == open_cards[1]
  }

/* EVENT LISTENERS */

  // Listen to all clicks on the page, proceed if the target was a card
  document.addEventListener("click", function(event) {
    if (event.target.className != "card") { return true } // Only handle events for a card element

    card_element = event.target // Get our card element

    open_card(card_element) // Open the card

    // Check if there are two open cards that match
    if (cards_match()) {
      // Lock the cards if they are the same
      lock_cards()
    } else {
      fail_cards()
    }
  })

/* SUPPORT */

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
