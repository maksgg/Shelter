const burgerBtn = document.querySelector(".burger-menu-icon");
const burgerMenu = document.querySelector(".burger-menu");
const body = document.querySelector("body");
const navLinks = document.querySelectorAll(".list__item a");
const overlay = document.querySelector('.overlay');

//burger animation
burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('rotate');
  burgerMenu.classList.toggle('active');
})