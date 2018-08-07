/* BEGIN */

  // Set up default vars
  let open_cards = []
  let moves = 0
  let stars = 5
  let timer = 0

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

/* GAME FUNCTIONS */
  function restart() {
    // Snýr við spilum sem eru valin eða mödsuð
    shuffle_deck()

    // endurstillir teljara
    update_moves(0)

    // endurstillir stjörnur
    update_stars(5)

    // Endurstillir tíma
    reset_timer()
  }

  function update_moves(move) {
    moves = move
    document.querySelector("span.moves").innerHTML = moves
  }

  function update_stars(star_count) {
    stars = star_count
    const star_html = '<li><i class="fa fa-star"></i></li>'
    document.querySelector("ul.stars").innerHTML = ''

    for(let i = 0;i < star_count;i++) {
      document.querySelector("ul.stars").insertAdjacentHTML('beforeend', star_html)
    }
  }

  function calculate_stars() {
    if (moves < 25) { update_stars(5) }
    else if (moves < 35) { update_stars(4) }
    else if (moves < 45) { update_stars(3) }
    else if (moves < 55) { update_stars(2) }
    else if (moves >= 55) { update_stars(1) }
  }

  function reset_timer() {
    timer = 0
  }

  function start_timer() {
    // Ef timer er ekki í gangi, start timer
    if (timer == 0) {
      timer = window.performance.now()
    }
  }

  function get_game_duration() {
    if (timer > 0) {
      return Math.round((window.performance.now() - timer)/1000)
    } else {
      return 0
    }

  }



/* EVENT LISTENERS */

  // Listen to all clicks on the page, proceed if the target was a card
  document.addEventListener("click", function(event) {
    if (event.target.className != "card") { return true } // Only handle events for a card element

    card_element = event.target // Get our card element

    open_card(card_element) // Open the card

    update_moves(moves + 1) // Update moves counter

    calculate_stars()

    start_timer()

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
