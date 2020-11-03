import { add_route_points  } from './add-route-points.js';
import { mouse_wheel_events  } from './mouse-wheel.js';
export function controls_init (camera, canvas, controls) {

    // var canvas = document.getElementById('c');

    document.onmousedown = function (e) {
        if (add_points_mode == false) {
            if (e.which == 1 || e.which == 3) {
                if ($(event.target).parents('.non-canvas').length == 0 || $(event.target).hasClass('points-line') == true) {
                    camera_rotated = true;
                    var mouse_down_x = e.pageX;
                    var mouse_down_y = e.pageY;
                    let mesh = scene.getObjectByName('cameraTargetParent');
                    let p = mesh.position;
                    var baseCameraTargetPosition = new global_three.Vector3(p.x, p.y, p.z);
                    var baseCameraTargetRotation = window.camera_target.rotation;
                    var windowHalfX = document.getElementById('c').offsetWidth / 2;
                    var mouseXOnMouseDown = event.clientX - windowHalfX;
                    targetRotationOnMouseDownX = targetRotationX;
                    mesh.userData.position_z = mesh.position.z;
                    mesh.userData.position_x = mesh.position.x;
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
                            if (e.altKey) {
                                if (get_url_param('dev') === "true") {
                                    drag_focus_target(e, baseCameraTargetPosition, baseCameraTargetRotation);
                                    //drag_focus_target_x(e, baseCameraTargetPosition, baseCameraTargetRotation);
                                }
                            } else {

                                change_camera_rotate_x(e, mouseXOnMouseDown);
                                if (e.ctrlKey) {
                                    change_camera_position_y(e);
                                } else {
                                    if (e.which == 3 ) {
                                        change_camera_rotation_x(e, mouseXOnMouseDown);
                                    } else {
                                        if (lock_mouse_rotation_x == true) {
                                            change_camera_rotation_x(e, mouseXOnMouseDown);
                                        } else {
                                            change_camera_position_y(e);
                                        }
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
        }
    };
    mouse_wheel_events();
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
                } else if  (event.touches.length == 3) {
                    raf_divergention_y = mouse_down_y - event.touches[0].clientY;
                    change_camera_rotation_x ()
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

    add_route_points ();


    return controls;

}

