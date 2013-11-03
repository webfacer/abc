$(document).ready(function() {
	$('h2, p').stickit({
		useClassName	:'stickit',
		
		onEventCopied	: function() {
			console.log('custom options');
		},
		
		onEventHoverIn	: function() {
			console.log('class is added!');
		},
		
		onEventHoverOut	: function() {
			console.log('class is removed');
		}
	});
});
