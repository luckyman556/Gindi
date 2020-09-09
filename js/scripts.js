
tween_animations.length = 0;
$(document).ready(function(){
    $('.preloader .center-logo').addClass('first');
    $('.preloader .preloader-building-box').addClass('first');
    $('.floor-plan .btn').click(function(){
        $(this).toggleClass('rotate-180');
        $('.floors-list').slideToggle();
    });
    $('.floor-img .aprt').click(function(){
        $('.floor-img .aprt').removeClass('locked');
        $(this).addClass('locked');
        $('.floor-img .aprt-text').removeClass('locked');
        $('.' + $(this).data('class')).addClass('locked');
    });
    $('.aprt').hover(function(){
        $('.' + $(this).data('class')).addClass('hover');
    }, function(){
        $('.' + $(this).data('class')).removeClass('hover');
    });
    $('.floors-nav .floor-prev').click(function(){
        floor_index = $(this).find('.floor-number').html() - 1;
        $('.floors-list .floor-item').eq(floor_index).click();
    });


    $('.floors-nav .floor-next').click(function(){
        floor_index = $(this).find('.floor-number').html() - 1;
        $('.floors-list .floor-item').eq(floor_index).click();
    });
    $('.three_js .popup-info .flat-plan .popups-togglers-box div.non-flat-360').click(function(event){
        toggler_non_flat_360_click ($('.three_js .popup-info .flat-plan .popups-togglers-box div.non-flat-360'));
    });



    $('.bomb-btn').click(function(){
        // TWEEN.removeAll();
        if ($(this).hasClass('active')) {
            hide_all_labels();
            setPositionButtonLanguage('restore');

            $('.floors-selector-n-back').removeClass('show');
            //$('.popup-info .close-btn').click();
            $('.floor-plan-toggler').removeClass('active');
            $(this).addClass('rotate');
            var this_el = $(this);
            setTimeout(function(){
                this_el.removeClass('rotate');
                this_el.removeClass('active');
                this_el.addClass('hide');
            }, 500);

            // window.roof.visible = true;
            setTimeout(function(){
                object_appear(window.roof);
            }, 1000);
            add_tween_animation ({
                'animation_obj' :  tween_animations,
                'start' : { z :  window.roof.position.z , opacity : 0},
                'target' : { z : window.roof.userData.base_position_z , opacity : 1},
                'duration' : 1000,
                'easing' : TWEEN.Easing.Quintic.In,
                'delay' : 0
            }, function (e) {
                window.change_plan_animation = true;
                window.building_destroing = true;
                window.roof.position.z = e.z;
                var metarial_i = 0;
                // fast_change
/*                while (metarial_i < window.roof.material.length) {
                    window.roof.material[metarial_i].transparent = true;
                    window.roof.material[metarial_i].opacity = e.opacity;
                    metarial_i++;
                }*/
            }, function (e) {
                window.change_plan_animation = false;
                window.building_destroing = false;
            });
            lock_mouse_rotation_x = false;
            lock_flat_angle_rotation = false;
            update_flat_labels();
            let local_current_floor = current_floor;
            let i = 0;
/*            {

                while (i < max) {
                    var duration = 500;
                    var floor_local = window.floor_obj[start + i];
                    var floor_delay = 0 + 100 * i;
                    add_floor_animation (floor_local , duration , floor_delay);
                    i++;
                }

            }*/
            let add_delay = 1000 / (window.floor_obj.length - current_floor);
             window.floor_obj.forEach(function(element, floor_index){
                if (element[0].userData.floor > current_floor) {
                    let floor_delay = 0 + add_delay * i;
                    add_floor(element, 0, floor_delay);
                    i++;
                }
            });

            window.disable_drag_controls = false;
            last_visible_floor = window.floor_obj.length;
            animate_camera_angle(-0.1);
            rotation_animated = true;
            normilize_camera_rotation_x();
            var target = { camera_x : 0 , camera_z : perspectiveCamera_position_z, camera_target_r_y : 2.124, camera_target_p_y : 4};
            if (building_name  == 'ooh') {
                target = {
                    camera_x : 0 ,
                    camera_z : perspectiveCamera_position_z,
                    camera_target_r_y : 3.7524578917878086,
                    camera_target_p_y : hide_lock,
                    camera_target_p_x : 0,
                    camera_target_p_z : 0
                };
            }

            // target_zoom = target.camera_z;
            // prepare to build





            add_tween_animation ({
                'animation_obj' :  tween_animations,
                'start' : {
                    camera_x : perspectiveCamera.position.x ,
                    camera_z: perspectiveCamera.position.z,
                    camera_target_r_y : window.camera_target.rotation.y,
                    camera_target_p_y : window.camera_target.position.y,
                    camera_target_p_x : window.camera_target.position.x,
                    camera_target_p_z : window.camera_target.position.z,
                },
                'target' : target,
                'duration' : 1000,
                'easing' : TWEEN.Easing.Quintic.In,
                'delay' : 0
            }, function (e) {
                //perspectiveCamera.position.x =  e.camera_x;
               // perspectiveCamera.position.z = e.camera_z;
                target_zoom = e.camera_z;
                //window.camera_target.position.y = e.camera_target_p_y;
                //window.camera_target.position.x = e.camera_target_p_x;
                //window.camera_target.position.z = e.camera_target_p_z;
                //window.camera_target.rotation.y = e.camera_target_r_y;
            }, function (e) {
                //set_page_descriptions ();
                //targetRotationX = e.camera_target_r_y;
                rotation_animated = false;

            });
            rotation_to_flat ();
            console.log(last_clicked_flat);
            last_clicked_flat.userData.apartment_locked = true;
            rotation_to_flat ();
            // console.log(last_clicked_flat);
            last_clicked_flat.userData.apartment_locked = true;
            set_floor_status_color([current_floor]);
            if (document.querySelector('.main-wrap').filter_active === true) {
                document.querySelector('.main-wrap').update_cards_btns_visibility();
            }
        } else {
            destroy_building(current_floor);
           // set_camera_on_flat (last_clicked_flat);
            setTimeout(update_flat_labels, 1000);
            new_floor_selector_obj.rebuild();
            setTimeout(function(){
                new_floor_selector_obj.rebuild();
                if (document.querySelector('.main-wrap').filter_active === true) {
                    document.querySelector('.main-wrap').update_cards_btns_visibility();
                }
            },1000);
            $(this).addClass('active');
            $(this).removeClass('hide');
            $('.floors-selector-n-back').addClass('show');

            setPositionButtonLanguage('move');
        }

    });


    $('.compass-btn').click(function(){
        if (lock_flat_angle_rotation == false ) {
            window.animate_list = [];
            var tween = {};
            var compas_btn = {};
            var start = { x : window.camera_target.rotation.x, y : window.camera_target.rotation.y };
            var target = { x : 0, y: 0 };
            tween = new TWEEN.Tween(start).to(target, 1000);
            var mesh = window.camera_target;
            tween.onUpdate(function(e){
                mesh.rotation.x = start.x;
                mesh.rotation.y = start.y;
            });
            tween.easing(TWEEN.Easing.Back.Out);
            tween.start();
            var floors_counter = 0;
            while (  floors_counter < window.floor_obj.length) {
                flats_visible_counter = 0;
                while (flats_visible_counter < window.floor_obj[floors_counter].length) {
                    var appartment = window.floor_obj[floors_counter][flats_visible_counter];
                    appartment.visible = true;
                    flats_visible_counter++;
                }
                floors_counter++
            }
            window.roof.visible = true;
            object_appear(window.roof);
            var compas_btn_start = { deg : document.querySelector('.compass-btn').dataset.deg };
            var compas_btn_target = { deg : 0 };
            compas_btn = new TWEEN.Tween(compas_btn_start).to(compas_btn_target, 1000);
            compas_btn.onUpdate(function(e){
                document.querySelector('.compass-btn').style.transform = "rotate(" + e.deg + "deg)";
                if (e.deg > 0) {
                    $('.compass-btn-box *').removeClass('active');
                    $('.compass-btn-box .n').addClass('active');
                    if (e.deg > 45) {
                        $('.compass-btn-box *').removeClass('active');
                        $('.compass-btn-box .e').addClass('active');
                        if (e.deg > 135) {
                            $('.compass-btn-box *').removeClass('active');
                            $('.compass-btn-box .s').addClass('active');
                            if (e.deg > 225) {
                                $('.compass-btn-box *').removeClass('active');
                                $('.compass-btn-box .w').addClass('active');
                            }
                            if (e.deg > 315) {
                                $('.compass-btn-box *').removeClass('active');
                                $('.compass-btn-box .n').addClass('active');
                            }
                        }
                    }
                }
            });
            compas_btn.easing(TWEEN.Easing.Back.Out);
            compas_btn.start();
            last_visible_floor = window.floor_obj.length;
        }
    });
    $('.flat-plan .toggle-btn').click(function(){
        if ($(window).width() < 768) {
            if ($(this).hasClass('active') != true) {
                disable_touch_handlers = true;
            } else {
                disable_touch_handlers = false;
            }
        } else {
            disable_touch_handlers = false;
        }
        $(this).toggleClass('active');
        $('.flat-plan').toggleClass('active');
        $('#c').toggleClass('active');

    });
    $('.flat-plan .toggle-btn').hover(function(){
        if ($(this).hasClass('active')) {
            $('.flat-plan').addClass('hover');
        }
    },function(){
        if ($(this).hasClass('active')) {
            $('.flat-plan').removeClass('hover');
        }
    });
    $('.flat-plan-box .down.btn').click(function(){
        $(this).toggleClass('active');
        $('.title-with-selector .flat-selector').toggleClass('active');
    });
    if ( positioning_mode == true) {
        $('.object-position').show();
    }
    flat_statuses_i = 0;

    while (flat_statuses_i < flat_statuses.length){
        item = flat_statuses[flat_statuses_i];
        index = flat_statuses_i;
        var filter_html = '<li data-filter="' + index + '"  data-status-color="\#' + item['color'] + '" ><div class="circle" style="background-color: \#' + item['color'] + '"></div><div class="text">' + item['name'] + '</div><div class="status-block"></div></li>';
        $('.search-toggle-part ul').append(filter_html);
        flat_statuses_i++;
    }
    $('.search-toggle-part ul').append('<div class="clear-all-filters"><span class="icon"></span><span class="text">Clear all filters</span></div>');

    //last_visible_floor = window.floor_obj.length - 1;
/*    var current_list_height = $('.search-toggle-part ul').outerHeight();
    $('.left-corner-block').css('bottom',  '-' + current_list_height + 'px');*/
    if ($(window).width() < 768) {
        $('.search-btn').removeClass('open');
    } else {
       // $('.search-btn').addClass('open');
    }
    setTimeout(function(){
        set_left_corner_bottom ();
    }, 1000);
    set_left_corner_bottom ();
    $('.search-btn .current-part').click(function(){

        $('.search-btn').toggleClass('open');
        if ($('.search-btn').hasClass('open')) {
            if (!$('.search-filter').hasClass('not-default')) {
                set_filter_to_start_position();
            }
            if ($('body').hasClass('mini-card-open') == true) {
                $('.popup-info .close-btn').trigger('click');
            }
            $('.zoom-by-mousewheel').addClass('filter-open');
            setTimeout(function(){
                $('.canvas-box').addClass('filter-open');
            }, 500);
            flats_filter_update();
        } else {
            
            $('.zoom-by-mousewheel').removeClass('filter-open');
            $('.canvas-box').removeClass('filter-open');
        }
        set_left_corner_bottom ();
        setTimeout(function(){
            new_floor_selector_obj.rebuild();
        },500);
    });

    $('.left-corner-block .bottom-part .mobile-tabs .tab').click(function(){
        $('.left-corner-block .bottom-part .mobile-tabs .tab').removeClass('active');
        $(this).addClass('active');
        let selector = '.' + $(this).data('class')
        $('.three_js .search-filter > *').removeClass('active-tab');
        $('.three_js .search-filter').find(selector).addClass('active-tab');
        let range_selector = $('.three_js .search-filter').find(selector).find('.range-selector');
        if (range_selector.length > 0) {
           let update_event = new Event('update');
            range_selector[0].dispatchEvent(update_event);
        }
    });


    if ($(window).width() < 768) {
        $('.search-btn').removeClass('open');
    }
    $(window).resize(function(){
        if (window.img_viewer != undefined) {
            window.img_viewer.refresh();
        }
        let range_selector = $('.three_js .search-filter .active-tab .range-selector');
        if (range_selector.length > 0) {
            let update_event = new Event('update');
            range_selector[0].dispatchEvent(update_event);
        }
/*        setTimeout(function(){
            if ($(window).width() < 768) {
                $('.search-btn').removeClass('open');
            }
            $('.search-btn').removeClass('open');
            // set_left_corner_bottom ();
        }, 500);*/
    });
    function set_left_corner_bottom () {
        var current_list_height = $('.three_js .left-corner-block .bottom-part').outerHeight();

        if ($(window).width() < 768) {
            current_list_height =  $('.three_js .left-corner-block .bottom-part').outerHeight();
        }
        if ($('.search-btn').hasClass('open') == false) {
            $('.left-corner-block').css('bottom',  '-' + current_list_height + 'px');
        } else {
            $('.left-corner-block').css('bottom',  0);
        }
    }
    function change_filter_colors () {
        $('.search-toggle-part ul li').each(function(){
            var this_el = $(this);
            if (this_el.hasClass('active') == true) {
                var status_color = this_el.data('status-color'); 
                this_el.css('background-color', status_color);
            } else { this_el.css('background-color', '');
            }
        });
    }

    $('.search-toggle-part ul li').click(function(){
        $(this).toggleClass('active');
        change_filter_colors ();
        filter_flats ();
    });
    $('.clear-all-filters').click(function(){
        $('.search-toggle-part ul li').each(function(){
            $(this).removeClass('active');
        });
        change_filter_colors ();
        filter_flats ();
    });



    $('.toggler-2d').click(function(event){
        set_click_point_coords(event);
        if ($(this).hasClass('active') != true) {
             toggler_2d_click ($(this));
        } else {

        }
    });


    $('.toggler-3d').click(function(event){
        set_click_point_coords(event);
        if ($(this).hasClass('active') != true) {
            let data = {};
            data.popup = 'popup-3d';
            flat_popup_prepare (data);
            data =  set_flat_popup_data (event, data.popup, $(this));
            var popup_visible = $('.popup.open').length;
            if (popup_visible > 0) {
                $('.popup').hide();
                toggle_popup (data);
            } else {
                $('.popup').hide();
                popup_appear(data, event);
            }
            // popup_appear_function ($(this), event);
            $('.three_js .popup-3d .content').addClass('loading');
            $('.three_js .popup-3d .content .slider .slide').each(function(item){
                let img = $(this).find('img');
                let content_width =  $('.three_js .popup-3d .content').width();
                if (content_width < 1024) {
                    content_width = 1024;
                }
                let img_name = img.attr('data-image-name');
                let img_src = 'https://dreamsimages.bmby.com/cdn-cgi/image/width=' + content_width  + '/new/dev/gindi/visual/' +  img_name;
                img.attr('src', img_src);
                img[0].onload = function(event){
                    img.addClass('loaded');
                };
            });
            setTimeout(check_imgs_loading,500);
            function check_imgs_loading () {
                let imgs_loaded = true;
                $('.three_js .popup-3d .content .slider .slide').each(function(item){
                    let img = $(this).find('img');
                    if (img.hasClass('loaded') !=  true) {
                        imgs_loaded = false;
                    }
                });
                if (imgs_loaded == true) {
                    $('.three_js .popup-3d .content .slider').slick( 'refresh' );
                    $('.three_js .popup-3d .content').removeClass('loading');
                } else {
                    setTimeout(check_imgs_loading,500);
                }
            }
        }
    });

    $('.open-model-360-popup').click(function(event){
        let mesh;
        const type =  $(this).data('type');
        if (type == 'roof') {
            mesh = window.roof;
        } else if (type == 'lobby') {
            mesh =  window.lobby;
        }

        lobby_n_roof_click (mesh, event, $(this));
        set_click_point_coords(event);
        toggler_non_flat_360_click ($('.click-point'));
    });

    $('.toggler-360').click(function(event) {
        set_click_point_coords(event);
        if ($(this).hasClass('active') !== true) {
            let window_width = $(window).width();
            if (window_width > 1024) {
                let data = {};
                data.popup = 'popup-360';
                flat_popup_prepare(data);
                data = set_flat_popup_data (event, data.popup, $(this));
                var popup_visible = $('.popup.open').length;
                if (popup_visible > 0) {
                    $('.popup').hide();
                    toggle_popup (data);
                } else {
                    $('.popup').hide();
                    popup_appear(data, event);
                }
            } else {
                let url = $('.popup-360').find('iframe').attr('src');
                window.open(url,'_blank');
            }
        }
    });

    resize_desktop_version();
    $(window).resize(resize_desktop_version);
    function resize_desktop_version () {
        let message = $('.resize-window-message');
        if ($(window).width() < 1024) {
            message.fadeIn();
        }  else {
            message.fadeOut();
        }
    }



    $('.popup .close-btn').click(function(event){
        let data = {};
        let popup_container = $('.three_js');
        data.popup = $(this).parents('.popup');
        data.target_width = 600;
        data.clicked_object = $('.click-point');
        let half_height_of_clicked_object = data.clicked_object.height() / 2;
        let half_width_of_clicked_object = data.clicked_object.width() / 2;
        data.target_position = data.clicked_object.offset();

        data.bottom_border = (popup_container.height() - data.target_height) / 2;
        data.popup_target_x = popup_container.width() - (data.clicked_object.offset().left - popup_container.offset().left) - half_width_of_clicked_object;
        data.popup_target_height = $(window).height() - 100;

        data.container_width = data.target_width;
        data.start_right = (popup_container.width() - data.target_width) / 2;
        data.start_bottom = data.bottom_border;
        data.target_bottom = popup_container.height() - (data.clicked_object.offset().top - popup_container.offset().top) - half_height_of_clicked_object;
        data.overlay = $('.three_js .popup-outer');
        popup_disappear(data, event);
        // popup_disappear_function($(this),event);
    });



    $('.print-btn').click(function(){
         var img_url = $('.popup-2d .content img').attr('src');
        printJS(img_url, 'image')

    });


    function set_popups_positions () {
        var toggler_2d_offset = $('.flat-plan .toggler-2d').offset();
        $('.popup-2d').css({
            'bottom' : Number($(window).height() - toggler_2d_offset.top - 50) + 'px',
            'right' : Number($(window).width() - toggler_2d_offset.left - 50)  + 'px'
        });
        var toggler_3d_offset = $('.flat-plan .toggler-3d').offset();
        $('.popup-3d').css({
            'bottom' : Number($(window).height() - toggler_3d_offset.top - 50) + 'px',
            'right' : Number($(window).width() - toggler_3d_offset.left - 50)  + 'px'
        });
        var toggler_360_offset = $('.flat-plan .toggler-360').offset();
        $('.popup-360').css({
            'bottom' : Number($(window).height() - toggler_360_offset.top - 50) + 'px',
            'right' : Number($(window).width() - toggler_360_offset.left - 50)  + 'px'
        });
    }

     set_popups_positions ();

    $('.three_js .compass').click(function(){
        normilize_camera_rotation_x ();
        let camera_target = global_three.Math.degToRad( 300 );
        targetRotationX = camera_target;
    });

    $('.floor-form .relative-block .btn.plus').click(function(){
        if (current_floor != 18) {
            if (lock_floor_controls != true) {
                current_floor = current_floor + 1;
                add_floor(window.floor_obj[current_floor], 0);
                set_floor_status_color([window.floor_obj[current_floor][0].userData.floor]);
                animate_height_on_floor(current_floor - 1);
                // flat_click(window.floor_obj[current_floor][0]);
                lock_floor_controls = true;
                set_floor_n_appartment(current_floor,0);
                setTimeout(function(){
                    lock_floor_controls = false;
                },500);

            }
        }
    });
    $('.floor-form .relative-block .btn.minus').click(function(){
        current_floor_before_minus = current_floor;
        if (current_floor != 0) {
            if (lock_floor_controls != true) {
                current_floor = current_floor - 1;
                flat_click(window.floor_obj[current_floor][0]);
                lock_floor_controls = true;
                setTimeout(function(){
                    lock_floor_controls = false;
                },500);
            }
        }
    });
/*    let elem =  $('.three_js .popup.popup-360 .content')[0];
    if (elem.requestFullscreen) {

    } else if (elem.mozRequestFullScreen) {

    } else if (elem.webkitRequestFullscreen) {
        $('.three_js .popup.popup-360  .fullscreen-btn').hide();
    } else if (elem.msRequestFullscreen) {
        $('.three_js .popup.popup-360   .fullscreen-btn').hide();
    }*/

/*    $('.three_js .popup.popup-360 .content .fullscreen-btn').click(function(){
        if ($(this).hasClass('active') == true) {
            $(this).removeClass('active');
            // document.exitFullscreen();
            let elem =  document;
            if (elem.requestFullscreen) {
                elem.exitFullscreen();
            } else if (elem.mozRequestFullScreen) { /!* Firefox *!/
                elem.mozExitFullscreen();
            } else if (elem.webkitRequestFullscreen) { /!* Chrome, Safari & Opera *!/
                elem.webkitExitFullscreen();
            } else if (elem.msRequestFullscreen) { /!* IE/Edge *!/
                elem.msExitFullscreen();
            }
        } else {
            let elem =  $('.three_js .popup.popup-360 .content')[0];
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { /!* Firefox *!/
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { /!* Chrome, Safari & Opera *!/
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /!* IE/Edge *!/
                elem.msRequestFullscreen();
            }
            $('.three_js .popup.popup-360 .content')[0].addEventListener('fullscreenchange', function(event){
               if (document.fullscreenElement != undefined) {
                   console.log('fullscreen');
               } else {
                   $('.three_js .popup.popup-360 .content .fullscreen-btn').removeClass('active');
               }
            });
            $(this).addClass('active');
        }
    });*/


    $('.flat-img').click(function(){
        $('.toggler-2d').trigger('click');
    });
    $('.view-toggler  .tgl-btn').click(function(){
        if ($('.main-wrap').hasClass('active') == false) {
            window.history.replaceState('', '', updateURLParameter(window.location.href, "tab", "3d"));
        } else {
            window.history.replaceState('', '', updateURLParameter(window.location.href, "tab", "2d"));
        }
        $('.main-wrap').toggleClass('active');
        $('.second-window').toggleClass('active');
    });
    if (findGetParameter('tab') == '2d') {
        $('.tg-view-mode-container .tgl-btn').click();
    };
    document.addEventListener('mouseup' ,function(event){
        if ($(event.target).parents('.flat-info').length > 0) {
            if ($(event.target).hasClass('tgl-btn') == true) {
                $(event.target).parents('.more-info').toggleClass('open');
            }
            if ($(event.target).hasClass('more-info-tgl-btn-title') == true) {
                $(event.target).parents('.more-info').toggleClass('open');
            }
            if ($(event.target).hasClass('apply-now') == true) {
                var text = $('.apply-now').data('text-to-option');
                var block = $('#get-demo-block');
                var option = block.find('.nice-select .option').eq(1);
                var true_option = block.find('select option').eq(1);
                true_option.html(text);
                true_option.attr('value',text);
                block.find('select').val(text);
                option.html(text);
                option.attr('data-value',text);
                option.click();
                var scroll_top = block.offset().top - (( $(window).height() - block.height()) / 2);
                $([document.documentElement, document.body]).animate({
                    scrollTop: scroll_top
                }, 500);
            }
        }
    });

    $('.three_js .clear-search-filter').click(function(){
        clear_all_filters ();
    });


    $('#tooltip-toggler').change(function(){
        allways_show_tooltip = document.getElementById('tooltip-toggler').checked;

    });
    var popup_info = $('.popup-info');
    popup_info.css('top',  226 + 'px');
     popup_info.css('left',  100 + 'px');
    document.querySelector('.popup-info .page-title').addEventListener('mousedown', function(event){
        var base_event = event;
        var base_x = Number(document.querySelector('.popup-info').style.left.replace('px',''));
        var base_y = Number(document.querySelector('.popup-info').style.top.replace('px',''));
        $('.popup-info').addClass('draged');
        window.disable_drag_controls = true;
        document.addEventListener('mousemove', drag_popup_info);
        function drag_popup_info(event) {
            update_line_position ();
            var mouse_move_event = event;
            var dif_x = base_event.pageX - mouse_move_event.pageX;
            var target_x = base_x - dif_x;
            document.querySelector('.popup-info').style.left = target_x + 'px';
            var dif_y = base_event.pageY - mouse_move_event.pageY;
            var target_y = base_y - dif_y;
            document.querySelector('.popup-info').style.top = target_y + 'px';
        }

        document.addEventListener('mouseup', function(event) {
            document.removeEventListener('mousemove', drag_popup_info);

            $('.popup-info').removeClass('draged');
            window.disable_drag_controls = false;
        });
    });
    $('.popup-info .close-btn').click(function(){
         $('body').removeClass('mini-card-open');
        new_floor_selector_obj.rebuild();
        $('.popup-info').addClass('hide');
        if (lock_mouse_rotation_x != true) {            
            last_clicked_flat.material.opacity = 0;
        }
        // $('.points-line').addClass('hide');
        window.last_clicked_point_css.visible = false;
        if ($('.clear-search-filter.active').length > 0) {
            flats_filter_update();
        }
        let filter_container = document.querySelector('.main-wrap');
        let filter_active = filter_container.filter_active;
        if (filter_active) {
            if (!document.querySelector('.filter-module-container.clear')) {
                if (!document.querySelector('.filter-module-container.flat-cards-open')) {
                    filter_container.filter_update();
                }
            }
        }
        last_clicked_flat.userData.apartment_locked = false;
        last_clicked_flat.userData.color_locked = false;
       // $('.main-wrap')[0].filter_update();

    });
    document.getElementById('c').addEventListener('mousedown', mouse_down_on_three_js_element);
    document.querySelector('.left-corner-block').addEventListener('mousedown', mouse_down_on_three_js_element);
    document.querySelectorAll('.non-canvas').forEach(function(element){
        element.addEventListener('mousedown', mouse_down_on_three_js_element);
    });

    $('.floor-plan-toggler').click(function(){
        if (floor_plan_btn_last_click + 1000 < Date.now()) {
            $(this).toggleClass('active');
           $('.bomb-btn').trigger('click');
            floor_plan_btn_last_click =  Date.now();
        }
    });

    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
        if (ua.indexOf('chrome') > -1) {

        } else {
            $('body').addClass('not-chrome');
        }
    }
    $('.preloader .to-page').click(function(){
        $('.preloader').fadeOut();
    });
    $('.preloader').addClass(building_name);
    requestAnimationFrame(get_prices);
    function get_prices () {
        if (all_appartments.length > 0) {
        let min_price = 99999999;
        let max_price = 0;
        all_appartments.forEach(function(item){
            const price = Math.floor(item.userData.crm_data.salePrice);
            if (min_price > price) {
                min_price = price;
            }
            if (max_price < price) {
                max_price = price;
            }
        });
        let range_object = $('.price-range');
        range_object.attr('data-min', min_price);
        range_object.attr('data-max', max_price);
            range_init (range_object);
            var floors_range = $('.floors-range');
            range_init (floors_range);
        } else {
            requestAnimationFrame(get_prices) ;
        }
    }


    {
        var object = $('.rotation-controller');
        var min_num = 0;
        var max_num = 359;
        var drag_start = false;
        var start_position_x;
        var min_start_position_left;
        var max_start_position_left;
        var target_position;
        var draget_object;
        var draget_object_type;
        var pointer = object.find('.circle');
        var range_difference = max_num - min_num;
        var range_width = object.width();
        var last_moved_time = Date.now();
        object[0].addEventListener('mousedown', object_mouse_down);
        object[0].addEventListener('touchstart', object_mouse_down);
        document.addEventListener('mousemove', object_mouse_move);
        document.addEventListener('touchmove', object_mouse_move);
        //object[0].addEventListener('mouseleave', object_mouse_up);
        document.addEventListener('mouseup', object_mouse_up);
        document.addEventListener('touchend', object_mouse_up);
        function object_mouse_down (event) {
            if ($(event.target).hasClass('circle')) {
                // normilize_camera_rotation_x ()
                start_position_x = event.pageX;
                if (event.touches) {
                    start_position_x = event.touches[0].pageX
                }
                drag_start = true;
                start_position_left = pointer.css('right').replace('px', '');
                draget_object = $(event.target);
            }
        }
        function object_mouse_move (event) {
            if (drag_start == true) {
                setTimeout(function(){
                    if (Date.now() > last_moved_time) {
                        draget_object.removeClass('draged');
                    };
                },20);
                last_moved_time = Date.now() + 20;
                draget_object.addClass('draged');
                normilize_camera_rotation_x();
                scroll_controls_dragger = drag_start;
                var target_position = start_position_x - event.pageX;
                if (event.touches) {
                    target_position = start_position_x - event.touches[0].pageX;
                }

                target_position = start_position_left - (target_position * -1);
                    if (target_position > range_width) {
                        target_position = range_width;
                    } else if (target_position < 0) {
                        target_position = 0;
                    }
                    var rotation = target_position / range_width;
                    var target_rotation = Math.PI * 2 * rotation;
                    targetRotationX = target_rotation;
                    draget_object.css('right', target_position);
            }
        }
        function object_mouse_up (event) {
            if (drag_start == true) {
                drag_start = false;
                draget_object.removeClass('draged');
                setTimeout(function(){
                    scroll_controls_dragger = drag_start;
                },1000);
            }
        }
    }
    $('.btns-wrap.radio .search-filter-btn').click(function(){
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
           $(this).parent().find('.search-filter-btn').removeClass('active');
            $(this).addClass('active');
        }
        flats_filter_update();
    });
    $('.btns-wrap.checkbox .search-filter-btn').click(function(){
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
        flats_filter_update();
    });
    if ($('.game-texts .text-block').length > 0) {
        change_game_text ();
    }
    function change_game_text () {
        let active_block = $('.game-texts .text-block.active');
        let timeout = active_block.html().length / 12 * 1000;
        let current_index = active_block.data('index');
        let next_index = current_index + 1;
        let text_blocks = $('.game-texts .text-block');
        if (next_index == text_blocks.length) {
            next_index = 0;
        }
        setTimeout(function(){
            text_blocks.slideUp();
            text_blocks.removeClass('active');
            text_blocks.eq(next_index).slideDown();
            text_blocks.eq(next_index).addClass('active');
            change_game_text ();
        }, timeout);
    }

    // $('.language-switch .language').click(function(){
    //     $('.language-switch .language').removeClass('active');
    //     $(this).addClass('active');
    //     if ($(this).hasClass('he') == true) {
    //         $('html').attr('dir', 'rtl');
    //         $('body').addClass('he');
    //         $('.language-string').each(function(){
    //             let string = $(this).data('he');
    //             $(this).html(string);
    //         });
    //     } else {
    //
    //         $('body').removeClass('he');
    //
    //         $('html').attr('dir', 'ltr');
    //         $('.language-string').each(function() {
    //             let string = $(this).data('en');
    //             $(this).html(string);
    //         });
    //     }
    // });

    $('.zoom-by-mousewheel').click(function(){
        if ($(this).hasClass('active') == true) {
            zoom_by_mousewheel = false;
            $(this).removeClass('active');
        }  else {
            zoom_by_mousewheel = true;
            $(this).addClass('active');
        }
    });
    new ClipboardJS('.flat-bubble');
    $('.ui-hide').click(function(){
        $('.non-canvas').toggle();
        if ($(this).hasClass('active')) {
            $('.three_js .points-line').css('opacity', '');
            $('.three_js .point-2').css('opacity', '');
            $('.three_js .point-1').css('opacity', '');
        } else {

            $('.three_js .points-line').css('opacity', '0');
            $('.three_js .point-2').css('opacity', '0');
            $('.three_js .point-1').css('opacity', '0');
        }

        $(this).toggleClass('active');
    });

    $('.language.he').trigger('click');

    var sBrowser, sUsrAg = navigator.userAgent;

