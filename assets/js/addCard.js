const inputs = document.querySelectorAll(".input");
const form = document.querySelector('[data-js="form"]');
const cards = document.querySelector(".js-cards");
const infoEl = document.querySelector('[data-js="info"]');

const countCharacters = (e) => {
  const max = 150;
  const textarea = e.target;
  const counterEl = textarea
    .closest("label")
    .querySelector('[data-js="counter"]');
  if (counterEl) {
    const inputSymbols = textarea.value.length;
    const symbolsLeft = max - Number(inputSymbols);
    counterEl.innerHTML = symbolsLeft;
  }
};

const handleInputFocus = (e) => {
  const input = e.target;
  input.classList.remove("invalid");
  infoEl.style.height = "0px";
};

for (let i = 0; i < inputs.length; i += 1) {
  inputs[i].addEventListener("input", countCharacters);
  inputs[i].addEventListener("focus", handleInputFocus);
}

const showInfoContainer = () => {
  infoEl.style.height = infoEl.scrollHeight + "px";
};

const showConfirmMassege = () => {
  infoEl.setAttribute("data-status", "confirm");
  infoEl.innerHTML += `<li>&#128077; A new card has bin added!</li>`;
  infoEl.style.height = infoEl.scrollHeight + "px";
};

const showErrors = (error) => {
  infoEl.setAttribute("data-status", "error");
  infoEl.innerHTML += error;
  infoEl.style.height = infoEl.scrollHeight + "px";
};

const formValidation = (form) => {
  let checker = true;

  const data = form.elements;

  for (let i = 0; i < data.length; i += 1) {
    const isInput = data[i].classList.contains("input");
    if (isInput && !data[i].value) {
      checker = false;
      showErrors(`<li><b>${data[i].name}</b> field is required</li>`);
      data[i].classList.add("invalid");
    }
  }

  return checker;
};

const addNewCard = (e) => {
  e.preventDefault();
  infoEl.innerHTML = "";

  const form = e.target;
  const isFormValid = formValidation(form);

  if (!isFormValid) {
    return;
  }

  const data = new FormData(form);
  const formData = Object.fromEntries(data);
  const cardMarkup = `
            <li class="card">
              <article class="flip">
                <div class="flip__front">
                  <button class="add-to-bookmark">
                    <svg>
                      <use href="./assets/img/icons.svg#bookmark"></use>
                    </svg>
                  </button>
                  <h2 class="card__question">${formData.question}</h2>
                  <button class="button">
                    <span>Show Answer</span>
                  </button>
                  <ul class="categories">
                    <li>${formData.tag}</li>
                  </ul>
                </div>
                <div class="flip__back">
                  <p class="card__answer">${formData.answer}</p>
                  <button class="button">
                    <span>Hide Answer</span>
                  </button>
                </div>
              </article>
            </li>
   `;

  cards.innerHTML += cardMarkup;
  form.reset();
  showConfirmMassege();
};

form.addEventListener("submit", addNewCard);
