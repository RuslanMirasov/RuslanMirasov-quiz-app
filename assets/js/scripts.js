const refs = {
  body: document.querySelector(".body"),
  themeSwitcher: document.querySelector("#theme-switcher"),
  cards: document.querySelector(".cards"),
};

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

const flipCard = (e) => {
  const target = e.target;
  if (!target.classList.contains("button")) {
    return;
  }
  const card = target.closest(".card");
  if (target.classList.contains("js-card-show")) {
    card.classList.add("active");
    return;
  }
  card.classList.remove("active");
};

const flipCrdInit = () => {
  if (refs.cards) {
    refs.cards.addEventListener("click", flipCard);
  }
};

window.onload = () => {
  themeInit();
  flipCrdInit();
};
