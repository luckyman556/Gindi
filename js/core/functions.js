var THREE;
var tween_animations = {};
var current_floor_before_minus;
var raycaster;
var labelRenderer;
var css_3d_Renderer;
var lock_mouse_rotation_x = false;
var positioning_mode = false;
var last_visible_floor;
var perspectiveCamera;
var lock_flat_angle_rotation = false;
var current_floor = 0;
var second_model = {};
var picked_object;
var this_is_flat_click = false;
var last_dragged_object;
var light;
var EUR_currency = '';
var GBP_currency = '';
var ILS_currency = '';
var renderer;
var svg_array = {};
var control;
var first_download = true;
var camera_rotated = false;
var raf_divergention_x = 0;
var raf_divergention_y = 0;
var far_current_click_camera_x;
var far_current_click_camera_position_y;
var far_current_click_camera_rotation_x;
var mouse_move_time;
var two_touches = false;
var disable_touch_handlers = false;
var touch_event_runing = false;
var canvas;
var last_clicked_flat = null;
var composer;
var mouse;
var object_to_opacity = [];
var current_mouse_position =  {
    x : 0,
    y : 0
};
var scene;
var effectFXAA;
var selectedObjects = [];
var selectedObjects_2 = [];
var last_hover_object;
var outlinePass;
var outlinePass_2;
var vector;
var box;
var flooring_obj = [];
var three_d_text, three_d_text_2;
var model_loaded = false;
var drag_move = false;
var tempV;
var scale_coef;
var mouse_wheel_info_time_ended;
var all_floors = [];
var lock_floor_controls = false;
var world_y_position_of_floors = [];
var vector_to_world_position;
var projects_animation = false;
var flat_selector_dragged = false;
var targetRotationX = 0;
var targetRotationOnMouseDownX = 0;
var rotation_animated = false;
var emissive_mat_name = 'Selected_flat';
var sorted_json = [];
var allways_show_tooltip = true;
var floors_track_animated = false;
var last_flat_intersection_point;
var line;
var update_line_position_enabled = false;
var click_flat_intersection_point;
var old_back = false;
var transform_controls = true;
var scroll_controls_dragger = false;
var model_autorotate = false;
var last_interaction = Date.now();
var lock_autorotate = false;
var zoom_by_mousewheel = false;
var target_zoom = perspectiveCamera_position_z;
var global_three;
var objects_to_intersection = [];
var objects_that_locked = {};
if (findGetParameter('version') == 'old') {
    old_back = true
};
var opacity_animations = [];
var new_floor_selector_obj;
var gama_factor = 1;
var all_appartments = [];
var customSelections = [];
var instanced_floors = {};
var instanced_floors_switch = [];

var flat_labels_group = [];
var textures_counter = 0;
var loaded_texture_counter = 0;
var visual_slider;
var floors_slider_top_mod = 0.1;
var intersection_on = false;
var first_action = true;
var floor_plan_btn_last_click = Date.now();
var street_names_objs = [];
var floors_height_positions = [];
var target_offset_stroke = 1200;
var current_offset_stroke = 1200;
var human_animation_array  = [];

var add_points_mode = false;
var add_car_points_mode = false;
var car_route_points_groups = [];
var car_route_points_array = [];
var car_route_lines = [];
var human_route = [];
var low_performance_mode = false;
var dictionary;
var crmStatusLoadBool = false;
var progressLoaderObj = {};
var globalFunctions = {};
var lastSearchCardClick = Date.now();
var flatClickHandler = true;
var intersectionHandler = true;
var loading_object = {};
var resources_object = {};
var destroyedMode = false;
var detectMobile = detect_mobile();
//detectMobile = true;
if (get_url_param('forceMobile') == 'true') {
    detectMobile = true;
}
var mouseMode = null;
var globalGui;
var globalGuiParams = [];
var objectToDisappear = [];
//
function animate_obj_scale(target_scale, obj, duration = 1000, delay = 0, easing = TWEEN.Easing.Quintic.In) {
    add_tween_animation ({
        'animation_obj' :  tween_animations,
        'start' : {scale : obj.scale.y},
        'target' : {  scale : target_scale  },
        'duration' : duration,
        'easing' : easing,
        'delay' : delay
    }, function (e) {
    }, function (e) {
        obj.scale.set(e.scale,e.scale ,e.scale);
    }, function (e) {

    });
}
function set_floor_n_appartment (floor_i, flat_i) {
    $('.title-with-selector .flat-selector').html('');
    var appartment = window.floor_obj[current_floor][flat_i];
    var popup_info = $('.popup-info');
    set_appartment_data_in_block (appartment, popup_info);
    if (last_clicked_flat != appartment) {
        set_appartment_data_in_block (appartment, popup_info);
        /*        $('.point-1').fadeOut();
                $('.point-2').fadeOut();
                $('.points-line').addClass('hide');*/
        window.last_clicked_point_css.visible = false;
        popup_info.removeClass('show');
        popup_info.addClass('hide');
    }
    // last_clicked_flat = appartment;
    window.floor_obj[current_floor].forEach((flat, flat_index) => {
        if (flat.name !== 'zagluha') {
            var flat_name_number = flat.userData.crm_data.propNum;
            if  (flat_name_number < 10) {
                flat_name_number =   '0' + String(flat_name_number);
            }
            var active_class = '';
            if (flat_index == flat_i) {
                active_class = 'active';
            }
            $('.title-with-selector .flat-selector').append('<div class="' + active_class +'" data-flat-count="' + flat_index + '">Flat ' + flat_name_number + '</div>');
        }
    });
    $('.title-with-selector .flat-selector div').click(title_selector_click);
    setTimeout(function(){
        current_floor_before_minus = current_floor;
    }, 100);

    set_floor_track_position_center (current_floor);
    $('.left-floors-selector .floor-selector-item').removeClass('active');
    $('.left-floors-selector .floor-selector-item').removeClass('prev-1');
    $('.left-floors-selector .floor-selector-item').removeClass('prev-2');
    $('.left-floors-selector .floor-selector-item').removeClass('next-1');
    $('.left-floors-selector .floor-selector-item').removeClass('next-2');
    $('.left-floors-selector .floor-selector-item').eq(current_floor).addClass('active');
    $('.left-floors-selector .floor-selector-item').eq(current_floor - 1).addClass('prev-1');
    $('.left-floors-selector .floor-selector-item').eq(current_floor - 2).addClass('prev-2');
    $('.left-floors-selector .floor-selector-item').eq(current_floor + 1).addClass('next-1');
    $('.left-floors-selector .floor-selector-item').eq(current_floor + 2).addClass('next-2');
    set_page_descriptions ();
}
function set_floor_status_color (colored_floors) {
    var floors_counter = 0;
    while (  floors_counter < window.floor_obj.length) {
        var while_counter = 0;
        if (window.floor_obj[floors_counter] != undefined) {
            flats_count = window.floor_obj[floors_counter].length;
            while (while_counter < flats_count) {
                floor_appartment = window.floor_obj[floors_counter][while_counter];
                floor_appartment.material.map = null;
                if (floor_appartment.userData.color_filter_locked == true) {
                    change_flat_color ('base', floor_appartment );
                    floor_appartment.material.opacity = standard_flat_opacity;
                    floor_appartment.userData.color_locked = true;
                } else {
                    floor_appartment.material.opacity = 0;
                    floor_appartment.userData.color_locked = false;
                    change_flat_color ('base', floor_appartment );
                }
                while_counter++;
            }
        }
        floors_counter++;
    }
    var colored_floors_counter = 0;
    if (lock_mouse_rotation_x == true) {
        while (colored_floors_counter < colored_floors.length) {
            var floor_index = colored_floors[colored_floors_counter];
            var while_counter = 0;
            var flats_count = window.floor_obj[floor_index].length;
            while (while_counter < flats_count) {
                var floor_appartment = window.floor_obj[floor_index][while_counter];
                floor_appartment.material.opacity = standard_flat_opacity;
                floor_appartment.userData.color_locked = true;
                while_counter++;
            }
            colored_floors_counter++;
        }
    }
    if (last_clicked_flat == null) {
        last_clicked_flat = all_appartments[0];
    }
    change_flat_color ('active', last_clicked_flat);
    last_clicked_flat.material.opacity = standard_flat_opacity;
    last_clicked_flat.material.map = scene.userData.active_boxes_texture;
}
function animate_camera_angle (angle, duration = 1000, delay = 0, easing = TWEEN.Easing.Quintic.In) {
    add_tween_animation ({
        'animation_obj' :  tween_animations,
        'start' : {x : window.camera_target.children[0].rotation.x},
        'target' : {  x : angle  },
        'duration' : duration,
        'easing' : easing,
        'delay' : delay
    }, function (e) {
        window.camera_target.children[0].rotation.x = e.x;
    }, function (e) {

    });
}
function animate_height_on_floor (floor_i, duration = 1000, delay = 0, easing = TWEEN.Easing.Quintic.In) {
    add_tween_animation ({
        'animation_obj' :  tween_animations,
        'start' : {camera_height :  window.camera_target.position.y},
        'target' : { camera_height :  world_y_position_of_floors[floor_i]},
        'duration' : duration,
        'easing' : easing,
        'delay' : delay
    }, function (e) {
        window.camera_target.position.y = e.camera_height;
        update_line_position();
    }, function (e) {

    });
}

function update_click_intersection () {
    click_flat_intersection_point =  {};
    if (last_flat_intersection_point) {
        var point_x = JSON.parse(JSON.stringify(last_flat_intersection_point.x));
        var point_y = JSON.parse(JSON.stringify(last_flat_intersection_point.y));
        var point_z = JSON.parse(JSON.stringify(last_flat_intersection_point.z));
        click_flat_intersection_point.x = point_x;
        click_flat_intersection_point.y = point_y;
        click_flat_intersection_point.z = point_z;
    }
}

function flat_click (appartment, without_card = false , disableAnyAnimation = false) {
    const flatCard = document.querySelector('.popup-info');
    const btn360 = flatCard.querySelector('.three_js .popup-info .flat-plan .popups-togglers-box div.toggler-2d');

    if (this_is_flat_click) {
        btn360.classList.remove('hide');
    }

    btn360.setAttribute('data-dictionary', `Floor plan`);
    btn360.innerText = get_lang(`Floor plan`);

    const printBtn = document.querySelector('.print-btn');
    if (printBtn.classList.contains('hide')) {
        printBtn.classList.remove('hide');
    }

    if (appartment.userData.crm_data.status !== 'Available' && !this_is_flat_click) {
        btn360.classList.add('hide');
    }

    last_clicked_flat = appartment;
    if (get_url_param('dev')) {
        new ClipboardJS('body');
        document.querySelector('body').dataset.clipboardText = appartment.name;
        $('body').click();
    }
    objects_to_intersection.forEach(item => {
        item.material.opacity = 0;
        item.userData.color_locked = false;
        item.userData.apartment_locked = false;
    });
    window.floor_obj.forEach(floor => floor[0].parent.userData.center_flat_index = last_clicked_flat.userData.flat_i);

    if (scene.userData.lastCustomSelectionId) {
        let flatCard = document.querySelector('.popup-info');
        flatCard.classList.remove('custom-selection');
        let object = scene.getObjectById(scene.userData.lastCustomSelectionId);
        if (document.querySelector('.unit_info-points')) $('.unit_info-points').remove();
        if (object) {
            object.userData.color_locked = false;
            appartment_hoverout(object)
            setTimeout(function(){
                scene.userData.lastCustomSelectionId = null;
            }, 100);
        }
    }
    if (flatClickHandler) {
        $('.pulse').addClass("run-animation");
        setTimeout(function(){
            $('.pulse').removeClass("run-animation");
        },50);
        //$('.flat-bubble').trigger('click');

        $('.flat_status_2d_css').removeClass('current');
        $(flat_labels_group[appartment.userData.flat_i].element).addClass('current')

        var floor_index = appartment.userData.floor;
        var colored_floors = [floor_index];
        var floor = appartment.userData.floor;
        update_click_intersection();
        if (lock_mouse_rotation_x != true) {
            current_floor = floor;
            set_floor_status_color (colored_floors);
        }  else {
            if (!disableAnyAnimation) {
                set_camera_on_flat(appartment);
            }

            if (current_floor >= appartment.userData.floor) {
                colored_floors[1] = current_floor_before_minus;

                set_floor_status_color (colored_floors);
                if (current_floor !== appartment.userData.floor) {
                    current_floor = appartment.userData.floor;
                    hide_all_labels();
                    destroy_building(current_floor);
                }
            }
        }
        set_floor_n_appartment (appartment.userData.floor, appartment.userData.flat_i);
        // appartment.userData.apartment_locked = true;
        appartment.userData.color_locked = true;
        update_line_position();
        if (!without_card) {
            var popup_info = $('.popup-info');
            set_appartment_data_in_block (appartment, popup_info);
            /*    $('.point-1').fadeIn();
                $('.point-2').fadeIn();
                $('.points-line').removeClass('hide');*/
            // window.last_clicked_point_css.visible = true;
            popup_info.addClass('show');


            if ($(window).width() < 1024) {
                if ($('body').hasClass('mini-card-open') == true) {

                } else {
                    $('body').addClass('mini-card-open');
                    new_floor_selector_obj.rebuild();
                }
                if ($('.search-btn').hasClass('open') == true) {
                    $('.search-btn .current-part').trigger('click');
                }
            }
            popup_info.removeClass('hide');
        } else {
            var popup_info = $('.popup-info');
            popup_info.addClass('show');
            popup_info.addClass('hide');
        }


        if (!disableAnyAnimation) {
            if (!lock_mouse_rotation_x) {
                rotation_to_flat();
            }
        }
        if (globalSettings.flat_focus) {
            if (lock_mouse_rotation_x) {
                if (!disableAnyAnimation) {
                    globalFunctions.animateTo(appartment.userData.defaultWorldPosition, null, null, 1000, TWEEN.Easing.Sinusoidal.InOut);
                }
            }
        }
        // if (!buildingDestroyed) {
        //     all_appartments.forEach(item => {
        //         if (item !== last_clicked_flat) {
        //             item.userData.apartment_locked = false;
        //         }
        //     });
        // }
        /*    if (advanced_flat_click == true ) {
                flat_click_animation (appartment, 'z');
            }*/
    }
}