// The order matters here, and this may report false positives for unlisted browsers.

    if (sUsrAg.indexOf("Firefox") > -1) {
        sBrowser = "Mozilla Firefox";
        $('body').addClass('firefox-run');
        // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
    } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
        sBrowser = "Samsung Internet";
        // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
    } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
        sBrowser = "Opera";
        // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
    } else if (sUsrAg.indexOf("Trident") > -1) {
        sBrowser = "Microsoft Internet Explorer";
        // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
    } else if (sUsrAg.indexOf("Edge") > -1) {
        sBrowser = "Microsoft Edge";
        // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    } else if (sUsrAg.indexOf("Chrome") > -1) {
        sBrowser = "Google Chrome or Chromium";
        // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
    } else if (sUsrAg.indexOf("Safari") > -1) {
        sBrowser = "Apple Safari";
        $('body').addClass('safari-run');
        // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
    } else {
        sBrowser = "unknown";
    }
    //console.log("You are using: " + sBrowser);
});

// camera_target.children[0].rotation.x = -0.1
// y: 6.15773029999999
// camera_target.rotation.y 0.7930013691039185

/*document.querySelector('.left-floors-selector').addEventListener('mouseover',function(e){

    window.disable_drag_controls = true;
    var items_in_view = Math.round(document.querySelector('.left-floors-selector-wrap').offsetHeight / document.querySelector('.left-floors-selector .floor-selector-item').offsetHeight);
    document.querySelector('.left-floors-selector').onmousewheel = function(e) {
        if ( floors_track_animated == false) {
        var position = Number(document.querySelector('.left-floors-selector').dataset.position);
            if (e.deltaY > 0) {
                if (position  > -1) {
                    floors_track_animated = true;
                    $('.left-floors-selector .floor-selector-item.next-1').trigger('mouseup');
                    set_floor_track_position (position - 1);
                    setTimeout(function(){
                        floors_track_animated = false;
                    },600);
                }
            } else {
                if (document.querySelectorAll('.left-floors-selector .floor-selector-item').length  - items_in_view + 1 >  position) {
                    floors_track_animated = true;
                    $('.left-floors-selector .floor-selector-item.prev-1').trigger('mouseup');
                    set_floor_track_position (position + 1);
                    setTimeout(function(){
                        floors_track_animated = false;
                    },600);

                }
            }
        }
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    };
    var max_top = ($('.left-floors-selector').outerHeight() - $('.left-floors-selector .floor-selector-item.active').outerHeight() ) * -1;
    document.querySelector('.left-floors-selector').onmousedown = function(e) {
        if (event.which == 1){
        flat_selector_dragged = false;
        var start_y = e.clientY;
        var little_btn_height = $('.floor-selector-item.prev-1').outerHeight();
        var start_top = Number (document.querySelector('.left-floors-selector').style.top.replace('px', ''));
            document.querySelector('.left-floors-selector').onmousemove = function(e) {
               $('.left-floors-selector').addClass('draged');
                var current_y = e.clientY;
                if (current_y != start_y) {

                    var moved_top = start_top - (start_y - current_y);
                    if (start_y - current_y < -10 || start_y - current_y > 10  ) {
                        flat_selector_dragged = true;
                    }
                    if (moved_top > little_btn_height || moved_top * -1 > little_btn_height) {

                    } else if (10 == 9) {

                    }
/!*                    if (moved_top > 0) {
                        if (moved_top > 100) {
                            document.querySelector('.left-floors-selector').style.top = (100 * 0.6) + (moved_top - 100) * 0.3 + 'px';
                        } else if (moved_top > 200) {
                            document.querySelector('.left-floors-selector').style.top = (100 * 0.6) + (moved_top - 100) * 0.3 + (moved_top - 200) * 0.1 + 'px';
                        } else {
                            document.querySelector('.left-floors-selector').style.top = (moved_top * 0.6) + 'px';
                        }
                    } else if (max_top > moved_top) {
                        var difference = moved_top - max_top;
                        if (difference < -100) {
                            document.querySelector('.left-floors-selector').style.top = max_top + (-100 * 0.6) + (difference + 100) * 0.3  + 'px';
                        } else if (difference < -200) {
                            document.querySelector('.left-floors-selector').style.top = max_top + (-100 * 0.6) + (difference + 100) * 0.3  + (difference + 200) * 0.1 + 'px';
                        } else {
                            document.querySelector('.left-floors-selector').style.top = max_top + (difference * 0.6) + 'px';
                        }

                    }
                    else {

                    }*!/
                    document.querySelector('.left-floors-selector').style.top = moved_top + 'px';
                }
            };
        }
    };

    document.querySelector('.left-floors-selector').onmouseup = function(e) {
        floor_track_mouse_out ();
    };
    document.querySelector('.left-floors-selector').addEventListener('mouseleave',function(e){
        floor_track_mouse_out ();
        window.disable_drag_controls = false;
    });
    function floor_track_mouse_out () {
        $('.left-floors-selector').removeClass('draged');
        document.querySelector('.left-floors-selector').onmousemove = null;
        if (Number (document.querySelector('.left-floors-selector').style.top.replace('px', '')) > 0) {
            document.querySelector('.left-floors-selector').style.top = '0px';
        } else if   (Number (document.querySelector('.left-floors-selector').style.top.replace('px', '')) <  max_top)  {
            document.querySelector('.left-floors-selector').style.top = max_top + 'px';
        }
    }
});*/

 document.addEventListener('keydown', (e) => {
     if (!e.repeat) {
         if (e.keyCode == 89) {
             if (e.ctrlKey) {
                var count = 3;
                var i = 0;
                while (count > i) {
                    setTimeout(function(){
                        var parameter = 'position';
                        var axis = 'y';
                        const current_rotation = window.camera_target[parameter][axis];
                        var rotation_divergention = -0.5;
                        var duration = 500;
                        var easing = TWEEN.Easing.Cubic.In;
                        var easing_out = TWEEN.Easing.Cubic.Out;
                        add_tween_animation ({
                            'animation_obj' :  tween_animations,
                            'start' : {  camera_target_r_z : window.camera_target[parameter][axis] },
                            'target' : {  camera_target_r_z : current_rotation + rotation_divergention},
                            'duration' : duration,
                            'easing' : easing,
                            'delay' : 0
                        }, function (e) {
                            window.camera_target[parameter][axis] = e.camera_target_r_z;
                        }, function (e) {

                        });

                        var setTimeout_delay = duration + 5;
                        setTimeout(function(){
                            add_tween_animation ({
                                'animation_obj' :  tween_animations,
                                'start' : {  camera_target_r_z : window.camera_target[parameter][axis] },
                                'target' : {  camera_target_r_z : current_rotation},
                                'duration' : duration,
                                'easing' : easing_out,
                                'delay' : 0
                            }, function (e) {
                                window.camera_target[parameter][axis] = e.camera_target_r_z;
                            }, function (e) {

                            });
                        }, setTimeout_delay);
                    }, 1010 * i);
                    i++;
                }
             }
         }
     }
 });

function flat_popup_prepare (data) {
    var popup_class = data.popup;
    var popup = $('.' + popup_class);
    popup.find('.' + popup.data('toggler')).addClass('active');
    if (popup_class != 'not-flat-360') {
        var flat = add_appartment_info_in_popup(popup);
        console.log(popup_class);
        if (flat.userData.url_360 != undefined) {
            var url_360 = flat.userData.url_360;
            var iframe_html = '<iframe src="' + url_360 + '"></iframe>';
            $('.popup-360 .iframe-box').html(iframe_html);
            popup.find('.toggler-360').css('display' , 'flex');

        } else {
            popup.find('.toggler-360').css('display' , 'none');

        }

        if (document.body.classList.contains('en')) {
            popup.find('.toggler-360').html('360');
        } else {
            popup.find('.toggler-360').html('תצפית');
        }
        // if (flat.userData.url_360_type === 'default') {
        //     popup.find('.toggler-360').html('תצפית');
        // } else {
        //     popup.find('.toggler-360').html('360');
        // }


        if (flat.userData.int_360 != undefined) {
            popup.find('.toggler-3d').css('display' , 'flex');
        } else {
            popup.find('.toggler-3d').css('display' , 'none');
        }
    }
}
