
/*! NSVirtualKeyPad v1.0.0 | (c) 2016 ABDUL NASSAR THALAYANCHERIL | Free and Open*/
/* The plugin script */



//get cursor position
(function ($, undefined) {
    $.fn.getCursorPosition = function () {
        var el = $(this).get(0);
        var pos = 0;
        if ('selectionStart' in el) {
            pos = el.selectionStart;
        } else if ('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    }
})(jQuery);


$(document).ready(function () {

    //append keypads to document
    $(document.body).append("<div id='NSdivKeyPadText'>" +

         
                   "<span data-keyvalue='1' class='NSKey'>1</span>" +
        "<span data-keyvalue='2' class='NSKey'>2</span>" +
        "<span data-keyvalue='3' class='NSKey'>3</span>" +
        "<span data-keyvalue='4' class='NSKey'>4</span>" +
        "<span data-keyvalue='5' class='NSKey'>5</span>" +
        "<span data-keyvalue='6' class='NSKey'>6</span>" +
        "<span data-keyvalue='7' class='NSKey'>7</span>" +
        "<span data-keyvalue='8' class='NSKey'>8</span>" +
        "<span data-keyvalue='9' class='NSKey'>9</span>" +
        "<span data-keyvalue='0' class='NSKey'>0</span>" +
         "<br/>" +


            "<span data-keyvalue='Q' class='NSKey'>Q</span>" +
            "<span data-keyvalue='W' class='NSKey'>W</span>" +
            "<span data-keyvalue='E' class='NSKey'>E</span>" +
            "<span data-keyvalue='R' class='NSKey'>R</span>" +
            "<span data-keyvalue='T' class='NSKey'>T</span>" +
            "<span data-keyvalue='Y' class='NSKey'>Y</span>" +
            "<span data-keyvalue='U' class='NSKey'>U</span>" +
            "<span data-keyvalue='I' class='NSKey'>I</span>" +
            "<span data-keyvalue='O' class='NSKey'>O</span>" +
            "<span data-keyvalue='P' class='NSKey'>P</span>" +

            "<br/>"+

            "<span data-keyvalue='A' class='NSKey'>A</span>" +
            "<span data-keyvalue='S' class='NSKey'>S</span>" +
            "<span data-keyvalue='D' class='NSKey'>D</span>" +
            "<span data-keyvalue='F' class='NSKey'>F</span>" +
            "<span data-keyvalue='G' class='NSKey'>G</span>" +
            "<span data-keyvalue='H' class='NSKey'>H</span>" +
            "<span data-keyvalue='J' class='NSKey'>J</span>" +
            "<span data-keyvalue='K' class='NSKey'>K</span>" +
            "<span data-keyvalue='L' class='NSKey'>L</span>" +

             "<br/>" +

            "<span data-keyvalue='Z' class='NSKey'>Z</span>" +
            "<span data-keyvalue='X' class='NSKey'>X</span>" +
            "<span data-keyvalue='C' class='NSKey'>C</span>" +
            "<span data-keyvalue='V' class='NSKey'>V</span>" +
            "<span data-keyvalue='B' class='NSKey'>B</span>" +
            "<span data-keyvalue='N' class='NSKey'>N</span>" +
            "<span data-keyvalue='M' class='NSKey'>M</span>" +

             

              "<br/>" +

            "<span data-keyvalue=' ' class='NSKey'>SPACE</span>" +

        "</div>");

    $(document.body).append(  "<div id='NSdivKeyPadNumber'>" +
        "<span data-keyvalue='1' class='NSKey'>1</span>" +
        "<span data-keyvalue='2' class='NSKey'>2</span>" +
        "<span data-keyvalue='3' class='NSKey'>3</span>" +
        "<span data-keyvalue='4' class='NSKey'>4</span>" +
        "<span data-keyvalue='5' class='NSKey'>5</span>" +
        "<span data-keyvalue='6' class='NSKey'>6</span>" +
        "<span data-keyvalue='7' class='NSKey'>7</span>" +
        "<span data-keyvalue='8' class='NSKey'>8</span>" +
        "<span data-keyvalue='9' class='NSKey'>9</span>" +
        "<span data-keyvalue='0' class='NSKey'>0</span>" +
    "</div>");




//insert touched key to focused text box
  $('.NSKey').click(function (event) {

      var keyVal = $(this).data('keyvalue');
      keyVal = String(keyVal);

    var position = $('#' + focusedId).getCursorPosition()

    var content = $('#' + focusedId).val();
    var newContent = content.substr(0, position) + keyVal + content.substr(position);
    $('#' + focusedId).val(newContent);

      //$('#' + focusedId).focus();
  
      // $('#' + focusedId).selectRange(position + keyVal.length);

  

      // Multiply by 2 to ensure the cursor always ends up at the end;
      // Opera sometimes sees a carriage return as 2 characters.
    

  //  $('#' + focusedId).focus(1);

    
   // $('#' + focusedId).focus().val("").val(newContent);
      //$('#' + focusedId).setRange(position, keyVal.length);
    $('#' + focusedId).caret(position + keyVal.length);


   });
});


var ShowTextKeyPad = function () {
    

    $('#NSdivKeyPadText').show();
}

var HideTextKeyPad = function () {

    $('#NSdivKeyPadText').hide();
}

var ShowNumericKeyPad = function () {

    $('#NSdivKeyPadNumber').show();
}

var HideNumericKeyPad = function () {

    $('#NSdivKeyPadNumber').hide();
}

var focusedId = null;
(function ($) {
 

$.fn.nsvirtualkey = function (options) {
    

    var settings = $.extend({
        // These are the defaults.
        keypadtype: "NSTEXT"
    }, options);

 
    this.addClass(options.keypadtype);
   
   

    var HideKeyPads = function () {
        HideNumericKeyPad();
        HideTextKeyPad();

    };
    if (options.keypadtype == 'NSTEXT') {
        $('.NSTEXT').focus(function (event) {
            HideKeyPads();
            focusedId = this.id;
            ShowTextKeyPad();

        });
    }
    if (options.keypadtype == 'NSNUMERIC') {
        $('.NSNUMERIC').focus(function (event) {
            HideKeyPads();
            focusedId = this.id;
            ShowNumericKeyPad();

        });
    }





};



}(jQuery));



// script borrowed
(function ($) {
    // Behind the scenes method deals with browser
    // idiosyncrasies and such
    $.caretTo = function (el, index) {
        if (el.createTextRange) {
            var range = el.createTextRange();
            range.move("character", index);
            range.select();
        } else if (el.selectionStart != null) {
            el.focus();
            el.setSelectionRange(index, index);
        }
    };

    // Another behind the scenes that collects the
    // current caret position for an element

    // TODO: Get working with Opera
    $.caretPos = function (el) {
        if ("selection" in document) {
            var range = el.createTextRange();
            try {
                range.setEndPoint("EndToStart", document.selection.createRange());
            } catch (e) {
                // Catch IE failure here, return 0 like
                // other browsers
                return 0;
            }
            return range.text.length;
        } else if (el.selectionStart != null) {
            return el.selectionStart;
        }
    };

    // The following methods are queued under fx for more
    // flexibility when combining with $.fn.delay() and
    // jQuery effects.

    // Set caret to a particular index
    $.fn.caret = function (index, offset) {
        if (typeof (index) === "undefined") {
            return $.caretPos(this.get(0));
        }

        return this.queue(function (next) {
            if (isNaN(index)) {
                var i = $(this).val().indexOf(index);

                if (offset === true) {
                    i += index.length;
                } else if (typeof (offset) !== "undefined") {
                    i += offset;
                }

                $.caretTo(this, i);
            } else {
                $.caretTo(this, index);
            }

            next();
        });
    };

    // Set caret to beginning of an element
    $.fn.caretToStart = function () {
        return this.caret(0);
    };

    // Set caret to the end of an element
    $.fn.caretToEnd = function () {
        return this.queue(function (next) {
            $.caretTo(this, $(this).val().length);
            next();
        });
    };
}(jQuery));