function eventFire(el, etype){
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

function add_tween_animation ( args, callback , on_complete_callback) {
    var  animation_obj = args.animation_obj;
    var  start = args.start;
    var  target = args.target;
    var  duration = args.duration;
    var  easing = args.easing;
    var  delay = args.delay;
    animation_name = 'animation_' + animation_obj.length;
    var animation = new TWEEN.Tween(start).to(target, duration);
    TWEEN.add(animation);
    animation.delay(delay);
    animation.onUpdate(callback);
    animation.onComplete(on_complete_callback);
    animation.easing(easing);
    animation.start();
}

function add_tween_animation_new ( args, callback = function(){} , on_complete_callback = function(){},on_start_callback = function(){}) {
    var  start = args.start;
    var  target = args.target;
    var  duration = args.duration;
    var  easing = args.easing;
    var  delay = args.delay;
    var animation = new TWEEN.Tween(start).to(target, duration);
    TWEEN.add(animation);
    animation.delay(delay);
    animation.onStart(on_start_callback);
    animation.onUpdate(callback);
    animation.onComplete(on_complete_callback);
    animation.easing(easing);
    animation.start();
}

function appartment_hoverout (appartment) {
    if (appartment.userData.current_color == 'color') {
        let color = flat_statuses[appartment.userData.status_index].color;
        appartment.material.color.setHex('0x' + color);
    }
    if (appartment.userData.current_color == 'active') {
        let color = flat_statuses[appartment.userData.status_index].active;
        appartment.material.color.setHex('0x' + color);
    }


    if (appartment.userData != undefined) {
        let opacity = standard_flat_opacity;
        if (appartment == last_clicked_flat) {
            opacity = hover_flat_opacity;
        }
        if (appartment.userData.apartment_locked == true) {

        } else {
            if (appartment.userData.color_filter_locked == true) {
                appartment.material.opacity = opacity;
            } else {
                if (appartment.userData.color_locked == true ) {
                    appartment.material.opacity = opacity;
                } else {
                    appartment.material.opacity = 0;
                }
            }
        }
    }
}

function appartment_hover (appartment) {

    if (appartment.userData.apartment_locked == true) {
        appartment.material.opacity = hover_flat_opacity;
        let color = flat_statuses[appartment.userData.status_index].hover;
        appartment.material.color.setHex('0x' + color);
    } else {
        if (appartment.userData.color_locked == true) {
            appartment.material.opacity = hover_flat_opacity;
            let color = flat_statuses[appartment.userData.status_index].hover;
            appartment.material.color.setHex('0x' + color);
        } else {
            appartment.material.opacity = hover_flat_opacity;
            let color = flat_statuses[appartment.userData.status_index].hover;
            appartment.material.color.setHex('0x' + color);
        }
    }
    document.querySelector('#c').style.cssText = 'cursor : pointer;';
    if (lock_mouse_rotation_x == false) {
        var flat_bubble = $('.flat-bubble');
        if (flat_bubble.is(":visible")) {
            globalFunctions.flatBubble.updateText(appartment);
            globalFunctions.flatBubble.updatePosition(current_mouse_position.y, current_mouse_position.x);
            globalFunctions.flatBubble.show();
            //flat_number_bubble('update', appartment.children[0]);
        } else {
            globalFunctions.flatBubble.updateText(appartment);
            globalFunctions.flatBubble.updatePosition(current_mouse_position.y, current_mouse_position.x);
            globalFunctions.flatBubble.show();
            /*                flat_number_bubble('update', appartment.children[0]);
                            flat_number_bubble('show', appartment.children[0]);*/
        }
        if (appartment.userData.customSelection) {
            if (last_hover_object != appartment) {
                if (last_hover_object) {
                    appartment_hoverout(last_hover_object);
                    last_hover_object = appartment;
                }
            }
        } else {
            last_hover_object = appartment;
        }
    } else {
        last_hover_object = appartment;
    }


}

function set_appartment_data_in_block (appartment, box) {
    if (appartment.userData.crm_data) {
        var flat_name_number = appartment.userData.flat_counter;
        if  (flat_name_number < 10) {
            flat_name_number =   '0' + String(flat_name_number);
        }
        var flat_price = appartment.userData.crm_data.salePrice;
        flat_price = get_price_html(flat_price, 'common');

        $('.popup-info').removeClass('roof_n_looby');
        $('.popup-info').removeClass('roof');

        let apt_title_text = 'Apt.';
        let apt_title_text_he =   'דירה';
        let current_apt_title = apt_title_text;

        if ($('body').hasClass('he') ) {
            current_apt_title = apt_title_text_he;
        }
        let apt_title = '' +
            '<div class="title-text-row"><span class="title-text language-string" data-he="' + apt_title_text_he + '" data-en="' + apt_title_text +'">' + current_apt_title + '</span>' +
            '<span class="type">' +  appartment.userData.crm_data.modelName + '</span>' +
            '<span class="number">' + appartment.userData.crm_data.propNum + '</span>' +
            '</div>';
        if (appartment.userData.crm_data.concessions !== undefined) {
            if (appartment.userData.crm_data.concessions.length > 0) {

                if (appartment.userData.crm_data.concessions[0].title.length > 0) {
                    apt_title = apt_title + '<span class="gift"></span>';
                }
            }
        }

        if (appartment.userData.crm_data.status === "Sold") {
            $('.price').addClass('non-price');
            flat_price =`<span class="price-sold price-status language-string" data-dictionary="Sold">${get_lang('Sold')}</span>`;
        } else if (appartment.userData.crm_data.status === "Unavailable") {
            $('.price').addClass('non-price');
            flat_price =`<span class="price-unavailable price-status language-string" data-dictionary="Unavailable">${get_lang('Unavailable')}</span>`;
        } else {
            $('.price').removeClass('non-price');
        }
        box.find('.title-with-selector .page-title .text').html(apt_title);
        box.find('.flat-plan .price .bottom-part').html(flat_price);


        // tag add Unit card options
        let optionsLength = globalSettings.cardsInfoSettings.UnitCardOptions.length;
        let optionsAddClass = '';
        box.find('.flat-options').removeClass('three-elements');
        box.find('.flat-options').removeClass('two-elements');
        if (optionsLength === 3) {
            optionsAddClass = 'three-elements';
        }
        if (optionsLength === 2) {
            optionsAddClass = 'two-elements';
        }
        box.find('.flat-options').addClass(optionsAddClass);
        box.find('.flat-options').html(globalFunctions.cardsInfoHTML.getUnitCardOptionsHtml(globalSettings.cardsInfoSettings.UnitCardOptions, appartment.userData.crm_data));

        // add Unit card options end
        box.find('.flat-plan .flat-status .text').html(appartment.userData.status_name);
        box.find('.flat-plan .flat-status .circle').css('background-color', '#' + appartment.userData.status_color);


        $('body').attr('data-current-app-index', all_appartments.indexOf(appartment));

        const price_box = $('.three_js .flat-plan .price');
        if (appartment.userData.status_index === 1) {
            price_box.show();
            $('.three_js .flat-plan').removeClass('unavailable');
            box.find('.flat-plan').removeClass('min');
        } else {
            box.find('.flat-plan').addClass('min');
            $('.three_js .flat-plan').addClass('unavailable');
            price_box.hide();
        }

        bind_price_box_btn (box.find('.flat-plan .price'), ['.number', '.price-text']);

        if (appartment.userData.url_360_type === 'custom') {
            $('.toggler-2d').addClass('icon-360');
        } else {
            $('.toggler-2d').removeClass('icon-360');
        }
    }
}

function addSelectedObject( object ) {
    selectedObjects = [];
    selectedObjects.push( object );
}

function change_camera_rotate_x (event, mouseXOnMouseDown) {
    var windowHalfX = document.getElementById('c').offsetWidth / 2;
    if (event.type == 'touchmove') {
        mouseX = event.touches[0].pageX - windowHalfX;
    }
    if (event.type == 'mousemove') {
        mouseX = event.pageX - windowHalfX;
    }
    targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.01 * -1;

    /*    var divergention_x = raf_divergention_x;
        var current_move = divergention_x * 0.6;

        if (current_move != 0) {
            var rotation = current_move / 18 / (Math.PI * 2);
            var move_target = far_current_click_camera_x + rotation;
            var degree = move_target * (180/Math.PI);
            move_target = degree / (180/Math.PI);
            window.camera_target.rotation.y =  move_target;
        }*/
}
function normilize_camera_rotation_x () {
    var current_rotation = window.camera_target.rotation.y;
    var degree = rotation_in_degree(current_rotation);
    var move_target = degree / (180/Math.PI);
    targetRotationX = move_target;
    window.camera_target.rotation.y = move_target;
}

function get_normilize_camera_rotation_x () {
    var current_rotation = window.camera_target.rotation.y;
    var degree = rotation_in_degree(current_rotation);
    var move_target = degree / (180/Math.PI);
    return move_target;
}

function rotation_in_degree (current_rotation) {
    var degree = current_rotation / (2 * Math.PI) * 360;
    if (degree < 0) {
        if (degree < -360) {
            degree = degree + 360 * Math.trunc(degree / -360);
        }
        degree = degree + 360;
    } else {
        if (degree > 360) {
            degree = degree - 360 * Math.trunc(degree / 360);
        }
    }
    return degree;
}


function change_camera_position_y () {
    if (raf_divergention_y != 0) {
        var move_target_y = far_current_click_camera_position_y + (raf_divergention_y * -0.1);
        if (move_target_y < min_camera_y) {
            move_target_y = min_camera_y;
        }
        if (move_target_y > max_camera_y) {
            move_target_y = max_camera_y;
        }
        window.camera_target.position.y =  move_target_y;
    }
}

function drag_focus_target (e, basePosition, baseRotation) {
    // back-front

    if (raf_divergention_y != 0 || raf_divergention_x != 0) {
        let newVector = new global_three.Vector3(raf_divergention_x, 0,raf_divergention_y);
        let group = new global_three.Group();
        group.position.set(basePosition.x, basePosition.y, basePosition.z);
        group.rotation.set(baseRotation.x, baseRotation.y, baseRotation.z);
        scene.add(group);
        group.updateWorldMatrix(true);
        let worldNewVectorPosition = group.localToWorld(newVector);
        let mesh = scene.getObjectByName('cameraTargetParent');
        mesh.position.set(newVector.x, newVector.y, newVector.z);
        scene.remove(group);
    }
}

function drag_focus_target_x (e, basePosition, baseRotation) {
    // left-right
    if (raf_divergention_x != 0) {
        let newVector = new global_three.Vector3(raf_divergention_x, 0,0);
        let group = new global_three.Group();
        group.position.set(basePosition.x, basePosition.y, basePosition.z);
        group.rotation.set(baseRotation.x, baseRotation.y, baseRotation.z);
        scene.add(group);
        group.updateWorldMatrix(true);
        let worldNewVectorPosition = group.localToWorld(newVector);
        let mesh = scene.getObjectByName('cameraTargetParent');
        mesh.position.set(newVector.x, newVector.y, newVector.z);
        scene.remove(group);
    }
}

function change_camera_rotation_x () {
    if (raf_divergention_y != 0) {
        var move_target_y = far_current_click_camera_rotation_x - (raf_divergention_y * 0.002 * -1);
        let min = globalSettings.fullBuilding.cameraLimits.rotation.children_x.max;
        let max = globalSettings.fullBuilding.cameraLimits.rotation.children_x.min;
        if (lock_mouse_rotation_x) {
            min = globalSettings.destroyedBuilding.cameraLimits.rotation.children_x.max;
            max = globalSettings.destroyedBuilding.cameraLimits.rotation.children_x.min;
        }
        if (!get_url_param('dev')) {
            if (move_target_y > min) {
                move_target_y = min;
            }
            if (move_target_y < max) {
                move_target_y = max;
            }
        }
        window.camera_target.children[0].rotation.x =  move_target_y;
    }
}

function title_selector_click () {
    this_index = $(this).index();
    // set_floor_n_appartment (current_floor, this_index);
    flat_click(window.floor_obj[current_floor][this_index]);
    $('.title-with-selector .flat-selector').removeClass('active');
    $('.title-with-selector .page-title .down.btn').removeClass('active');
}

function add_floor (floor, base_delay , floor_delay = 0, last_floor = false) {
    let floor_local = floor;

    var camera_angle = -0.1;
    var camera_y = window.floor_obj[floor[0].userData.floor - 1][0].getWorldPosition(vector_to_world_position).y;
    var camera_zoom = 10;
    if (lock_mouse_rotation_x) {
        camera_angle = -0.46;
    } else {
        camera_y = 4.5;
        camera_zoom = 15;
    }

    let floor_index = current_floor;
    let floor_of_mesh = floor[0].userData.floor;
    let floor_scale = window.floor_obj[floor_of_mesh][0].parent.userData.base_scale;
    window.floor_obj[floor_of_mesh][0].parent.visible = true;
    window.floor_obj[floor_of_mesh][0].parent.scale.set(floor_scale.x,floor_scale.y,floor_scale.z);
    let floor_key = floor_of_mesh + globalSettings.base_floor;
    let mesh = instanced_floors[floor_key].mesh;
    let count = instanced_floors[floor_key].count;
    let start_position = {
        x : instanced_floors[floor_key].position[0],
        y : instanced_floors[floor_key].position[1],
        z : instanced_floors[floor_key].position[2],
        scale : 1,
    };
    let target_position = {
        x :  instanced_floors[floor_key].position[0] + instanced_floors[floor_key].diff.x *  (50 * (floor_of_mesh - floor_index )),
        y :   instanced_floors[floor_key].position[1] + instanced_floors[floor_key].diff.y *  (50 * (floor_of_mesh - floor_index )),
        z :   instanced_floors[floor_key].position[2] + instanced_floors[floor_key].diff.z *  (50 * (floor_of_mesh - floor_index )),
        scale : 0,
    };
    instanced_floors[floor_key].hidden = false;
    let matrix = new global_three.Matrix4();

    if (last_floor) {
        matrix.makeRotationFromEuler(instanced_floors[floor_key].rotation);
        matrix.scale ( new global_three.Vector3(1,1,1) );
        matrix.setPosition (start_position.x,  start_position.y, start_position.z );
        mesh.setMatrixAt(count,matrix);
        mesh.instanceMatrix.needsUpdate = true;
        update_line_position();
        floor_appear_animation ();
    } else {
        add_tween_animation ({
            'animation_obj' :  tween_animations,
            'start' : target_position,
            'target' : start_position,
            'duration' : 1000,
            'easing' : TWEEN.Easing.Exponential.Out,
            'delay' : 0
        }, function (e) {

            matrix.makeRotationFromEuler(instanced_floors[floor_key].rotation);
            matrix.scale ( new global_three.Vector3(1,1,1) );
            matrix.setPosition (e.x,  e.y, e.z );
            mesh.setMatrixAt(count,matrix);
            mesh.instanceMatrix.needsUpdate = true;
            update_line_position();

            window.floor_add_animation = true;
        }, function (e) {
            window.floor_add_animation = false;
            update_line_position();
        });
    }

    // var duration = 500;

    // add_floor_animation (floor_local , duration , floor_delay)

}

function loadJSON(callback , file_path) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file_path, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}


