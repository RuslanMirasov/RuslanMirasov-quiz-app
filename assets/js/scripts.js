const preloader = document.querySelector(".preloader");
const main = document.querySelector(".main");
const themaSwitcherEl = document.querySelector("#thema-switcher");
const cardsEl = document.querySelector(".js-cards");

const changeThema = (e) => {
  const thema = e.target.checked ? "dark" : "light";
  document.body.dataset.thema = thema;
  localStorage.setItem("thema", thema);
};

const themaInit = () => {
  const currentThema = localStorage.getItem("thema") ?? "light";
  document.body.dataset.thema = currentThema;
  if (themaSwitcherEl) {
    themaSwitcherEl.checked = currentThema === "dark";
  }
};

themaInit();

const handleCardsClick = (e) => {
  const target = e.target;

  if (target.classList.contains("button")) {
    target.closest(".card").classList.toggle("hidden");
  } else if (target.classList.contains("add-to-bookmark")) {
    target.classList.toggle("active");
  }
};

if (cardsEl) {
  cardsEl.addEventListener("click", handleCardsClick);
}

if (themaSwitcherEl) {
  themaSwitcherEl.addEventListener("change", changeThema);
}

const hidePreloader = () => {
  preloader.classList.add("hidden");
  setTimeout(() => {
    main.classList.add("visible");
  }, 300);
};

window.addEventListener("load", function () {
  setTimeout(() => {
    hidePreloader();
  }, 250);
});
