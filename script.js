const addNoteButton = document.querySelector('.btn');

//  updating  list and local storage
const updateLst = () => {
    const textareaData = document.querySelectorAll('#textarea')
    const notes = [];
    textareaData.forEach((note) => {
        console.log(note);
        // by every time adding new note we just reload the page for loading new data
        return notes.push(note.value), window.document.location.reload();
    })
    console.log(notes)
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewnote = (text = '') => {
    const note = document.createElement('div');

    // for add class name dynamically in ('div')
    note.classList.add('note')

    // dynamic data for adding
    const htmlData = `<button id="edit" class="fa">&#xf044</button>
    <button id="delete" class="fa">&#xf00d</button>
    <div class="inner  ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}" id="textarea" cols="40" rows="10"></textarea>`;

    // adding Html dynamically / for adding htmldata in div (new and fast method)
    note.insertAdjacentHTML("afterbegin", htmlData);

    // getting refrence
    let main = document.querySelector('.main');
    let inner = note.querySelector('.inner');
    let Edit = note.querySelector("#edit");
    let delBtn = note.querySelector('#delete');
    let textArea = note.querySelector("#textarea");

    // adding Html dynamically
    main.insertAdjacentElement('beforeend', note)

    //delete or remove note functionality
    delBtn.addEventListener('click', () => {
        note.remove();
        updateLst();
    });

    // for adding text
    textArea.value = text;
    inner.innerHTML = text;

    // toggle useing edit button
    Edit.addEventListener('click', () => {
        textArea.classList.toggle('hidden');
        inner.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        updateLst();
    })
};

// getting data📁 from browser storage
const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
    notes.forEach((note) => {
        addNewnote(note)
    })
}

addNoteButton.addEventListener('click', () => { addNewnote() });
