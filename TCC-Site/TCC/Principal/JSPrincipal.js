const gifUrls = [
    "../img/Bem-vindo-a--unscreen.gif",
    
    // Add more GIF URLs as needed
  ];

  function getRandomGifUrl() {
    const randomIndex = Math.floor(Math.random() * gifUrls.length);
    return gifUrls[randomIndex];
  }
  
  function getRandomPosition(maxWidth, maxHeight, existingGifs, buttonWidth, buttonHeight) {
    const minDistance = 200; // Minimum distance between GIFs
    let x, y;
  
    do {
      x = Math.random() * (maxWidth - 200);
      y = Math.random() * (maxHeight - 200);
    } while (
      existingGifs.some(gif => Math.abs(x - gif.x) < minDistance && Math.abs(y - gif.y) < minDistance) ||
      (x > maxWidth - buttonWidth && y < buttonHeight) // Exclude area occupied by home buttons
    );
  
    return { x, y };
  }
  
  function generateRandomGifs(numGifs) {
    const gifContainer = document.getElementById("gifContainer");
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const homeButtons = document.querySelectorAll(".homeButton");
    const buttonWidth = homeButtons[0].offsetWidth;
    const buttonHeight = homeButtons[0].offsetHeight;
    const existingGifs = [];
  
    for (let i = 0; i < numGifs; i++) {
      const gifUrl = getRandomGifUrl();
      const { x, y } = getRandomPosition(screenWidth, screenHeight, existingGifs, buttonWidth, buttonHeight);
  
      const gifElement = document.createElement("img");
      gifElement.setAttribute("src", gifUrl);
      gifElement.setAttribute("alt", "Random GIF");
      gifElement.classList.add("randomGif");
      gifElement.style.position = "absolute";
      gifElement.style.width = "90px"; // Set the desired width of the GIF
      gifElement.style.height = "auto"; // Set height to "auto" for maintaining aspect ratio
      gifElement.style.left = `${x}px`;
      gifElement.style.top = `${y}px`;
  
      gifContainer.appendChild(gifElement);
  
      existingGifs.push({ x, y });
    }
  }
  
  const numGifsToShow = 10; // Change this value to control how many GIFs you want to display
  generateRandomGifs(numGifsToShow);