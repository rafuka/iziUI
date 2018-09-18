(function() {

	var accordionsMultiple = document.getElementsByClassName('accordion--multiple');
	var accordionsSingle = document.getElementsByClassName('accordion--single');

	var tabs = document.getElementsByClassName('accordion__tab');
	var panels = document.getElementsByClassName('accordion__panel');

	// There should be the same number of tabs and panels
	for (var i = 0; i < panels.length; i++) {
		tabs[i].panel = panels[i];
		panels[i].tab = tabs[i];
		panels[i].panelHeight = panels[i].offsetHeight;
		panels[i].style.height = '0px';
		panels[i].expanded = false;
	}

	function toggle(tab) {
		if (tab.panel.expanded !== false) {
			tab.panel.style.height = '0px';
			tab.panel.expanded = false;
		}
		else {
			tab.panel.style.height = tab.panel.panelHeight + 'px';
			tab.panel.expanded = true;
		}
	}

	// Add event listeners to all multiple-panel accordions
	for (var i = 0; i < accordionsMultiple.length; i++) {
		(function(index) {
			accordionsMultiple[index].addEventListener('click', function(e) {
				if (e.target.classList.contains('accordion__tab')) {
					toggle(e.target);
				}
			});
		})(i);
	}

	// Add event listeners to all single-panel accordions
	for (var i = 0; i < accordionsSingle.length; i++) {
		(function(index) {
			accordionsSingle[index].addEventListener('click', function(e) {
				if (e.target.classList.contains('accordion__tab')) {
					for (var i = 0; i < this.children.length; i++) {
						var tab = this.children[i];
						if (tab.classList.contains('accordion__tab') && tab !== e.target) {
							if (tab.panel.expanded === true) {
								tab.panel.style.height = '0px';
								tab.panel.expanded = false;
							}
						}
					}
					toggle(e.target);
				}
			});
		})(i);
	}
})();


(function() {
	var cards = document.getElementsByClassName('card--hover-fx');
	var bodyRect = document.body.getBoundingClientRect();

	for (var i = 0; i < cards.length; i++) {
		(function() {
			cards[i].addEventListener('mousemove', function(e) {
				
				var card   = e.currentTarget.getBoundingClientRect();
				var cardX  = card.left - bodyRect.left;
				var cardY  = card.top - bodyRect.top;
				var mouseX = e.pageX - cardX;
				var mouseY = e.pageY - cardY;

				var angleX = ((mouseX * -2/card.width) + 1);
				var angleY = ((mouseY * -2/card.height) + 1);
				var shadowX = mouseX;
				var shadowY = mouseY;

				e.currentTarget.style.transform = 'rotate3d(' + angleX + ',' + angleY + ', 0, 10deg)';

			}, false);

			cards[i].addEventListener('mouseleave', function(e) {

				var card = e.currentTarget;

				card.style.boxShadow = '0px 0px 4px rgba(0,0,0,0.4)';
				card.style.transform = 'rotateX(0deg)';

			}, false);
		})();
	}
})();




(function() {
	var carousels = document.getElementsByClassName('carousel');

	for (var i = 0; i < carousels.length; i++) {
		(function(i) {
			var carousel = carousels[i];
			carousel.radios = carousel.getElementsByClassName('carousel__radio');
			carousel.slides = carousel.getElementsByClassName('carousel__slide');
			carousel.labels = carousel.getElementsByClassName('carousel__label');
			carousel.arrowRight = carousel.getElementsByClassName('carousel__arrow-right')[0];
			carousel.arrowLeft = carousel.getElementsByClassName('carousel__arrow-left')[0];

			// Set left and right arrows position based on their height.
			var arrowRightTopPos = (carousel.offsetHeight / 2) - (carousel.arrowRight.offsetHeight / 2);
			var arrowLeftTopPos = (carousel.offsetHeight / 2) - (carousel.arrowLeft.offsetHeight / 2);
			carousel.arrowRight.style.top = arrowRightTopPos + 'px';
			carousel.arrowLeft.style.top = arrowLeftTopPos + 'px';

			// Associate each radio button with its correspondant label and slide
			for (var j = 0; j < carousel.slides.length; j++) {
				carousel.labels[j].radio = document.getElementById(carousel.labels[j].getAttribute('for'));
				document.getElementById(carousel.labels[j].getAttribute('for')).label = carousel.labels[j];

				carousel.radios[j].slide = carousel.radios[j].nextElementSibling;

				carousel.slides[j].radio = carousel.slides[j].previousElementSibling;
			}

			// Add the selected state class to the label of the default selected radio.
			for (var j = 0; j < carousel.radios.length; j++) {
				var radio = carousel.radios[j];
				if (radio.checked) {
					radio.label.classList.add('carousel__label--selected');
				}
				else {
					radio.label.classList.remove('carousel__label--selected');
				}
			}

			// Add the selected state class to the label that corresponds with the checked radio btn.
			for (var j = 0; j < carousel.radios.length; j++) {
				(function(j){
					var radio = carousel.radios[j];

					radio.addEventListener('change', function(e) {

						for (var k = 0; k < carousel.labels.length; k++) {
							var label = carousel.labels[k];
							if (label.getAttribute('for') !== this.id) {
								label.classList.remove('carousel__label--selected');
							}
							else {
								label.classList.add('carousel__label--selected');
							}
						}
					});
				})(j);
			}

			// Change the slide when clicking on an arrow.
			carousel.arrowRight.addEventListener('click', function(e) {
				for (var i = 0; i < carousel.radios.length; i++) {
					var radio = carousel.radios[i];
					var nextRadio = carousel.radios[(i + 1) % carousel.radios.length];
					if (radio.checked) {
						nextRadio.checked = true;

						for (var k = 0; k < carousel.labels.length; k++) {
							var label = carousel.labels[k];
							if (label.getAttribute('for') !== nextRadio.id) {
								label.classList.remove('carousel__label--selected');
							}
							else {
								label.classList.add('carousel__label--selected');
							}
						}

						break;
					}
				}
			});

			carousel.arrowLeft.addEventListener('click', function(e) {
				console.log('left!');
				for (var i = 0; i < carousel.radios.length; i++) {
					var radio = carousel.radios[i];
					var nextRadio = carousel.radios[i - 1 < 0 ? carousel.radios.length - 1 : i - 1];
					if (radio.checked) {
						nextRadio.checked = true;

						for (var k = 0; k < carousel.labels.length; k++) {
							var label = carousel.labels[k];
							if (label.getAttribute('for') !== nextRadio.id) {
								console.log('boom!');
								label.classList.remove('carousel__label--selected');
							}
							else {
								console.log('BAM');
								label.classList.add('carousel__label--selected');
							}
						}

						break;
					}
				}
			});
		})(i);
	}
})();


