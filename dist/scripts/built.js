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




// Remembers the scroll position in order to 
// maintain it when the body's height changes

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


(function() {

	var tabPanels = document.getElementsByClassName('tabs');
	var tabRadios = document.getElementsByClassName('tabs__radio');
	var tabContents = document.getElementsByClassName('tabs__content');

	// Associate each tab with each panel

})();



var width_mod = document.getElementsByClassName('js-modifier-width');
var height_mod = document.getElementsByClassName('js-modifier-height');


/*  
*	Get the parent elements' offset width and height and set it as a css style, and set 
*	the checked property to false
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

