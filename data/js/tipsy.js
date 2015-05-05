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

        var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
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

$('.linkBar').click(function(e) {
    if (e.currentTarget.classList.contains('collapsed')) {
        $('#linkPlus').removeClass('glyphicon-plus');
        $('#linkPlus').addClass('glyphicon-minus');
        $('#txtPlus').removeClass('glyphicon-minus');
        $('#txtPlus').addClass('glyphicon-plus');
    } else {
        $('#linkPlus').removeClass('glyphicon-minus');
        $('#linkPlus').addClass('glyphicon-plus');

    }
});

$('#txtBar').click(function(e) {
    if (e.currentTarget.classList.contains('collapsed')) {
        $('#txtPlus').removeClass('glyphicon-plus');
        $('#txtPlus').addClass('glyphicon-minus');
        $('#linkPlus').removeClass('glyphicon-minus');
        $('#linkPlus').addClass('glyphicon-plus');

    } else {
        $('#txtPlus').removeClass('glyphicon-minus');
        $('#txtPlus').addClass('glyphicon-plus');
    }
});


function makeGroup(number) {
    var i = number.toString();
    var str = "<div class='groups' id='group" + i + "'><div class='form-group group'><hr><label    class='control-label col-sm-3' for='urlPrefix" + i + "'>URL Prefix " + i + "</label><div class='col-sm-9'><input type='text' class='form-control' id='urlPrefix" + i + "' placeholder='(leave blank to cover your entire domain)' /></div></div><div class='form-group'><label class='control-label col-sm-3' for='payPalEmail'>Payment Info " + i + "</label><div class='col-sm-4'><input type='email' class='form-control' id='payPalEmail" + i + "' placeholder='PayPal Email' /></div><div class='col-sm-5'><input type='text' class='form-control' id='dwollaKey" + i + "' placeholder='Dwolla Key' /></div></div></div>";
    return str

}

function generateTxtOutput() {
    var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var outString = ""
    outString += "version:<br/>"
    outString += "&nbsp;&nbsp;0.02<br/>"
    var cacheDurationNumber = $("#cacheDurationNumber").val();
    var cacheDurationDuration = $("#cacheDurationDuration").val();

    var num = "1"

    if (cacheDurationNumber) {
        num = cacheDurationNumber;
    }

    var dur = "d"

    if (cacheDurationDuration) {
        dur = cacheDurationDuration;
    }
    outString += "cache-duration:<br/>&nbsp;&nbsp;"
    outString += num + " ";
    outString += dur + "<br/>";



    // get the groups
    var groups = $('.groups');
    var isThereAnyPaymentInfo = false;
    for (var i = 0; i < groups.length; i++) {

        var num;
        if (i == 0) {
            num = "";
        } else {
            num = (i + 1).toString();
        }
        var payPal = $("#payPalEmail" + (i + 1).toString()).val();
        var dwolla = $("#dwollaKey" + (i + 1).toString()).val();
        if (payPal != "" && !(regex.test(payPal))) {
            $('#noDataTxt').html("<div class='alert alert-warning text-center' id='alertMessage'>Please make sure the PayPal email you provide for the Payment Info " + num + " is correct.</div>");

            window.setTimeout(function() {
                $("#alertMessage").fadeTo(500, 0).slideUp(500, function() {
                    $(this).remove();
                });
            }, 2500);
            return;

        }
        if (payPal != "" || dwolla != "") {
            outString += "payment-methods:<br/>"
            isThereAnyPaymentInfo = true;
            break
        }
    }




    if (!isThereAnyPaymentInfo) {
        $('#noDataTxt').html("<div class='alert alert-warning text-center' id='alertMessage'>Please make sure you provided at least one PayPal or dwolla information.</div>");

        window.setTimeout(function() {
            $("#alertMessage").fadeTo(500, 0).slideUp(500, function() {
                $(this).remove();
            });
        }, 2500);
        return;
    }

    if (isThereAnyPaymentInfo) {
        for (var i = 0; i < groups.length; i++) {
            var payPal = $("#payPalEmail" + (i + 1).toString()).val();
            var dwolla = $("#dwollaKey" + (i + 1).toString()).val();

            var num;
            if (i == 0) {
                num = "";
            } else {
                num = (i + 1).toString();
            }
            if (payPal == "" && dwolla == "") {
                continue;
            }
            if (payPal != "" && !(regex.test(payPal))) {
                $('#noDataTxt').html("<div class='alert alert-warning text-center' id='alertMessage'>Please make sure the PayPal email you provide for the Payment Info " + num + " is correct.</div>");

                window.setTimeout(function() {
                    $("#alertMessage").fadeTo(500, 0).slideUp(500, function() {
                        $(this).remove();
                    });
                }, 2500);
                return;
            }

            var currUrlPrefix = $("#urlPrefix" + (i + 1).toString()).val();

            if (currUrlPrefix == "") {
                currUrlPrefix = "_";
            }
            outString += "&nbsp;&nbsp;" + currUrlPrefix + ":&nbsp;<br/>"

            if (payPal != "") {
                outString += "&nbsp;&nbsp;&nbsp;&nbsp;paypal: " + payPal + "<br/>"
            }

            if (dwolla != "") {
                outString += "&nbsp;&nbsp;&nbsp;&nbsp;dwolla: " + dwolla + "<br/>"
            }
        }
    }

    return outString;


}

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
    $('.addMore').click(function() {
        //alert("you");
        var numberOfGroups = 0;
        numberOfGroups = $('.groups').length;
        //console.log(makeGroup(numberOfGroups+1));
        if (numberOfGroups > 1 ) {
           $('.remove').show();
        }
        $('.paymentMethods').append(makeGroup(numberOfGroups + 1));
        numberOfGroups = $('.groups').length;
        //console.log(makeGroup(numberOfGroups+1));
        if (numberOfGroups > 1 ) {
           $('.remove').show();
        }

    });
    $('.remove').hide();
    $('.remove').click(function() {
        //alert("you");
        //console.log(makeGroup(numberOfGroups+1));

        $('.groups').last().remove();
        var numberOfGroups = 0;
        numberOfGroups = $('.groups').length;
        if (numberOfGroups < 2 ) {
           $('.remove').hide();
        }

    });
    

    $('#txtGenerateBtn').on('click', (function(e) {
        //console.log("clicked getn txt")
        var generatedText = generateTxtOutput();
        //console.log(generatedText);
        if (generatedText && generatedText != "") {
        var newText = generatedText.replace(/<br\/>/g, "\n");
        var newText = newText.replace(/&nbsp;/g, " ");
        //console.log("newText", newText)
        var blob = new Blob([newText], {type: "text/plain;charset=utf-8"});
saveAs(blob, "tipsy.txt");
           // $('#placeFollowingTxt').html("<p>Copy the following into a file, name it tipsy.txt and place it at the root of your domain.</p>");
           // $('#generatedTxt').html("<samp>" + generatedText + "</samp>");
        }
    }));

});