// Variáveis iniciais
let resources = 0;
let happiness = 100;
let wisdom = 0;
let job = "Desempregado";
let money = 0;

//Eventos
let events = {
  christmas: false
};

//Conquistas
const achievements = {
  wisdom: {
    100: "Sábio Iniciante",
    500: "Estudioso",
    1000: "Mestre do Conhecimento"
  },
  money: {
    1000: "Economista Novato",
    5000: "Milionário",
    10000: "Magnata Financeiro"
  },
  happiness: {
    50: "Otimista",
    75: "Alegre",
    100: "Felicidade Suprema"
  }
};

//Level
const levels = {
  1: "Iniciante",
  5: "Intermediário",
  10: "Avançado"
};

const unlockedFeatures = {
  3: "Novo Trabalho Disponível",
  7: "Loja de Itens de Luxo"
};


// Renda por emprego, Se mudar aqui muda em jobs
const jobIncome = {
  "Desempregado": 0,
  "Assistente de Escritório": 15,
  "Programador": 50,
  "Engenheiro de Software": 100,
};

// Elementos da interface
const wisdomDisplay = document.getElementById("wisdom");
const jobDisplay = document.getElementById("job");//Trabalho atual
const jobSelect = document.getElementById("jobSelect");//Trabalho a escolher
const moneyDisplay = document.getElementById("money");//Dinheiro
const happinessDisplay = document.getElementById("happiness");//Felicidade
const statusDisplay = document.getElementById("status"); // Exibe o estado de felicidade

const schoolCategory = document.getElementById("school-category");  //Botão Html
const workCategory = document.getElementById("work-category"); //Botão Html
const minigamesCategory = document.getElementById("minigames-category"); //Botão Html

const studyButton = document.getElementById("studyButton");
const changeJobSelectButton = document.getElementById("changeJobSelectButton");
const shopContainer = document.getElementById("shop-container");
const goToWorkButton = document.getElementById("goToWorkButton");

// Requisitos de emprego para exibição
const jobRequirementsElements = document.querySelectorAll(".job-requirement");

// Lista de empregos com requisitos, salários e impacto na felicidade, mudar wisdomRequirement
const jobs = [
  { name: "Mendigo", wisdomRequirement: 5, salary: 0, happinessImpact: -5 },
  { name: "Assistente de Escritório", wisdomRequirement: 10, salary: 15, happinessImpact: -5 },
  { name: "Programador", wisdomRequirement: 30, salary: 50, happinessImpact: -10 },
  { name: "Engenheiro de Software", wisdomRequirement: 60, salary: 100, happinessImpact: -15 },
];


// Atualiza o emprego
function updateJob(newJob) {
  job = newJob;
  jobDisplay.textContent = job;
}

// Atualiza os requisitos de emprego exibidos
function updateJobRequirements() {
  jobRequirementsElements.forEach((element, index) => {
    element.textContent = `Requisito de Sabedoria: ${jobs[index].wisdomRequirement}`;
  });
}


// Inicializa os elementos da interface com valores iniciais
updateJob(job);
updateJobRequirements();


// Função para ir trabalhar
function goToWork() {
  const income = jobIncome[job];

  if (job === "Mendigo") {
    const randomIncome = Math.floor(Math.random() * 11); // Gera um valor aleatório de 0 a 10
    money += randomIncome;
    updateMoneyDisplay();
    increaseHappiness(-0.5);
    showMessage(`Você trabalhou como ${job} e ganhou $${randomIncome.toFixed(2)}!`);
  } else if (income !== undefined) {
    money += income;
    updateMoneyDisplay();
    increaseHappiness(-0.5);
    showMessage(`Você trabalhou como ${job} e ganhou $${income.toFixed(2)}!`);
  } else {
    showMessage("Você precisa de um emprego para trabalhar.");
  }
}
goToWorkButton.addEventListener("click", goToWork);

// Associa a função ao botão "Ir Trabalhar"
function showCategory(categoryId) {
  const categoriesContainer = document.getElementById("categories-container");
  const selectedCategory = document.getElementById(categoryId);
  const mainCategories = document.getElementsByClassName("action-button");

  // Exibe a categoria principal antes de exibir a categoria selecionada
  for (const mainCategory of mainCategories) {
    const mainCategoryId = mainCategory.dataset.action + "-category";
    const mainCategoryElement = document.getElementById(mainCategoryId);
    categoriesContainer.appendChild(mainCategoryElement);
  }

  // Move a categoria selecionada para baixo do botão clicado
  const actionButton = document.getElementById(`${categoryId.split('-')[0]}-button`);
  actionButton.insertAdjacentElement('afterend', selectedCategory);

  // Define a exibição das outras categorias como "none"
  const categories = document.getElementsByClassName("action-category");
  for (const category of categories) {
    if (category !== selectedCategory) {
      category.style.display = "none";
    }
  }
  

  // Exibe a categoria selecionada
  selectedCategory.style.display = "block";
}