function resizeRendererToDisplaySize(renderer,composer) {
    var canvas_width = document.getElementById('c').innerWidth;
    var canvas_height = document.getElementById('c').innerHeight;
    var aspect = canvas_width/ canvas_height;
    perspectiveCamera.aspect = aspect;
    perspectiveCamera.updateProjectionMatrix();
    renderer.setSize( canvas_width, canvas_height );
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}




function checkIntersection() {
    if (intersectionHandler) {
        if (mouse.x != 0 || mouse.y != 0) {
            var intersects = raycaster.intersectObjects(objects_to_intersection, false);
            if (intersects.length > 0) {
                var selectedObject = intersects[0].object;
                picked_object = selectedObject;
                if (drag_move != true) {
                    if (selectedObject.userData.crm_data != undefined) {
                        last_flat_intersection_point = intersects[0].point;

                        if (last_hover_object != undefined) {
                            if (selectedObject != last_hover_object) {
                                appartment_hoverout(last_hover_object);
                                appartment_hover(selectedObject);
                            } else {
                                appartment_hover(selectedObject);
                            }
                        } else {
                            appartment_hover(selectedObject);
                            window.hover_object = selectedObject;
                        }
                        // appartment_hoverout(window.lobby);
                        // appartment_hoverout(window.roof);
                    } else {
                        if (selectedObject.userData.customSelection) {
                            last_flat_intersection_point = intersects[0].point;
                            appartment_hover(selectedObject);
                        } else {
                            not_flat_function();
                        }
                    }
                } else {
                    not_flat_function()
                }

            } else {
                not_flat_function();
            }

            function not_flat_function() {
                picked_object = undefined;


                if (window.floor_numbers_intersection) {
                    document.querySelector('#c').style.cssText = '';
                }
                let allSelections = [];
                all_appartments.concat(customSelections).forEach(function (appartment, ap_index) {
                    if (appartment.userData.color_locked != true) {
                        appartment_hoverout(appartment);
                    }
                });
                globalFunctions.flatBubble.hide();
               // flat_number_bubble('hide');
                if (last_hover_object != undefined) {
                    if (selectedObject != last_hover_object) {
                        if (last_hover_object.userData != undefined) {
                            appartment_hoverout(last_hover_object);
                        }
                    }
                }
            }

            {
                // intersection for floor numbers
                if (window.text_groups) {
                    let intersects = raycaster.intersectObjects(window.text_groups, true);
                    if(intersects.length) {
                        if (intersects[0].object.name == 'text') {
                            window.floor_numbers_intersection = true;
                            document.querySelector('#c').style.cssText = 'cursor : pointer';
                            window.floor_number_object = intersects[0].object.parent;
                        }  else {
                            window.floor_numbers_intersection = false;
                            document.querySelector('#c').style.cssText = '';
                            window.floor_number_object = undefined;
                        }

                    } else {
                        window.floor_numbers_intersection = false;
                        document.querySelector('#c').style.cssText = '';
                        window.floor_number_object = undefined;
                    }
                }
            }

        }
    }
}

function destroy_building (current_floor_var , flat = null) {
    enableSwitcherBtns(false);
    tween_animations = [];
    objectToDisappear.forEach(obj => object_disappear(obj, 1, 0));
    update_line_position_enabled = true;

    if (!lock_mouse_rotation_x) {
        if (!flat) {
            flat = last_clicked_flat;
        }
        if (globalSettings.flat_focus) {
            let target_position =  flat.userData.defaultWorldPosition;
            globalFunctions.animateTo(target_position, {x : globalSettings.animations.destroyBuilding.rotation.x}, globalSettings.destroyedBuilding.cameraPosition.zoom, 1000, TWEEN.Easing.Sinusoidal.InOut);
            last_clicked_flat = flat;
            flat_click(flat, false, true);
        } else {
            let target_position = flat.parent.getObjectByName('zagluha').userData.defaultWorldPosition;

            let defaultZoom = globalSettings.destroyedBuilding.cameraPosition.zoom
            if (detectMobile) {
                defaultZoom = globalSettings.destroyedBuilding.cameraPosition.mobile_zoom;
            }
            globalFunctions.animateTo(target_position, {x : globalSettings.animations.destroyBuilding.rotation.x}, defaultZoom, 1000, TWEEN.Easing.Sinusoidal.InOut);
        }
    }

    update_line_position_enabled = true;
    setTimeout(function(){ update_line_position_enabled = false;}, 4000);

    setTimeout(function(){
        lock_mouse_rotation_x = true;
        set_floor_status_color ([current_floor]);
        set_page_descriptions ();
        update_line_position();
    }, 1000);
    window.floor_obj.forEach(function(element, floor_index){
        let user_data_floor = element[0].userData.floor;
        if (user_data_floor > current_floor_var) {
            let floor_key = floor_index + globalSettings.base_floor;
            let mesh = instanced_floors[floor_key].mesh;
            let count = instanced_floors[floor_key].count;
            if (user_data_floor != current_floor_var) {
                window.floor_obj[floor_index][0].parent.visible = false;
                 window.floor_obj[floor_index][0].parent.scale.set(0,0,0);
        }

        let start_position = {
            x :   instanced_floors[floor_key].position[0],
            y :   instanced_floors[floor_key].position[1],
            z :   instanced_floors[floor_key].position[2],
            scale : 1,
        };
        let target_position = {
            x :   instanced_floors[floor_key].position[0] + instanced_floors[floor_key].diff.x *  (38 + (user_data_floor - current_floor_var)),
            y :   instanced_floors[floor_key].position[1] + instanced_floors[floor_key].diff.y *  (38 + (user_data_floor - current_floor_var)),
            z :   instanced_floors[floor_key].position[2] + instanced_floors[floor_key].diff.z *  (38 + (user_data_floor - current_floor_var)),
            scale : 0,
        };
        let matrix =  instanced_floors[floor_key].matrix;
        let an_counter = 0;

        if (user_data_floor == current_floor + 1) {
            matrix.setPosition (target_position.x,  target_position.y, target_position.z );
            matrix.scale ( new global_three.Vector3(0,0,0) );
            mesh.setMatrixAt(count,matrix);
            mesh.instanceMatrix.needsUpdate = true;
            instanced_floors[floor_key].hidden = true;
        } else {
            add_tween_animation ({
                'animation_obj' :  tween_animations,
                'start' : start_position,
                'target' : target_position,
                'duration' : 1000,
                'easing' : TWEEN.Easing.Sinusoidal.InOut,
                'delay' : 0
            }, function (e) {
                matrix.makeRotationFromEuler(instanced_floors[floor_key].rotation);

                if (instanced_floors[floor_key].hidden != true) {
                    matrix.scale ( new global_three.Vector3(1,1,1) );
                } else {
                    matrix.scale ( new global_three.Vector3(0,0,0) );
                }
                matrix.setPosition (e.x,  e.y, e.z );
                mesh.setMatrixAt(count,matrix);
                mesh.instanceMatrix.needsUpdate = true;
                an_counter++;
            }, function (e) {
                matrix.scale ( new global_three.Vector3(0,0,0) );
                mesh.setMatrixAt(count,matrix);
                mesh.instanceMatrix.needsUpdate = true;
                instanced_floors[floor_key].hidden = true;
            });

        }
    }
});
floor_appear_animation();
}

function filter_flats () {
    var locked_colors = [];
    $('.search-toggle-part ul li.active').each(function(){
        locked_colors.push($(this).data('filter'));
    });
    all_appartments.forEach(function(flat){
        flat.userData.color_filter_locked = false;
    });
    locked_colors.forEach(function(item){
        all_appartments.forEach(function(flat){
            if (flat.userData.status_index == item) {
                flat.userData.color_filter_locked = true;
            }
        });
    });
    set_floor_status_color([current_floor]);
}


function position_on_canvas (appartment){
    var cube = appartment;
    // get the position of the center of the cube
    if (cube.userData.world_position == undefined) {
        cube.updateWorldMatrix(true, false);
        cube.getWorldPosition(tempV);
        cube.userData.world_position = new global_three.Vector3(tempV.x,tempV.y, tempV.z);
        cube.userData.temp_vector = new global_three.Vector3(cube.userData.world_position.x,cube.userData.world_position.y, cube.userData.world_position.z);
    } else {
        cube.userData.temp_vector.set(cube.userData.world_position.x,cube.userData.world_position.y, cube.userData.world_position.z);
    }
    let temp_vector = cube.userData.temp_vector;
    // get the normalized screen coordinate of that position
    // x and y will be in the -1 to +1 range with x = -1 being
    // on the left and y = -1 being on the bottom
    temp_vector.project(perspectiveCamera);


    // convert the normalized position to CSS coordinates
    const x = (temp_vector.x * .5 + .5) * document.querySelector('#c').clientWidth;
    const y = (temp_vector.y * -.5 + .5) * document.querySelector('#c').clientHeight;
    return [x,y];
    // document.querySelector(selector).style.zIndex = Math.floor(y);
    // return world_position;
}
function set_floor_track_position_center (current_floor) {
    new_floor_selector_obj.set_track_floor(new_floor_selector_obj, current_floor);
    /*    var items_in_view = 3;
        var all_items_length = document.querySelectorAll('.left-floors-selector .floor-selector-item').length;
        var center_item_offset = Math.floor(items_in_view/2);
        var min_change_floor_number = center_item_offset;
        var max_change_floor_number = all_items_length - center_item_offset - 1;
        if (current_floor <= max_change_floor_number && current_floor >= min_change_floor_number) {
            var position_difference = (all_items_length - current_floor - center_item_offset - 1);
            set_floor_track_position(position_difference);
        }
        if (current_floor > max_change_floor_number) {
            var position_difference = (all_items_length - max_change_floor_number - center_item_offset - 1);
            set_floor_track_position(position_difference);
        }
        if (current_floor < min_change_floor_number) {
            var position_difference = (all_items_length - min_change_floor_number - center_item_offset - 1);

            set_floor_track_position(position_difference);
        }*/
}
function set_floor_track_position (position) {
    var track_step = document.querySelector('.left-floors-selector .floor-selector-item').offsetHeight;
    var target_top = Number(track_step * position * -1);
    document.querySelector('.left-floors-selector').style.top = target_top + 'px';
    document.querySelector('.left-floors-selector').dataset.position = position;
}

