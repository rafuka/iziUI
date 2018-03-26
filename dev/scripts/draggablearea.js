(function () {

	var dAreaContainers = document.getElementsByClassName('izi-draggable');
	var dAreas = document.getElementsByClassName('izi-draggable__area');

	for(var i = 0; i < dAreas.length; i++) {

		dAreas[i].draggable = true;
		dAreas[i].zoomControls = dAreas[i].parentElement.getElementsByClassName('izi-draggable__controls');
		console.log(dAreas[i].zoomControls);

		for(var j = 0; j < dAreas[i].children.length; j++) {
			dAreas[i].children[j].draggable = false;
		}
	}
	

	function handleDrag(event) {

		var newX = this.startX - event.clientX;
		var newY = this.startY - event.clientY;
		this.style.left = (this.offsetLeft - newX) + 'px';
		this.style.top = (this.offsetTop - newY) + 'px';
		this.startX = event.clientX;
		this.startY = event.clientY;
		
	}

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
		console.log('handle zoom');
		var zoomControl = event.target;
		console.log(zoomControl.classList);
		console.log(zoomControl.parentElement);
		// TODO
		var dArea = zoomControl.parentElement.parentElement.getElementsByClassName('izi-draggable__area')[0];
		console.log(dArea);
		var currWidth = dArea.offsetWidth;
		console.log('area width: ' + currWidth);

		if (zoomControl.classList.contains('zoom-in')) {
			
			var newWidth = currWidth * 1.10;
			dArea.style.width = newWidth + 'px';
		}
		else if (zoomControl.classList.contains('zoom-out')) {

			var newWidth = currWidth * 0.9;
			if (newWidth > dArea.parentElement.offsetWidth) {
				dArea.style.width = newWidth + 'px';
			}
		}
	}

	for (var i = 0; i < dAreas.length; i++) {

		(function(i) {

			dAreas[i].addEventListener('mousedown', function(e) {

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
	}
})();