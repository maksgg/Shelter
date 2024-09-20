console.log("Самооцінка: 80-90 балів");


// Slider function
// Отримуємо елементи
const sliderList = [...document.querySelectorAll('.slider-card')];
        const nextButton = document.querySelector('.arrow1');
        const prevButton = document.querySelector('.arrow');
        const slideCount = 3;
        let currentSlides = [];
        let historySlides = [];
        let allSlides = [...sliderList];

        // Функція для перемішування масиву
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // Функція для отримання нових слайдів без дублікатів
        function getNewSlides() {
            let availableSlides = allSlides.filter(slide => !currentSlides.includes(slide));
            if (availableSlides.length < slideCount) {
                availableSlides = allSlides.filter(slide => !currentSlides.includes(slide) && !historySlides.includes(slide));
            }
            let newSlides = shuffle(availableSlides).slice(0, slideCount);
            return newSlides;
        }

        // Функція для показу слайдів
        function showSlides(slides) {
            sliderList.forEach(el => el.style.display = 'none'); // Приховуємо всі слайди
            slides.forEach(el => el.style.display = 'flex'); // Показуємо вибрані слайди
        }

        // Функція для генерації нового набору слайдів
        function generateNewSlides() {
            if (currentSlides.length > 0) {
                historySlides.push(currentSlides);
            }
            if (historySlides.length > 10) {
                historySlides.shift(); // Видаляємо найстаріший стан, якщо досягнуто максимум
            }
            currentSlides = getNewSlides();
            showSlides(currentSlides);
        }

        // Функція для показу наступного слайду
        function showNextSlides() {
            generateNewSlides();
        }

        // Функція для показу попереднього слайду
        function showPreviousSlides() {
            if (historySlides.length > 0) {
                currentSlides = historySlides.pop();
                showSlides(currentSlides);
            } else {
                generateNewSlides(); // Генеруємо новий набір, якщо немає історії
            }
        }

        // Додаємо обробники подій на кнопки
        nextButton.addEventListener('click', showNextSlides);
        prevButton.addEventListener('click', showPreviousSlides);

        // Ініціалізація: показуємо перший набір слайдів при завантаженні
        generateNewSlides();









       