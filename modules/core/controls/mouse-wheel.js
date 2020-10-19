export function mouse_wheel_events () {
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

    if (get_url_param('mouse_wheel_check') === "true") {

    } else {
        zoom_by_mousewheel = true;
        document.querySelector('.zoom-by-mousewheel').style.display = 'none';
    }

    function onWheel(e) {
        // event.preventDefault();
        $(".mouse-wheel-info").removeClass('active');
        update_line_position_enabled = true;

        if(e.target == document.getElementById('c') || e.target == document.querySelector('.points-line') || e.target == document.querySelector('.mouse-wheel-info')) {
            if (e.ctrlKey === true) {
                if (get_url_param('dev') === "true") {
                    e = e || window.event;
                    // wheelDelta не даёт возможность узнать количество пикселей
                    var delta = e.deltaY || e.detail || e.wheelDelta;
                    if ($('body').hasClass('firefox-run') == true) {
                        delta = delta * 33;
                    }
                    target_zoom =  target_zoom + delta * 0.3;

                    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                    setTimeout(function(){ update_line_position_enabled = false;}, 4000);
                } else {
                    e = e || window.event;
                    // wheelDelta не даёт возможность узнать количество пикселей
                    var delta = e.deltaY || e.detail || e.wheelDelta;
                    if ($('body').hasClass('firefox-run') == true) {
                        delta = delta * 33;
                    }
                    target_zoom =  target_zoom_limit (target_zoom + delta * 0.3);

                    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                    setTimeout(function(){ update_line_position_enabled = false;}, 4000);
                }
            } else {
                if (zoom_by_mousewheel === true) {
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
                    }
                    /*                        far_current_click_camera_position_y = window.camera_target.position.y;
                                            var delta = e.deltaY || e.detail || e.wheelDelta;
                                            raf_divergention_y = delta;
                                            change_camera_position_y();*/
                }

            }
        }
    }
}