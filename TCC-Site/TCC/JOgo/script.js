const clickButton = document.getElementById('clickButton');
const scoreElement = document.getElementById('score');
const upgradesElement = document.getElementById('upgrades');

let score = 0;
let clickPower = 1;
let upgrades = [
  { name: 'Celular da ASUS', cost: 20, increase: 25 },
  { name: 'IPhone', cost: 100, increase: 50 },
  { name: 'Apartemento longe da faculdade', cost: 200, increase: 10 },
  { name: 'Apartamento próximo à faculdade', cost: 600, increase: 10 },
  { name: 'Computador', cost: 200, increase: 1 },
  { name: 'Fiat Uno', cost: 500, increase: 50 },
  { name: 'Lambreta', cost: 300, increase: 10 },
  { name: 'Casa Própria', cost: 800, increase: 10 },
  { name: 'Mansão', cost: 5000, increase: 10 },
  { name: 'Hornet', cost: 500, increase: 10 },
  { name: 'PC Gamer', cost: 400, increase: 10 },
  { name: 'Console de jogos', cost: 350, increase: 10 },
  { name: 'TV de tubo', cost: 40, increase: 10 },
  { name: 'Camisa do seu time de coração', cost: 8, increase: 10 },
  { name: 'Camisa de banda', cost: 9, increase: 10 },
  { name: 'Bolsa Balenciaga', cost: 3000, increase: 10 },
  { name: 'Jordan S', cost: 1000, increase: 10 },
  { name: 'Blusa da Supreme', cost: 900, increase: 10 },
  { name: 'Twitter', cost: 10050, increase: 10 }
];

clickButton.addEventListener('click', () => {
  score += clickPower;
  updateScore();
});

function updateScore() {
  scoreElement.textContent = `Dinheiros: ${score}`;
  updateUpgrades();
}

function updateUpgrades() {
  upgradesElement.innerHTML = '';
  upgrades.forEach(upgrade => {
    const upgradeButton = document.createElement('button');
    upgradeButton.textContent = `${upgrade.name} (${upgrade.increase}x) - Cost: ${upgrade.cost}`;
    upgradeButton.disabled = score < upgrade.cost;
    
    upgradeButton.addEventListener('click', () => {
      if (score >= upgrade.cost) {
        score -= upgrade.cost;
        clickPower += upgrade.increase;
        upgrade.cost *= 2;
        updateScore();
      }
    });
    
    upgradesElement.appendChild(upgradeButton);
  });
}

updateScore();
