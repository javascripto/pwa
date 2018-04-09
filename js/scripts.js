let notes = window.localStorage.getItem('notes') || '{"data": []}';
notes = JSON.parse(notes);

let updateList = function() {
    console.log('[Application] start watch');
    Array.observe(notes.data, function(changes) {
        let index = null;
        let value = '';
        let status = null;
        // console.log(changes);
        if (changes[0].type == 'splice') {
            index = changes[0].index;
            value = changes[0].object[index];
            status = changes[0].addedCount > 0 ? 'created' : 'removed';
        }
        if (changes[0].type == 'update') {
            index = changes[0].name;
            value = changes[0].object[index];
            status = 'update';
        }
        if (!value && status === 'created' && status === 'updated') {
            return;
        }
        let notesTag = document.getElementById('notes');
        if (status === 'updated') {
            console.log('implementar');
        }
        if (status === 'removed') {
            let listOfNotes = document.querySelectorAll('#notes li');
            notesTag.removeChild(listOfNotes[index]);
        }
        if (status === 'created') {
            let newLi = document.createElement('li');
            newLi.innerHTML = value;
            notesTag.appendChild(newLi);
        }
        window.localStorage.setItem('notes', JSON.stringify(notes));
    });
};

let createNote = function() {
    let input = document.querySelector('#form-add-note input[type="text"]');
    let value = input.value;
    notes.data.push(value);
    input.value = "";
};

updateList();

document.addEventListener('DOMContentLoaded', function(event) {
    var items = notes.data.map(note => `<li>${note}</li>`).join('');
    document.querySelector('#notes').innerHTML = items;

    document.querySelector('#form-add-note')
    .addEventListener('submit', function(e){
        e.preventDefault();
        createNote();
    });
});

document.addEventListener('click', function(e){
    let notesTag = document.querySelector('#notes');
    if(e.target.parentElement == notesTag &&) {
        if (confirm('Remover esta nota?')) {
            let listOfNotes = document.querySelectorAll('#notes li');
            listOfNotes.forEach(function(item, index){
                if(e.target === item)
                    notes.data.splice(index, 1); // importante
            });
        }
    }
});

if('serviceWorker' in navigator)
    navigator.serviceWorker.register('./service-worker.js')
    .then(reg  => console.log("service Worker Registered!"))
    .catch(err => console.log("Erro:", err));
