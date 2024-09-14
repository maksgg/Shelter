document.addEventListener('DOMContentLoaded', () => {
  const petData = [
    {
      "name": "Jennifer",
      "img": "./img/pets-jennifer.png",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Sophia",
      "img": "./img/pets-sophia.png",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Woody",
      "img": "./img/pets-woody.png",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"]
    },
    {
      "name": "Scarlett",
      "img": "./img/pets-scarlet.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Katrine",
      "img": "./img/pets-katrine.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Timmy",
      "img": "./img/pets-timmy.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"]
    },
    {
      "name": "Freddie",
      "img": "./img/pets-freddie.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Charly",
      "img": "./img/pets-charly.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
      "diseases": ["deafness", "blindness"],
      "parasites": ["lice", "fleas"]
    }
  ];

  const totalPets = 48; // максимальне значення масиву
  let pagedData = [];
  let currentPage = 1;
  let totalPages = 0;
  
  const sliderCards = document.querySelectorAll('.slider-card'); 
  const paginationControls = document.querySelectorAll('.pagination');
  const popupContainer = document.querySelector('.popup-container');
  const popupCloseBtn = document.querySelector('.popup-close-btn');
  const popupImg = document.querySelector('.popup-img');
  const popupInfo = document.querySelector('.popup-info');

  // Цикл по масиву щоб зробити рандомний вибір
  const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // генерація масиву з випадковими улюбленцями
  const generateUniquePetArray = () => {
    return shuffle(petData.flatMap(pet => Array(6).fill(pet)));
  };

  // Кількість карток при розмірі екрану
  const updatePageSize = () => {
    const width = window.innerWidth;
    return width >= 1280 ? 8 : (width >= 768 ? 6 : 3);
  };

  const createPagedData = size => {
    const petArray = generateUniquePetArray();
    return Array.from({ length: Math.ceil(totalPets / size) }, (_, i) =>
      petArray.slice(i * size, i * size + size)
    );
  };

  // Render a specific page
  const renderPage = pageNumber => {
    const pets = pagedData[pageNumber - 1] || [];
    sliderCards.forEach((card, index) => {
      const pet = pets[index];
      if (pet) {
        card.querySelector('p').textContent = pet.name;
        card.querySelector('.card-img').style.backgroundImage = `url(${pet.img})`;
        card.classList.remove('hidden');
        card.dataset.index = petData.indexOf(pet);
      } else {
        card.classList.add('hidden');
      }
    });
    document.querySelector('.pagination.center p').textContent = currentPage;
  };

  // Update pagination controls' states
  const updatePaginationControls = () => {
    paginationControls.forEach(control => control.classList.remove('inactive'));
    if (currentPage === 1) {
      paginationControls[0].classList.add('inactive'); // <<
      paginationControls[1].classList.add('inactive'); // <
    }
    if (currentPage === totalPages) {
      paginationControls[3].classList.add('inactive'); // >
      paginationControls[4].classList.add('inactive'); // >>
    }
  };

  // Handle page navigation
  const handlePageChange = direction => {
    if (direction === 'next' && currentPage < totalPages) {
      currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
      currentPage--;
    } else if (direction === 'first') {
      currentPage = 1;
    } else if (direction === 'last') {
      currentPage = totalPages;
    }
    renderPage(currentPage);
    updatePaginationControls();
  };

  // Handle window resizing
  const handleResize = () => {
    const newSize = updatePageSize();
    const newTotalPages = Math.ceil(totalPets / newSize);
    if (currentPage > newTotalPages) currentPage = newTotalPages;
    totalPages = newTotalPages;
    pagedData = createPagedData(newSize);
    renderPage(currentPage);
    updatePaginationControls();
  };

  // Show the popup with pet details
  const showPopup = index => {
    const pet = petData[index];
    popupImg.style.backgroundImage = `url(${pet.img})`;
    popupInfo.querySelector('h3').textContent = pet.name;
    popupInfo.querySelector('h5').textContent = `${pet.type}-${pet.breed}`;
    popupInfo.querySelector('p').textContent = pet.description;
    popupInfo.querySelectorAll('.popup-list-span1').forEach((span, i) => {
      const attributes = [pet.age, pet.inoculations.join(', '), pet.diseases.join(', '), pet.parasites.join(', ')];
      span.textContent = attributes[i] || '';
    });

    popupContainer.classList.add('show');
    
  };

  // Close the popup
  const closePopup = () => popupContainer.classList.remove('show');

  // Initialize slider and pagination
  const initialize = () => {
    const size = updatePageSize();
    totalPages = Math.ceil(totalPets / size);
    pagedData = createPagedData(size);
    currentPage = 1;
    renderPage(currentPage);
    updatePaginationControls();
  };

  // Event listeners
  paginationControls.forEach(control => {
    control.addEventListener('click', () => {
      const text = control.textContent.trim();
      if (text === '<<') handlePageChange('first');
      if (text === '<') handlePageChange('prev');
      if (text === '>') handlePageChange('next');
      if (text === '>>') handlePageChange('last');
    });
  });

  sliderCards.forEach(card => {
    card.addEventListener('click', () => {
      const index = card.dataset.index;
      showPopup(index);
    });
  });

  popupCloseBtn.addEventListener('click', closePopup);
  window.addEventListener('click', event => {
    if (event.target === popupContainer) closePopup();
  });
  window.addEventListener('resize', handleResize);

  // Initialize on page load
  initialize();
});


/* const popupBtn = document.querySelector('.popup-close-btn');
const closePopupMenu = document.querySelector('.popup-container');
const slideCard = document.querySelector('.slider-card');



popupBtn.addEventListener('click', () => {
  closePopupMenu.classList.toggle('active');
}) */
