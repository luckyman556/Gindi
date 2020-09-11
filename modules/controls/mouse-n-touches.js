export function add_mouse_n_touches () {
    let last_tap = Date.now();
    let last_tap_flat = last_clicked_flat;
    document.querySelector('.three_js').addEventListener( 'mousemove', onTouchMove, false );
    document.querySelector('.three_js').addEventListener( 'touchmove', onTouchMove , false);
    document.querySelector('.three_js').addEventListener( 'touchstart', onTouchMove , false);
    $('.non-canvas').click(function(){
        this_is_flat_click = false;
    });
    document.querySelector('.three_js').addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.querySelector('.three_js').addEventListener( 'touchstart', onDocumentMouseDown, false );
    document.addEventListener('dblclick', double_click_n_tap);
    document.querySelector('.three_js').addEventListener( 'touchstart', function (e) {
        if (Date.now() - 200 < last_tap) {
            if (last_tap_flat = last_clicked_flat) {
                double_click_n_tap (e);
            }
        }
        last_tap = Date.now();
        last_tap_flat = last_clicked_flat;
    }, false );
    function double_click_n_tap (e) {
        if (this_is_flat_click == true) {
            let popup_info = $('.popup-info');
            popup_info.removeClass('show');
            popup_info.addClass('hide');
            $('.point-1').hide();
            $('.point-2').hide();
            $('.points-line').addClass('hide');
            toggler_2d_click ($('.click-point'));
            // $('.flat-plan .popups-togglers-box div.toggler-2d').click();
            setTimeout(function(){
                var popup_info = $('.popup-info');
                popup_info.addClass('show');
                popup_info.removeClass('hide');
                $('.point-1').fadeIn();
                $('.point-2').fadeIn();
                $('.points-line').removeClass('hide');
            }, 500);
        }
        if (this_is_flat_click == 'roof_n_looby') {
            let popup_info = $('.popup-info');
            popup_info.removeClass('show');
            popup_info.addClass('hide');
            $('.point-1').hide();
            $('.point-2').hide();
            $('.points-line').addClass('hide');
            toggler_non_flat_360_click ($('.click-point'));
            // $('.flat-plan .popups-togglers-box div.toggler-2d').click();
            setTimeout(function(){
                var popup_info = $('.popup-info');
                popup_info.addClass('show');
                popup_info.removeClass('hide');
                $('.point-1').fadeIn();
                $('.point-2').fadeIn();
                $('.points-line').removeClass('hide');
            }, 500);
        }
    }
    function onTouchMove( event ) {

        if ($(event.target).parents('.non-canvas').length == 0) {
            intersection_on = true;
            var x, y;
            if ( event.changedTouches ) {
                x = event.changedTouches[0].pageX;
                y = event.changedTouches[0].pageY;
                touch_event_runing = true;
            } else {
                x = event.clientX;
                y = event.clientY;
            }
            current_mouse_position.x = x;
            current_mouse_position.y = y;
            mouse.x = ( (x - $('#c').offset().left) / document.querySelector('#c').offsetWidth ) * 2 - 1;
            mouse.y = - ( (y - $('#c')[0].getBoundingClientRect().top) / document.querySelector('#c').offsetHeight ) * 2 + 1;
        } else {
            intersection_on = false;
        }
    }

    function onDocumentMouseDown( event )
    {
        var x, y;
        if ( event.changedTouches ) {
            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
        } else {
            x = event.clientX;
            y = event.clientY;
        }
        current_mouse_position.x = x;
        current_mouse_position.y = y;
        mouse.x = ( (x - $('#c').offset().left) / document.querySelector('#c').offsetWidth ) * 2 - 1;
        mouse.y = - ( (y - $('#c')[0].getBoundingClientRect().top) / document.querySelector('#c').offsetHeight ) * 2 + 1;
        model_autorotate = false;
        last_interaction = Date.now();
        if ($(event.target).parents('.non-canvas').length == 0) {
            if (event.type == 'mousedown') {
                if (event.which == 1) {
                    document.addEventListener('mouseup', flat_mouse_click);
                }
            }
            if (event.type == 'touchstart') {
                intersection_on = true;
                document.addEventListener('touchend', flat_mouse_click);
            }
            drag_move = false;
        } else {
            document.removeEventListener('mouseup', flat_mouse_click);
            document.removeEventListener('touchend', flat_mouse_click);
            drag_move = false;
        }

    }

    function flat_mouse_click (e) {

        checkIntersection();
        intersection_on = false;
        set_click_point_coords(e);
        if (picked_object != undefined) {
            if (picked_object.userData.crm_data != undefined) {
                last_clicked_flat = picked_object;
                if (last_clicked_flat.userData.crm_data.status == 'Available') {
                    this_is_flat_click = true;
                } else {
                    this_is_flat_click = true;
                }
                if (drag_move != true) {
                    if (e.type == 'mouseup') {
                        if (e.which == 1) {
                            click_handler ();
                        }
                    }
                    if (e.type == 'touchend') {
                        picked_object.material.opacity = standard_flat_opacity;
                        if (two_touches != true) {
                            click_handler ();
                        }
                    }
                } else {
                    drag_move = false;
                }

                function click_handler () {
                    let filter_container = document.querySelector('.main-wrap');
                    if (filter_container.filter_active) {
                        if (document.querySelector('.filter-module-container.open')) {
                            console.log('filter_open');
                            if ($('.filter-controls.on-back').length > 0) {
                                let card_id = picked_object.userData.crm_data.bmbyPropID;
                                // $('.card-' + card_id).click();
                                window.card_clicked = false;
                                trigger_card_click ();
                                function trigger_card_click () {
                                    $('.card-' + card_id).click();
                                    if (!window.card_clicked) {
                                        setTimeout(function(){
                                            trigger_card_click ();
                                        },100);
                                    }
                                }
                                $('.main-wrap')[0].set_scroll_on_card(card_id);
                            } else {
                                flat_click(picked_object);
                            }
                        } else {
                            flat_click(picked_object);
                        }
                    } else {
                        flat_click(picked_object);
                    }
                }

            } else {
                this_is_flat_click = false;
            }
            if (picked_object.userData.lobby_or_roof != undefined) {
                this_is_flat_click = 'roof_n_looby';
                let clicked_object = $('.click-point');
                lobby_n_roof_click(picked_object, e, clicked_object);
            }

        } else {
            this_is_flat_click = false;
        }
        touch_event_runing = false;
        drag_move = false;
        if (window.floor_number_object) {
            if (!drag_move) {
                let floor_i = window.floor_number_object.userData.floor_i;
                if (!lock_mouse_rotation_x) {
                    last_clicked_flat = window.floor_obj[floor_i][0];
                    current_floor = floor_i;
                    let bomb_btn = $('.bomb-btn');
                    bomb_btn.trigger('click');
                    $('.floor-plan-toggler').addClass('active');
                    new_floor_selector_obj.set_current_floor(floor_i);
                    new_floor_selector_obj.temp_floor_index = floor_i;
                    new_floor_selector_obj.set_building_changes(floor_i);
                } else {
                    new_floor_selector_obj.set_current_floor(floor_i);
                    new_floor_selector_obj.temp_floor_index = floor_i;
                    new_floor_selector_obj.set_building_changes(floor_i);

                    current_floor = floor_i;
                }
            }
        }
    }
}