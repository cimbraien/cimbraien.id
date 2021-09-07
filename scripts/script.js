const navbuttons = document.querySelectorAll(".navbar-items .sections");
let activeindex = 0;

for (let i = 0; i < navbuttons.length; i++) {
  const button = navbuttons[i];
  button.index = i;
  button.addEventListener("click", () => {
    if (button.classList.contains("nav-active")) return;
    navbuttons[activeindex].classList.remove("nav-active");
    button.classList.add("nav-active");
    activeindex = button.index;
  });
}

const body = document.querySelector("body");
const contents = document.querySelector(".contents");
const indev = document.querySelector(".indev");
indev.addEventListener("click", () => {
  indev.style.opacity = 0;
  contents.style.opacity = 1;
  setTimeout(() => {
    indev.style.display = "none";
    body.classList.remove("no-scroll");
  }, 1500);
});
