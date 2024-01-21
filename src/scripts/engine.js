let pokemonsCardsImg = [];

async function fetchImagesUrlFirst151Pokemons() {
  for (let i = 1; i <= 8; i++) {
    const randomSelection = Math.floor(Math.random() * 151) + 1;

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomSelection}/`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Error in the request: ${response.status}`);
      }

      const data = await response.json();
      const imageUrl = data.sprites.front_default;

      pokemonsCardsImg.push(imageUrl, imageUrl);
    } catch (error) {
      console.error(`Error fetching Pokémon #${i}:`, error);
    }
  }

  createCards();
}
fetchImagesUrlFirst151Pokemons();

function createCards() {
  let shuffleImgCards = pokemonsCardsImg.sort(() =>
    Math.random() > 0.5 ? 1 : -1,
  );

  for (let i = 0; i < shuffleImgCards.length; i++) {
    let box = document.createElement('div');
    box.className = 'item';
    box.onclick = handleClick;

    let imgCard = document.createElement('img');
    imgCard.src = shuffleImgCards[i];
    imgCard.alt = `card ${i}`;

    box.appendChild(imgCard);

    document.querySelector('.game').appendChild(box);
  }
}

let openCards = [];

function handleClick() {
  if (openCards.length < 2) {
    this.classList.add('boxOpen');
    openCards.push(this);
  }

  if (openCards.length == 2) {
    setTimeout(checkMatch, 500);
  }

  console.log(openCards);
}

function checkMatch() {
  if (
    openCards[0].querySelector('img').src ===
    openCards[1].querySelector('img').src
  ) {
    openCards[0].classList.add('boxMatch');
    openCards[1].classList.add('boxMatch');
  } else {
    openCards[0].classList.remove('boxOpen');
    openCards[1].classList.remove('boxOpen');
  }

  openCards = [];

  if (
    document.querySelectorAll('.boxMatch').length === pokemonsCardsImg.length
  ) {
    alert('Você venceu !');
  }
}