document.getElementById("school-button").addEventListener("click", () => showCategory("school-category"));
document.getElementById("work-button").addEventListener("click", () => showCategory("work-category"));
document.getElementById("minigames-button").addEventListener("click", () => showCategory("minigames-category"));
document.getElementById("shop-button").addEventListener("click", () => showCategory("shop-category"));
//document.getElementById("Roupa-button").addEventListener("click", () => showCategory("Roupa-category"));
//document.getElementById("shopEletronico-button").addEventListener("click", () => showCategory("shopEletronico-category"));
//document.getElementById("shopImovel-button").addEventListener("click", () => showCategory("shopImovel-category"));
//document.getElementById("shopAutomovel-button").addEventListener("click", () => showCategory("shopAutomovel-category"));

// Lista de itens da loja
let items = [
  { name: 'Celular da ASUS', cost: 20, increase: 10 },
  { name: 'IPhone', cost: 100, increase: 10 },
  { name: 'Apartemento longe da faculdade', cost: 200, increase: 10 },
  { name: 'Apartamento próximo à faculdade', cost: 600, increase: 10 },
  { name: 'Computador', cost: 200, increase: 1 },
  { name: 'Fiat Uno', cost: 500, increase: 5 },
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

// Função para comprar um item da loja
function buyItem(item) {
  if (money >= item.cost) {
    money -= item.cost;
    happiness += item.increase;
    updateMoneyDisplay();
    updateHappinessDisplay();
  } else {
    showMessage("Dinheiro insuficiente para comprar este item.");
  }
}

// Renderiza a loja na interface
function renderShop() {
  shopContainer.innerHTML = "<h2>Loja</h2>";
  items.forEach((item) => {
    const button = document.createElement("button");
    button.textContent = `${item.name} ($${item.cost.toFixed(2)})`;
    button.addEventListener("click", () => buyItem(item));
    shopContainer.appendChild(button);
  });

  // Botões para jogar minijogos
  const musicGameButton = document.createElement("button");
  musicGameButton.textContent = "Jogar Minijogo de Música (+Felicidade)";
  musicGameButton.addEventListener("click", playMusicGame);
  shopContainer.appendChild(musicGameButton);

  // Botão para ativar evento de Natal
  const christmasButton = document.createElement("button");
  christmasButton.textContent = "Ativar Evento de Natal (+Felicidade)";
  christmasButton.addEventListener("click", activateChristmasEvent);
  shopContainer.appendChild(christmasButton);
}


// Aumenta a felicidade e atualiza a exibição
function increaseHappiness(amount) {
  happiness += amount;
  if (happiness > 100) {
    happiness = 100;
  }
  updateHappinessDisplay();
  updateStatus();
  showNotification(`Felicidade aumentou: +${amount.toFixed(2)}`);
}



// Atualiza a exibição da felicidade na interface
function updateHappinessDisplay() {
  happinessDisplay.textContent = happiness.toFixed(2);
}

// Atualiza o status (estado de felicidade) na interface
function updateStatus() {
  if (happiness >= 75) {
    statusDisplay.textContent = "Feliz";
  } else if (happiness > 25) {
    statusDisplay.textContent = "Triste";
  } else {
    statusDisplay.textContent = "Depressivo";
  }
}


// Executa uma ação
function executeAction(action) {
  let income = action.income * (1 + (currentDifficulty * 0.1));
  resources += income;
  happiness += action.happiness;
  if (resources >= resourceGoal) {
    goalAchieved = true;
  }
  updateStatus();
}
// Atualiza o status no painel
function updateStatus() {
  document.getElementById("happiness").textContent = happiness;
}
// Atualiza a exibição do dinheiro na interface
function updateMoneyDisplay() {
  moneyDisplay.textContent = money.toFixed(2);
}
// Ativa o evento de Natal
function activateChristmasEvent() {
  events.christmas = true;
  showMessage("É Natal! Aproveite o evento especial e ganhe mais felicidade!");

  setTimeout(() => {
    events.christmas = false;
    showMessage("O evento de Natal acabou. A felicidade voltou ao normal.");
  }, 30000); // 30 segundos
}


// Função associada ao botão "Mudar de Emprego"
changeJobSelectButton.addEventListener("click", () => {
  const selectedJob = jobSelect.value;
  const selectedJobIndex = jobs.findIndex((j) => j.name === selectedJob);

  if (selectedJobIndex >= 0 && wisdom >= jobs[selectedJobIndex].wisdomRequirement) {
    wisdom -= jobs[selectedJobIndex].wisdomRequirement;
    money += jobs[selectedJobIndex].salary;
    happiness += jobs[selectedJobIndex].happinessImpact;

    job = selectedJob;
    jobDisplay.textContent = job;
    updateJobRequirements();

    wisdomDisplay.textContent = wisdom;
    moneyDisplay.textContent = money.toFixed(2);
    updateHappinessDisplay();
  } else {
    alert("Você não tem sabedoria suficiente para esse emprego.");
  }
});


// Função para mostrar uma notificação
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000); // 3 segundos
}

