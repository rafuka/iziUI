
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
