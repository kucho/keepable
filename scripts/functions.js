COLORS = [
  {
    color: "#FFFFFF",
    shadow: true,
  },
  {
    color: "#F28B82",
  },
  {
    color: "#FBBC04",
  },
  {
    color: "#FFF475",
  },
  {
    color: "#CCFF90",
  },
  {
    color: "#A7FFEB",
  },
  {
    color: "#CBF0F8",
  },
  {
    color: "#AECBFA",
  },
  {
    color: "#D7AEFB",
  },
  {
    color: "#FDCFE8",
  },
];

/** ** Starts Marvin *** */

/** ** Ends Marvin *** */

/** ** Starts Victor *** */
function checkAnyNote() {
  const notes = document.querySelectorAll(".note");
  const placeholder = document.querySelector(".notes-placeholder");
  if (notes === null) {
    placeholder.classList.remove("hide");
  } else {
    placeholder.classList.add("hide");
  }
}

function changeNoteColor(note, color) {
  // Change the color in HTML
  note.style.backgroundColor = color;
  // Adds the color variable
  note.dataset.color = color;
}

// Palette => <a role="button"></a>
function toggleColorPicker(palette) {
  const colorPicker = palette.parentNode.querySelector(".color-picker");
  console.log(colorPicker);
  if (colorPicker.classList.contains("flex")) {
    colorPicker.classList.remove("flex");
  } else {
    colorPicker.classList.add("flex");
  }
}

function createColorPicker() {
  const colorPicker = document.createElement("div");
  colorPicker.classList.add("color-picker");
  COLORS.forEach((colorObj) => {
    const colorBall = document.createElement("div");
    colorBall.classList.add("color-ball");
    if (colorObj.shadow) {
      colorBall.classList.add("color-ball--shadow");
    }
    colorBall.dataset.color = colorObj.color;
    colorBall.style.backgroundColor = colorObj.color;
    colorPicker.append(colorBall);
  });
  return colorPicker;
}

function createPalette(target, container) {
  target.append(createColorPicker());
  const colorBalls = container.querySelectorAll(".color-ball");
  const palette = container.querySelector(".palette");
  for (const ball of colorBalls) {
    ball.addEventListener("click", () => {
      changeNoteColor(container, ball.dataset.color);
      toggleColorPicker(palette);
    });
  }
  palette.addEventListener("click", () => {
    toggleColorPicker(palette);
  });
}

/** ** Ends Victor *** */

/** ** Starts Zamir *** */
function insertNote() {
  const formColor = document.querySelector(".notes-form").dataset.color;
  const inputText = document.querySelector(".notes-form__textarea");
  const article = document.createElement("article");
  article.classList.add("note");
  article.innerHTML = `
  <div class="note__content">
    <h1 class="note__title">2gfa</h1>
    <p class="note__description">
      ${inputText.value}
    </p>
  </div>
  <div class="note__actions">
    <button class="palette note__icon">
      <img
        src="assets/palette.svg"
        alt=""
        class="note__action fill-gray"
      />
    </button>
    <button class="delete-icon note__icon">
      <img
        src="assets/trash.svg"
        alt=""
        class="note__action fill-gray"
      />
    </button>
  </div>`;
  article.style.backgroundColor = formColor;
  const noteActions = article.querySelector(".note__actions");
  createPalette(noteActions, article);
  document.querySelector(".others").prepend(article);
  checkAnyNote();
}
/** ** Ends Zamir *** */

/** ** Starts General *** */
window.onload = () => {
  const formButton = document.querySelector(".notes-form__btn");
  formButton.addEventListener("click", () => {
    insertNote();
  });

  const notesForm = document.querySelector(".notes-form");
  const noteActions = notesForm.querySelector(".notes-form__actions");
  createPalette(noteActions, notesForm);
};
/** ** Ends General *** */