function set_page_descriptions () {
    if (lock_mouse_rotation_x) {
        $('.floor-form').addClass('floor-plan-mode');
        $('.floor-form .page-description').html('HaAlon 20 <span class="divider"></span> Floor View');
        var floor_text = current_floor + 1;
        $('.floor-form .text-box span').html('Floor ' + floor_text);
        var floor_number = current_floor + 1;
        if  (floor_number < 10) {
            floor_number =   '0' + String(floor_number);
        }
        $('.title-text-rown .flat-plan-box .page-description').html('Floor '+ floor_number  +' <span class="divider"></span> Apt plan view');
        if (current_floor == 18) {
            $('.floor-form .relative-block .btn.plus').css({
                'transform' : 'scale(0)'
            })
        } else {
            $('.floor-form .relative-block .btn.plus').css({
                'transform' : ''
            })
        }
        if (current_floor == 0) {
            $('.floor-form .relative-block .btn.minus').css({
                'transform' : 'scale(0)'
            })
        } else {
            $('.floor-form .relative-block .btn.minus').css({
                'transform' : ''
            })
        }
    } else {
        $('.floor-form').removeClass('floor-plan-mode');
        //$('.floor-form .page-description').html('3D View');
        //$('.floor-form .text-box span').html('HaAlon 20');
        var floor_number = current_floor + 1;
        if  (floor_number < 10) {
            floor_number =   '0' + String(floor_number);
        }
        $('.flat-plan .flat-plan-box .page-description').html('Floor '+ floor_number  +' <span class="divider"></span> Apt plan view');

    }
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function updateURLParameter(url, param, paramVal)
{
    var TheAnchor = null;
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";

    if (additionalURL)
    {
        var tmpAnchor = additionalURL.split("#");
        var TheParams = tmpAnchor[0];
        TheAnchor = tmpAnchor[1];
        if(TheAnchor)
            additionalURL = TheParams;

        tempArray = additionalURL.split("&");

        for (var i=0; i<tempArray.length; i++)
        {
            if(tempArray[i].split('=')[0] != param)
            {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }
    else
    {
        var tmpAnchor = baseURL.split("#");
        var TheParams = tmpAnchor[0];
        TheAnchor  = tmpAnchor[1];

        if(TheParams)
            baseURL = TheParams;
    }

    if(TheAnchor)
        paramVal += "#" + TheAnchor;

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}
function add_appartment_info_in_popup (box) {
    box.find('.flat-info').remove();
    box.find('.floor-info-row').remove();
    // var flat = all_appartments[$('body').attr('data-current-app-index')];

    var flat = last_clicked_flat;

    if (!scene.userData.lastCustomSelectionId) {
        var flat_name_number = (flat.userData.crm_data.propNum < 10) ? `0${flat.userData.crm_data.propNum}` : flat.userData.crm_data.propNum;
        var flat_price = flat.userData.crm_data.salePrice;
        var flat_square = flat.userData.crm_data.totalSpace;
        var badrooms = flat.userData.crm_data.roomNum;
        var bathrooms = flat.userData.crm_data.bathRooms;
        var balcony = flat.userData.crm_data.balconySize;
        var facing = flat.userData.crm_data.facing;
        let facing_translates = globalSettings.exposure.dictionary;

        let facing_string_array = facing.split(',');
        let facing_string_en = '';
        let facing_string_he = '';

        facing_string_array.forEach(function(facing_item){
            let sep = (facing_string_en.length === 0 || facing_string_he.length === 0) ? ', ' : '';

            facing_string_en += sep + facing_translates[facing_item];
            facing_string_he += sep + facing_item;
        });

        var flat_type = flat.userData.crm_data.propType;
        let flat_types_translates = {
            'דירה' : 'apt.type'
        };
        let flat_type_en = flat_types_translates[flat_type];
        let flat_type_he = flat_type;

        flat_type = flat_type_en;
        var engine_id = flat.userData.crm_data.modelName;
        var floor = flat.userData.floor;
        if (flat.userData.int_360) {
            if ((typeof flat.userData.int_360) !== 'string') {
                let slider_box = $('.three_js .popup-3d .content .slider-box');
                slider_box.empty();
                let array_360 = flat.userData.int_360;
                let slider_html = '<div class="slider">';
                array_360.forEach(function(src){
                    // slider_html += '<div class="slide"><img src="' + 'https://dreamseu.z6.web.core.windows.net/new/dev/gindi/visual/' +  src +'"   sizes="(max-width: 550px) 300px,(max-width: 767px) 768px,(max-width: 1024px) 1024px,2000px" srcset="'  + 'http://dreamsimages.bmby.com/cdn-cgi/image/width=300/new/dev/gindi/visual/' +  src + ' 300w,  '  + 'http://dreamsimages.bmby.com/cdn-cgi/image/width=768/new/dev/gindi/visual/' +  src + ' 768w,  '  + 'http://dreamsimages.bmby.com/cdn-cgi/image/width=1024/new/dev/gindi/visual/' +  src + ' 1024w,  '  + 'http://dreamsimages.bmby.com/cdn-cgi/image/width=2000/new/dev/gindi/visual/' +  src + ' 2000w" alt=""></div>';
                    slider_html += '<div class="slide"><img src="" data-image-name="' + src + '" alt=""></div>';
                });
                slider_html += '</div>';
                slider_box.html(slider_html);
                slider_box.find('.slider').slick({
                    arrows: true,
                });
            } else {
                const new_iframe_3d = '<iframe src="' +  flat.userData.int_360  +'"></iframe>';
                if ( new_iframe_3d != $('.three_js .popup-3d .content .iframe-box').html()) {
                    $('.three_js .popup-3d .content .iframe-box').html(new_iframe_3d);
                    $('.slider-box').hide();
                }
            }


        } else {
            $('.three_js .popup-3d .content .iframe-box').html('');
        }

        let status_text = (flat.userData.status_index !== 0) ? 'available' : 'unavailable';

        let concessions_html = '';

        if (flat.userData.crm_data.concessions) {
            let concessions_array = flat.userData.crm_data.concessions;
            if (concessions_array.length > 0) {
                let concessions_title = flat.userData.crm_data.concessions[0].title;
                if (concessions_title.length > 0) {
                    concessions_html = `
                    <div class="concessions">
                        <div class="gift"></div>
                        <div class="concessions-text"> ${ concessions_title } </div>
                    </div>
                `;
                }
            }
        }

        let apt_name_he =  'דירה ' + flat_name_number;
        let apt_name_current = `Apt. ${ flat_name_number }`;

        let from_word = 'from';
        let form_word_he = 'החל מ-';
        let form_word_current = from_word;

        let price_html = get_price_html(flat_price, 'common');

        let more_info_word = 'show info';
        let more_info_word_he ='עוד מידע';
        let more_info_word_current = more_info_word;

        let hide_word = 'hide';
        let hide_word_he = 'לסגור';
        let hide_word_current = hide_word;

        let floor_word = 'floor';
        let floor_word_he ='קומה';
        let floor_word_current = floor_word;

        let badrooms_word = 'rooms';
        let badrooms_word_he ='חדרים';
        let badrooms_word_current = badrooms_word;

        let bathrooms_word = 'bathrooms';
        let bathrooms_word_he ='חדרי רחצה';
        let bathrooms_word_current = bathrooms_word;

        let balcony_word = 'balcony size';
        let balcony_word_he ='גודל מרפסת';
        let balcony_word_current = balcony_word;

        let area_word = 'area';
        let area_word_he ='אזור';
        let area_word_current = area_word;

        let exposure_word = 'exposure';
        let exposure_word_he ='כיווני אוויר';
        let exposure_word_current = exposure_word;

        // let apply_now_word = 'Apply now';
        // let apply_now_word_he ='פרטים נוספים';
        // let apply_now_word_current = apply_now_word;

        let facing_word = facing_string_en;
        let facing_word_he = facing_string_he;
        let facing_word_en = facing_string_en;

        if ($('body').hasClass('he') == true) {
            apt_name_current = apt_name_he;
            form_word_current = form_word_he;
            more_info_word_current = more_info_word_he;
            floor_word_current = floor_word_he;
            badrooms_word_current = badrooms_word_he;
            bathrooms_word_current = bathrooms_word_he;
            balcony_word_current = balcony_word_he;
            area_word_current = area_word_he;
            exposure_word_current = exposure_word_he;
            // apply_now_word_current = apply_now_word_he;
            facing_word = facing_word_he;
            flat_type = flat_type_he;
            hide_word_current = hide_word_he;
        }

        let apply_now_html = '';

        if (window.showApplyNow) {
            const mobileBtnsContainer = document.querySelector('.content');

            apply_now_html =  `<div class="apply-now scroll_to_contacts language-string ${window.innerWidth < 415 ? `apply-now-mobile` : ''}" data-dictionary="Apply now">${get_lang('Apply now')}</div>`;

            if ($('body').hasClass('page-template-only-model')) {
                apply_now_html =  `<a class="${window.innerWidth < 415 ? `apply-now-mobile` : ''} apply-now language-string" href="/contact-us/?app_id=' + flat_name_number + '" data-dictionary="Apply now">${get_lang('Apply now')}</a>`;
            }

            if (window.innerWidth < 415) {
                mobileBtnsContainer.insertAdjacentHTML('beforeend', `${apply_now_html}`);
            }
        }


        let flatOptions = globalFunctions.cardsInfoHTML.getPopupCardOptionsHtml(globalSettings.cardsInfoSettings.PopupCardOptions, flat.userData.crm_data);
        let html = `
            <div class="flat-info ${ (flat.userData.status_index !== 0) ? 'available' : 'unavailable' }">
                <div class="title">
                    <div class="title-box">
                        <h2 class="language-string" data-he="${apt_name_he}" data-en="Apt. ${ flat_name_number }">${apt_name_current}</h2>
                    </div>
                    <div class="sep"></div>
                    <div class="price">
                        <p class="text language-string" data-he="${form_word_he}" data-en="${from_word}">${form_word_current}</p>
                        <div class="price-num">${price_html}</div>
                    </div>
                </div>
                <div class="status">
                    <p class="circle" style="background-color: #${flat.userData.status_color}"></p>
                    <p class="text" style="color: #${flat.userData.status_color}">${flat.userData.status_name}</p>
                </div>
                ${ concessions_html }
            <div class="more-info">
                <div class="top-part">
                    <p class="title more-info-tgl-btn-title">${more_info_word_current}</p>
                    <p class="title more-info-tgl-btn-title active">${hide_word_current}</p>
                    <div class="tgl-btn"></div>
                </div>
                <div class="bottom-part">
                <div class="info-loop">
                    ${flatOptions}
                </div>
                ${detectMobile ? '' : apply_now_html }
            </div>
            </div>
            </div>            
            ${detectMobile ? apply_now_html :  ''}
            `;
        box.find('.apply-now').remove();
        box.prepend(html);
        bind_price_box_btn (box.find('.price-box.common'), ['.number', '.price-text']);
        $('.scroll_to_contacts').click(function(){
            $('.btn-new.default.contact').trigger('click');
        });
    } else {

        // TODO add info-points to popup (roof, spa, lobby)
        flat = scene.getObjectById(scene.userData.lastCustomSelectionId);
        let title = flat.userData.title;
        let data = {
            info_points: flat.userData.info_points,
            icons: flat.userData.icons,
        };
        add_html_to_non_flat(box, title, data);

    }
    return flat;
}

function add_html_to_non_flat (box, name, data) {
    const printBtn = document.querySelector('.print-btn');
    printBtn.classList.add('hide');

    let html = '';
    let isArray =  Array.isArray(data.info_points);
    if (isArray) {
         get_html_from_data (name, data);
    } else {
        if (!document.querySelector('.floor-info-row')) {
            html += '<div class="floor-info-row">';
        }
        Object.keys(data.info_points).forEach(function(key) {
            let name = data.info_points[key].title;
            let newData = {
                info_points: data.info_points[key].info_points,
                icons: data.icons[key].icons,
            };
            get_html_from_data (name, newData);
        });
        if (!document.querySelector('.floor-info-row')) {
            html += '</div>';
        }
    }
    function get_html_from_data (name, data) {
        let show_data_text = data.info_points.map((data) => {return `<span data-dictionary="${data}">${get_lang(data)}</span>`});
        let show_data_img = data.icons.map((data) => {return `<img src="./img/uninhabited-floor-icons/${data}.svg">`});

        let content = ``;

        for (let i = 0; i < show_data_text.length; i++) {
            content += `<div class="uninhabited-info_item">
            ${show_data_img[i]}
            ${show_data_text[i]}
        </div>`
        }

        let returnHtml = `
            <div class="floor-info flat-info">
                <div class="title">
                    <div class="title-box">
                        <h2 class="language-string" data-dictionary="${name}">${get_lang(name)}</h2>
                    </div>
                    <div class="sep"></div>
                </div>
                <div class="more-info uninhabited-info">  
                       ${content}
                </div>
            </div>`;
        html += returnHtml;

    };

    box.prepend(html);
}

function add_data_to_info_points_roof_n_lobby(box, data) {
    let show_data_text = data.info_points.map((data) => {return `<span class="language-string" data-dictionary="${data}">${get_lang(data)}</span>`});
    let show_data_img = data.icons.map((data) => {return `<img src="./img/uninhabited-floor-icons/${data}.svg">`});

    let content = ``;

    for (let i = 0; i < show_data_text.length; i++) {
        content += `<div class="uninhabited-info_item unit_info-points_items">
            ${show_data_img[i]}
            ${show_data_text[i]}
        </div>`
    }

    let html = `<div class="uninhabited-info unit_info-points">${content}</div>`;
    box.after(html);
}


function line_from_point_to_point (point_1, point_2, options) {
    let line_class = options.line_class;
    let point_1_class = options.point_1_class;
    let point_2_class = options.point_2_class;
    var line = $('.' + line_class);
    var temp_1 = point_1;
    var temp_2 = point_2;
    if (point_1[1] > point_2[1]) {
        point_1 = temp_2;
        point_2 = temp_1;
        line.removeClass('reverse');
    } else {
        line.addClass('reverse');

        var dif =  point_2[1] - point_1[1];
        if (dif > 250) {
            point_2[1] = point_2[1] - 250;
        }

    }

    var point_1_selector =  $('.' + point_1_class);
    point_1_selector.css('top', point_1[0]);
    point_1_selector.css('left', point_1[1]);
    var point_2_selector =  $('.' + point_2_class);
    point_2_selector.css('top', point_2[0]);
    point_2_selector.css('left', point_2[1]);
    var distance_1 = point_1[0] - point_2[0];
    if (distance_1 < 0) {
        distance_1 = distance_1 * -1;
    } else {
    }
    var distance_2 = point_1[1] - point_2[1];

    if (distance_2 < 0) {
        distance_2 = distance_2 * -1;
    } else {
    }
    var distance_3 = Math.sqrt((distance_1 * distance_1) + (distance_2 * distance_2));
    var degree = 0;
    degree =  (Math.asin(distance_1 / distance_3) * 180) / Math.PI;
    if (point_1[0] > point_2[0]) {
        degree = degree * -1;
    }  else {
    }
    line.css({
        'top' : point_1[0],
        'left' : point_1[1],
        'width' : distance_3 + 'px',
        'transform' : 'rotateZ(' + degree  +'deg)'
    });
}
function update_line_position () {
    if (click_flat_intersection_point != null) {


        let p  = click_flat_intersection_point;
        let point = window.last_clicked_point_css;
        point.position.set(p.x , p.y  , p.z );
        // point.element.innerHTML = inner_html;
        // point.visible = true;
    }
}
function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
}

function flat_number_bubble (action = 'show', intersection_object = null) {
    // flat_bubble script
    var bubble = $('.flat-bubble');
    var icon_360 = '<img src="./img/bubble-360.svg" alt="icon-360", wigth="24", height="24">';
    if (action == 'update') {
        let modelName = `<span class="model-name">${intersection_object.parent.userData.crm_data.modelName}</span>`;
        let propNum = `<span class="prop-num">${intersection_object.parent.userData.crm_data.propNum}</span>`;
        (intersection_object.parent.userData.url_360_type === 'custom') ?
            bubble.html( propNum + ' &#183; ' +  modelName + '' + icon_360 ) :
            bubble.html( propNum + ' &#183; ' +  modelName);
        bubble.attr('data-clipboard-text', intersection_object.parent.name );
        // set_flat_number_bubble_position (intersection_object);
        bubble.css({
            top : current_mouse_position.y,
            left : current_mouse_position.x
        })
        bubble.addClass('show');
    } else if ( action == 'show') {
        setTimeout(function(){
            bubble.addClass('show');
        },50);
    } else if (action == 'hide') {
        bubble.removeClass('show');
        setTimeout(function(){
        },550);
    }
}
{
    // profit_fns
    let start = 250;
    let step = 30;
    let step_value = 1;
    let i = 0;
    let step_count = start / step - 1;
    let profit = 0;
    while (i < step_count) {
        let local_profit = (start - step * i) * step_value;
        profit += local_profit;
        i++;
    }
    //console.log(profit);
}

function set_flat_number_bubble_position (intersection_object) {
    var intersection_point = intersection_object.getWorldPosition(window.vector_point);
   // var bubble = $('.flat-bubble');
    var canvas_point = get_canvas_coords (intersection_point);
    globalFunctions.flatBubble.updatePosition(canvas_point[0], canvas_point[1])
/*    bubble.css({
        'top' :  canvas_point[0],
        'left' :  canvas_point[1],
    });*/
}

function get_canvas_coords (intersection_point) {
    var last_position = window.vector_point.clone();
    var point_x = JSON.parse(JSON.stringify(intersection_point.x));
    var point_y = JSON.parse(JSON.stringify(intersection_point.y));
    var point_z = JSON.parse(JSON.stringify(intersection_point.z));
    last_position.x = point_x;
    last_position.y = point_y;
    last_position.z = point_z;
    last_position.project(perspectiveCamera);
    // convert the normalized position to CSS coordinates
    const x = (last_position.x * .5 + .5) * document.querySelector('#c').clientWidth;
    const y = (last_position.y * -.5 + .5) * document.querySelector('#c').clientHeight;
    return [y, x];
}

function add_to_mobile_console (text) {
    $('.mobile-console').html(text);
}

function detect_mobile() {
    var a = navigator.userAgent || navigator.vendor || window.opera;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
    {
        return true;

    } else {
        return false;
    }
}

/*
function user_agent_html (box, target) {
    if (detect_mobile()) {
        var html = box.find('.mobile').html();
        target.html(html);
    } else {
        var html = box.find('.desktop').html();
        target.html(html);
    }

}
*/


function change_flat_color (type, flat) {
    if (flat.name === "zagluha") {
        return;
    }

    if (type == 'active') {
        let color = flat_statuses[flat.userData.status_index].active;
        flat.material.color.setHex('0x' + color);
        flat.userData.current_color = 'active';
        if (globalSettings.selectionBoxes) {
            if (globalSettings.selectionBoxes.depthTest) {
                flat.material.depthTest = false;
                if (!destroyedMode) {
                    let flatBubble3d = scene.getObjectByName('flatBubble3d');
                    if (flatBubble3d) {
                        let p = flat.children[0].getWorldPosition(new global_three.Vector3());
                        flatBubble3d.position.set(p.x, p.y, p.z);
                        flatBubble3d.visible = true;
                        flatBubble3d.element.innerHTML = `
                            <div class="flat-bubble-3d" style="color: white;">
                                Apt. ${flat.userData.crm_data.propNum}
                            </div>
                        `
                    }
                    setPositionButtonLanguage('move');
                } else {
                    let flatBubble3d = scene.getObjectByName('flatBubble3d');
                    if (flatBubble3d) {
                        flatBubble3d.visible = false;
                    }
                }
            }

        }
    }
    if (type == 'base') {
        let color = flat_statuses[flat.userData.status_index].color;
        flat.material.color.setHex('0x' + color);
        flat.userData.current_color = 'color';
        if (globalSettings.selectionBoxes) {
            if (globalSettings.selectionBoxes.depthTest) {
                flat.material.depthTest = true;

            }
        }
    }

}

function flat_click_animation (flat, vector) {
    var parent = flat.parent;
    if (lock_mouse_rotation_x) {
        parent.children.forEach(function(flat){

            animation (flat);

        });

        function animation (flat) {

            if (flat.material.length != undefined) {
                if (last_clicked_flat != flat) {
                    add_tween_animation_new({
                            start : {
                                number : flat.scale.z,
                                position : flat.position.z
                            },
                            target : {
                                number : 1,
                                position : flat.userData.base_position.z
                            },
                            duration : 500,
                            easing : TWEEN.Easing.Quadratic.InOut,
                            delay : 0,

                        },
                        function (e) {
                            flat.position.z = e.position;
                            flat.scale.z = e.number;
                        }
                    );
                } else {
                    add_tween_animation_new({
                            start : {
                                number : flat.scale.z,
                                position : flat.position.z
                            },
                            target : {
                                number : 1.2,
                                position : flat.position.z + 0.25,

                            },
                            duration : 500,
                            easing : TWEEN.Easing.Quadratic.InOut,
                            delay : 0,

                        },
                        function (e) {
                            flat.position.z = e.position;
                            flat.scale.z = e.number;

                        },
                        function(){
                            add_tween_animation_new({
                                    start : {
                                        number : flat.scale.z,
                                        position : flat.position.z
                                    },
                                    target : {
                                        number : 1,
                                        position : flat.userData.base_position.z
                                    },
                                    duration : 500,
                                    easing : TWEEN.Easing.Quadratic.InOut,
                                    delay : 50,

                                },
                                function (e) {
                                    flat.position.z = e.position;
                                    flat.scale.z = e.number;
                                }
                            );
                        }
                    );
                }
            }
        }
    }
}
function get_currency  () {

}

function floor_selector_mouse_up_fn (e) {
    if (e.which == 1 || e.isTrigger == 3 ){
        if (flat_selector_dragged != true) {
            if ( floors_track_animated == false) {
                if ($(this).hasClass('active') != true) {
                    floors_track_animated = true;
                    var floor_var = $(this).data('floor');
                    if (floor_var > current_floor) {
                        if (lock_mouse_rotation_x == true) {
                            window.floor_obj.forEach(function (element, floor_index) {
                                if (element[0].userData.floor <= floor_var) {
                                    if (element[0].userData.floor > current_floor) {
                                        add_floor(element, 0);
                                    }
                                }
                            });
                            animate_height_on_floor(floor_var);
                            current_floor = floor_var;
                            set_floor_n_appartment (floor_var, 0);
                            set_floor_status_color([floor_var]);
                            var flat = window.floor_obj[floor_var][0];
                            var animation_frame_enable = true;
                            function animation_frame_fn () {
                                if (animation_frame_enable) {
                                    flat.updateWorldMatrix(true, false);
                                    last_flat_intersection_point = flat.children[0].getWorldPosition(window.vector_point);
                                    update_click_intersection();
                                    requestAnimationFrame(animation_frame_fn);
                                }
                            }
                            requestAnimationFrame(animation_frame_fn);
                            setTimeout(function(){
                                animation_frame_enable = false;
                            }, 2000);

                        } else {
                            var flat = window.floor_obj[floor_var][0];
                            var animation_frame_enable = true;
                            function animation_frame_fn () {
                                if (animation_frame_enable) {
                                    flat.updateWorldMatrix(true, false);
                                    last_flat_intersection_point = flat.children[0].getWorldPosition(window.vector_point);
                                    update_click_intersection();
                                    requestAnimationFrame(animation_frame_fn);
                                }
                            }
                            requestAnimationFrame(animation_frame_fn);
                            setTimeout(function(){
                                animation_frame_enable = false;
                            }, 2000);

                        }
                    } else if (floor_var < current_floor) {
                        var flat = window.floor_obj[floor_var][0];
                        current_floor = floor_var;
                        flat.updateWorldMatrix(true, false);
                        last_flat_intersection_point = flat.children[0].getWorldPosition(window.vector_point);
                        update_click_intersection();
                        var floor_index = flat.userData.floor;
                        var colored_floors = [floor_index];
                        colored_floors[1] = current_floor_before_minus;
                        set_floor_status_color (colored_floors);
                        current_floor = flat.userData.floor;
                        destroy_building(current_floor);
                        animate_height_on_floor(flat.userData.floor);
                        set_floor_n_appartment (flat.userData.floor, flat.userData.flat_i);
                    }
                    setTimeout(function(){
                        floors_track_animated = false;
                    },600);
                }
            }
        }
    }
}

function square_meters_in_feets (meters) {
    var coef = 3.2808399;
    var metter_on_side = Math.sqrt(meters)
    var feet_on_side = metter_on_side * coef;
    var square_feets = feet_on_side * feet_on_side;
    return square_feets;
}
function square_feets_in_meters (feets) {
    var coef = 3.2808399;
    var feet_on_side = Math.sqrt(feets)
    var metter_on_side = feet_on_side / coef;
    var square_meters = metter_on_side * metter_on_side;
    return square_meters;
}
/*var GBP_currency = '';
var ILS_currency = '';*/
function usd_to_gbp (usd) {
    return usd * GBP_currency;
}
function usd_to_ils (usd) {
    return usd * ILS_currency;
}
function ils_to_usd (ils) {
    return ils / ILS_currency;
}
function ils_to_gbp (ils) {
    return ils / ILS_currency * GBP_currency;
}
function gbp_to_usd (gbp) {
    return gbp / GBP_currency;
}

function gbp_to_ils (gbp) {
    return gbp / GBP_currency * ILS_currency;
}

function flats_filter_update() {
    var current_min_value = Number($('.search-filter .budget').find('.min-text').html().replace(/,/g,''));
    var current_max_value =  Number($('.search-filter .budget').find('.max-text').html().replace(/,/g,'')) + 1;

    var current_status = $('.btns-wrap.status-btns .search-filter-btn.active').data('status');
    if (current_status == 1) {
        current_status = undefined;
    } else if (current_status == undefined) {
        current_status = 1;
    }

    let rooms_array = [];
    $('.btns-wrap.bedrooms-btns .search-filter-btn.active').each(function(e){
        rooms_array[e] = $(this).data('status');
    });
    var current_floor_array_string = '';
    $('.btns-wrap.floor-btns .active').each(function(){
        current_floor_array_string = current_floor_array_string + $(this).data('status');
    });
    let min_floor = Number($('.search-filter .floor .min-text').html()) - 4;
    let max_floor = Number($('.search-filter .floor .max-text').html()) - 4;
    var current_floor_arrray = [min_floor, max_floor];
    all_appartments.forEach(function(flat){
        var flat_data = flat.userData;
        flat_data.color_filter_locked = true;
        flat_data.color_filter_locked = false;
        if (flat_data.floor + 1 >= current_floor_arrray[0] && flat_data.floor + 1 <= current_floor_arrray[1]) {
            flat_data.color_filter_locked = true;
        }
        if (current_status != undefined ) {
            if (flat_data.status_index !=  current_status) {
                flat_data.color_filter_locked = false;
            }
        }

        if (current_min_value != undefined ) {
            if (flat_data.rent_price < current_min_value) {
                flat_data.color_filter_locked = false;
            }
        }

        if (current_max_value != undefined ) {
            if (flat.userData.rent_price > current_max_value) {
                flat_data.color_filter_locked = false;
            }
        }

        if (rooms_array.length  != 0) {
            if (flat_data.color_filter_locked == true) {
                flat_data.color_filter_locked = false;
                rooms_array.forEach(function(item){
                    if (flat_data.crm_data.roomNum == item) {
                        flat_data.color_filter_locked = true;
                    }
                });
            }

        }
    });
    set_floor_status_color([current_floor]);
    $('.three_js .clear-search-filter').addClass('active');
    $('.search-filter').addClass('not-default');
    $('.three_js .compass').addClass('not-default');
    if ($('.popup-info.hide').length > 0) {
        checkIntersection();
    } else {
        last_clicked_flat.userData.color_locked = true;
    }

}



function  set_filter_to_start_position () {
    $('.search-filter-btn').addClass('active');
    $('.search-filter-btn.as-checkbox').removeClass('active');
}

function clear_all_filters () {
    all_appartments.forEach(function(flat){
        var flat_data = flat.userData;
        flat_data.color_filter_locked = false;
    });
    $('.search-filter-btn').removeClass('active');
    $('.search-filter-btn.as-checkbox').addClass('active');
    set_floor_status_color([current_floor]);
    $('.three_js .clear-search-filter').removeClass('active');
    let range_object = $('.price-range');
    var floors_range = $('.floors-range');
    reset_range (range_object);
    reset_range (floors_range);
    checkIntersection();
    $('.search-filter').removeClass('not-default');
    $('.three_js .compass').removeClass('not-default');
}


function mouse_down_on_three_js_element () {
    var block = $('.three_js');
    var block_offset = block.offset();
    var scroll_top = block.offset().top - (( $(window).height() - block.height()  )  / 2) - $('header').height() / 2;
    $([document.documentElement, document.body]).animate({
        scrollTop: scroll_top
    }, 500);
}

function popup_appear_function (popup_btn, mouse_event) {

    $('.popup').hide();
    // TWEEN.removeAll();
    var popup_class = popup_btn.data('popup');
    var popup = $('.' + popup_class);
    if (popup_class != 'not-flat-360') {
        var flat = add_appartment_info_in_popup(popup);
        if (flat.userData.url_360) {
            var url_360 = flat.userData.url_360;
            var iframe_html = '';

            if (flat.userData.url_360_zagluha === 'zagluha360') {
                iframe_html = `<div class="zagluha360"><img class="zagluha360__img" src="${flat.userData.url_360}" alt="360"><h2 class="zagluha360__description" data-dictionary="360-tour coming soon">${get_lang('360-tour coming soon')}</h2></div>`;
            } else {
                iframe_html = '<iframe src="' + url_360 + '"></iframe>';
            }

            $('.popup-360 .iframe-box').html(iframe_html);
            popup.find('.toggler-360').css('display' , 'flex');


        } else {
            popup.find('.toggler-360').css('display' , 'none');

        }
        if (flat.userData.int_360) {
            //TODO disable gallery btn
            popup.find('.toggler-3d').css('display' , 'flex');
        } else {
            popup.find('.toggler-3d').css('display' , 'none');
        }
    }
    var toggler_class = popup.data('toggler');
    var toggler = $('.main-wrap .' + toggler_class);
    var container_width;
    var popup_target_height = popup.parent().height() - 50;
    container_width = popup.parent().width() - 150;
    var target_bottom = 25;
    if ($(window).width() < 768) {
        container_width = popup.parent().width() - 20;
        popup_target_height = popup.parent().height() - 20;
        target_bottom = 10;
    }
    var popup_target_x = (popup.parent().width() - container_width) / 2;
    var popup_target_y = 50;
    var start_right = popup.parent().width() - mouse_event.pageX;
    var start_bottom = popup.parent().height() - mouse_event.pageY;
    var animation = new TWEEN.Tween({
        x: start_right,
        width: 1,
        height: 1,
        bottom: start_bottom,
    }).to({
        x: popup_target_x,
        width: container_width,
        height : popup_target_height,
        bottom: target_bottom,
    }, 500);
    var popup_visible = $('.popup.open').length;
    if (popup_visible > 0) {
        popup.show();
        $('.popup').removeClass('open');
        $('.popup-outer').show();
        $('.popup-outer').css('opacity' , 1);
        popup.css('right', popup_target_x);
        popup.css('width', container_width);
        popup.css('height', popup_target_height);
        popup.css('bottom' , target_bottom);
        popup.css('border-radius', Math.floor((container_width - container_width) / container_width * 100) + '%');
        setTimeout(function(){
            popup.addClass('open');
            popup.find('.' + popup.data('toggler')).addClass('active');
        }, 50);
    } else {
        TWEEN.add(animation);
        animation.delay(0);
        animation.onStart(function(){
            popup.css('left' , 'initial');
            popup.css('top' , 'initial');
            popup.css('right' , start_right);
            popup.css('bottom' , start_bottom);
            popup.show();
            $('.popup').removeClass('open');
            $('.popup-outer').show();
        });
        animation.onUpdate(function(e){
            $('.popup-outer').css('opacity' , 1);
            popup.css('right', e.x);
            popup.css('width', e.width);
            popup.css('height', e.height);
            popup.css('bottom' , e.bottom);
            popup.css('border-radius', Math.floor((container_width - e.width) / container_width * 100) + '%');
        });
        animation.onComplete(function(){
            popup.addClass('open');
            popup.find('.' + popup.data('toggler')).addClass('active');
        });
        animation.easing(TWEEN.Easing.Quadratic.InOut);
        animation.start();
    }
}

function popup_disappear_function (popup_btn, mouse_event) {
    $('.popup').hide();
    // TWEEN.removeAll();
    var toggler_class = popup_btn.parent('.popup').data('toggler');
    var popup = popup_btn.parent('.popup');
    var toggler = $('.popup-info .' + toggler_class);
    var popup_target_x = (popup.parent().width() - popup.width()) / 2;
    var popup_target_y = 50;
    var popup_target_height = popup.parent().height() - 100;
    var start_right = popup.parent().width() - mouse_event.pageX;
    var start_bottom = 25;
    var target_bottom = popup.parent().height() - mouse_event.pageY;
    if($(mouse_event.target).hasClass('close-btn')) {
        start_right = popup.parent().width() - $(toggler).offset().left;
        target_bottom = popup.parent().height() - $(toggler).offset().top - $(toggler).height() / 2;
    };
    var animation = new TWEEN.Tween({
        x: popup_target_x,
        width: 1537,
        height : popup_target_height,
        bottom: start_bottom,
    }).to({
        x: start_right,
        width: 1,
        height: 1,
        bottom: target_bottom,
    }, 500);
    TWEEN.add(animation);
    animation.delay(0);
    animation.onStart(function(){
        popup.show();
        popup.removeClass('open');
        popup.css('bottom' , start_bottom);
    });
    animation.onUpdate(function(e){
        $('.popup-outer').css('opacity' , 0);
        popup.css('right', e.x);
        popup.css('width', e.width);
        popup.css('height', e.height);

        popup.css('bottom' , e.bottom);
        popup.css('border-radius', Math.floor((1537 - e.width) / 1537 * 100) + '%');
    });
    animation.onComplete(function(){
        popup.hide();
        $('.popup-outer').hide();
    });
    animation.easing(TWEEN.Easing.Quadratic.InOut);
    animation.start();
}


function lobby_n_roof_click (mesh, event, clicked_object) {

    objects_to_intersection.forEach(item => {
        if (item !== mesh) {
            item.material.opacity = 0;
            item.userData.color_locked = false;
            item.userData.apartment_locked = false;
        } else {
            mesh.userData.color_locked = true;
            last_clicked_flat = mesh;
        }
    });

    let lobby = scene.getObjectByName('lobbySelectionBox');
    let roof = scene.getObjectByName('roofSelectionBox');
    roof.userData.color_locked = false;
    lobby.userData.color_locked = false;
    let popup_title = '';
    if (lobby) {
        appartment_hoverout(roof);
        popup_title = 'Lobby';
        current_floor = 0;
    } else {
        $('.popup-info').addClass('roof');
        popup_title = 'Roof';
        appartment_hoverout( lobby);
    }
    mesh.userData.color_locked = true;
}

function open_lobby_n_roof_popup (mesh, event, clicked_object) {

    var url_360 = mesh.userData.url_360;
    var iframe_html = '<iframe src="' + url_360 + '"></iframe>';
    $('.not-flat-360 .iframe-box').html(iframe_html);

    var int_360 = mesh.userData.int_360;
    var iframe_html3D = '<iframe src="' + int_360 + '"></iframe>';
    $('.not-flat-360 .iframe-box').html(iframe_html3D);

    let data = {};
    data.popup = 'not-flat-360';
    flat_popup_prepare(data);
    data =  set_flat_popup_data (event, data.popup, clicked_object);
    $('.popup').hide();
    popup_appear(data, event);
}

function popup_disappear(data, mouse_event) {
    // TWEEN.removeAll();
    var popup = data.popup;
    var popup_target_x = data.popup_target_x;
    var popup_target_height = data.popup_target_height;

    var container_width = data.target_width;
    var start_right = data.start_right;
    var start_bottom = data.start_bottom;
    var target_bottom = data.target_bottom;
    var animation = new TWEEN.Tween({
        x: start_right ,
        width: container_width,
        height : popup_target_height,
        bottom: start_bottom,
    }).to({
        x: popup_target_x,
        width: 1,
        height: 1,
        bottom: target_bottom,
    }, 500);
    TWEEN.add(animation);
    animation.delay(0);
    animation.onStart(function(){
        popup.show();
        popup.removeClass('open');
        popup.css('bottom' , start_bottom);
    });
    animation.onUpdate(function(e){
        popup.css('right', e.x);
        popup.css('width', e.width);
        popup.css('height', e.height);

        popup.css('bottom' , e.bottom);
        popup.css('border-radius', Math.floor((1537 - e.width) / 1537 * 100) + '%');
    });
    animation.onComplete(function(){
        popup.hide();
        data.overlay.hide();
    });
    animation.easing(TWEEN.Easing.Quadratic.InOut);
    animation.start();
}

function popup_appear(data, mouse_event) {
    if (last_hover_object != undefined) {
        globalFunctions.flatBubble.updateText(last_hover_object);
        globalFunctions.flatBubble.hide();
        //flat_number_bubble('hide', last_hover_object.children[0]);
    }
    var popup = data.popup;
    // TWEEN.removeAll();
    var container_width;
    var popup_target_height = data.target_height;
    container_width = data.target_width;

    const bottom_border = data.bottom_border;
    var popup_target_x = data.popup_target_x;
    var start_right = data.start_right;
    var start_bottom = data.start_bottom;
    var target_bottom = data.target_bottom;
    var animation = new TWEEN.Tween({
        x: start_right,
        width: 1,
        height: 1,
        bottom: start_bottom,
    }).to({
        x: popup_target_x,
        width: container_width,
        height : popup_target_height,
        bottom: target_bottom,
    }, 500);
    animation.delay(0);
    animation.onStart(function(){
        popup.css('left' , 'initial');
        popup.css('top' , 'initial');
        popup.css('right' , start_right);
        popup.css('bottom' , start_bottom);
        popup.show();
        data.overlay.show();
    });
    animation.onUpdate(function(e){
        popup.css('right', e.x);
        popup.css('width', e.width);
        popup.css('height', e.height);
        popup.css('bottom' , e.bottom);
        popup.css('border-radius', Math.floor((container_width - e.width) / container_width * 100) + '%');
    });
    animation.onComplete(function(){
        popup.addClass('open');
    });
    animation.easing(TWEEN.Easing.Quadratic.InOut);

    TWEEN.add(animation);
    animation.start();
}

function set_flat_popup_data (event, popup_class, clicked_object) {
    let data = {};
    data.mesh = last_clicked_flat;
    data.popup = $('.' + popup_class);
    let popup_container = $('.three_js');
    let half_height_of_clicked_object = clicked_object.height() / 2;
    data.target_width = popup_container.width() - 150;
    data.clicked_block_height = $(this).height() / 2;
    data.clicked_object = clicked_object;
    data.target_height = popup_container.height() - 50;
    if ($(window).width() < 1024) {
        data.target_width = popup_container.width() - 0;
        data.target_height = popup_container.height() - 0;
    }
    data.container = popup_container;
    data.bottom_border = (popup_container.height() - data.target_height) / 2;
    data.popup_target_x = (popup_container.width() - data.target_width) / 2;
    let client_x = 0;
    if (event != undefined) {
        client_x = event.clientX;
    }
    data.start_right = $(window).width() - client_x - popup_container.offset().left;
    data.start_bottom = popup_container.height() - (clicked_object.offset().top - popup_container.offset().top) - half_height_of_clicked_object;
    data.target_bottom =  data.bottom_border;
    data.overlay = $('.three_js .popup-outer');
    return data;
}

function set_click_point_coords (event) {
    let click_point = $('.click-point');
    let three_js_offset = $('.three_js').offset();
    let position_top = event.clientY - (three_js_offset.top - window.scrollY) + globalSettings.base_floor;
    let position_left = event.clientX - (three_js_offset.left) + globalSettings.base_floor;
    click_point.css('top', position_top);
    click_point.css('left', position_left);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toggler_2d_click(clicked_object) {

    // if (document.querySelector('.card-plan-image')) {
    //     document.querySelector('.iv-image-mode').classList.remove('lobby-n-roof');
    // }
    const imgBox = document.querySelector('.img-box');
    if (imgBox) {
        const content = document.querySelector('.popup-2d .content');
        const dataSvg = last_clicked_flat.userData.svg_plan;
        const modelName = (!last_clicked_flat.userData.crm_data) ? last_clicked_flat.name : last_clicked_flat.userData.crm_data.modelName;
        const currentLang = c_lang();

        content.classList.add('loading');

        if (dataSvg) {
            const imgUrl = (window.innerWidth > 1024) ? dataSvg.horizontal[currentLang] : dataSvg.vertical[currentLang];

            imgBox.innerHTML = `<img class='card-plan-image' src=${imgUrl} data-high-res-src=${imgUrl} alt=${modelName}>`;

            if (last_clicked_flat.name === "Spa" || last_clicked_flat.name === "Lobby" || last_clicked_flat.name === "Roof") {
                document.querySelector('.card-plan-image').classList.add('lobby-n-roof');
            }
        }

        const image = document.querySelector('.card-plan-image');
        // image.addEventListener('wheel', zoom);

        image.onerror = () => {
            image.remove();
            imgBox.insertAdjacentHTML('afterbegin', `<h3 class="image-error-message">${get_lang('Sorry, apartment plan not found')}</h3>`);
            removePreLoader();
        }

        image.onload = () => {
            setTimeout(() => {
                const img_viewer = new ImageViewer(image);
                window.img_viewer = img_viewer;
                img_viewer.refresh();
                removePreLoader();
            }, 500);
        }

        function removePreLoader() {
            setTimeout(() => {
                content.classList.remove('loading');
            }, 500);
        }
    }

    let data = {};
    data.popup = 'popup-2d';
    flat_popup_prepare (data);
    data =  set_flat_popup_data (event, data.popup, clicked_object);
    var popup_visible = $('.popup.open').length;
    if (popup_visible > 0) {
        $('.popup').hide();
        toggle_popup (data);
    } else {
        $('.popup').hide();
        popup_appear(data, event);
    }
}

function  toggler_non_flat_360_click (clicked_object) {
    let mesh = window.lobby;
    if ($('.three_js .popup-info .flat-plan .popups-togglers-box div.non-flat-360').data('type') == 'Roof') {
        mesh = window.roof;
    }
    open_lobby_n_roof_popup (mesh, event, clicked_object)
}

function toggle_popup (data) {
    var popup = data.popup;
    $('.popup').removeClass('open');
    popup.show();
    $('.popup-outer').show();
    $('.popup-outer').css('opacity' , 1);
    popup.css('right', data.popup_target_x)
    popup.css('width', data.target_width);
    popup.css('height', data.target_height);
    popup.css('bottom' , data.target_bottom);
    popup.css('border-radius', '');
    setTimeout(function(){
        popup.addClass('open');
        popup.find('.' + popup.data('toggler')).addClass('active');
    }, 50);
}

function reset_range (object) {
    var min_btn = object.find('.min');
    var max_btn = object.find('.max');
    var range_width = object.width() - 30;
    let min_num = object.data('min');
    let max_num = object.data('max');
    min_btn.attr('data-current-number', min_num);
    max_btn.attr('data-current-number', max_num);
    let start_min_num = Math.floor(Number(object.parent().find('.min-text').html().replace(/,/g,'')));
    let start_min_difference = start_min_num - min_num;
    let start_max_num = Math.floor(Number(object.parent().find('.max-text').html().replace(/,/g,'')));
    let start_max_difference = max_num - start_max_num;
    // object.parent().find('.min-text').html(min_num);
    // object.parent().find('.max-text').html(max_num);


    object.find('.range-line-active').animate({
        width: range_width + 24,
        left : 0
    }, {
        duration : 500,
        progress : function (animation,  progress,  remainingMs) {
            let min_text = numberWithCommas (start_min_num - Math.floor((start_min_difference * progress)));
            let max_text = numberWithCommas (max_num - Math.floor((start_max_difference * (1 - progress))));
            object.parent().find('.min-text').html(min_text);
            object.parent().find('.max-text').html(max_text);
        }
    });


    object.find('.range-line-active').css('left', 0);
    min_btn.animate({
        left: "0",
    }, 500, function() {

    });
    max_btn.animate({
        left: range_width,
    }, 500, function() {

    });
}



var totalPercent = 0;

function progress_bar_update () {
    let totalSize=0;
    let loadedSize =0;
    let mathPercent=0;

    Object.entries(progressLoaderObj).forEach(([key,value],index)=>{
        totalSize += value.total + loaded_texture_counter;
        loadedSize +=value.loaded;
        mathPercent = Math.floor((loadedSize * 100) / totalSize);
        if (mathPercent> totalPercent){
            totalPercent = mathPercent;
        }
        if (totalPercent < 2) {
            totalPercent = 2;
        }
        if (totalPercent > 99) {
            totalPercent = 99
        }
    });
}

function set_camera_on_flat (appartment) {
    let flat_center_position = appartment.parent.getObjectByName('zagluha').userData.defaultWorldPosition;

    add_tween_animation ({
        'animation_obj' :  tween_animations,
        'start' : {  x : window.camera_target.position.x, y : window.camera_target.position.y, z : window.camera_target.position.z },
        'target' : { x : flat_center_position.x, y : flat_center_position.y, z : flat_center_position.z },
        'duration' : 1000,
        'easing' : TWEEN.Easing.Cubic.In,
        'delay' : 0
    }, function (e) {
        // window.camera_target.position.z = e.z;
        window.camera_target.position.y = e.y;
        //window.camera_target.position.x = e.x;
        update_line_position();
    }, function (e) {
        // update_flat_labels();
    });
}

function add_floor_animation (floor_local , duration , floor_delay) {
    setTimeout(function(){
        floor_local.forEach(function(flat,index ){
            var add_distance = add_distance_animation_val * ((flat.userData.floor - current_floor) * 2);
            add_tween_animation ({
                'animation_obj' :  tween_animations,
                'start' : {y : flat.userData.base_position.z  + add_distance, opacity: 0, glass_opacity : 0},
                'target' : {  y: flat.userData.base_position.z  , opacity: 1 , glass_opacity : glass_base_opacity},
                'duration' : duration ,
                'easing' : TWEEN.Easing.Sinusoidal.InOut,
                'delay' :  100 * index
            }, function (e) {
                flat.visible = true;
                flat.position.z = e.y;
                if (flat.material.length == undefined) {
                    if (flat.material.name != glass_name) {
                        flat.material.opacity = e.opacity;
                    } else {
                        flat.material.opacity = e.glass_opacity;
                    }
                } else {
                    var metarial_i = 0;
                    while (metarial_i < flat.material.length) {
                        if (flat.material[metarial_i].name != glass_name) {
                            if (flat.material[metarial_i].userData.not_color_change == false) {
                                let material = flat.material[metarial_i];
                                material.opacity = e.opacity;
                            } else {
                                let material = flat.material[metarial_i];
                                material.opacity = 0.9;
                            }

                        } else {
                            flat.material[metarial_i].opacity = e.glass_opacity;
                        }
                        metarial_i++;
                    }
                }


            }, function (e) {
                if (flat.material.length == undefined) {
                    if (flat.material.name != glass_name) {
                        flat.material.opacity = e.opacity;
                    } else {
                        flat.material.opacity = e.glass_opacity;
                    }
                } else {
                    var metarial_i = 0;
                    while (metarial_i < flat.material.length) {
                        if (flat.material[metarial_i].name != glass_name) {
                            if (flat.material[metarial_i].userData.not_color_change == false) {
                                let material = flat.material[metarial_i];
                                material.opacity = e.opacity;
                            } else {
                                let material = flat.material[metarial_i];
                                material.opacity = 0.9;
                            }

                        } else {
                            flat.material[metarial_i].opacity = e.glass_opacity;
                        }
                        metarial_i++;
                    }
                }
                update_line_position()
            });
        });
        setTimeout(function(){
            flooring_obj[floor_local[0].userData.floor].visible = true;
        }, duration);
    }, floor_delay);
}

function object_disappear (object, duration = 1000, delay = 0, easing = TWEEN.Easing.Linear.None) {
    if (object.children.length > 0) {
        object.children.forEach(function(children){
            object_disappear (children, duration , delay, easing);
        });
    } else {
        let object_materials = object.material;
        if (Array.isArray(object_materials)) {
            object_materials.forEach(function(material){
                material_disappear (material, duration , delay, easing);
            });
        } else {
            material_disappear (object_materials, duration , delay, easing);
        }
    }
    setTimeout(function(){
        object.visible = false;
    }, duration);
}
function material_disappear (material, duration , delay, easing) {
    material.transparent = true;
    if (material.userData.base_opacity == undefined) {
        material.userData.base_opacity = material.opacity;
    }

    add_tween_animation ({
        'animation_obj' :  tween_animations,
        'start' : {
            opacity : material.opacity
        },
        'target' : {
            opacity : 0
        },
        'duration' : duration,
        'easing' : easing,
        'delay' : delay
    }, function (e) {
        material.opacity = e.opacity;
    }, function (e) {
        material.opacity = 0;
    });
}

function object_appear (object, duration = 1000, delay = 0, easing = TWEEN.Easing.Linear.None) {
    object.visible = true;
    if (object.children.length > 0) {
        object.children.forEach(function(children){
            object_appear (children, duration , delay, easing);
        });

    } else {
        let object_materials = object.material;
        if (Array.isArray(object_materials) == true) {
            object_materials.forEach(function(material){
                material_appear (material, duration , delay, easing);
            });
        } else {
            material_appear (object_materials, duration , delay, easing);
        }
    }

}
function material_appear (material, duration , delay, easing) {
    material.transparent = true;
    add_tween_animation ({
        'animation_obj' :  tween_animations,
        'start' : {
            opacity : material.opacity
        },
        'target' : {
            opacity : material.userData.base_opacity
        },
        'duration' : duration,
        'easing' : easing,
        'delay' : delay
    }, function (e) {
        material.opacity = e.opacity;
    }, function (e) {
        material.opacity = material.userData.base_opacity;
    });
}

function save_scene() {
    var formData = new FormData();
    // var scene_obj = JSON.stringify(window.scene.toJSON());
    // formData.set('json', scene_obj);
    $.ajax({
        type: "POST",
        url: 'my-file.php',
        // data: formData,
        success: function (response) {
            //console.log(response);
        },
    });
};


function prepare_obj_to_clone (object) {
    if (object.children.length > 0) {
        object.children.forEach(function(children){
            prepare_obj_to_clone (children);
        });
    }

    if (object.type == 'Mesh') {
        prepare_mesh_to_clone (object);
    }
    // return object.clone();
}
function prepare_mesh_to_clone (mesh) {
    //console.log(mesh.geometry.type);
}

function update_flat_labels (dynamic = false) {
    globalFunctions.flatLablesUpdate(dynamic);
}


function hide_all_labels () {
    flat_labels_group.forEach(function(label){
        label.visible = false;
    });
}

function get_price_html (price_num, add_class = '', text_only = false) {
    let inner_html = '';

    let price = (price_num !== 0) ? numberWithCommas(Math.floor(price_num)) : 'No price';

    let price_html;
    if (text_only && price_num !== 0) {
         price_html = `
            <div class="text-only-price"><span class="number">${price}</span><span class="simbol language-string" data-dictionary="${globalSettings.currency.word}" >${get_lang(globalSettings.currency.word)}</span></div>
        `;
    } else {
        if (price_num === 0) {
            price_html = `
            <div class="price-box ${add_class}">
            <div class="number language-string" data-dictionary="No price"> ${get_lang('No price')}</div>
            </div>
        `;
        } else {
            price_html = `
            <div class="price-box ${add_class}">
                 <div class="get-price-btn language-string" data-dictionary="show price" >${get_lang('show price')}</div>
                <div class="price-text  language-string" data-dictionary="${globalSettings.currency.word}" >${(price_num !== 0) ? get_lang(globalSettings.currency.word) : ''}</div>
            <div class="number"> ${price}</div>
            </div>
        `;
        }
    }
    return price_html;
}
function get_angle_to_camera() {
    let angle;
    let side_1;
    let side_2;
    let side_3;
    let camera_position = perspectiveCamera.position;
    let camera_target_position = window.camera_target.position;
    let building_position = new global_three.Vector3(65.67195961065605 * 2,-5.129966399290865,10.649045806881903);
    side_1 = camera_position.distanceTo(camera_target_position);
    side_2 = camera_target_position.distanceTo(building_position);
    side_3 = building_position.distanceTo(camera_position);

    // angle = vector.angleTo();
    return angle;
}

function floor_appear_animation () {
    window.floor_obj[current_floor].forEach(function(flat, index){
        if (flat.name !== 'zagluha') {
            let add_position = globalSettings.floorAppearAnimation.addPosition;
            let base_position = flat.userData.base_position[globalSettings.floorAppearAnimation.axis];
            flat.material.opacity = 0;
            if (flat.userData.world_position == undefined) {
                flat.userData.world_position = flat.children[0].getWorldPosition(new global_three.Vector3());
            }
            // flat.position.z = base_position + add_position;
            let start =  {
                opacity : 0,
                add_position : add_position + add_position * index,
                number : 0,
            };
            let target = {
                opacity : standard_flat_opacity,
                add_position : 0,
                number : 2,
            }
            let labels_appear = false;
            add_tween_animation ({
                'animation_obj' :  tween_animations,
                'start' : start,
                'target' : target,
                'duration' : globalSettings.floorAppearAnimation.durationBase + (globalSettings.floorAppearAnimation.durationBase * 0.1) * index,
                'easing' : TWEEN.Easing.Quadratic.InOut,
                'delay' : 0
            }, function (e) {
                flat.material.opacity = e.opacity;
                flat.position[globalSettings.floorAppearAnimation.axis] = base_position + e.add_position;
                if (e.number > 1.5) {
                    if (!labels_appear) {
                        setTimeout(update_flat_labels, globalSettings.destroyedBuilding.flatLabels.label_timeOut, false);
                        // update_flat_labels(false);
                        labels_appear = true;
                    }
                }
            }, function (e) {
            });
        }
    });
}
function fullScreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.webkitrequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.mozRequestFullscreen) {
        element.mozRequestFullScreen();
    }
}

function get_angle_between (obj_a, obj_b) {
    let fn_vector_a =  new global_three.Vector3( obj_a.x, 1,  obj_a.z);
    let fn_vector_b =  new global_three.Vector3( obj_b.x, 1,  obj_b.z);
    let return_obj = {
        rads : fn_vector_a.angleTo(fn_vector_b),
        degs :  global_three.Math.radToDeg( fn_vector_a.angleTo(fn_vector_b) )
    }
    return return_obj;
}

function add_objects_on_mesh (mesh, object = undefined) {
    var geometry = new global_three.BoxGeometry( 1, 1, 1 );
    var material = new global_three.MeshBasicMaterial( {color: 0x00ff00} );
    let cube = new global_three.Mesh( geometry, material );
    let min = mesh.geometry.boundingBox.min;
    let max = mesh.geometry.boundingBox.max;
    cube.position.set(min.x , min.y, min.z);
    let cube_2 = cube.clone();
    cube_2.position.set(max.x, max.y, 0);
    mesh.add( cube );
    mesh.add( cube_2 );
}

function addTrees(plane_mesh, scale, tree_mesh) {
    let plane = plane_mesh;
    plane.geometry.computeBoundingBox();
    window.plane = plane;
    let cube, cube_2;
    let cube_1_world;
    let cube_2_world;
    {
        var geometry = new global_three.BoxGeometry( 20, 20, 20 );
        var material = new global_three.MeshBasicMaterial( {color: 0x00ff00} );
        cube = new global_three.Mesh( geometry, material );
        let min = plane.geometry.boundingBox.min;
        let max = plane.geometry.boundingBox.max;
        cube.position.set(min.x , min.y, min.z);
        cube_2 = cube.clone();
        cube_2.position.set(max.x, max.y, 0);
        plane.add( cube );
        plane.add( cube_2);
    }
    cube_1_world = cube.getWorldPosition(new global_three.Vector3);
    cube_2_world = cube_2.getWorldPosition(new global_three.Vector3);
    function randomInt(min, max) {
        return min + Math.floor((max - min) * Math.random());
    }
    let min_x;
    let max_x;
    if (cube_2_world.x < cube_1_world.x) {
        min_x = cube_2_world.x;
        max_x = cube_1_world.x;
    } else {
        min_x = cube_1_world.x;
        max_x = cube_2_world.x;
    }
    let min_z;
    let max_z;
    if (cube_2_world.z < cube_1_world.z) {
        min_z = cube_2_world.z;
        max_z = cube_1_world.z;
    } else {
        min_z = cube_1_world.z;
        max_z = cube_2_world.z;
    }
    min_x = -524;
    max_x = 5;

    min_z = -290;
    max_z = 305;

    //console.log(min_x + ' ' + max_x);
    //console.log(min_z + ' ' + max_z);


    let objectsArray = [];
    const amount = 50;
    const gap = 4;
    const date = Date.now();
    let i = 0;
    let vector;



    // if (intersects) {
    //     console.log('intersects = ', intersects);
    // }

    do {
        let cross = true;
        let currentDate = Date.now();
        let x = randomInt(min_x, max_x);
        let z = randomInt(min_z, max_z);
        vector = new global_three.Vector3(x, 0, z);
        let intersection_point = new global_three.Vector3(0,0,0);
        if (objectsArray.length > 0) {
            objectsArray.forEach(item => {
                if (vector.distanceTo(item) < gap) {
                    cross = false;
                } else {
                    const origin = new global_three.Vector3(vector.x, 3000, vector.z);
                    const direction = new global_three.Vector3(vector.x, -2000, vector.z);
                    ray = new global_three.Raycaster(origin, direction.sub(origin).normalize());

                    intersects = ray.intersectObjects([plane]);
                    if (intersects.length === 0) {
                        cross = false;
                    } else {
                        intersection_point = intersects[0].point;
                    }
                }
            });
        }
        if (cross) {
            if (i == 1) {
                objectsArray[0] = intersection_point;
                i++;
            } else {
                objectsArray.push(intersection_point);
                i++;
            }
        }

        if (currentDate - date > 20000) {
            break;
        }
        scene.remove(line);
        scene.remove(cube);
        scene.remove(cube_2);

    } while (i < amount);



    add_instances_trees(tree_mesh, objectsArray);


}

function add_instances_trees(tree, positions_array, scale, options = {}) {

    let mesh = new global_three.InstancedMesh(tree.geometry, tree.material, positions_array.length);
   // mesh.receiveShadow = true;
    mesh.castShadow = true;
    mesh.frustumCulled = false;
    mesh.position.set(0, 0, 0);
    mesh.scale.set(scale, scale, scale);
    let baseRotation;
    if (options.changeRotate === false) {
        baseRotation = tree.rotation;
    }
    // mesh.transparent = true;

    let i = 0;
    positions_array.forEach(vector => {
        let matrix = new global_three.Matrix4();
        //compose ( new global_three.Vector3(0 , y * i , 0), mesh.rotation, new global_three.Vector3(1 , 1 , 1) );
        // Math.PI * 2 * Math.random()
        let rotation = new global_three.Euler( Math.PI / 2 * -1, 0 , 2 * Math.PI * Math.random(), 'XYZ' ) ;
        if (options.changeRotate === false) {
            rotation = baseRotation;
        }
        let rotation_quat = new global_three.Quaternion().setFromEuler(rotation);
        let position = new global_three.Vector3(vector.x / scale , vector.y / scale, vector.z / scale);
        let random_scale;
        if (vector.scale) {
            random_scale = vector.scale;
        } else {
            random_scale = 1 + 0.5 * Math.random();
        }
        let scale_vec = new global_three.Vector3(random_scale, random_scale ,random_scale);
        // matrix.makeRotationFromEuler(rotation);
        // matrix.setPosition(vector.x / scale , vector.y / scale, vector.z / scale);

        matrix.compose(position, rotation_quat , scale_vec);
        mesh.setMatrixAt(i, matrix);
        i++;
    });
    mesh.renderOrder = 1;
    mesh.name = `instanceTree${tree.name}`;

    if (options.name) {
        mesh.name = options.name;
    }
    window.instance_tree = mesh;
    if (options.group) {
        options.group.add(mesh);
    } else {
        scene.add(mesh);
    }
    window.positions_array = positions_array;
    return mesh;
}

function onSuccessCallback(){}
function onProgressCallback(e) {

}
function onErrorCallback(e){
    console.log(e);
}

function get_car_routes_array () {
    let car_routes_array = [];
    car_route_points_groups.forEach(function(item, i){
        car_routes_array[i]  = {};
        car_routes_array[i].position = item.position;
        car_routes_array[i].angle_number  = item.userData.angle_number;
    });
    return car_routes_array;
}

function get_url_param (name) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams != undefined) {
        let param = urlParams.get(name);
        if (param != null) {
            return param;
        } else {
            return false;
        }
    }
}