// Funções para jogar minijogos

//Musica
function playMusicGame() {
    const correctNote = Math.floor(Math.random() * 3); // Nota correta (0 a 2)
    const userGuess = prompt("Tente adivinhar a nota correta: 0, 1 ou 2");
  
    if (userGuess === null) {
      showMessage("Você cancelou o minijogo de música.");
      return;
    }
  
    if (parseInt(userGuess) === correctNote) {
      increaseHappiness(20); // Aumentar a felicidade em 20 pontos se adivinhar corretamente
     alert("Você acertou a nota e se sentiu animado!");
    } else {
      decreaseHappiness(10); // Diminuir a felicidade em 10 pontos se errar
      alert("Você errou a nota e ficou um pouco frustrado.");
    }
  }

//Basquete
function playBasketballMinigame() {

  const playerScore = Math.floor(Math.random() * 11); // Pontuação do jogador (0 a 10)
  const opponentScore = Math.floor(Math.random() * 11); // Pontuação do oponente (0 a 10)

  const minigameResult = document.createElement("div");
  minigameResult.innerHTML = `
            <p>Você jogou uma partida de basquete!</p>
            <p>Sua pontuação: ${playerScore}</p>
            <p>Pontuação do oponente: ${opponentScore}</p>
        `;

  const minigameContainer = document.getElementById("minigame-container");
  //minigameContainer.innerHTML = ""; // Limpa o conteúdo anterior
  //minigameContainer.appendChild(minigameResult);

  if (playerScore > opponentScore) {
    alert("Pontuação: Você " + playerScore + " X " + opponentScore + " Oponente\nVocê venceu o jogo de basquete e se sentiu empolgado!");
    increaseHappiness(10); // Aumentar a felicidade em 10 pontos se ganhar
  }
  if (playerScore < opponentScore) {
    alert("Pontuação: Você " + playerScore + " X " + opponentScore + " Oponente\nVocê perdeu o jogo de basquete e ficou um pouco frustrado.");
    decreaseHappiness(8); // Diminuir a felicidade em 8 pontos se perder
  }else {
    alert("Pontuação: Você " + playerScore + " X " + opponentScore + " Oponente\nEmpate! Ninguém ganhou ou perdeu, mas se divertiu jogando.");
    increaseHappiness(5); // Aumentar a felicidade em 5 pontos se ganhar
  }
}

