const navbuttons = document.querySelectorAll(".navbar a");
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