function getiPhoneModel() {
    // iPhone X
    if ((window.screen.height / window.screen.width == 812 / 375) && (window.devicePixelRatio == 3)) {
        return "10+";
        // iPhone 6+/6s+/7+ and 8+
    } else {
        return "10-"
    }
}

function get_all_params_values (array, key) {
    let array_for_return = {};
    array.forEach(function(array_item){
        let value = array_item[key];
        if (!array_for_return[value]) {
            array_for_return[value] = value;
        }
    });
    return array_for_return;
}

function setDefaultZoomPosition(){
    let defaultData = globalSettings.animations.defaultForeshortening;
    let rotation = {
        x:defaultData.rotation.x,
        y:null,
        z:null,
    };
    let position = {
        x: window.camera_target.position.x,
        y: defaultData.position.y,
        z: window.camera_target.position.z
    }
    globalFunctions.animateTo(position, rotation, defaultData.zoom, 1000, TWEEN.Easing.Sinusoidal.InOut);
}

function set_default_camera_position () {
    let zoom_coef = 1;
/*    perspectiveCamera.position.x = 0;
    perspectiveCamera.position.z = 1080;
    target_zoom = 1080;
    window.camera_target.rotation.y =  5.235987755982989;
    targetRotationX = 5.235987755982989;
    window.camera_target.position.y = 132;
    window.camera_target.children[0].rotation.x = -0.95;*/

    perspectiveCamera.position.x = globalSettings.startCamera.position_x;
    perspectiveCamera.position.z = globalSettings.startCamera.target_zoom;
    target_zoom = globalSettings.startCamera.target_zoom;
    window.camera_target.rotation.y =  globalSettings.startCamera.rotation_y;
    targetRotationX = globalSettings.startCamera.rotation_y;
    window.camera_target.position.y = globalSettings.startCamera.position_y;
    window.camera_target.children[0].rotation.x = globalSettings.startCamera.rotation_x;
}

