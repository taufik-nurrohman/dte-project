// Simple jQuery Custom Select Box Plugin
// https://plus.google.com/108949996304093815163/about

(function($) {

    $.fn.customSelectBox = function(o) {

        o = $.extend({
            selectboxClass: 'select',
            buttonClass: 'current',
            selectedClass: 'selected',
            disabledClass: 'disabled',
            focusedClass: 'focused'
        }, o);

        return this.each(function() {

            var $this = $(this), focus = 0;

            // Hide the selectbox, but keep its dimension to expand the custom selectbox wrapper
            $this.css('visibility', 'hidden')

                // Wrap the original selectbox with a `div` element
                .wrap('<div class="' + o.selectboxClass + '"></div>');

            var $select = $this.parent(),
                $option = $select.find('option'),
                value = $this.find('option:selected').html();

            // Append a selectbox button to show the current value,
            // and a dropdown menu as a fake option list
            $select.append('<span class="' + o.buttonClass + '">' + value + '</span><ul style="display:none;"></ul>');

            // Insert some `<li>` element to the dropdown menu based on all `<option>` element inside the selectbox
            // Save the option value to the `data-value` attribute, and set some special classes based on the `<option>` status
            $option.each(function(i) {
                var opt = $(this),
                    val = opt.val() ? opt.val() : opt.html(),
                    txt = opt.html(),
                    cls = opt.is(':selected') ? o.selectedClass : opt.is(':disabled') ? o.disabledClass : "";
                $select.find('ul').append('<li class="' + cls + ' o-' + i + '" data-value="' + val + '">' + txt + '</li>');
            });

            // If the selectbox button is clicked...
            $select.find('.' + o.buttonClass).on("mousedown", function(e) {

                // Remove all focused class in all focused selectbox button, and hide the visible dropdown menu
                $('.' + o.selectboxClass + ' .' + o.focusedClass).removeClass(o.focusedClass).next().hide();

                // Toggle state based on variable condition
                // In this case, based on the `focus` value
                if (focus == 1) {
                    // If `focus == 1`, remove the focused class from the selectbox button and hide the dropdown menu
                    $(this).removeClass(o.focusedClass).next().hide();
                    focus = 0;
                } else {
                    // If `focus != 1`, add the focused class to the selectbox button and show the dropdown menu
                    $(this).addClass(o.focusedClass).next().show();
                    focus = 1;
                }

                // Prevent event bubbling
                e.stopPropagation();

                // We also have to add this feature to hide the visible dropdown menu based on random click event outside the custom selectbox
                $(document).on("mousedown", function() {
                    $('.' + o.selectboxClass + ' .' + o.focusedClass).removeClass(o.focusedClass).next().hide();
                    focus = 0;
                });

            // If the fake option item is clicked...
            }).next().find('li').on("mousedown", function() {

                // Filter the fake option element only for the `<li>` element that hasn't disabled class
                if (!$(this).hasClass(o.disabledClass)) {

                    // Hide the dropdown menu
                    $(this).parent().hide()
                        // Remove the local fake option selected class
                        .find('.' + o.selectedClass).removeClass(o.selectedClass)
                            // Remove the selectbox button focused class
                            .parent().prev().removeClass(o.focusedClass)
                                // And change the selectbox button text into the clicked fake option text
                                .text($(this).text())
                                    // Set a new value to the original selectbox element that's hidden by `CSS visibility`
                                    .prev().val($(this).data('value'))
                                        // and trigger the change event to it!
                                        .trigger("change");

                    // Add the selected class to the clicked fake option
                    $(this).addClass(o.selectedClass);

                }

                focus = 1;

            });

        });

    };

})(jQuery);