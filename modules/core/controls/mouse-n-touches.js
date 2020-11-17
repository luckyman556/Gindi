import {customSelectionClick} from "./customSelectionClick.js";

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
        if (this_is_flat_click) {
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
        console.log('click')
        if (flatClickHandler) {
            if (e.changedTouches) {
                if ($(e.target).parents('.non-canvas').length > 0) {
                    return false;
                }
                if ($(e.target).hasClass('non-canvas')) {
                    return false;
                }
            }
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
                                if ($('.filter-controls.on-back').length > 0) {
                                    flatClickWithOpenFilter ()
                                } else {
                                    document.querySelector('.main-wrap').replace_filters_n_cards();
                                    flatClickWithOpenFilter ();
                                }
                                function flatClickWithOpenFilter () {
                                    let card_id = picked_object.userData.crm_data.bmbyPropID;
                                    // $('.card-' + card_id).click();
                                    window.card_clicked = false;
                                    var popup_info = $('.popup-info');
                                    set_appartment_data_in_block (picked_object, popup_info);
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
                if (picked_object.userData.customSelection) {
                    this_is_flat_click = 'customSelection';
                    let clicked_object = $('.click-point');
                    customSelectionClick(picked_object);
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

    if (get_url_param('dev')) {
        new ClipboardJS('body');
        document.querySelector('.three_js').addEventListener( 'click', function(event){
            if(event.altKey) {
                let raycaster =  new global_three.Raycaster();
                raycaster.setFromCamera(mouse, perspectiveCamera);
                let objectToRaycast = [];
                addRaycastObject (scene);
                function addRaycastObject (object) {
                    if (object.visible) {
                        objectToRaycast.push(object);
                    }
                    object.children.forEach(function(children){
                        addRaycastObject(children);
                    });
                }
                let intersects = raycaster.intersectObjects(objectToRaycast, false);
                let intersectObject = 'none';
                intersects.forEach(function(intersect){
                    let object = intersect.object;
                    if (intersectObject === 'none') {
                        if (object.visible) {
                            if (object.type !== "TransformControlsPlane") {
                                intersectObject = intersect;
                            }
                        }
                    }
                });
                if (intersectObject !== 'none') {
                    if (mouseMode == 'Objects removing') {
                        if (!window.removed_objects) {
                            window.removed_objects = [];
                        }
                        window.removed_objects.push({
                            'child': intersectObject.object,
                            'parent': intersectObject.object.parent
                        });
                        intersects[0].object.parent.remove(intersectObject.object);
                    }

                    if (mouseMode == 'Objects info') {
                        console.log(intersectObject.object.name);
                        console.log(intersectObject.point);
                        document.querySelector('body').dataset.clipboardText = intersects[0].object.name;
                        $('body').click();
                    }
                    if (mouseMode == 'Objects transform') {
                        control.detach();
                        setTimeout(function () {
                            control.attach(intersects[0].object);
                        }, 500);
                    }

                    if (mouseMode == 'addRandomBorders') {
                        let geometry = new global_three.BoxGeometry(1, 5, 1);
                        let material = new global_three.MeshBasicMaterial({color: 0x00ff00});
                        let cube = new global_three.Mesh(geometry, material);
                        let position = intersectObject.point;
                        cube.position.set(position.x, position.y, position.z);
                        if (!window.RandomBorders) {
                            window.RandomBorders = [];
                        }
                        scene.add(cube);
                        window.RandomBorders.push(cube);
                    }


                    if (mouseMode == 'cloneObject') {
                        if (!window.objectToClone) {
                            setObjectToClone();

                            function setObjectToClone() {
                                let name = prompt('Имя объекта для клонирования');
                                let object = scene.getObjectByName(name);
                                window.objectToClone = object;
                                if (!object) {
                                    let confirmBool = confirm('Такого объекта нет, ввести другое имя?');
                                    if (confirmBool) {
                                        setObjectToClone();
                                    }
                                }
                            }
                        } else {
                            let object = window.objectToClone.clone();
                            if (!window.objecsToCloneArray) {
                                window.objecsToCloneArray = [];
                            }
                            window.objecsToCloneArray.push(object);
                            let p = intersectObject.point;
                            object.position.set(p.x, p.y, p.z);
                            scene.add(object);
                            control.attach(object);
                        }

                    }
                }
            }
        }, false );

        window.addEventListener( 'keydown', function ( event ) {
            if (event.ctrlKey) {
                if (event.code === 'KeyZ') {
                    if (mouseMode == 'Objects removing') {
                        if (window.removed_objects) {
                            if (window.removed_objects.length > 0) {
                                let object = window.removed_objects[window.removed_objects.length - 1];
                                let child = object.child;
                                let parent = object.parent;
                                parent.add(child);
                                window.removed_objects.pop()
                            }
                        }
                        window.removed_objects.push(intersects[0].object);
                        intersects[0].object.parent.remove(intersects[0].object);
                    }
                    if (mouseMode == 'addRandomBorders') {
                        if (window.RandomBorders.length > 0) {
                            let object = window.RandomBorders[window.RandomBorders.length - 1];
                            scene.remove(object);
                            window.RandomBorders.pop();
                        }
                    }
                    if (mouseMode == 'cloneObject') {
                        if (window.objecsToCloneArray.length > 0) {
                            let object = window.objecsToCloneArray[window.objecsToCloneArray.length - 1];
                            control.detach();
                            scene.remove(object);
                            window.objecsToCloneArray.pop();
                        }
                    }
                }
            }
        });
    }

}