(function() {
	var modalTriggers = document.getElementsByClassName('modal-trigger');
	var modals = document.getElementsByClassName('modal');


	// Associate modal triggers with their corresponding modals
	for (var i = 0; i < modalTriggers.length; i++) {
		modalTriggers[i].modal = modalTriggers[i].nextElementSibling;
	}


	// Add event listener to triggers to activate modals
	for (var i = 0; i < modalTriggers.length; i++) {
		(function(i) {
			modalTriggers[i].addEventListener('click', function() {
				var trigger = this;

				trigger.modal.style.display = 'block';
				trigger.modal.offsetWidth; // forces a reflow

				trigger.modal.classList.add('modal--visible');
				document.body.classList.add('no-scroll');
			});

			var closeBtns = modalTriggers[i].modal.getElementsByClassName('modal__close');

			for (var j = 0; j < closeBtns.length; j++) {
				(function(j) {
					closeBtns[j].addEventListener('click', function() {
						modalTriggers[i].modal.classList.remove('modal--visible');
						modalTriggers[i].modal.style.display = 'none';
						document.body.classList.remove('no-scroll');
					});
				})(j);
			}
		})(i);
	}
})();



var stickyNotesSwitch = document.getElementById('sticky-note-switch');
var stickyPacks = document.getElementsByClassName('izi-sticky-pack');

console.log('hi');
stickyNotesSwitch.addEventListener('change', function(e) {

	if (stickyNotesSwitch.checked) {

		for (var i = 0; i < stickyPacks.length; i++) {
			stickyPacks[i].style.display = 'inline-block';
		}
	}
	else {

		for (var i = 0; i < stickyPacks.length; i++) {
			stickyPacks[i].style.display = 'none';
		}
	}
});





// Remembers the scroll position in order to 
// maintain it when the body's height changes

/*
(function(){

	// Listen to the height of a given element
	function onHeightChange(element, callback) {
		var lastHeight = element.clientHeight;
		var currentHeight;

		(function listen() {
			currentHeight = element.clientHeight;

			if(currentHeight !== lastHeight) {
				callback(currentHeight, lastHeight);
			}
			lastHeight = currentHeight;

			if (element.onHeightChangeTimer) {
				clearTimeout(element.onHeightChangeTimer)
			}

			element.onHeightChangeTimer = setTimeout(listen, 200);

		})();
	}

	var scrollfixElement = document.getElementById('scrollfix');

	if (scrollFixElement) {
		onHeightChange(scrollFixElement, function(currHeight, lastHeight) {
			console.log(window.scrollY);

			if (currHeight < lastHeight)
				window.scrollTo(0, window.scrollY + ( currHeight - lastHeight ) );
			
		});
	}
	

})();
*/


