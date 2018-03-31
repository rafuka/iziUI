(function () {

	var stickyPackElement = document.getElementById('izi-stickyPack');
	var activeStickyNotes = []; // An array that will contain all the sticky notes' objects.

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

		this.parentElement.appendChild(this);

		var noteEditBtn = this.getElementsByClassName('izi-sticky-pack__note-edit')[0];
		var notePinBtn = this.getElementsByClassName('izi-sticky-pack__note-pin')[0];

		if (event.target !== noteEditBtn && event.target !== notePinBtn) {

			this.style.transition = 'transform .1s ease';
			this.style.transform = 'rotate(0deg) scale(1.05)';
			this.style.boxShadow = '0px 0px 5px rgba(0,0,0,0.6)';
			this.style.cursor = 'grabbing';

			this.startX = event.clientX;
			this.startY = event.clientY;
			this.addEventListener('mousemove', handleDrag, false);
		}
	}

	function handleNoteMouseUp(event) {

		event.preventDefault();

		var noteEditBtn = this.getElementsByClassName('izi-sticky-pack__note-edit')[0];
		var notePinBtn = this.getElementsByClassName('izi-sticky-pack__note-pin')[0];

		if (event.target !== noteEditBtn && event.target !== notePinBtn) {
			console.log('yawn');
			var randNum = Math.floor((Math.random() * 10) - 5);
			var transformDegree = randNum < 0 ? randNum - 5 : randNum + 5;

			this.style.transition = 'transform .1s ease';
			this.style.transform = 'rotate(' + transformDegree + 'deg)';
			this.style.boxShadow = '0px 4px 7px -3px rgba(0,0,0,0.8)';
			this.style.cursor = 'grab';

			this.removeEventListener('mousemove', handleDrag, false);
		}
	}

	function createStickyNote(posX, posY) {

		var newNote = {
			isFixed: true,
			left: posX,
			top: posY,
			content: 'Click the edit button to write something.'
		};

		var noteText = document.createTextNode(newNote.content);
		var newNoteElement = document.createElement('div');
		var notePinBtn = document.createElement('button');
		var noteEditBtn = document.createElement('button');
		var noteTextP = document.createElement('p');
		var pinIcon = document.createElement('span');
		var editIcon = document.createElement('span');



		noteTextP.appendChild(noteText);

		noteTextP.classList.add('izi-sticky-pack__note-text');
		noteTextP.setAttribute('contenteditable', 'false');

		pinIcon.classList.add('fa');
		pinIcon.classList.add('fa-thumb-tack');

		notePinBtn.appendChild(pinIcon);

		notePinBtn.classList.add('izi-sticky-pack__note-pin');

		notePinBtn.addEventListener('click', function(e) {

			e.preventDefault();

			this.classList.toggle('izi-sticky-pack__note-pin--pinned');

			var noteOffset = newNoteElement.getBoundingClientRect();

			if (newNote.isFixed) {
				newNoteElement.style.position = 'absolute';
				newNoteElement.style.top = (window.scrollY + noteOffset.top) + 'px';
				newNoteElement.style.zIndex = 1;

				newNote.isFixed = false;
				newNote.posX = newNoteElement.style.left;
				newNote.posY = newNoteElement.style.top;
			}
			else {
				newNoteElement.style.position = 'fixed';
				newNoteElement.style.top = noteOffset.top + 'px';
				newNoteElement.style.zIndex = 2;

				newNote.isFixed = true;
				newNote.posX = newNoteElement.style.left;
				newNote.posY = newNoteElement.style.top;
			}
		});

		editIcon.classList.add('fa');
		editIcon.classList.add('fa-pencil');

		noteEditBtn.appendChild(editIcon);

		noteEditBtn.classList.add('izi-sticky-pack__note-edit');

		noteEditBtn.addEventListener('click', function(e) {

			e.preventDefault();

			this.classList.toggle('izi-sticky-pack__note-edit--editing');

			if (noteTextP.getAttribute('contenteditable') === 'false') {
				noteTextP.setAttribute('contenteditable', 'true');
				noteTextP.focus();

				newNoteElement.style.cursor = 'text';
			}
			else {
				noteTextP.setAttribute('contenteditable', 'false');
				newNoteElement.style.cursor = 'grab';
			}	
		});

		
		
		newNoteElement.classList.add('izi-sticky-pack__note');
		newNoteElement.classList.add('dragging');

		switch (Math.floor((Math.random() * 3) + 1)) {
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
		
		newNoteElement.style.top = newNote.top;
		newNoteElement.style.left = newNote.left;

		newNoteElement.appendChild(noteTextP);
		newNoteElement.appendChild(noteEditBtn);
		newNoteElement.appendChild(notePinBtn);

		newNoteElement.addEventListener('mousedown', handleNoteMouseDown, false);

		newNoteElement.addEventListener('mouseup', handleNoteMouseUp, false);

		activeStickyNotes.push(newNoteElement);

		return newNoteElement;
	}

	createStickyNoteElement.addEventListener('click', function(e) {

		var randPosX = Math.floor((Math.random() * 40) + 20) + '%';
		var randPosY = Math.floor((Math.random() * 40) + 20) + '%';

		var newNoteElement = createStickyNote(randPosX, randPosY);

		var transformDegree = Math.floor((Math.random() * 12) - 6);

		newNoteElement.style.transform = 'rotate(' + transformDegree + 'deg)';

		document.body.appendChild(newNoteElement);


	});

	

	

	
})();