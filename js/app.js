/* BEGIN */

  // Set up default vars
  let open_cards = []
  let moves = 0
  let stars = 5
  let timer = 0

  // Start by shuffling our deck
  shuffle_deck()

  // Set up a loop to update the timer
  setInterval(function() {
    document.querySelector(".timer").innerHTML = get_game_duration()
  }, 1000)

/* CARD MANAGEMENT */
  function shuffle_deck() {
    open_cards = []

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

  // Game is over if all cards have been matched
  function game_over() {
    return document.querySelectorAll(".card.match").length == 16
  }

/* GAME FUNCTIONS */
  function restart() {
    shuffle_deck()      // First, shuffle our deck
    update_moves(0)     // Set our moves as 0
    update_stars(5)     // Reset stars to 5
    reset_timer()       // Reset our timer
    close_end_screen()  // Close the end screen if it is open
  }

  function update_moves(move) {
    moves = move
    document.querySelector("span.moves").innerHTML = moves
  }

  function update_stars(star_count) {
    stars = star_count

    // Create our star templates for full and empty stars
    const star_html = '<li><i class="fa fa-star"></i></li>\n'
    const empty_star_html = '<li><i class="fa fa-star-o"></i></li>\n'

    // Update both the main screen star display and the end screen display
    for (let qs of ["ul.stars", "ul.end-stars"]) {
      document.querySelector(qs).innerHTML = ''

      for(let i = 0;i < star_count;i++) {
        document.querySelector(qs).insertAdjacentHTML('beforeend', star_html)
      }

      for(let i = 0;i < (5 - star_count);i++) {
        document.querySelector(qs).insertAdjacentHTML('beforeend', empty_star_html)
      }
    }
  }

  // Calculate how many stars the current move count deserves
  function calculate_stars() {
    if (moves < 12) { update_stars(5) }
    else if (moves < 17) { update_stars(4) }
    else if (moves < 22) { update_stars(3) }
    else if (moves < 27) { update_stars(2) }
    else if (moves >= 28) { update_stars(1) }
  }

  function reset_timer() {
    timer = 0
  }

  function start_timer() {
    // If the timer is not running, start it
    if (timer == 0) {
      timer = window.performance.now()
    }
  }

  // Return the current game duration or 0 if the game is not running
  function get_game_duration() {
    if (timer > 0) {
      return Math.round((window.performance.now() - timer)/1000)
    } else {
      return 0
    }
  }

  function close_end_screen() {
    document.querySelector(".end-screen.open").className = "end-screen"
    document.querySelector(".end-screen-content.open").className = "end-screen-content"
  }

  function show_end_screen() {
    document.querySelector(".end-screen-content .game-duration").innerHTML = get_game_duration()
    document.querySelector(".end-screen").className = "end-screen open"
    document.querySelector(".end-screen-content").className = "end-screen-content open"
  }



/* EVENT LISTENERS */

  // Listen to all clicks on the page, proceed if the target was a card
  document.addEventListener("click", function(event) {
    if (event.target.className != "card") { return true } // Only handle events for a card element

    card_element = event.target // Get our card element

    open_card(card_element) // Open the card

    if (open_cards.length == 2) {
      update_moves(moves + 1) // Update moves counter
    }

    calculate_stars()

    start_timer()

    // Check if there are two open cards that match
    if (cards_match()) {
      // Lock the cards if they are the same
      lock_cards()
    } else {
      // Display the fail animation
      fail_cards()
    }

    // Show the end screen if the game has been won
    if (game_over()) {
      show_end_screen()
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
