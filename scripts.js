let noteId=1;

function createStickyNote(){
    const noteContainer=document.getElementById('note-container');

    const stickyNote=document.createElement('div');
    stickyNote.className='sticky-note';
    stickyNote.id='note'+noteId;

    const closeButton=document.createElement('span');
    closeButton.className='close-button';
    closeButton.innerHTML='&times;';
    closeButton.onclick=function(){
        noteContainer.removeChild(stickyNote);
        saveNotes();
    }

    const noteContent=document.createElement('div');
    noteContent.contentEditable=true;
    noteContent.className='note-content';
    noteContent.innerHTML='Click to Edit';

    noteContent.addEventListener('click',function(){
        noteContent.innerHTML='';
    });

    stickyNote.appendChild(closeButton);
    stickyNote.appendChild(noteContent);
    noteContainer.appendChild(stickyNote);

    applyRandomColor(stickyNote);
    loadNotes();
    noteId++;

}
function applyRandomColor(note){
    const colors = ['#FFCC00', '#FF6666', '#66CCCC', '#CC99FF', '#99FF99'];
    const randomColor=colors[Math.floor(Math.random()*colors.length)];
    note.style.backgroundColor=randomColor;
}
function saveNotes(){
    const notes=document.querySelectorAll('.sticky-note');
    const savedNotes=[];

    notes.forEach((note)=>{
        savedNotes.push({
            id:note.id,
            content:note.querySelector('.note-content').innerHTML,
            
        });
    });
    localStorage.setItem('stickyNotes',JSON.stringify(savedNotes));
}

function loadNotes(){
    const savedNotes=JSON.parse(localStorage.getItem('stickyNotes'))||[];

    saveNotes.forEach((note)=>{
        const existingNote=document.getElementById(note.id);

        if(existingNote){
            existingNote.querySelector('.note-content').innerHTML=note.content;
            existingNote.style.backgroundColor=note.color;
        }
        else{
            const noteContainer=document.getElementById('note-container');
            const newNote=document.createElement('div');
            newNote.className='sticky-note';
            newNote.id=note.id;
            newNote.style.backgroundColor=note.color;

            const closeButton=document.createElement('span');
            closeButton.className='close-button';
            closeButton.innerHTML='&times';
            closeButton.onclick=function(){
                noteContainer.removeChild(newNote);
                saveNotes();
            };

            const noteContent=document.createElement('div');
            noteContent.contentEditable=true;
            noteContent.className='note-content';
            noteContent.innerHTML=note.content;

            newNote.appendChild(closeButton);
            newNote.appendChild(noteContent);
            noteContainer.appendChild(newNote);
        }
    })
}