(function () {

	var activeStickyNotes = []; // An array that will contain all the sticky notes' DOM elements.
	var notePackData = []; // Contains the data of every created note. For use with local storage to rebuild state.

	if (localStorage.getItem('notePackData')) {
		notePackData = JSON.parse(localStorage.getItem('notePackData'));

		for (var i = 0; i < notePackData.length; i++) {
			if (notePackData[i] !== null) {
				var noteElement = createStickyNote(notePackData[i]);
				addNoteElementToDom(noteElement);
				console.log('created ' + (i+1) + ' sticky notes..');
			}
		}
	}

	// TODO: Implement a better solution for removing notes (instead of just setting hte note object to null in the notePackData array).

	var createStickyNoteElement = document.getElementsByClassName('izi-sticky-pack')[0];

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
		}
	}

	function handleKeyUpOnText(event) {
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

			note.noteData.content = text.textContent;

			updatePackData(note);
		}
	}

	function handleEditBtnClick(event) {
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();

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
		event.stopPropagation();
		event.stopImmediatePropagation();

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

			editBtn.removeEventListener('mousedown', handleEditBtnClick, false);

			pinBtn.removeEventListener('mousedown', handlePinBtnClick, false);

			text.removeEventListener('keyup', handleKeyUpOnText, false);

			this.removeEventListener('mousedown', handleCloseBtnClick, false);

			// Remove note data object
			notePackData[notePackData.indexOf(note.noteData)] = null;
			// Save to Local Storage
			localStorage.setItem('notePackData', JSON.stringify(notePackData));
			// Remove note Element from the DOM.
			note.remove();

		}
	}

	function createStickyNote(newNote) {

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

		noteTextP.addEventListener('keyup', handleKeyUpOnText, false);

		pinIcon.classList.add('fas');
		pinIcon.classList.add('fa-thumbtack');

		notePinBtn.appendChild(pinIcon);

		notePinBtn.classList.add('izi-sticky-pack__note-pin');

		notePinBtn.addEventListener('mousedown', handlePinBtnClick, false);

		editIcon.classList.add('far');
		editIcon.classList.add('fa-edit');

		noteEditBtn.appendChild(editIcon);

		noteEditBtn.classList.add('izi-sticky-pack__note-edit');

		noteEditBtn.addEventListener('mousedown', handleEditBtnClick, false);

		closeBtn.classList.add('izi-sticky-pack__note-close');
		closeIcon.classList.add('fa');
		closeIcon.classList.add('fa-times');
		closeBtn.appendChild(closeIcon);

		closeBtn.addEventListener('mousedown', handleCloseBtnClick, false);


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

		localStorage.setItem('notePackData', JSON.stringify(notePackData));

		var newNoteElement = createStickyNote(newNote);

		addNoteElementToDom(newNoteElement);

	});
})();


(function() {

	var tabs = document.getElementsByClassName('tabs__tab');

	function togglePanel(tab) {
		var allTabs = tab.parentElement.children;
		var panelId = tab.getAttribute('data-controls');
		var panel = document.getElementById(panelId);
		var allPanels = panel.parentElement.children;


		for (var i = 0; i < allTabs.length; i++) {
			allTabs[i].classList.remove('tabs__tab--active');
		}

		tab.classList.add('tabs__tab--active');


		for (var i = 0; i < allPanels.length; i++) {
			allPanels[i].classList.remove('tabs__panel--visible');
		}

		panel.classList.add('tabs__panel--visible');
		setTimeout(function() {
			panel.parentElement.scrollTop = 0;
		}, 100);
	}

	for (var i = 0; i < tabs.length; i++) {
		(function(i) {
			tabs[i].addEventListener('click', function() {

				if (!this.classList.contains('tabs__tab--active')) {
					togglePanel(this);
				}
			});
		})(i);
	}
})();


(function() {
	var width_mod = document.getElementsByClassName('js-modifier-width');
	var height_mod = document.getElementsByClassName('js-modifier-height');


	/*
	*	Get the parent elements' offset width and height and set it as a css style
	*	and set the checked property to false
	*/

	for (var i = 0; i < width_mod.length; i++) {
		width_mod[i].checked = false;
		width_mod[i].initialWidth = width_mod[i].parentElement.offsetWidth;
		width_mod[i].parentElement.style.width = width_mod[i].initialWidth +'px';
	}

	for (var i = 0; i < height_mod.length; i++) {
		height_mod[i].checked = false;
		height_mod[i].initialHeight = height_mod[i].parentElement.offsetHeight;
		height_mod[i].parentElement.style.height = height_mod[i].initialHeight +'px';
	}


	/*
	*	Set event listeners to each modifier
	*/

	for (var i = 0; i < width_mod.length; i++) {

		width_mod[i].addEventListener('change', function() {


			if (this.checked) {
				this.parentElement.style.width = '150px';
			}
			else {
				this.parentElement.style.width = this.initialWidth + 'px';

			}
		});
	}

	for (var i = 0; i < height_mod.length; i++) {
		height_mod[i].addEventListener('change', function() {
			if (this.checked) {
				this.parentElement.style.height = '150px';
			}
			else {
				this.parentElement.style.height = this.initialHeight + 'px';

			}
		});
	}
})();


