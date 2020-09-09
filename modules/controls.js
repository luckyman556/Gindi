
import {OrbitControls} from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import {TrackballControls} from '../node_modules/three/examples/jsm/controls/TrackballControls.js';

export function controls_init (camera,canvas, controls) {

    var canvas = document.getElementById('c');

    document.onmousedown = function (e) {
        if (e.which == 1 || e.which == 3) {
            if ($(event.target).parents('.non-canvas').length == 0 || $(event.target).hasClass('points-line') == true) {
                camera_rotated = true;
                var mouse_down_x = e.pageX;
                var mouse_down_y = e.pageY;
                var windowHalfX = document.getElementById('c').offsetWidth / 2;
                var mouseXOnMouseDown = event.clientX - windowHalfX;
                targetRotationOnMouseDownX = targetRotationX;
                far_current_click_camera_x = window.camera_target.rotation.y;
                far_current_click_camera_position_y = window.camera_target.position.y;
                far_current_click_camera_rotation_x = window.camera_target.children[0].rotation.x;

                document.onmousemove = function (e) {
                    if (window.disable_drag_controls == false) {
                        raf_divergention_x = mouse_down_x - e.pageX;
                        raf_divergention_y = mouse_down_y - e.pageY;
                        let drag_move_limit = 20;
                        let raf_divergention_y_limit = Math.sqrt(raf_divergention_y * raf_divergention_y);
                        let raf_divergention_x_limit = Math.sqrt(raf_divergention_x * raf_divergention_x);
                        if (raf_divergention_x_limit >  drag_move_limit || raf_divergention_y_limit > drag_move_limit) {
                            drag_move = true;
                            //console.log('drag_move');
                        } else {

                        };

                        change_camera_rotate_x(e, mouseXOnMouseDown);
                        if (e.ctrlKey) {
                            change_camera_position_y();
                        } else {
                            if (e.which == 3) {
                                change_camera_rotation_x(e, mouseXOnMouseDown);
                            } else {
                                if (lock_mouse_rotation_x == true) {
                                    change_camera_rotation_x(e, mouseXOnMouseDown);
                                } else {
                                    change_camera_position_y();
                                }
                            }

                        }
                    }
                };

                document.onmouseup = function (e) {
                    //drag_move = false;
                    document.onmousemove = null;
                    canvas.onmouseup = null;
                };
                canvas.onmouseup = function () {
                    //drag_move = false;
                    document.onmousemove = null;
                    canvas.onmouseup = null;
                };
                canvas.onmouseout = function () {
                    // document.onmousemove = null;
                    // canvas.onmouseup = null;
                };
            }
        }
    };
    {
        var mouse_down_x;
        var mouse_down_y;
        var windowHalfX;
        var mouseXOnMouseDown;
        var start_camera_zoom;
        var start_difference_sign;
        var mouse_down_x_2;
        var mouse_down_y_2;

        canvas.addEventListener('touchstart', controls_touchstart, false);
        function controls_touchstart (event) {
            //console.log('touchstart');
            // alert('touchstart');
            if ($(event.target).parents('.non-canvas').length == 0) {
                if (disable_touch_handlers != true) {

                    mouse_down_x = event.touches[0].clientX;
                    mouse_down_y = event.touches[0].clientY;

                    if (event.length == 2) {
                        mouse_down_x_2 = event.touches[1].clientX;
                        mouse_down_y_2 = event.touches[1].clientY;
                    } else {
                        camera_rotated = true;
                        windowHalfX = document.getElementById('c').offsetWidth / 2;
                        mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
                        targetRotationOnMouseDownX = targetRotationX;
                        far_current_click_camera_x = window.camera_target.rotation.y;
                        far_current_click_camera_position_y = window.camera_target.position.y;
                        far_current_click_camera_rotation_x = window.camera_target.children[0].rotation.x;
                    }

                    start_camera_zoom = camera.position.z;


                }
            } else {
                two_touches = false;
                drag_move = false;
                canvas.ontouchmove = null;
            }


        }
        canvas.addEventListener('touchmove', controls_touchmove ,false);

        function controls_touchmove (event) {
            if ($(event.target).parents('.non-canvas').length == 0) {

                if (event.touches.length == 1) {
                    raf_divergention_x = mouse_down_x - event.touches[0].clientX;
                    raf_divergention_y = mouse_down_y - event.touches[0].clientY;
                    if (two_touches != true) {
                        change_camera_rotate_x(event, mouseXOnMouseDown);
                        if (lock_mouse_rotation_x == true) {
                            change_camera_rotation_x(event, mouseXOnMouseDown);
                        } else {
                            change_camera_position_y();
                        }
                    }
                    //two_touches = false;
                } else if (event.touches.length == 2) {
                    drag_move = true;
                    var start_1_x;
                    var start_2_x;
                    var start_difference;
                    if (two_touches == false) {
                        start_1_x = event.touches[0].clientX;
                        start_2_x = event.touches[1].clientX;
                        var a = new global_three.Vector2( event.touches[0].clientX, event.touches[0].clientY );
                        var b = new global_three.Vector2( event.touches[1].clientX, event.touches[1].clientY );
                        window.start_difference = a.distanceTo( b );
                        two_touches = true;
                    }
                    var a = new global_three.Vector2( event.touches[0].clientX, event.touches[0].clientY );
                    var b = new global_three.Vector2( event.touches[1].clientX, event.touches[1].clientY );
                    var current_difference = a.distanceTo( b );
                    var target_difference = window.start_difference  -  current_difference;
                    var target_zoom_i;
                    target_zoom_i = start_camera_zoom + target_difference;

                    target_zoom =  target_zoom_limit (target_zoom_i);

                    //camera.position.z = target_zoom;
                }
                //console.log(raf_divergention_y)
                let raf_divergention_y_limit = Math.sqrt(raf_divergention_y * raf_divergention_y);
                let raf_divergention_x_limit = Math.sqrt(raf_divergention_x * raf_divergention_x);
                if (raf_divergention_y_limit > 50 || raf_divergention_x_limit > 50) {
                    drag_move = true;
                    //console.log('move');
                }
            }
        }
        canvas.addEventListener('touchend',  function (e) {
            //console.log(e);
            setTimeout(function(){
                two_touches = false;
              //  drag_move = false;
            }, 500);
            // canvas.removeEventListener('touchmove', controls_touchmove);
        });
    }
    var elem = document;
    if (elem.addEventListener) {
        if ('onwheel' in document) {
            // IE9+, FF17+, Ch31+
            elem.addEventListener("wheel", onWheel, { passive: false });
        } else if ('onmousewheel' in document) {
            // устаревший вариант события
            elem.addEventListener("mousewheel", onWheel, { passive: false });
        } else {
            // Firefox < 17
            elem.addEventListener("MozMousePixelScroll", onWheel, { passive: false });
        }
    } else { // IE8-
        elem.attachEvent("onmousewheel", onWheel, { passive: false });
    }

    function onWheel(e) {
        // event.preventDefault();
            $(".mouse-wheel-info").removeClass('active');
            update_line_position_enabled = true;
            if(e.toElement == document.getElementById('c') || e.toElement == document.querySelector('.points-line') || e.toElement == document.querySelector('.mouse-wheel-info')) {
                if (e.ctrlKey == true) {
                    e = e || window.event;
                    // wheelDelta не даёт возможность узнать количество пикселей
                    var delta = e.deltaY || e.detail || e.wheelDelta;

                    var in_zoom = camera.position.z + delta * 0.3;

                    target_zoom = in_zoom;
                    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                    setTimeout(function(){ update_line_position_enabled = false;}, 4000);
                } else {
                    if (zoom_by_mousewheel == true) {
                        e = e || window.event;
                        // wheelDelta не даёт возможность узнать количество пикселей
                        var delta = e.deltaY || e.detail || e.wheelDelta;
                        if ($('body').hasClass('firefox-run') == true) {
                            delta = delta * 33;
                        }
                        target_zoom =  target_zoom_limit (target_zoom + delta * 0.3);

                        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                        setTimeout(function(){ update_line_position_enabled = false;}, 4000);
                    } else {
                        var box = $(".mouse-wheel-info");
                        box.addClass('active');
                        var timeInMs = Date.now();
                        mouse_wheel_info_time_ended = timeInMs + 3000;
                        requestAnimationFrame(hide_mouse_wheel_info);
                        function hide_mouse_wheel_info() {
                            var fn_time = Date.now();
                            if (fn_time > mouse_wheel_info_time_ended) {
                                box.removeClass('active');
                            } else {
                                requestAnimationFrame(hide_mouse_wheel_info);
                            }
                        };
/*                        far_current_click_camera_position_y = window.camera_target.position.y;
                        var delta = e.deltaY || e.detail || e.wheelDelta;
                        raf_divergention_y = delta;
                        change_camera_position_y();*/
                    }

                }


            }
    }

    canvas.ondragstart = function() {
        return false;
    };
    window.disable_drag_controls = false;

/*
    $('.three_js .zoom-controls .zoom').click(function(){
        var current_zoom = perspectiveCamera.position.z;
        var target_zoom = perspectiveCamera.position.z + (Number($(this).data('step')) * Number($(this).data('mod')));
        TWEEN.removeAll();
        add_tween_animation ({
            'animation_obj' :  tween_animations,
            'start' : { z :  current_zoom},
            'target' : { z : target_zoom},
            'duration' : 200,
            'easing' : TWEEN.Easing.Quintic.In,
            'delay' : 0
        }, function (e) {
            target_zoom = e.z;
            if (target_zoom < 50) {
                target_zoom = 50;
            }
            if (target_zoom > 300) {
                target_zoom = 300;
            }
            perspectiveCamera.position.z = target_zoom;
        }, function (e) {

        });
    });
*/

    {
        let zoom_btns = document.querySelectorAll('.three_js .zoom-controls .zoom');
        let mouse_down_time = 0;
        let interval_var;
        let interval_i = 0;
        let data_mod;
        let global_target_zoom;
        global_target_zoom =  perspectiveCamera.position.z;
        zoom_btns.forEach(function(item, i) {
            item.addEventListener('mousedown',zoom_mouse_down)
            item.addEventListener('mouseup',zoom_mouse_up)
            item.addEventListener('mouseleave',zoom_mouse_leave)
        });
       function zoom_mouse_down (event) {
           mouse_down_time = Date.now();
           data_mod =  Number($(this).data('mod'));
           interval_var = setInterval(function(){
               let current_time = Date.now();
               if (current_time > mouse_down_time + 200) {
                   let in_target_zoom = target_zoom + (2 + (interval_i/2))  * data_mod;
                   target_zoom = target_zoom_limit (in_target_zoom);

                   update_line_position_enabled = true;
                   setTimeout(function(){ update_line_position_enabled = false;}, 4000);
               }
               interval_i++;
           },100);
          //  debugger;
       }

        function zoom_mouse_leave() {
            clearInterval(interval_var);
        }
        function zoom_mouse_up() {
            clearInterval(interval_var);
            interval_i = 0;
            let current_time = Date.now();
            if (current_time < mouse_down_time + 200) {
                let in_target_zoom = target_zoom + (Number($(this).data('step')) * data_mod);
                target_zoom = target_zoom_limit (in_target_zoom);

                update_line_position_enabled = true;
                setTimeout(function(){ update_line_position_enabled = false;}, 4000);
            } else {

            }
        }
    }

    return controls;

}

function target_zoom_limit (target_zoom_fn) {
    let in_zoom_limit_m = min_zoom_full;
    let in_zoom_limit_b = max_zoom_full;
    if (lock_mouse_rotation_x == true) {
        in_zoom_limit_m = min_zoom_destroy;
        in_zoom_limit_b = max_zoom_destroy;
    }
    if (target_zoom_fn < in_zoom_limit_m) {
        target_zoom_fn = in_zoom_limit_m;
    }
    if (target_zoom_fn > in_zoom_limit_b) {
        target_zoom_fn = in_zoom_limit_b;
    }

    return target_zoom_fn;
}