//Truco
function playTrucoMinigame() {
    const playerScore = Math.floor(Math.random() * 11); // Pontuação do jogador (0 a 10)
    const opponentScore = Math.floor(Math.random() * 11); // Pontuação do oponente (0 a 10)
  
    const minigameResult = document.createElement("div");
    minigameResult.innerHTML = `
        <p>Você jogou uma partida de truco!</p>
        <p>Sua pontuação: ${playerScore}</p>
        <p>Pontuação do oponente: ${opponentScore}</p>
    `;
  
    const minigameContainer = document.getElementById("minigame-container");
    //minigameContainer.innerHTML = ""; // Limpa o conteúdo anterior
    //minigameContainer.appendChild(minigameResult);
  
    if (playerScore > opponentScore) {
      increaseHappiness(10); // Aumentar a felicidade em 10 pontos se ganhar
      alert("Você venceu o jogo de truco e se sentiu empolgado!");
    } else if (playerScore < opponentScore) {
      decreaseHappiness(8); // Diminuir a felicidade em 8 pontos se perder
      alert("Você perdeu o jogo de truco e ficou um pouco frustrado.");
    } else {
      alert("Empate! Ninguém ganhou ou perdeu, mas se divertiu jogando.");
    }
  }



  ///Conquistas 


  function checkAchievements() {
    for (const category in achievements) {
      const value = parseFloat(document.getElementById(category).textContent);
      for (const target in achievements[category]) {
        if (value >= parseFloat(target)) {
          const achievementName = achievements[category][target];
          alert(`Conquista desbloqueada: ${achievementName}`);
        }
      }
    }
  }
  

  function checkProgress() {
    const wisdom = parseFloat(document.getElementById("wisdom").textContent);
    const levelIndicator = document.getElementById("player-level");
    for (const level in levels) {
      if (wisdom >= parseFloat(level)) {
        levelIndicator.textContent = levels[level];
      }
    }
  
    for (const feature in unlockedFeatures) {
      if (wisdom >= parseFloat(feature)) {
        alert(`Novo recurso desbloqueado: ${unlockedFeatures[feature]}`);
      }
    }
  }
  
 // Função para exibir conquistas
function displayAchievements() {
  const achievementsList = document.getElementById("achievements-list");
  achievementsList.innerHTML = "";

  for (const category in achievements) {
    const value = parseFloat(document.getElementById(category).textContent);
    for (const target in achievements[category]) {
      if (value >= parseFloat(target)) {
        const achievementName = achievements[category][target];
        const achievementItem = document.createElement("li");
        achievementItem.textContent = achievementName;
        achievementsList.appendChild(achievementItem);
      }
    }
  }
}



// Chamando funções necessárias após o carregamento da página
document.addEventListener("DOMContentLoaded", () => {
  updateStatus();

  document.getElementById("school-button").addEventListener("click", function() {
    togglePopup("school-category", "school-button");
  });
  
  document.getElementById("work-button").addEventListener("click", function() {
    togglePopup("work-category", "work-button");
  });
  
  document.getElementById("minigames-button").addEventListener("click", function() {
    togglePopup("minigames-category", "minigames-button");
  });
  
  document.getElementById("school-button").addEventListener("click", () => {
    showCategory("school-category");
  });
  document.getElementById("work-button").addEventListener("click", () => {
    showCategory("work-category");
  });
  document.getElementById("minigames-button").addEventListener("click", () => {
    showCategory("minigames-category");
  });
  document.getElementById("shop-button").addEventListener("click", () => {
    showCategory("shop-category");
  });
  
  
  updatePlayerLevel();
 
  
});
// Chame showCategory assim que a página for carregada para exibir a categoria padrão
window.addEventListener("DOMContentLoaded", () => {
  showCategory("school-category");
});



// Função para atualizar e exibir o nível do jogador
function updatePlayerLevel() {
  const wisdom = parseFloat(document.getElementById("wisdom").textContent);
  const levelIndicator = document.getElementById("player-level");
  for (const level in levels) {
    if (wisdom >= parseFloat(level)) {
      levelIndicator.textContent = levels[level];
    }
  }
}

//Historia 

function choosePath(choice) {
  const storyElement = document.getElementById('story');
  const choicesElement = document.getElementById('choices');

  if (choice === 1) {
    storyElement.innerHTML = "Você entra na floresta escura, onde criaturas misteriosas espreitam.";
    choicesElement.innerHTML = `
      <p>O que você faz a seguir?</p>
      <button onclick="continueStory(1)">Explorar mais fundo</button>
      <button onclick="continueStory(2)">Montar acampamento</button>
    `;
  } else if (choice === 2) {
    storyElement.innerHTML = "Você começa a subir a montanha íngreme, enfrentando ventos gelados.";
    choicesElement.innerHTML = `
      <p>Como você deseja proceder?</p>
      <button onclick="continueStory(3)">Escalar com cautela</button>
      <button onclick="continueStory(4)">Procurar outro caminho</button>
    `;
  }
}

