const burgerBtn = document.querySelector(".burger-menu-icon");

const closeBurgerMenu = document.querySelector(".burger-menu");
const body = document.querySelector("body");
const navLinks = document.querySelectorAll(".list__item a");
const overlay = document.querySelector('.overlay');

//burger animation
burgerBtn.addEventListener('click', () => {


  
  body.classList.toggle('lock-scroll');
  burgerBtn.classList.toggle('rotate');
  closeBurgerMenu.classList.toggle('active');
  closeBurgerMenu.classList.toggle('hidden-pets');
  overlay.style.display = closeBurgerMenu.classList.contains('active') ? 'block' : 'none';
})

document.addEventListener('click', function(event) {
  const isClickInside = closeBurgerMenu.contains(event.target) || burgerBtn.contains(event.target);
  
  if (!isClickInside) {
    closeBurgerMenu.classList.remove('active');
    burgerBtn.classList.remove('rotate');
    closeBurgerMenu.classList.remove('hidden-pets');
    body.classList.remove('lock-scroll');
    overlay.style.display = 'none'; // hide overlay
  }
});
overlay.addEventListener('click', function() {
  closeBurgerMenu.classList.remove('active');
  /* closeBurgerMenu.classList.remove('hidden-burger'); */
  burgerBtn.classList.remove('active');
  closeBurgerMenu.classList.remove('hidden-pets');
  body.classList.remove('lock-scroll');
  overlay.style.display = 'none'; // hide overlay
});
navLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    closeBurgerMenu.classList.remove('active');
    closeBurgerMenu.classList.remove('hidden-pets');
    burgerBtn.classList.remove('rotate'); /// return the button to its initial state
    body.classList.remove('lock-scroll'); // return the ability to scroll
    overlay.style.display = 'none';
  });
});