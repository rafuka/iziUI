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

		noteTextP.appendChild(noteText);

		noteTextP.classList.add('izi-sticky-pack__note-text');
		noteTextP.setAttribute('contenteditable', 'false');

		notePinBtn.classList.add('izi-sticky-pack__note-pin');

		notePinBtn.addEventListener('click', function() {

			var noteOffset = newNoteElement.getBoundingClientRect();

			if (newNote.isFixed) {
				newNoteElement.style.position = 'absolute';
				newNoteElement.style.top = (window.scrollY + noteOffset.top) + 'px';
				newNote.isFixed = false;
				newNote.posX = newNoteElement.style.left;
				newNote.posY = newNoteElement.style.top;
			}
			else {
				newNoteElement.style.position = 'fixed';
				newNoteElement.style.top = noteOffset.top + 'px';
				newNote.isFixed = true;
				newNote.posX = newNoteElement.style.left;
				newNote.posY = newNoteElement.style.top;
			}
		});

		noteEditBtn.classList.add('izi-sticky-pack__note-edit');

		noteEditBtn.addEventListener('click', function() {
			if (noteTextP.getAttribute('contenteditable') === 'false') {
				noteTextP.setAttribute('contenteditable', 'true');
				noteTextP.focus();
			}
			else {
				noteTextP.setAttribute('contenteditable', 'false');
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

		newNoteElement.addEventListener('mousedown', function(e) {

			console.log('testing');
			this.startX = e.clientX;
			this.startY = e.clientY;
			this.addEventListener('mousemove', handleDrag, false);

		}, false);

		newNoteElement.addEventListener('mouseup', function(e) {
				
			this.removeEventListener('mousemove', handleDrag, false);

		}, false);

		activeStickyNotes.push(newNoteElement);

		return newNoteElement;
	}

	createStickyNoteElement.addEventListener('click', function(e) {

		var newNoteElement = createStickyNote('100px', '100px');
		var transformDegree = Math.floor((Math.random() * 12) - 6);
		newNoteElement.style.transform = 'rotate(' + transformDegree + 'deg)';
		document.body.appendChild(newNoteElement);


	});

	

	// Check if there is empty space between the border of the draggable area and its parent.
	// In that case, move the area's border back to its initial position.
	function checkBorders(dragArea) {

		if (dragArea.offsetLeft > 0) {
			dragArea.style.transition = 'left .3s ease, top .3s ease';
			dragArea.style.left = '0px';
			setTimeout(function() {
				dragArea.style.transition = '';
			}, 300);
		}
		else if ((dragArea.offsetLeft + dragArea.offsetWidth) < dragArea.parentElement.offsetWidth) {
			dragArea.style.transition = 'left .3s ease, top .3s ease';
			dragArea.style.left = (dragArea.parentElement.offsetWidth - dragArea.offsetWidth) + 'px';
			setTimeout(function() {
				dragArea.style.transition = '';
			}, 300);
		}

		if (dragArea.offsetTop > 0) {
			dragArea.style.transition = 'left .3s ease, top .3s ease';
			dragArea.style.top = '0px';
			setTimeout(function() {
				dragArea.style.transition = '';
			}, 300);
		}
		else if ((dragArea.offsetTop + dragArea.offsetHeight) < dragArea.parentElement.offsetHeight) {
			dragArea.style.transition = 'left .3s ease, top .3s ease';
			dragArea.style.top = (dragArea.parentElement.offsetHeight - dragArea.offsetHeight) + 'px';
			setTimeout(function() {
				dragArea.style.transition = '';
			}, 300);
		}
	}

	function handleZoom(event) {
		
	}
/*	for (var i = 0; i < dAreas.length; i++) {

		(function(i) {

			dAreas[i].addEventListener('mousedown', function(e) {
				console.log('testing');
				this.startX = e.clientX;
				this.startY = e.clientY;
				this.addEventListener('mousemove', handleDrag, false);

			}, false);

			dAreas[i].addEventListener('mouseup', function(e) {
				
				this.removeEventListener('mousemove', handleDrag, false);
				checkBorders(this);

			}, false);

			dAreas[i].addEventListener('mouseleave', function(e) {
				
				this.removeEventListener('mousemove', handleDrag, false);
				checkBorders(this);

			}, false);

			dAreas[i].addEventListener('touchstart', function(e) {
				alert('testing');
			});

		})(i);
	}*/
})();