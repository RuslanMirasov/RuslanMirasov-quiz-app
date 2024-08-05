const refs = {
  body: document.querySelector(".body"),
  navLinks: document.querySelectorAll(".js-nav-link"),
  themeSwitcher: document.querySelector("#theme-switcher"),
  cards: document.querySelector(".cards"),
};

// Set active link to menu
const setActiveMenuLink = () => {
  const pageUrl = window.location.href.split("/").pop();

  if (!pageUrl) {
    refs.navLinks[0].parentNode.classList.add("active");
    return;
  }

  refs.navLinks.forEach((link) => {
    const linkHref = link.href;
    if (linkHref.includes(pageUrl)) {
      link.parentNode.classList.add("active");
      return;
    }
  });
};

// Theme switcher functions
const switchThema = (e) => {
  const newTheme = e.target.checked ? "dark" : "light";
  refs.body.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);
};

const themeInit = () => {
  const savedTheme = localStorage.getItem("theme");
  const currentTheme = savedTheme || "light";
  localStorage.setItem("theme", currentTheme);
  refs.body.dataset.theme = currentTheme;
  if (refs.themeSwitcher) {
    refs.themeSwitcher.checked = currentTheme === "dark";
    refs.themeSwitcher.addEventListener("change", switchThema);
  }
};

// Flip cards functions
const flipCard = (e) => {
  const target = e.target;

  if (
    !target.classList.contains("button") &&
    !target.classList.contains("add-to-bookmark")
  )
    return;

  console.log(target);
  if (target.classList.contains("add-to-bookmark")) {
    target.classList.toggle("add-to-bookmark--active");
    return;
  }

  const card = target.closest(".card");
  if (target.classList.contains("js-card-show")) {
    card.classList.add("active");
    return;
  }
  card.classList.remove("active");
};

const flipCardInit = () => {
  if (refs.cards) {
    refs.cards.addEventListener("click", flipCard);
  }
};

themeInit();
setActiveMenuLink();
flipCardInit();