function setPositionButtonLanguage(type) {
    const floorSlider = document.querySelector('.floors-selector-n-back');
    const btn = document.querySelector('.lang-container');
    if (btn) {
        if (type === 'move') {
            if (floorSlider.classList.contains('show')) {
                btn.classList.add('move');
            }

        } else if (type === 'restore') {
            btn.classList.remove('move');
        }
    }
}

function bind_price_box_btn (container, classes) {
    let price_btn = container;
    price_btn.unbind();
    price_btn.click(function(){
        price_btn.find('.get-price-btn').toggle();
        classes.forEach(function(item){
            container.find(item).toggle();
            if (container.find(item).css('display') != 'none') {
                container.find(item).css('display', 'flex');
            }

        });

    });
}

function c_lang () {
    return $('html').attr('lang');
}
function get_lang (word) {
    if (dictionary[word]) {
        if (dictionary[word][c_lang ()]) {
            return dictionary[word][c_lang ()];
        }
    }
    return false;
}

function rotation_to_flat () {
    if (!window.rotate_to_flat) {
        normilize_camera_rotation_x();

        let flat_world_position;

        let camera_world_position = perspectiveCamera.getWorldPosition(new global_three.Vector3());
        camera_world_position.y = 1;

        if (last_clicked_flat.userData.correction_point) {
            let corPoint = last_clicked_flat.userData.correction_point;
            flat_world_position = new global_three.Vector3(corPoint.x, 1, corPoint.z);
        } else {
            flat_world_position  = last_clicked_flat.getWorldPosition(new global_three.Vector3());
            flat_world_position.y = 1;
        }

        let start_target_rotation = targetRotationX;

        let angle = flat_world_position.angleTo(camera_world_position);
        let start_distance = flat_world_position.distanceTo(camera_world_position);
        let modificator = global_three.Math.degToRad(1);

        if (!lock_mouse_rotation_x) {
            let floor = last_clicked_flat.userData.floor;
            let target_y = (max_camera_y - min_camera_y) / window.floor_obj.length * floor;
            if (target_y < min_camera_y_for_filter) {
                // target_y = min_camera_y_for_filter;
            }

            if (target_y < min_camera_y) {
                target_y = min_camera_y;
            }

            var easing = r_animation_type;
            var delay = 0;
            var animation = new TWEEN.Tween({target_y: window.camera_target.position.y}).to({target_y: target_y}, r_animate_duration);

            //var bubble = $('.flat-bubble');
            TWEEN.add(animation);
            animation.delay(delay);
            animation.onStart(function (e) {
                window.rotate_to_flat = true;
                flatClickHandler = false;
                intersectionHandler = false;
            });
            animation.onUpdate(function (e) {
                let new_bubble_position = toScreenPosition(last_clicked_flat);
                globalFunctions.flatBubble.updatePosition(new_bubble_position.y, new_bubble_position.x)
/*                bubble.css({
                    top : new_bubble_position.y,
                    left : new_bubble_position.x
                })*/
                window.camera_target.position.y = e.target_y;
            });

            animation.onComplete(function (e) {
                window.rotate_to_flat = false;
                flatClickHandler = true;
                intersectionHandler = true;
            });
            animation.easing(easing);
            animation.start();
        }

        if (angle > modificator * 10) {
            targetRotationX += modificator;

            setTimeout(function () {

                let flat_world_position;

                let camera_world_position = perspectiveCamera.getWorldPosition(new global_three.Vector3());
                camera_world_position.y = 1;

                if (last_clicked_flat.userData.correction_point) {
                    let corPoint = last_clicked_flat.userData.correction_point;
                    flat_world_position = new global_three.Vector3(corPoint.x, 1, corPoint.z);
                } else {
                    flat_world_position  = last_clicked_flat.getWorldPosition(new global_three.Vector3());
                    flat_world_position.y = 1;
                }

                let current_distance = flat_world_position.distanceTo(camera_world_position);

                let target_rotation; 
                if (current_distance < start_distance) {
                    target_rotation = start_target_rotation + angle;
                } else {
                    target_rotation = start_target_rotation - angle;
                }
                let angle_mod = 1;
                if (r_angle_mod) {
                    angle_mod = global_three.Math.radToDeg(angle) * r_angle_mod_coef * 0.05;
                }

               // target_rotation =  global_three.Math.radToDeg(target_rotation);
                var easing = r_animation_type;
                var delay = 0;
                var animation = new TWEEN.Tween({rotation: window.camera_target.rotation.y}).to({rotation: target_rotation}, r_animate_duration * angle_mod );

                TWEEN.add(animation);
                animation.delay(delay);
                animation.onStart(function (e) {
                    window.camera_target.rotation.y = e.rotation;
                    targetRotationX =  e.rotation;
                });
                animation.onUpdate(function (e) {
                    window.camera_target.rotation.y = e.rotation;
                    targetRotationX =  e.rotation;
                });

                animation.onComplete(function (e) {

                });
                animation.easing(easing);
                animation.start();


            }, 100);
        }
    }
}


