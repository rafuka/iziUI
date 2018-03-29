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

			


			/*for(var j = 0; j < carousels[i].labels.length; j++) {
				(function(j) {
					carousels[i].labels[j].addEventListener('click', function(e) {
						console.log('clicked!');
						var label = e.target;
						console.log(label);
						for (var k = 0; k < carousels[i].labels.length; k++) {
							carousels[i].labels[k].classList.remove('carousel__label--selected');
							label.classList.add('carousel__label--selected');
						}
					});
				})(j);
			}*/
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
			console.log('yes!');
			for (var i = 0; i < stickyPacks.length; i++) {
				stickyPacks[i].style.display = 'inline-block';
			}
		}
		else {
			console.log('no!');
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


