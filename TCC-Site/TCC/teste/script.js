// Define card values and suits
const suits = ["Paus", "Copas", "Espadas", "Ouros"];
const values = ["4", "5", "6", "7", "Dama", "Valete", "Rei", "Ás"];

// Function to create a deck of cards
function createDeck() {
  const deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
}

// Function to shuffle a deck of cards
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Function to deal cards to players
function dealCards(deck, players) {
  const hands = players.map(() => []);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < players.length; j++) {
      hands[j].push(deck.pop());
    }
  }
  return hands;
}

// Function to create card element
function createCardElement(card) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card', `suit-${card.suit}`);
  cardElement.textContent = card.value;
  return cardElement;
}

// Example usage
const deck = createDeck();
shuffleDeck(deck);
const players = ["Player", "Bot 1", "Bot 2", "Bot 3"];
const hands = dealCards(deck, players);

// Display hands on the HTML elements
const playerHandElement = document.querySelector('.player');
const botHandsElement = document.querySelector('.bots');

for (const hand of hands) {
  const handElement = document.createElement('div');
  handElement.classList.add('hand');
  for (const card of hand) {
    const cardElement = createCardElement(card);
    handElement.appendChild(cardElement);
  }
  if (hand === hands[0]) {
    playerHandElement.appendChild(handElement);
  } else {
    botHandsElement.appendChild(handElement);
  }
}
