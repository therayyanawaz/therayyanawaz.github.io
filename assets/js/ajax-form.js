// Get the form.
var form = $('#contact-form');

// Get the messages div.
var formMessages = $('.ajax-response');

// Add clipboard functionality
new ClipboardJS('.btn-copy').on('success', function(e) {
	// Show tooltip or notification if needed
	$('.btn-copy').text('Email Copied!');
	setTimeout(function() {
		$('.btn-copy').html('<svg class="icon me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 10C8 9.46957 8.21071 8.96086 8.58579 8.58579C8.96086 8.21071 9.46957 8 10 8H18C18.5304 8 19.0391 8.21071 19.4142 8.58579C19.7893 8.96086 20 9.46957 20 10V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H10C9.46957 20 8.96086 19.7893 8.58579 19.4142C8.21071 19.0391 8 18.5304 8 18V10Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 8V6C16 5.46957 15.7893 4.96086 15.4142 4.58579C15.0391 4.21071 14.5304 4 14 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V14C4 14.5304 4.21071 15.0391 4.58579 15.4142C4.96086 15.7893 5.46957 16 6 16H8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="text-nowrap">Copy Email</span>');
	}, 2000);
});

// No form submission handling - allow natural form submission to FormSubmit.co
