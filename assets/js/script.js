(function ($) {
	"use strict";

	// Theme color control js
	$(document).ready(function () {
		const isDarkMode = localStorage.getItem('darkMode') === 'true';
		$('body').toggleClass('dark-theme', isDarkMode);

		$('#page-content').fadeIn(0);

		$('.theme-control-btn').on("click", function () {
			$('body').toggleClass('dark-theme');

			const isDark = $('body').hasClass('dark-theme');
			localStorage.setItem('darkMode', isDark);
		});
	});

	// Mobile menu control js
	$(".mobile-menu-control-bar").on("click", function () {
		$(".mobile-menu-overlay").addClass("show");
		$(".navbar-main").addClass("show");
	})
	$(".mobile-menu-overlay").on("click", function () {
		$(".mobile-menu-overlay").removeClass("show");
		$(".navbar-main").removeClass("show");
	})

	// Parallax scroll effect js
	document.querySelectorAll(".move-with-cursor").forEach(a => {
		document.addEventListener("mousemove", function (e) {
			var t = e.clientX,
				e = e.clientY;
			a.style.transition = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)", a.style.transform = `translate(${.01 * t}px, ${.01 * e}px) rotate(${.01 * (t + e)}deg)`
		})
	}),

		// Email copy button js
		new ClipboardJS('.btn-copy');

	// Email copy button tooltip js
	$(document).ready(function () {
		$(".btn-copy").on("click", function () {
			$(this).addClass("active");

			setTimeout(() => {
				$(this).removeClass("active");
			}, 1000);
		});
	});

	// Magnific popup js
	$(".parent-container").magnificPopup({
		delegate: ".gallery-popup",
		type: "image",
		gallery: {
			enabled: true,
		},
	});

	// Client feedback slider js
	$(".client-feedback-slider").slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: false,
		dots: false,
		infinite: true,
		arrows: true,
		speed: 500,
		prevArrow: '<i class="fas left icon fa-arrow-left"></i>',
		nextArrow: '<i class="fas right icon fa-arrow-right"></i>',
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},]
	});

	// Article publications slider js
	$(".article-publications-slider").slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: false,
		dots: false,
		infinite: true,
		arrows: true,
		speed: 500,
		prevArrow: '<i class="fas left icon fa-arrow-left"></i>',
		nextArrow: '<i class="fas right icon fa-arrow-right"></i>',
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},]
	});

	// WhatsApp floating button tooltip
	$(document).ready(function() {
		const whatsappButton = $('.floating-whatsapp a');
		
		// Create tooltip element
		$('<div class="whatsapp-tooltip">Chat with me</div>').insertAfter(whatsappButton);
		
		// Style the tooltip
		$('.whatsapp-tooltip').css({
			'position': 'absolute',
			'right': '70px',
			'top': '50%',
			'transform': 'translateY(-50%)',
			'background-color': '#25D366',
			'color': 'white',
			'padding': '6px 12px',
			'border-radius': '4px',
			'font-size': '14px',
			'white-space': 'nowrap',
			'opacity': '0',
			'transition': 'opacity 0.3s ease',
			'pointer-events': 'none'
		});
		
		// Add arrow to tooltip
		$('.whatsapp-tooltip').append('<span style="position: absolute; right: -6px; top: 50%; transform: translateY(-50%); width: 0; height: 0; border-top: 6px solid transparent; border-bottom: 6px solid transparent; border-left: 6px solid #25D366;"></span>');
		
		// Show/hide tooltip on hover
		whatsappButton.hover(
			function() {
				$('.whatsapp-tooltip').css('opacity', '1');
			},
			function() {
				$('.whatsapp-tooltip').css('opacity', '0');
			}
		);
	});

})(jQuery);