function continueStory(choice) {
  const storyElement = document.getElementById('story');
  const choicesElement = document.getElementById('choices');

  if (choice === 1) {
    storyElement.innerHTML = "Enquanto explora, você encontra uma antiga relíquia perdida.";
    choicesElement.innerHTML = `
      <p>Sua descoberta desperta a atenção de caçadores de tesouros. O que você faz?</p>
      <button onclick="endGame('Derrota')">Lutar contra eles</button>
      <button onclick="endGame('Vitória')">Tentar negociar</button>
    `;
  } else if (choice === 2) {
    storyElement.innerHTML = "Você monta acampamento e passa uma noite tranquila na floresta.";
    choicesElement.innerHTML = `
      <p>Na manhã seguinte, você decide:</p>
      <button onclick="endGame('Derrota')">Continuar explorando</button>
      <button onclick="endGame('Vitória')">Retornar à cidade</button>
    `;
  }
  // E assim por diante...
}

function endGame(result) {
  const storyElement = document.getElementById('story');
  const choicesElement = document.getElementById('choices');

  storyElement.innerHTML = `Fim de jogo. Resultado: ${result}`;
  choicesElement.innerHTML = ''; // Remover os botões
}

  // Função para atualizar os elementos na página com base nas variáveis
  function updateStatusAndGoals() {
    document.getElementById("wisdom").textContent = wisdom;
    document.getElementById("job").textContent = job;
    document.getElementById("money").textContent = money.toFixed(2);
    document.getElementById("happiness").textContent = happiness.toFixed(2);
    document.getElementById("status").textContent = status;
   
  }

  // Chamando a função inicial para exibir os valores iniciais
  updateStatusAndGoals();

  // Avatar
  function toggleAvatarOptions() {
    const avatarOptions = document.getElementById("avatar-options");
    avatarOptions.style.display = avatarOptions.style.display === "block" ? "none" : "block";
  }
  
  function changeAvatar(newAvatar) {
    const avatarImage = document.getElementById("avatar-image");
    avatarImage.src = newAvatar;
  
    const avatarOptions = document.getElementById("avatar-options");
    avatarOptions.style.display = "none";
  }
let activePopupId = null; // Variável para rastrear o pop-up ativo

// Função para mostrar um pop-up ao lado do botão clicado
function showPopup(popupId, buttonId) {
  const popup = document.getElementById(popupId);
  const button = document.getElementById(buttonId);
  
  // Posiciona o pop-up ao lado do botão
  const buttonRect = button.getBoundingClientRect();
  popup.style.left = buttonRect.right + "px";
  popup.style.top = buttonRect.top + "px";
  
  popup.style.display = "block";
}

// Função para esconder um pop-up
function hidePopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.style.display = "none";
}

function togglePopup(popupId, buttonId) {
  var popup = document.getElementById(popupId);
 
  popup.classList.toggle('show');

  if (popup.style.display === "block") {
    popup.style.display = "none";
  } else {
    // Fecha o popup ativo, se houver um
    if (activePopupId !== null) {
      hidePopup(activePopupId);
    }

    popup.style.display = "block";

  }
}

document.addEventListener("DOMContentLoaded", function() {
  const popupButtons = document.querySelectorAll(".popup-button");

  popupButtons.forEach(button => {
    button.addEventListener("click", function() {
      const targetId = this.getAttribute("data-target");
      togglePopup(targetId);
    });
  });

  // Fecha o pop-up ativo quando se clica fora dele
  window.addEventListener("click", function(event) {
    if (activePopupId !== null && !event.target.closest(".popup")) {
      hidePopup(activePopupId);
    }
  });
});

function showSchoolPopup() {
  var button = document.getElementById("school-button");
  var popup = document.getElementById("school-category");
  
  var buttonRect = button.getBoundingClientRect();
  popup.style.top = buttonRect.top + "px";
  popup.style.left = buttonRect.right + "px";
  
  popup.style.display = "block";
}


document.getElementById("school-button").addEventListener("click", () => {
  showCategory("school-category");
  showStudyButton(); // Mostra o botão de estudar na categoria da faculdade
});

// Função para mostrar o botão de estudar na categoria da faculdade
function showStudyButton() {
  const studyButton = document.getElementById("studyButton");
  studyButton.style.display = "block";
}

// Função para esconder o botão de estudar
function hideStudyButton() {
  const studyButton = document.getElementById("studyButton");
  studyButton.style.display = "none";
}

// Associa a função ao botão "Ir para a Faculdade"
document.getElementById("school-button").addEventListener("click", () => {
  showCategory("school-category");
  showStudyButton(); // Mostra o botão de estudar na categoria da faculdade
});




