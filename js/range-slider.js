function range_init (object , options = undefined , callback = function(){}) {
    let max_text_class = 'max-text';
    let min_text_class = 'min-text';
    let min_btn_class = 'min';
    let max_btn_class = 'max';
    let price_symbol = '';
    let number_with_comas = false;
    if (options) {
       if (options.max_text_class) {
           max_text_class = options.max_text_class;
       }
       if (options.min_text_class) {
           min_text_class = options.min_text_class;
       }
       if (options.price_symbol) {
           price_symbol = options.price_symbol;
       }
       if (options.min_btn_class) {
           min_btn_class = options.min_btn_class;
       }
       if (options.max_btn_class) {
           max_btn_class = options.max_btn_class;
       }
       if (options.number_with_comas) {
           number_with_comas = options.number_with_comas;
       }
    }
    object.parent().find('.simbol').html(price_symbol);
    var min_num = object.data('min');
    var max_num = object.data('max');
    var drag_start = false;
    var start_position_x;
    var min_start_position_left;
    var max_start_position_left;
    var target_position;
    var draget_object;
    var draget_object_type;
    var min_btn = object.find('.' + min_btn_class);
    var max_btn = object.find('.' + max_btn_class);
    min_btn.attr('data-current-number', min_num);
    max_btn.attr('data-current-number', max_num);
    const min_num_number = min_num;
    const max_num_number = max_num;
    var range_difference = max_num - min_num;
    var range_width = object.width() - 30;
    object.attr('data-width', range_width);
    if (object.hasClass('price-range')) {
        max_num = Math.floor(max_num);
        min_num = numberWithCommas(min_num);
        max_num = numberWithCommas(max_num);
    }

    set_max_value_html(max_num);
    object.parent().find('.circle.' + max_btn_class +' .circle-tooltip .text').html( max_num);
    set_min_value_html(min_num);
    object.parent().find('.circle.' + min_btn_class + ' .circle-tooltip .text').html(min_num);
    max_btn.css('left', range_width);
    object[0].addEventListener('mousedown', object_mouse_down);
    object[0].addEventListener('touchstart', object_mouse_down);
    object[0].addEventListener('update', object_update);
    object[0].object_update = object_update;
    document.addEventListener('mousemove', object_mouse_move);
    document.addEventListener('touchmove', object_mouse_move);
    //object[0].addEventListener('mouseleave', object_mouse_up);
    document.addEventListener('mouseup', object_mouse_up);
    document.addEventListener('touchend', object_mouse_up);
    function object_update () {
        range_width = object.width() - 30;
        let min_left;
        let max_left;
        let value_mod = Number(object.attr('data-min'));
        let min_value = object.attr('data-min') - value_mod;
        let max_value = object.attr('data-max') - value_mod;
        if (object.find('.circle.' + min_btn_class).attr('data-current-number').length == 0) {
            min_left = 0;
            let current_value = min_value;
            min_btn.css({
                left : min_left
            } );
            set_min_value_html(current_value);

        } else {
            let data_number = object.find('.circle.' + min_btn_class).attr('data-current-number') - value_mod;
            let current_value = data_number  / max_value  * range_width;
            min_left = current_value;
            set_min_value_html(data_number + value_mod);
            min_btn.css({
                left : min_left
            } );
        }
        if (object.find('.circle.' + max_btn_class).attr('data-current-number').length == 0) {
            max_left = range_width;
            let current_value = max_value;
            max_btn.css({
                left : range_width
            } );
            set_max_value_html(current_value);
        } else {
            let data_number = object.find('.circle.' + max_btn_class).attr('data-current-number') - value_mod;
            let current_value =  data_number / max_value * range_width;
            max_left = current_value;

            set_max_value_html(data_number + value_mod);
            max_btn.css({
                left : max_left
            });
        }
        var width_between_points =   max_left - min_left + object.find('.circle').width();
        max_btn.attr('data-value', max_left + 'px');
        min_btn.attr('data-value', min_left + 'px');
        object.parent().find('.range-line-active').css( {'left': min_left}) ;
        object.parent().find('.range-line-active').css( {'width': width_between_points} );
        object.parent().find('.simbol').html(price_symbol);
    }

    function object_mouse_down (event) {
        start_position_x = event.pageX;
        if (event.touches) {
            start_position_x = event.touches[0].pageX
        }
        drag_start = true;
        min_start_position_left = min_btn.css('left').replace('px', '');
        min_start_position_left = Number(min_start_position_left);
        max_start_position_left = max_btn.css('left').replace('px', '');
        if (object.hasClass('price-range')) {
            max_start_position_left = max_start_position_left.replace(',', '');
        }
        max_start_position_left = Number(max_start_position_left);
        if ($(event.target).hasClass(min_btn_class)) {
            draget_object = $(event.target);
            draget_object_type = 'min';
        }
        if ($(event.target).hasClass(max_btn_class)) {
            draget_object = $(event.target);
            draget_object_type = 'max';
        }


    }
    function object_mouse_move (event) {

        if (drag_start == true) {
            console.log('dragged');
            var target_position = start_position_x - event.pageX;
            if (event.touches) {
                target_position = start_position_x - event.touches[0].pageX;
            }
            if (draget_object_type == 'min') {
                target_position = min_start_position_left - target_position;
                if (target_position > max_start_position_left) {
                    target_position = max_start_position_left;
                } else if (target_position < 0) {
                    target_position = 0;
                }
                draget_object.css('left', target_position);
                draget_object.attr('data-value', target_position / range_width);
                object.parent().find('.range-line-active').css('left', target_position);
                var min_num_value = Math.floor(target_position / range_width * range_difference) + min_num_number;
                draget_object.attr('data-current-number', min_num_value);
                if (object.hasClass('price-range')) {
                    min_num_value = numberWithCommas(min_num_value);
                }
                set_min_value_html(min_num_value);
                object.parent().find('.circle.' + min_btn_class + ' .circle-tooltip .text').html(min_num_value);
            }
            if (draget_object_type == 'max') {
                target_position = max_start_position_left - target_position;
                if (target_position < min_start_position_left) {
                    target_position = min_start_position_left;
                } else if (target_position > range_width) {
                    target_position = range_width;
                }

                draget_object.attr('data-value', target_position / range_width);
                draget_object.css('left', target_position);
                var max_num_value = Math.floor(target_position / range_width * range_difference) + min_num_number;
                draget_object.attr('data-current-number', max_num_value);
                if (object.hasClass('price-range')) {
                    max_num_value = numberWithCommas(max_num_value);
                }
                set_max_value_html(max_num_value);
                object.parent().find('.circle.' + max_btn_class +' .circle-tooltip .text').html(max_num_value);
            }
            var width_between_points =   max_btn.css('left').replace('px', '') - min_btn.css('left').replace('px', '') + object.find('.circle').width();
            object.parent().find('.range-line-active').css('width', width_between_points);
        }
    }
    function set_min_value_html (value) {
        let add_text = '';
        if (value > 1000000) {
            value = Math.floor(value / 100000) / 10;
            add_text = ' m';
        }
        if (number_with_comas) {
            object.parent().find('.' + min_text_class).html(numberWithCommas(value) + add_text);
        } else {
            object.parent().find('.' + min_text_class).html(value + add_text);
        }
    }
    function set_max_value_html (value) {
        let add_text = '';
        if (value > 1000000) {
            value = Math.floor(value / 100000) / 10;
            add_text = ' m';
        }
        if (number_with_comas) {
            object.parent().find('.' + max_text_class).html(numberWithCommas(value) + add_text);
        } else {
            object.parent().find('.' + max_text_class).html(value + add_text);
        }
    }
    function object_mouse_up (event) {
        if (drag_start == true) {
            drag_start = false;
            callback();
            //flats_filter_update();
        }
    }
}