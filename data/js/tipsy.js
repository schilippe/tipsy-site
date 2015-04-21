/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */
//handle link tage generation
$(function() {

    $('#linkTagGenerateBtn').on('click', (function(e) {
    
        $('#placeFollowing').empty();
        $('#generatedLinkTag').empty();
    
        var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
        var name = $('#linkTagName').val();
        var paypalEmail = $('#payPalEmail').val();
        var dwollaKey = $('#dwollaKey').val();

        var data = ""
        var nameIn = ""
        if (name != "") {
            nameIn += " name='" + name + "'";
        }

        if (paypalEmail != "") {
            if (!(regex.test(paypalEmail))) {
                $('#noData').html("<div class='alert alert-warning text-center' id='alertMessage'>Make sure your paypal email is valid.</div>");
                window.setTimeout(function() {
                    $("#alertMessage").fadeTo(500, 0).slideUp(500, function() {
                        $(this).remove();
                    });
                }, 2500);
                return
            }

            data += " data-paypal='" + paypalEmail + "'";
        }

        if (dwollaKey != "") {
            data += " data-dwolla='" + dwollaKey + "'";
        }
        var textArea = "<code> &ltlink rel='author'" + nameIn + data + "&gt</code>";

        if (data != "") {
            $('#noData').empty();
            $('#placeFollowing').html("<p>Place the following in the <samp>HEAD</samp> of your site:</p>");
            $('#generatedLinkTag').html(textArea);
        } else {
        
            $('#noData').html("<div class='alert alert-warning text-center' id='alertMessage'>Please make sure you provided at least either PayPal or dwolla information.</div>");

            window.setTimeout(function() {
                $("#alertMessage").fadeTo(500, 0).slideUp(500, function() {
                    $(this).remove();
                });
            }, 2500);

        }
    }));

});


// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$(document).ready(function() {
    $('.modal').on('show.bs.modal', function() {
        if ($(document).height() > $(window).height()) {
            // no-scroll
            //$('body').addClass("modal-open-noscroll");
        } else {
            //$('body').removeClass("modal-open-noscroll");
        }
    })
    $('.modal').on('hide.bs.modal', function() {
        // $('body').removeClass("modal-open-noscroll");
    })
})