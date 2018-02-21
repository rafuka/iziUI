(function() {
	var cards = document.getElementsByClassName('card--hover-fx');
	var bodyRect = document.body.getBoundingClientRect();

	console.log(cards);

	for (var i = 0; i < cards.length; i++) {
		(function() {
			cards[i].addEventListener('mousemove', function(e) {
				
				var card   = e.currentTarget.getBoundingClientRect();
				var cardX  = card.left - bodyRect.left;
				var cardY  = card.top - bodyRect.top;
				var mouseX = e.pageX - cardX;
				var mouseY = e.pageY - cardY;
				console.log(mouseX);
				console.log(mouseY);
				console.log(card.height);

				var angleX = ((mouseX * -2/card.width) + 1);
				var angleY = ((mouseY * -2/card.height) + 1);
				var shadowX = mouseX;
				var shadowY = mouseY;

				//e.currentTarget.style.transform = 'rotateX(' + angleX + 'deg), rotateY(' + angleY + ')';

				//e.currentTarget.style.boxShadow = angleX*5 + 'px ' + angleY*5 + 'px 4px 3px rgba(0,0,0,0.2)';
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

