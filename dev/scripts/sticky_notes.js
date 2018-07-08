(function () {

	var stickyPackElement = document.getElementById('izi-stickyPack');
	var activeStickyNotes = []; // An array that will contain all the sticky notes' DOM elements.

	var notePackData = []; // Contains the data of every created note. For use with local storage to rebuild state.

	if (localStorage.getItem('notePackData')) {
		notePackData = JSON.parse(localStorage.getItem('notePackData'));

		for (var i = 0; i < notePackData.length; i++) {
			var noteElement = createStickyNote(notePackData[i]);
			addNoteElementToDom(noteElement);
			console.log('created ' + (i+1) + ' sticky notes..');
		}
	}

	
	var createStickyNoteElement = document.getElementsByClassName('izi-sticky-pack__create')[0];

	function handleDrag(event) {

		var newX = this.startX - event.clientX;
		var newY = this.startY - event.clientY;
		this.style.left = (this.offsetLeft - newX) + 'px';
		this.style.top = (this.offsetTop - newY) + 'px';
		this.startX = event.clientX;
		this.startY = event.clientY;	
	}

	function handleNoteMouseDown(event) {
		event.preventDefault();

		var note = this;

		note.parentElement.appendChild(note);

		var noteEditBtn = note.getElementsByClassName('izi-sticky-pack__note-edit')[0];
		var notePinBtn = note.getElementsByClassName('izi-sticky-pack__note-pin')[0];
		var closeBtn = note.getElementsByClassName('izi-sticky-pack__note-close')[0];

		if (event.target !== noteEditBtn && event.target !== notePinBtn && event.target !== closeBtn) {

			note.style.transition = 'transform .1s ease';
			note.style.transform = 'rotate(0deg) scale(1.05)';
			note.style.boxShadow = '0px 0px 5px rgba(0,0,0,0.6)';
			note.style.cursor = 'grabbing';

			note.startX = event.clientX;
			note.startY = event.clientY;
			note.addEventListener('mousemove', handleDrag, false);
		}
	}

	function handleNoteMouseUp(event) {

		event.preventDefault();

		var note = this;

		var noteEditBtn = note.getElementsByClassName('izi-sticky-pack__note-edit')[0];
		var notePinBtn = note.getElementsByClassName('izi-sticky-pack__note-pin')[0];
		var closeBtn = note.getElementsByClassName('izi-sticky-pack__note-close')[0];

		if (event.target !== noteEditBtn && event.target !== notePinBtn && event.target !== closeBtn) {

			var randNum = Math.floor((Math.random() * 10) - 5);
			var transformDegree = randNum < 0 ? randNum - 5 : randNum + 5;

			

			note.style.transition = 'transform .1s ease';
			note.style.transform = 'rotate(' + transformDegree + 'deg)';
			note.style.boxShadow = '0px 4px 7px -3px rgba(0,0,0,0.8)';
			note.style.cursor = 'grab';

			note.noteData.left = note.style.left;
			note.noteData.top = note.style.top;
			note.removeEventListener('mousemove', handleDrag, false);

			updatePackData(note);
			console.log(notePackData);
		}
	}

	function handleKeyDownOnText(event) {
		if (this.textContent.length > 170 && 
			event.keyCode !== 8 && 
			event.keyCode !== 46 &&
			event.keyCode !== 16 &&
			(event.keyCode < 37 || event.keyCode > 40)) {

			event.preventDefault();
		}
		else if (event.keyCode < 37 || event.keyCode > 40) {
			
			var text = this;
			var note = text.parentElement;

			setTimeout(function(){
				note.noteData.content = text.textContent;
				console.log(text.parentElement.noteData.content);
			}, 0);	

			updatePackData(note);
			console.log(notePackData);
		}
	}

	function handleEditBtnClick(event) {
		event.preventDefault();

		this.classList.toggle('izi-sticky-pack__note-edit--editing');


		var note = this.parentElement;
		var noteTextP = note.getElementsByClassName('izi-sticky-pack__note-text')[0];

		if (noteTextP.getAttribute('contenteditable') === 'false') {
			noteTextP.setAttribute('contenteditable', 'true');
			noteTextP.focus();

			note.style.cursor = 'text';

			note.removeEventListener('mousedown', handleNoteMouseDown, false);
			note.removeEventListener('mouseup', handleNoteMouseUp, false);
		}
		else {
			noteTextP.setAttribute('contenteditable', 'false');
			note.style.cursor = 'grab';

			note.addEventListener('mousedown', handleNoteMouseDown, false);
			note.addEventListener('mouseup', handleNoteMouseUp, false);
		}	
	}

	function handlePinBtnClick(event) {
		event.preventDefault();

		this.classList.toggle('izi-sticky-pack__note-pin--pinned');

		var note = this.parentElement;
		var noteOffset = note.getBoundingClientRect();



		if (note.noteData.isFixed) {
			note.style.position = 'absolute';
			note.style.top = (window.scrollY + noteOffset.top) + 'px';
			note.style.zIndex = 1;

			note.noteData.isFixed = false;
			note.noteData.left = note.style.left;
			note.noteData.top = note.style.top;
		}
		else {
			note.style.position = 'fixed';
			note.style.top = noteOffset.top + 'px';
			note.style.zIndex = 2;
		
			note.noteData.isFixed = true;
			note.noteData.left = note.style.left;
			note.noteData.top = note.style.top;
		}

		updatePackData(note);
		console.log(notePackData);
	}

	function handleCloseBtnClick(event) {

		event.preventDefault();

		if (confirm('Are you sure you want to delete this note?')) {
				
			var note = this.parentElement;
			var editBtn = note.getElementsByClassName('izi-sticky-pack__note-edit')[0];
			var pinBtn = note.getElementsByClassName('izi-sticky-pack__note-pin')[0];
			var text = note.getElementsByClassName('izi-sticky-pack__note-text')[0];

			// Remove all event listeners.
			note.removeEventListener('mousedown', handleNoteMouseDown, false);
			note.removeEventListener('mouseup', handleNoteMouseUp, false);

			editBtn.removeEventListener('click', handleEditBtnClick, false);

			pinBtn.removeEventListener('click', handlePinBtnClick, false);

			text.removeEventListener('keydown', handleKeyDownOnText, false);

			this.removeEventListener('click', handleCloseBtnClick, false);

			// Remove note data object
			notePackData[notePackData.indexOf(note.noteData)] = null;
			
			// Remove note Element from the DOM.
			note.remove();

		}
		else {
			console.log(notePackData);
		}
	}

	function createStickyNote(newNote) {

		console.log('woob');

		var noteText 		= document.createTextNode(newNote.content);
		var newNoteElement 	= document.createElement('div');
		var notePinBtn 		= document.createElement('button');
		var noteEditBtn 	= document.createElement('button');
		var closeBtn 		= document.createElement('button');
		var noteTextP 		= document.createElement('p');
		var pinIcon 		= document.createElement('span');
		var editIcon 		= document.createElement('span');
		var closeIcon 		= document.createElement('span');

		newNoteElement.noteData = newNote;

		noteTextP.appendChild(noteText);

		noteTextP.classList.add('izi-sticky-pack__note-text');
		noteTextP.setAttribute('contenteditable', 'false');

		noteTextP.addEventListener('keydown', handleKeyDownOnText, false);

		pinIcon.classList.add('fa');
		pinIcon.classList.add('fa-thumb-tack');

		notePinBtn.appendChild(pinIcon);

		notePinBtn.classList.add('izi-sticky-pack__note-pin');

		notePinBtn.addEventListener('click', handlePinBtnClick, false);

		editIcon.classList.add('fa');
		editIcon.classList.add('fa-pencil');

		noteEditBtn.appendChild(editIcon);

		noteEditBtn.classList.add('izi-sticky-pack__note-edit');

		noteEditBtn.addEventListener('click', handleEditBtnClick, false);

		closeBtn.classList.add('izi-sticky-pack__note-close');
		closeIcon.classList.add('fa');
		closeIcon.classList.add('fa-times');
		closeBtn.appendChild(closeIcon);

		closeBtn.addEventListener('click', handleCloseBtnClick, false);
		
		
		newNoteElement.classList.add('izi-sticky-pack__note');

		switch (newNote.color) {
			case 1:
				newNoteElement.classList.add('izi-sticky-pack__note--green');
				break;
			case 2: 
				newNoteElement.classList.add('izi-sticky-pack__note--yellow');
				break;
			case 3:
				newNoteElement.classList.add('izi-sticky-pack__note--pink');
				break;
		}

		if (!newNote.isFixed) {
			newNoteElement.style.position = 'absolute';
			newNoteElement.style.zIndex = '1';
			notePinBtn.classList.add('izi-sticky-pack__note-pin--pinned');
		}
		
		newNoteElement.style.top = newNote.top;
		newNoteElement.style.left = newNote.left;

		newNoteElement.appendChild(noteTextP);
		newNoteElement.appendChild(noteEditBtn);
		newNoteElement.appendChild(notePinBtn);
		newNoteElement.appendChild(closeBtn);

		newNoteElement.addEventListener('mousedown', handleNoteMouseDown, false);

		newNoteElement.addEventListener('mouseup', handleNoteMouseUp, false);

		activeStickyNotes.push(newNoteElement);

		return newNoteElement;
	}

	// Updates the attributes of a given note in the notePackData array every time a note is modified.
	function updatePackData(note) {
		notePackData[note.noteData.id - 1] = note.noteData;

		//TODO: Save the notePackData object to the localStorage
		localStorage.setItem('notePackData', JSON.stringify(notePackData));
	}

	function addNoteElementToDom(noteElement) {
		var transformDegree = Math.floor((Math.random() * 12) - 6);
		noteElement.style.transform = 'rotate(' + transformDegree + 'deg)';
		document.body.appendChild(noteElement);
	}

	createStickyNoteElement.addEventListener('click', function(e) {

		var randPosX = Math.floor((Math.random() * 40) + 20) + '%';
		var randPosY = Math.floor((Math.random() * 40) + 20) + '%';

		var newNote = {
			id: notePackData.length + 1,
			isFixed: true,
			left: randPosX,
			color: Math.floor((Math.random() * 3) + 1),
			top: randPosY,
			content: 'Click the edit button to write something.'
		};


		notePackData.push(newNote);
		console.log(notePackData);

		localStorage.setItem('notePackData', JSON.stringify(notePackData));

		var newNoteElement = createStickyNote(newNote);

		addNoteElementToDom(newNoteElement);
		
	});
})();