// Aumenta a sabedoria
function increaseWisdom(amount) {
  wisdom += amount;
  wisdomDisplay.textContent = wisdom; // Update the wisdom display
}


// Função para mostrar o pop-up de estudar na faculdade
function showStudyPopup() {
  const studyPopup = document.getElementById("studyPopup");
  studyPopup.style.display = "block";
}

// Função para esconder o pop-up de estudar
function hideStudyPopup() {
  const studyPopup = document.getElementById("studyPopup");
  studyPopup.style.display = "none";
}

// Associa a função ao botão "Ir para a Faculdade"
document.getElementById("school-button").addEventListener("click", () => {
  showCategory("school-category");
  showStudyPopup(); // Mostra o pop-up de estudar
});


// Função para exibir os itens da loja de roupas
function showClothingItems() {
  var clothingCategory = document.getElementById('Roupa-category');
  clothingCategory.classList.add('show');
}

// Função para ocultar a categoria de roupas
function hideClothingItems() {
  var clothingCategory = document.getElementById('Roupa-category');
  clothingCategory.classList.remove('show');
}


// Aumenta a sabedoria
function increaseWisdom(amount) {
  wisdom += amount;
  wisdomDisplay.textContent = wisdom; // Atualiza a exibição da sabedoria
  updateStatus(); // Atualiza o status na interface
}

// Conecte a função ao botão de estudar
studyButton.addEventListener('click', () => increaseWisdom(10)); // Aumenta a sabedoria em 10 ao clicar




function decreaseHappiness() {
  if (happiness > 0) {
    happiness -= 0.4;
    if(happiness <= 0){
      happiness = 0;
      alert("Você chegou ao fundo do poço >:(");
    } // Reduzindo um valor constante para testar
    updateHappinessDisplay(); // Atualiza a exibição da felicidade
    updateStatus(); // Atualiza o status na interface
  }
}

setInterval(decreaseHappiness, 1000); // 1000 milissegundos = 1 segundo



const increaseWisdomButton = document.getElementById("increaseWisdomButton");


// Função para estudar e aumentar sabedoria
function study() {
  increaseWisdom(0);
}

// Função para aumentar a sabedoria
function increaseWisdom(amount) {
  var wisdomElement = document.getElementById('wisdom');
  var currentWisdom = parseInt(wisdomElement.textContent);
  currentWisdom += amount;
  wisdomElement.textContent = currentWisdom;
}

// Atualiza a exibição da felicidade
function updateHappinessDisplay() {
  var happinessDisplay = document.getElementById("happiness");
  happinessDisplay.textContent = happiness.toFixed(2); // Formata para dois dígitos decimais
}

// Atualiza a exibição do status baseado no valor da felicidade
function updateStatus() {
  var statusDisplay = document.getElementById("status");
  if (happiness > 75) {
    statusDisplay.textContent = "Muito feliz!";
  } else if (happiness > 50) {
    statusDisplay.textContent = "Feliz";
  } else if (happiness > 25) {
    statusDisplay.textContent = "Infeliz";
  } else {
    statusDisplay.textContent = "Muito infeliz...";
  }
}

// Função para diminuir a felicidade ao longo do tempo
function decreaseHappinessOverTime() {
  if (happiness > 0) {
    happiness -= 10; // Reduzindo um valor constante para testar
    updateHappinessDisplay(); // Atualiza a exibição da felicidade
    updateStatus(); // Atualiza o status na interface
  }
}

// Chama a função decreaseHappinessOverTime a cada segundo (1000 milissegundos)
setInterval(decreaseHappinessOverTime, 1000); // 1000 milissegundos = 1 segundo


//Musica
const musicToggle = document.getElementById("music-toggle");
  const backgroundMusic = document.getElementById("background-music");

  const musicSources = [
    "AudioTodo.mp3"  // URL da primeira música
  ];

  let currentMusicIndex = 0;

  function playCurrentMusic() {
    backgroundMusic.src = musicSources[currentMusicIndex];
    backgroundMusic.play();
  }

  musicToggle.addEventListener("change", () => {
    if (musicToggle.checked) {
      playCurrentMusic();
    } else {
      backgroundMusic.pause();
    }
  });

  backgroundMusic.addEventListener("ended", () => {
    // Ao finalizar a música, alterna para a próxima música
    currentMusicIndex = (currentMusicIndex + 1) % musicSources.length;
    if (musicToggle.checked) {
      playCurrentMusic();
    }
  });
