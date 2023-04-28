const note = document.querySelector('.notes');
// const addBtn = document.querySelector('.plus');
const addBtn = document.getElementById('add');

addBtn.addEventListener('click', () => {
    createNote();
});
getNoteLS();

function createNote(val = '') {
    const newNote = document.createElement('div');
    newNote.classList.add('note'); 
    
    newNote.innerHTML = `
        <div class="tools">
            <button class="edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="check hidden">
                <i class="fas fa-circle-check"></i>
            </button>
            <button class="trash">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="note-info">
            <textarea class="hidden"></textarea>
            <div class="note-text"></div>
        </div>
    `;
    
    note.appendChild(newNote);

    const notesEl = newNote.querySelector('.note-info');

    const noteInput = notesEl.querySelector('textarea');
    const noteText = notesEl.querySelector('.note-text');

    noteInput.value = val;
    noteText.innerHTML = marked.parse(val);

    const checkBtn = newNote.querySelector('.check');
    checkBtn.addEventListener('click', () => {
        noteInput.classList.add('hidden');
        noteText.classList.remove('hidden');
    
        checkBtn.classList.add('hidden');
        editBtn.classList.remove('hidden');
    
        noteText.innerHTML = marked.parse(noteInput.value);

        setNoteLS();
    });
    
    const editBtn = newNote.querySelector('.edit');
    editBtn.addEventListener('click', () => {
        noteText.classList.add('hidden');
        noteInput.classList.remove('hidden');
    
        editBtn.classList.add('hidden');
        checkBtn.classList.remove('hidden');
    });

    const delBtn = newNote.querySelector('.trash');
    delBtn.addEventListener('click', () => {
        newNote.remove();

        setNoteLS();
    });
}

function setNoteLS() {
    const allNotes = document.querySelectorAll('textarea');

    const notes = [];

    allNotes.forEach(note => {
        notes.push(note = note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}

function getNoteLS() {
    const notes = JSON.parse(localStorage.getItem('notes'));

    if(notes) {
        notes.forEach(note => {
            createNote(note);
        });
    }
}