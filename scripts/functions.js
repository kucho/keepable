/** ** Starts Marvin *** */

/** ** Ends Marvin *** */

/** ** Starts Victor *** */

/** ** Ends Victor *** */

/** ** Starts Zamir *** */
let formButton;

function insertNote() {
  const inputText = document.querySelector('.notes-form__textarea');
  const article = document.createElement('article');
  article.classList.add('note');
  const note = `
  <div class="note__content">
    <h1 class="note__title">2gfa</h1>
    <div class="note__description">
      ${inputText.outerHTML}
    </div>
  </div>
  <div class="note__actions">
    <a href="#" role="button" class="note__icon">
      <img
        src="assets/palette.svg"
        alt=""
        class="note__action fill-gray"
      />
    </a>
    <a href="#" role="button" class="note__icon">
      <img
        src="assets/trash.svg"
        alt=""
        class="note__action fill-gray"
      />
    </a>
  </div>`;
  article.innerHTML = note;
  article.querySelector('.notes-form__textarea').value = inputText.value;
  document.querySelector('.others').append(article);
}

/** ** Ends Zamir *** */

/** ** Starts General *** */
window.onload = () => {
  formButton = document.querySelector('.notes-form__btn');
  formButton.addEventListener('click', () => {
    insertNote();
  });
};
/** ** Ends General *** */