function target_zoom_limit (target_zoom_fn) {

    let modifier = 1;
    if ($(window).width() < 1024) {
        modifier = 1.6;
    }
    let in_zoom_limit_m = min_zoom_full * modifier;
    let in_zoom_limit_b = max_zoom_full * modifier;

    if (lock_mouse_rotation_x == true) {
        in_zoom_limit_m = min_zoom_destroy * modifier;
        in_zoom_limit_b = max_zoom_destroy * modifier;
    }
    if (target_zoom_fn < in_zoom_limit_m) {
        target_zoom_fn = in_zoom_limit_m;
    }
    if (target_zoom_fn > in_zoom_limit_b) {
        target_zoom_fn = in_zoom_limit_b;
    }

    return target_zoom_fn;
}

// if(screen.orientation.lock) {
//     screen.orientation.lock('portrait');
// } else {alert('Ваш браузер не підтримує lock');}

// TODO landscape lock

// window.addEventListener('orientationchange', function() {
//     var orientation = Math.abs(window.orientation) == 90 ? 'landscape' : 'portrait';
//     if (orientation === 'landscape') {
//
//         // document.querySelector('body')..style.display
//
//         // console.log(document.documentElement.requestFullscreen())
//         //  document.documentElement.requestFullscreen;
//     }
// }, false);

