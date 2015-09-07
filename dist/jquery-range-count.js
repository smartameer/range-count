/**
 * @description : Except Internet Explorer, no other browser shows the current
 *                count on sliding the slider. This plugin will allow the range
 *                slider to show current count in other browsers irresptive of
 *                it's position.
 * @author: Pradeep Patro <pradeeppatro16@gmail.com>
 * @version: 1.0.0
 */
(function ($) {
    'use strict';
    $.fn.rangeCount = function () {
        // checking if browser is microsoft internet explorer
        if ((window.navigator.userAgent.indexOf('Trident') > 0) || (window.navigator.userAgent.indexOf('MSIE') > 0)) {
            return;
        }
        var element = this;
        // checking if current element is input & type is range
        if (element.prop('tagName').toLowerCase() !== 'input') {
            console.log('rangeCount works only for input type range');
            return;
        } else if (element.prop('type').toLowerCase() !== 'range') {
            console.log('rangeCount works only for input type range');
            return;
        }

        this.mouseDownFlag = false;
        this.countPositionLeft = 0;
        this.on('mousedown', function (event) {
            this.mouseDownFlag = true;
            var inputRangeOffsetLeft = element.parent().offset().left,
            inputRangePosition = element.position(),
                inputRangeWidth = element.innerWidth(),
                inputRangeValue = element.val();
            var inputRangePositionLeft = inputRangePosition.left,
                // placing the count inbetween the range co-ordinates
                mousePositionTop = event.pageY - $(this).outerHeight() - 2,
                mousePositionLeft = event.pageX - inputRangeOffsetLeft;
            var rangePlaceHolder = jQuery('<span></span>').attr({
                'id': 'range-count-thumbnail',
                'style': 'position:fixed;z-index:2000;left:'+mousePositionLeft+'px;color:black;top:'+mousePositionTop+'px;font-size:11px;border:1px solid #ddd;padding:2px 4px;border-radius:4px;-moz-border-radius: 4px;-webkit-border-radius:4px;background-color:#fcfff4;background-image:-moz-linear-gradient(top,#fcfff4 0%,#eaefe1 48%,#cbd6c5 100%);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#fcfff4),color-stop(48%,#eaefe1),color-stop(100%,#cbd6c5));background-image:-webkit-linear-gradient(top,#fcfff4 0%,#eaefe1 48%,#cbd6c5 100%);background-image:-o-linear-gradient(top,#fcfff4 0%,#eaefe1 48%,#cbd6c5 100%);background-image:linear-gradient(to bottom, #fcfff4 0%,#eaefe1 48%,#cbd6c5 100%);display:none;'
            });
            if ($('#range-count-thumbnail').length <= 0) {
                $(this).parent().prepend(rangePlaceHolder);
            }
        }).on('mousemove', function (event) {
            if (this.mouseDownFlag) {
                var inputRangeOffsetLeft = element.parent().offset().left,
                    inputRangePosition = element.position(),
                    inputRangeWidth = element.innerWidth(),
                    inputRangeValue = element.val(),
                    inputRangePositionLeft = inputRangePosition.left,
                    // placing the count inbetween the range co-ordinates
                    mousePositionLeft = event.pageX - inputRangeOffsetLeft;
                if (mousePositionLeft <= inputRangePositionLeft + inputRangeWidth &&
                    mousePositionLeft >= inputRangePositionLeft) {
                    this.countPositionLeft = mousePositionLeft - 10;
                }
                // placing count right above the mouse pointer
                $('#range-count-thumbnail').css({
                    'left': this.countPositionLeft
                }).html(inputRangeValue).show();
            }
        }).on('mouseup', function () {
            var inputRangeValue = element.val();
            $('#range-count-thumbnail').html(inputRangeValue)
                .show().fadeOut(800, function () {
                    $(this).remove();
                });
            this.mouseDownFlag = false;
        });
        return this;
    };
})(jQuery);
