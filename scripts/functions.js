COLORS = [
  {
    color: '#FFFFFF',
    shadow: true,
  },
  {
    color: '#F28B82',
  },
  {
    color: '#FBBC04',
  },
  {
    color: '#FFF475',
  },
  {
    color: '#CCFF90',
  },
  {
    color: '#A7FFEB',
  },
  {
    color: '#CBF0F8',
  },
  {
    color: '#AECBFA',
  },
  {
    color: '#D7AEFB',
  },
  {
    color: '#FDCFE8',
  },
];

/** ** Starts Marvin *** */

/** ** Ends Marvin *** */

/** ** Starts Victor *** */
function checkAnyNote() {
  const notes = document.querySelectorAll('.note');
  const placeholder = document.querySelector('.notes-placeholder');
  if (notes === null) {
    placeholder.classList.remove('hide');
  } else {
    placeholder.classList.add('hide');
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
  const colorPicker = palette.parentNode.querySelector('.color-picker');
  if (colorPicker.classList.contains('hide')) {
    colorPicker.classList.remove('hide');
  } else {
    colorPicker.classList.add('hide');
  }
}

function createColorPicker() {
  const colorPicker = document.createElement('div');
  colorPicker.className = 'color-picker hide';
  COLORS.forEach(colorObj => {
    const colorBall = document.createElement('div');
    colorBall.classList.add('color-ball');
    if (colorObj.shadow) {
      colorBall.classList.add('color-ball--shadow');
    }
    colorBall.dataset.color = colorObj.color;
    colorBall.style.backgroundColor = colorObj.color;
    colorPicker.append(colorBall);
  });
  return colorPicker;
}

function createPalette(target, container) {
  target.append(createColorPicker());
  const colorBalls = container.querySelectorAll('.color-ball');
  const palette = container.querySelector('.palette');
  for (const ball of colorBalls) {
    ball.addEventListener('click', () => {
      changeNoteColor(container, ball.dataset.color);
      toggleColorPicker(palette);
    });
  }
  palette.addEventListener('click', () => {
    toggleColorPicker(palette);
  });
}

/** ** Ends Victor *** */

/** ** Starts Zamir *** */
function insertNote() {
  const formColor = document.querySelector('.notes-form').dataset.color;
  const inputText = document.querySelector('.notes-form__textarea');
  const article = document.createElement('article');
  article.classList.add('note');
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
    <button class="hard-delete-icon note__icon hide">
      <img
        src="assets/trash.svg"
        alt=""
        class="note__action fill-gray"
      />
    </button>
    <button class="restore-icon note__icon hide">
      <img
        src="assets/undo.svg"
        alt=""
        class="note__action fill-gray"
      />
    </button>
  </div>`;
  article.style.backgroundColor = formColor;
  const noteActions = article.querySelector('.note__actions');
  createPalette(noteActions, article);
  // To delete a note:
  const deleteIcon = article.querySelector('.delete-icon');
  deleteIcon.addEventListener('click', () => softDeleteNote(article));

  const hardDelete = article.querySelector('.hard-delete-icon');
  hardDelete.addEventListener('click', () => {
    hardDleteNote(article);
  });

  const restoreIcon = article.querySelector('.restore-icon');
  restoreIcon.addEventListener('click', () => {
    restoreNote(article)
  });

  document.querySelector('.others').prepend(article);
  checkAnyNote();
}

function hardDleteNote(note) {
  note.parentNode.removeChild(note);
}

function restoreNote(note) {
  note.parentNode.removeChild(note);
  const others = document.querySelector('.others');
  const palette = note.querySelector('.palette')
  palette.classList.remove('hide');
  const deleteIcon = note.querySelector('.delete-icon');
  deleteIcon.classList.remove('hide');
  const hardDelete = note.querySelector('.hard-delete-icon');
  hardDelete.classList.add('hide');
  const restoreIcon = note.querySelector('.restore-icon');
  restoreIcon.classList.add('hide');
  others.prepend(note);
}

function softDeleteNote(note) {
  note.parentNode.removeChild(note);
  const trash = document.querySelector('.trash');
  const palette = note.querySelector('.palette')
  palette.classList.add('hide');
  const deleteIcon = note.querySelector('.delete-icon');
  deleteIcon.classList.add('hide');
  const hardDelete = note.querySelector('.hard-delete-icon');
  hardDelete.classList.remove('hide');
  const restoreIcon = note.querySelector('.restore-icon');
  restoreIcon.classList.remove('hide');
  trash.prepend(note);
}

function toggleSections(section) {
  if (section.classList.contains('hide')) {
    section.classList.remove('hide');
  } else {
    section.classList.add('hide');
  }
}
/** ** Ends Zamir *** */

/** ** Starts General *** */
window.onload = () => {
  const formButton = document.querySelector('.notes-form__btn');
  formButton.addEventListener('click', () => {
    insertNote();
  });

  const notesForm = document.querySelector('.notes-form');
  const noteActions = notesForm.querySelector('.notes-form__actions');
  createPalette(noteActions, notesForm);

  const goToNotes = document.querySelector('.go-to--notes');
  const goToTrash = document.querySelector('.go-to--trash');
  goToTrash.addEventListener('click', function () {
    toggleSections(document.querySelector('.trash'));
    this.parentNode.classList.toggle('active');
    goToNotes.parentNode.classList.toggle('active');
    toggleSections(document.querySelector('.notes-zone'));
    notesForm.classList.toggle('hide');
  });
  goToNotes.addEventListener('click', function () {
    toggleSections(document.querySelector('.trash'));
    this.parentNode.classList.toggle('active');
    goToTrash.parentNode.classList.toggle('active');
    toggleSections(document.querySelector('.notes-zone'));
    notesForm.classList.toggle('hide');
  });
};
/** ** Ends General *** */