// function lock () {
//     // Go into full screen first
//     if (document.documentElement.requestFullscreen) {
//         document.documentElement.requestFullscreen();
//     } else if (document.documentElement.mozRequestFullScreen) {
//         document.documentElement.mozRequestFullScreen();
//     } else if (document.documentElement.webkitRequestFullscreen) {
//         document.documentElement.webkitRequestFullscreen();
//     } else if (document.documentElement.msRequestFullscreen) {
//         document.documentElement.msRequestFullscreen();
//     }
//
//     // Then lock orientation
//     screen.orientation.lock('portrait');
// };
//
//
// lock();


function toScreenPosition(obj)
{
    let camera = perspectiveCamera;
    var vector = new global_three.Vector3();

    var widthHalf = 0.5 * renderer.getContext().canvas.width / window.devicePixelRatio;
    var heightHalf = 0.5 * renderer.getContext().canvas.height / window.devicePixelRatio;

    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);

    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;

    return {
        x: vector.x,
        y: vector.y
    };

};

function getRoomNumHTML (roomNum) {
    let roomNumHTML = '';
    if (roomNum == 0) {
        roomNumHTML = `<div class="room-num-html language-string" data-dictionary="Studio">${get_lang('Studio')}</div>`;
    } else {
        roomNumHTML = `<div class="room-num-html" >${roomNum}</div>`;
    }
    return roomNumHTML;
}
function addWhiteLightMap (object) {
    if (object.type == 'Mesh') {
        if (Array.isArray(object.material)) {
            object.material.forEach(function(material) {
                if (!material.lightMap) {
                    material.lightMap = window.whiteLightMap;
                }
            });
        } else {
            if (!object.material.lightMap) {
                object.material.lightMap = window.whiteLightMap;
            }
        }
    }
    if (object.children.length > 0) {
        object.children.forEach(function(child){
            addWhiteLightMap (child);
        });
    }
}