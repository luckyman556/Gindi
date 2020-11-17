
$.fn.floors_selector = function() {
    var container = this;
    let slider;
    container.container_html = '';
    container.dragged = false;
    container.mouse_down_event = {};
    container.mouse_down_bool = false;
    container.last_scroll_time = new Date().getTime();
    container.current_top = 0;
    container.target_top = 0;
    container.current_track_index = 0;
    container.cells_count = 0;
    container.track = {};
    container.btns = {};
    container.set_track_floor = function (container, floor_index) {
        container.set_current_floor(floor_index);
    };
    container.rebuild = function () {
        container.rebuild();
    };
    floors_selector_init (container);
    function floors_selector_init (container) {

        window.floor_obj.forEach(function(item, index){
            let floor_number = index + globalSettings.base_floor;
            if (floor_number < 10) {
                floor_number = '0' + floor_number;
            }
            let htmlFloorNumber = window.floor_obj[index][0].userData.crm_data.floorNum;
            let floor_btn_html = `<div class="floor-btn floor-${index}" data-floor="${index}">
            <span class="number">${htmlFloorNumber  }</span>
            <span class="text language-string" data-dictionary="floor-upper">Floor</span>
        </div>`;
            container.container_html += floor_btn_html;
        });

        container.append('<div class="new-floors-selector-wrap track"></div>')
        container.find('.new-floors-selector-wrap').html(container.container_html);
        container.btns = container.find('.floor-btn');
        container.append('<div class="slider"><div class="slider-point"></div><div class="tooltip"></div></div>');
        // container.btns.click(floor_btn_click);
        container.btns.each(function(){
            $(this)[0].addEventListener('mousedown', floor_btn_mousedown , false);
            $(this)[0].addEventListener('touchstart', floor_btn_mousedown , false);

            $(this)[0].addEventListener('mouseup', floor_btn_mouseup ,false);
            $(this)[0].addEventListener('touchend', floor_btn_mouseup , false);

        });
        container[0].addEventListener('touchmove', floor_btn_mousemove , false);
        container[0].addEventListener('mousemove', floor_btn_mousemove , false);
        container[0].addEventListener('mouseleave', floor_btn_mouseleave , false);
        container[0].addEventListener('wheel', wheel_event , false);
        container.track = container.find('.new-floors-selector-wrap');

        function wheel_event (event) {
            let this_event_time = new Date().getTime();
            if (this_event_time - 500 > container.last_scroll_time) {
                container.last_scroll_time = this_event_time;
            }
            let start_y = 0;
            let start_top = container.target_top;
            let current_y = event.deltaY;
            let btn_height = container.btns[0].offsetHeight;
            // if (Math.sqrt(current_y * current_y) >= btn_height) {
            if (current_y >= btn_height) {
                current_y = (current_y > 0) ? btn_height - 1 : (btn_height + 1) * -1;
            }

            container.scrolled = true;
            track_move_new(start_y, current_y, start_top);
        }
        function floor_btn_mouseup (event) {
            container.mouse_down_bool = false;
            let this_el = $(event.currentTarget);
            let floor_index = $(this_el).data('floor');
            let target_floor_index = container.btns.length - container.current_track_index - 1;

            let event_speed = event.timeStamp - container.mouse_down_event.timeStamp;
            if (event_speed < 500) {
                let start_y = container.mouse_down_event.clientY;
                let final_y = event.clientY;
                if (container.mouse_down_event.touches != undefined) {
                    start_y = container.mouse_down_event.touches[0].clientY;
                    //console.log(event);
                    if (event.changedTouches != undefined) {
                        final_y = event.changedTouches[0].clientY;
                    }
                }
                let diff = start_y - final_y;
                if (Math.sqrt(diff * diff) > 10) {
                    let speed_ptt = diff / event_speed;
                    let btn_height = container.btns.outerHeight();
                    let mod = btn_height * (speed_ptt * speed_ptt);
                    if (diff < 0) {

                    } else {
                        mod = mod * -1;
                    }
                    let start_top  = container.target_top;
                    //console.log('to_fast');
                    //console.log(mod);
                    track_move (0, mod, start_top,  'click');
                    target_floor_index = container.btns.length - container.current_track_index - 1;
                }
            }
            if (container.dragged == true) {
                container.dragged = false;
                new_floor_selector_obj.target_top = get_current_position(target_floor_index) * -1;
                set_building_changes (target_floor_index);
            } else {
                set_current_floor (floor_index);
                container.temp_floor_index = floor_index;
                set_building_changes (floor_index)
            }
        }

        function set_building_changes (target_floor) {
            window.last_clicked_point_css.visible = false;
            $('.flat_status_2d_css.current').removeClass('current');
            $('body').removeClass('mini-card-open');
            container.rebuild();
            let floor_var = target_floor;
            if (target_floor > current_floor) {
                hide_all_labels();
                window.floor_obj.forEach(function (element, floor_index) {
                    let local_floor = element[0].userData.floor
                    if (local_floor <= floor_var) {
                        if (local_floor > current_floor) {
                            if (local_floor == target_floor) {
                                current_floor = floor_var;
                                add_floor(element, 0, 0, true);
                            } else {
                                add_floor(element, 0, 0);
                            }
                        }
                    }
                });
                // animate_height_on_floor(floor_var);
                current_floor = floor_var;
                set_floor_n_appartment (floor_var, 0);
                set_floor_status_color([floor_var]);
                let right_first_flat_index = window.floor_obj[floor_var][0].parent.userData.center_flat_index;
                let flat_parent = window.floor_obj[floor_var][0].parent;
                var flat = window.floor_obj[floor_var][0].parent.children[right_first_flat_index];
                setTimeout(function () {
                    if (globalSettings.flat_focus) {
                        let target_position =  flat.userData.defaultWorldPosition;
                        // console.log(target_position);
                        globalFunctions.animateTo(target_position,null, null, 1000, TWEEN.Easing.Sinusoidal.InOut);
                        last_clicked_flat = flat;
                        flat_click(flat, false, true);
                    } else {
                        let target_position = flat_parent.getObjectByName('zagluha').userData.defaultWorldPosition;
                        globalFunctions.animateTo(target_position, null, null, 1000, TWEEN.Easing.Sinusoidal.InOut);
                    }
                },100);
                var animation_frame_enable = true;
                function animation_frame_fn () {
                    if (animation_frame_enable) {
                        flat.updateWorldMatrix(true, false);
                        if (flat.children.length > 0) {
                            last_flat_intersection_point = flat.children[0].getWorldPosition(window.vector_point);
                        } else {
                            last_flat_intersection_point = flat.getWorldPosition(window.vector_point);
                        }
                        update_click_intersection();
                        requestAnimationFrame(animation_frame_fn);
                    }
                }
                requestAnimationFrame(animation_frame_fn);
                setTimeout(function(){
                    animation_frame_enable = false;
                }, 2000);
            } else if (floor_var < current_floor) {
                hide_all_labels();
                let right_first_flat_index = window.floor_obj[floor_var][0].parent.userData.center_flat_index;
                let flat_parent = window.floor_obj[floor_var][0].parent;
                var flat = flat_parent.children[right_first_flat_index];
                current_floor = floor_var;
                flat.updateWorldMatrix(true, false);

                if (globalSettings.flat_focus) {
                    let target_position =  flat.getWorldPosition(new global_three.Vector3());
                    globalFunctions.animateTo(target_position, null, null, 1000, TWEEN.Easing.Sinusoidal.InOut);
                    last_clicked_flat = flat;
                    flat_click(flat, false, false);
                } else {
                    let target_position = flat_parent.getObjectByName('zagluha').getWorldPosition(new global_three.Vector3());
                    globalFunctions.animateTo(target_position, null, null, 1000, TWEEN.Easing.Sinusoidal.InOut);
                }


                // set_camera_on_flat (flat);
                if (flat.children.length > 0) {
                    last_flat_intersection_point = flat.children[0].getWorldPosition(window.vector_point);
                } else {
                    last_flat_intersection_point = flat.getWorldPosition(window.vector_point);
                }
                update_click_intersection();
                if (flat.parent.children[0].name.search('zagluha') === -1) {
                    var floor_index = flat.parent.children[0].userData.floor;
                    var colored_floors = [floor_index];
                    colored_floors[1] = current_floor_before_minus;
                    set_floor_status_color (colored_floors);
                    current_floor = flat.parent.children[0].userData.floor;
                    destroy_building(current_floor);

                    // animate_height_on_floor(flat.userData.floor);
                    set_floor_n_appartment (flat.parent.children[0].userData.floor, flat.parent.children[0].userData.flat_i);
                } else {
                    var floor_index = flat.parent.children[1].userData.floor;
                    var colored_floors = [floor_index];
                    colored_floors[1] = current_floor_before_minus;
                    set_floor_status_color (colored_floors);
                    current_floor = flat.parent.children[1].userData.floor;
                    destroy_building(current_floor);

                    // animate_height_on_floor(flat.userData.floor);
                    set_floor_n_appartment (flat.parent.children[1].userData.floor, flat.parent.children[1].userData.flat_i);
                }
            }
        }

        function floor_btn_mouseleave () {
            if (container.dragged == true) {
                set_current_floor (container.temp_floor_index);
                set_building_changes (container.temp_floor_index)
            }
            container.mouse_down_bool = false;
            container.dragged = false;
            let target_floor_index = container.btns.length - container.current_track_index - 1;
            /*            container.track.animate(
                            {
                                'top' : get_current_position(target_floor_index) * -1
                            },
                            {
                                duration : 500,
                            }
                        );*/
            new_floor_selector_obj.target_top = get_current_position(target_floor_index) * -1;

        }
        function floor_btn_mousedown (event) {
            container.mouse_down_bool = true;
            container.mouse_down_event = event;
            //console.log(container.mouse_down_event);
            container.mouse_down_event.current_target_top  = container.target_top;
            container.current_top = Number(container.track.css('top').replace('px',''));


        }
        function floor_btn_mousemove (event) {
            event.preventDefault();
            if (container.mouse_down_bool == true) {
                let start_y = container.mouse_down_event.screenY;
                let start_top = container.mouse_down_event.current_target_top;
                let current_y = event.screenY;
                let type = 'click';
                if (container.mouse_down_event.touches != undefined) {
                    start_y = container.mouse_down_event.touches[0].screenY;
                    current_y = event.touches[0].screenY;
                    type = 'touch';
                }
                track_move (start_y, current_y, start_top , type);

            }
        }
        function track_move_new(start_y, current_y, start_top) {
            container.dragged = true;

            const btnLength = container.btns.length;
            const btn_height = container.btns[0].offsetHeight;
            const offset = ((container.cells_count - 1) / 2) * btn_height;
            let max_top  = btn_height * (btnLength - 1) - offset;
            let move_difference = start_y - current_y - 1;
            let target_top = ((start_top - move_difference) > offset) ? offset : start_top - move_difference;

            // console.log(container);
            // console.log('btn_height: ', btn_height);
            // console.log('offset: ', offset);
            // console.log('max_top: ', max_top);
            // console.log('move_difference: ', move_difference);
            // console.log('target_top: ', target_top);

            let position_sing = (target_top > 0) ? '+' : '-';

            let positive_current_top = Math.sqrt(target_top * target_top);

            if (positive_current_top > max_top - 1 )  {
                target_top = max_top * -1;
            }
            positive_current_top = Math.sqrt(target_top * target_top);

            new_floor_selector_obj.target_top = target_top;
            let current_position = Math.floor((positive_current_top + offset) / btn_height) + 1;
            let target_floor_index = container.btns.length - current_position;

            // console.log('position_sing: ', position_sing);
            // console.log('positive_current_top: ', positive_current_top);
            // console.log('current_position: ', current_position);
            // console.log('target_floor_index: ', target_floor_index);

            target_floor_index = (position_sing === '+') ? btnLength - (((container.cells_count - 1) / 2) -  Math.floor(positive_current_top / btn_height)) - 1 : target_floor_index;
            set_current_floor (target_floor_index);
            container.temp_floor_index = target_floor_index;
        }

        function track_move (start_y, current_y, start_top, type = 'click') {
            container.dragged = true;
            let btn_height = container.btns.eq(0).outerHeight();
            let offset = ((container.cells_count - 1) / 2) * btn_height;
            let max_top  = btn_height * (container.btns.length - 1) - offset;
            let move_difference = start_y - current_y - 1;
            let target_top = start_top - move_difference;

            // console.log('btn_height: ', btn_height);
            // console.log('offset: ', offset);
            // console.log('max_top: ', max_top);
            // console.log('move_difference: ', move_difference);
            // console.log('target_top: ', target_top);

            let position_sing = (target_top > 0) ? '+' : '-';

            if (target_top > offset) {
                target_top = offset;
            }

            let positive_current_top = Math.sqrt(target_top * target_top);
            if (positive_current_top > max_top - 1 )  {
                target_top = max_top * -1;
            }
            positive_current_top = Math.sqrt(target_top * target_top);
            //container.track.css('top', target_top);
            new_floor_selector_obj.target_top = target_top;
            let current_position = Math.floor((positive_current_top + offset) / btn_height) + 1;
            let target_floor_index = container.btns.length - current_position;

            // console.log('position_sing: ', position_sing);
            // console.log('positive_current_top: ', positive_current_top);
            // console.log('current_position: ', current_position);
            // console.log('target_floor_index: ', target_floor_index);

            if (position_sing == '-') {
                set_current_floor (target_floor_index);
                container.temp_floor_index = target_floor_index;
            } else {
                let floors_count  = container.btns.length;
                target_floor_index = floors_count - (((container.cells_count - 1) / 2) -  Math.floor(positive_current_top / btn_height)) - 1;
                set_current_floor (target_floor_index);
                container.temp_floor_index = target_floor_index;
            }
        }
        function get_current_position(floor_index){
            let position_difference = container.btns.length - floor_index;
            let btn_height = container.btns.eq(0).outerHeight();
            let position_if_in_on_top = btn_height * position_difference;
            let offset = ((container.cells_count + 1  ) / 2) * btn_height;
            let current_position = position_if_in_on_top - offset;
            return current_position;
        }

        function set_current_floor (floor_index) {
            container.btns.removeClass('active');
            let active_selector = '.floor-' + floor_index;
            $(active_selector).addClass('active');

            if (!container.dragged) {
                new_floor_selector_obj.target_top = get_current_position(floor_index) * -1;
            }

            container.floor_index = floor_index;
            container.current_track_index = container.btns.length - floor_index - 1;
        }

        container.set_current_floor = set_current_floor;
        function rebuild () {
            container.css({
                'height' : '',
                'transition-duration' : ''
            });
            setTimeout(function(){
                let current_height =  container.height();
                let cell_height = container.find('.floor-btn.active').outerHeight();
                let max_cells_count = Math.floor(current_height / cell_height);

                if ( max_cells_count & 1 ) {
                    set_css_prop (max_cells_count, cell_height);
                } else {
                    max_cells_count -= 1;
                    set_css_prop (max_cells_count, cell_height);
                }

                container.cells_count = max_cells_count;
                container.set_current_floor(container.floor_index);

                function set_css_prop (max_cells_count, cell_height) {
                    container.css({
                        'height' : max_cells_count * cell_height,
                        'transition-duration' : '0.5s',
                        'margin-top' : 'auto',
                        'margin-bottom' : 'auto',
                    });
                    container.find('.slider').css({
                        'height' : max_cells_count * cell_height
                    })
                }
            },1);
        }
        container.rebuild = rebuild;
        container.set_building_changes = set_building_changes;
        container.get_current_position = get_current_position;

        // floor_selector_slider
        slider = container.find('.slider');
        {
            let start_event;
            let selector_height;
            let dragged = false;
            let clicked = false;
            slider[0].addEventListener('mousedown', slider_mouse_down);
            slider[0].addEventListener('mousemove', slider_mouse_move);
            slider[0].addEventListener('mouseup', slider_mouse_up);
            slider[0].addEventListener('mouseleave', slider_mouse_up);
            slider[0].addEventListener('mouseleave', slider_mouse_leave);
            slider.target_top = 0;
            slider.start_top = 0;

            function slider_mouse_down (event) {
                if ($(event.target).hasClass('slider-point')) {
                    dragged = true;
                    start_event = event;
                    selector_height = container.height();
                    let slider_top = Number(slider.find('.slider-point').css('top').replace('px',''));
                    let slider_top_percent = slider_top / selector_height * 100;
                    slider.start_top = slider_top_percent;
                } else {
                    clicked = true;
                }
            }

            function set_slider_changes (target_top) {
                if (target_top < 0) {
                    target_top = 0;
                } else if (target_top > 100) {
                    target_top = 100;
                }

                slider.target_top = target_top;
                slider.find('.slider-point').css({
                    top : slider.target_top + '%'
                });

                let current_floor_index = get_curent_floor_index (slider.target_top);
                slider.current_floor_index = current_floor_index;
                set_current_floor(current_floor_index);
            }
            function get_curent_floor_index (target_top) {
                let current_floor_index = Math.floor(target_top / 100 * container.btns.length) + 1;
                current_floor_index = container.btns.length - current_floor_index;
                return current_floor_index;
            }
            function slider_mouse_move (event) {
                if (dragged == true) {
                    let diff = (start_event.clientY - event.clientY) / selector_height * 100;
                    let target_top = slider.start_top - diff;
                    set_slider_changes (target_top);
                    slider.find('.tooltip').hide();
                } else {
                    if ($(event.target).hasClass('slider-point') == false) {
                        let tooltip = slider.find('.tooltip');
                        tooltip.show();
                        selector_height = container.height();
                        let slider_top = event.pageY - container[0].offsetTop;
                        let slider_top_percent = slider_top / selector_height * 100;
                        let current_floor_index = get_curent_floor_index(slider_top_percent) + globalSettings.base_floor;
                        tooltip.html(current_floor_index)
                    } else {
                        slider.find('.tooltip').hide();
                    }
                }
            }
            function slider_mouse_up (event) {
                dragged = false;
                if (clicked == true) {
                    selector_height = container.height();
                    let slider_top = event.pageY - container[0].offsetTop;
                    let slider_top_percent = slider_top / selector_height * 100;
                    set_slider_changes (slider_top_percent);
                    set_building_changes(slider.current_floor_index);
                    clicked = false;
                } else {
                    set_building_changes(slider.current_floor_index);
                }
            }
            function slider_mouse_leave () {
                slider.find('.tooltip').hide();
            }
        }
    }
    container.slider = slider;
    $(window).resize(function(){
        new_floor_selector_obj.rebuild();
        setTimeout(function(){
            new_floor_selector_obj.rebuild();
        },500);
    });
    return container;
};
