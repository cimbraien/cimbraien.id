// ! NAVBAR ACTIVE STATUS
const navbuttons = document.querySelectorAll(".navbar-items .sections");
let activeindex = 0;

const OFFSET_WEB = {
  about: -1,
  portfolio: 550,
  contact: 1520,
};

const OFFSET_MOBILE = {
  about: -1,
  portfolio: 830,
  contact: 2150,
};

const OFFSET = window.innerWidth <= 600 ? OFFSET_MOBILE : OFFSET_WEB;

window.addEventListener("scroll", () => {
  // console.log(window.pageYOffset);
  const sections = Object.keys(OFFSET);
  for (let i = 0; i < sections.length; i++) {
    if (window.pageYOffset > OFFSET[sections[i]]) {
      navbuttons[activeindex].classList.remove("nav-active");
      activeindex = i;
      navbuttons[activeindex].classList.add("nav-active");
    }
  }
});

// ! INDEV MESSAGE
/* const body = document.querySelector("body");
const contents = document.querySelector(".contents");
const indev = document.querySelector(".indev");
indev.addEventListener("click", () => {
  indev.style.opacity = 0;
  contents.style.opacity = 1;
  setTimeout(() => {
    indev.style.display = "none";
    body.classList.remove("no-scroll");
  }, 1500);
}); */

// ! PROJECT SLIDER
const arrowleft = document.querySelector(".fa-chevron-left");
arrowleft.addEventListener("click", clickLeft);
const arrowright = document.querySelector(".fa-chevron-right");
arrowright.addEventListener("click", clickRight);

let projectindex = 0;

const projectname = document.querySelector(".portfolio-projectname-text");
const desc = document.querySelector(".portfolio-projectdesc");
const link = document.querySelector(".portfolio-projectlink a");
const imageCaptions = document.querySelectorAll(".portfolio-image-text");
const imageUrls = document.querySelectorAll(".portfolio-image img");

function clickLeft() {
  if (projectindex == 0) projectindex = projects.length - 1;
  else {
    projectindex--;
  }
  renderProject();
}

function clickRight() {
  if (projectindex == projects.length - 1) projectindex = 0;
  else {
    projectindex++;
  }
  renderProject();
}

const fadeSection = document.querySelectorAll(".portfolio-fade");

function renderProject() {
  for (let i = 0; i < fadeSection.length; i++) {
    fadeSection[i].style.opacity = 0;
  }
  setTimeout(() => {
    const project = projects[projectindex];
    projectname.innerHTML = project.name;
    desc.innerHTML = project.desc;
    link.setAttribute("href", project.link);
    for (let i = 0; i < 3; i++) {
      imageCaptions[i].innerHTML = project.images[i].caption;
      imageUrls[i].setAttribute("src", project.images[i].url);
    }
  }, 250);

  setTimeout(() => {
    for (let i = 0; i < fadeSection.length; i++) {
      fadeSection[i].style.opacity = 1;
    }
  }, 250);
}

// ! Send contact form
const sendButton = document.querySelector("input[type='submit']");
const nameElement = document.querySelector("#contact-name");
const emailElement = document.querySelector("#contact-email");
const contentElement = document.querySelector("#contact-content");

document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
});

sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  const payload = {
    name: nameElement.value,
    email: emailElement.value,
    content: contentElement.value,
  };
  fetch("https://cimbraien.id/contact/", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      displaySuccess();
    });
});

function displaySuccess() {
  nameElement.value = "";
  emailElement.value = "";
  contentElement.value = "";
  const initialValues = [
    nameElement.getAttribute("placeholder"),
    emailElement.getAttribute("placeholder"),
    contentElement.getAttribute("placeholder"),
  ];
  nameElement.setAttribute("placeholder", "Message sent!");
  emailElement.setAttribute("placeholder", "Message sent!");
  contentElement.setAttribute("placeholder", "Message sent!");
  setTimeout(() => {
    nameElement.setAttribute("placeholder", initialValues[0]);
    emailElement.setAttribute("placeholder", initialValues[1]);
    contentElement.setAttribute("placeholder", initialValues[2]);
  }, 4000);
}
