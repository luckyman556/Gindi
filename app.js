import * as THREE from './node_modules/three/build/three.module.js';
import Stats from './node_modules/three/examples/jsm/libs/stats.module.js';

import { DragControls } from './node_modules/three/examples/jsm/controls/DragControls.js';
import { TransformControls } from './node_modules/three/examples/jsm/controls/TransformControls.js';

import {PerspectiveCamera_init} from './modules/camera.js?ver=202009111345';
import {controls_init} from './modules/controls/controls.js?ver=202009111345';
import {add_models} from './modules/add-models.js?ver=202009111345';
import {animate_cylinder_floor_numbers} from './modules/cylinder-floor-numbers/add-cylinder-floor-numbers.js?ver=202009111345';
import {floor_numbers_visibility_by_zoom} from './modules/cylinder-floor-numbers/add-cylinder-floor-numbers.js?ver=202009111345';
import {add_mouse_n_touches} from './modules/controls/mouse-n-touches.js?ver=202009111345';
import {add_filter} from "./modules/filter/filter.js";
import { GUI } from './node_modules/three/examples/jsm/libs/dat.gui.module.js';
import { CSS2DRenderer, CSS2DObject } from './node_modules/three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS3DRenderer, CSS3DObject } from './node_modules/three/examples/jsm/renderers/CSS3DRenderer.js';
import {dictionary_array} from "./modules/language/dictionary.js";
import { EffectComposer } from './node_modules/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './node_modules/three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from './node_modules/three/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from './node_modules/three/examples/jsm/postprocessing/OutlinePass.js';
import { FXAAShader } from './node_modules/three/examples/jsm/shaders/FXAAShader.js';
import { applyNow} from './modules/apply-now/applyNow.js';

// street names and position angle

import {street_names_n_positions_angle} from './modules/street-names/names-angle.js';
import {getCookie, setCookie} from "./js/setAndGetCookies.js";

dictionary = dictionary_array;
global_three = THREE;
var drag_controls;
var container, stats;
var camera , controls;
var show_resolution = false;
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

var group = new THREE.Group();
var  canvas;
var summ_of_fps = 0;
var fps_frames = 0;
var avarage_fps = 0;
var gui;
window.camera_target = {};
var begin_time = 0;
tempV = new THREE.Vector3();
vector = new THREE.Vector3();
window.vector_point = new THREE.Vector3();
window.vector_point_2 = new THREE.Vector2();
vector_to_world_position = new THREE.Vector3();
box = new THREE.Box3();
var openedPopup;
window.showApplyNow = true;


function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas = document.querySelector('#c');
    applyNow(document.querySelector('.apply__main-container'));
    var renderer_params = {
        canvas,
        antialias: true,
        //outputEncoding: THREE.sRGBEncoding,
        // sortObjects: true,
        // powerPreference: 'high-performance',
    };
/*    if (detect_mobile()) {
       renderer_params.antialias = false;
    }*/
    renderer = new THREE.WebGLRenderer(renderer_params);
   // renderer.gammaOutput = true;
    renderer.autoClear = false;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );
    //renderer.outputEncoding = THREE.sRGBEncoding;
    scene = new THREE.Scene();

    perspectiveCamera = PerspectiveCamera_init(perspectiveCamera);

    controls = controls_init(perspectiveCamera ,canvas, controls);
    // model
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
    };
    var geometry_var = 5;
    var geometry = new THREE.BoxBufferGeometry( geometry_var, geometry_var, geometry_var );
    var geometry_2 = new THREE.BoxBufferGeometry( geometry_var, geometry_var, geometry_var);
    var material = new THREE.MeshPhongMaterial({
        color: 'red',
    });
    var material_2 = new THREE.MeshPhongMaterial({
        color: 'green',
    });

    var cubeA = new THREE.Mesh( geometry, material );
    cubeA.position.set( 0, 0, 0 );
    cubeA.name = 'center';

    var cubeB = new THREE.Mesh( geometry_2, material_2 );
    cubeB.position.set( 0, 0, 0 );
    cubeB.name = 'outer';
    if (transform_controls) {
       control = new TransformControls( perspectiveCamera, renderer.domElement );
        window.addEventListener( 'keydown', function ( event ) {

            switch ( event.keyCode ) {
                case 81: // Q
                    control.setSpace( control.space === "local" ? "world" : "local" );
                    break;
                case 87: // W
                    control.setMode( "translate");
                    break;
                case 69: // E
                    control.setMode("rotate");
                    break;
                case 82: // R
                    control.setMode("scale");
                    break;
/*                case 84: // T
                    control.detach();
                    break;*/
                case 32: // Spacebar
                    control.enabled = ! control.enabled;
                    break;
            }
            if (event.ctrlKey) {

                if (event.shiftKey) {
                    switch ( event.keyCode ) {
                        case 70: // F
                            document.querySelector('.three_js').appendChild( stats.dom );
                            break;
                        case 86: // V
                    }
                }
            }
            control.addEventListener('dragging-changed', function (event) {
            //    console.log(control.object.position);
            });
        });

        scene.add( control );

        control.addEventListener( 'mouseDown', function ( event ) {
            window.disable_drag_controls = true;
        });
        control.addEventListener( 'mouseUp', function ( event ) {
            window.disable_drag_controls = false;
        });
    }

    window.camera_target = new THREE.Group();
    window.camera_target.add( cubeA );
    window.camera_target.add( cubeB );
    window.camera_target.position.y = 10;
    window.camera_target.position.z = 0;
    window.camera_target.position.x = 0;
    scene.add( window.camera_target );
    window.camera_target.visible = false;
    add_models(scene , window.all_appartments);

    scene.add( group );

    window.camera_target.children[0].add(perspectiveCamera);

    window.camera_target.children[0].rotation.x = -0.2;

    add_mouse_n_touches();

    drag_controls = new DragControls( window.drag_objects, perspectiveCamera, canvas );
    drag_controls.addEventListener( 'dragstart', function ( event ) {
        window.disable_drag_controls = true;
        last_dragged_object = event.object;
    } );

    drag_controls.addEventListener( 'dragend', function ( event ) {
        window.disable_drag_controls = false;
        last_dragged_object = event.object;
        // console.log(last_dragged_object);
    } );

    set_default_camera_position ();

    var  light = new THREE.AmbientLight( 0x404040 ); // soft white light
    light.intensity = 1.5;
    scene.add( light );

    var d = new Date();
    begin_time = d.getTime();
    var params = {
        available: '#' + flat_statuses[1]['color'],
        available_active: '#' + flat_statuses[1]['active'],
        available_hover: '#' + flat_statuses[1]['hover'],
        unavailable_active: '#' + flat_statuses[0]['active'],
        unavailable: '#' + flat_statuses[0]['color'],
        unavailable_hover: '#' + flat_statuses[0]['hover'],
    };
    stats = new Stats();
    stats.dom.style.top = '100px';
    stats.dom.style.left = '10px';
    stats.dom.style.direction = 'ltr';

    {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (urlParams !== undefined) {
            let dev = urlParams.get('fps');
            if (dev !== null) {
                document.querySelector('.three_js').appendChild(stats.dom);
            }
            let disable_auto_rotate = urlParams.get('disable_auto_rotate');
            if (disable_auto_rotate != null) {
                lock_autorotate = true;
            }
            let show_res = urlParams.get('show_res');
            if (show_res != null) {
                show_resolution = true;
                $('.current-resolution').show();
            }
            let show_gui = urlParams.get('gui');
            if (show_gui != null) {
                gui = new GUI();
                var folder = gui.addFolder('Apts colors');
                folder.addColor(params, 'available')
                    .name('Available')
                    .onChange(function () {
                        let return_val = params.available.replace('#', '');
                        flat_statuses[1]['color'] = return_val;
                    });
                folder.addColor(params, 'available_active')
                    .name('Available active')
                    .onChange(function () {
                        let return_val = params.available_active.replace('#', '');
                        flat_statuses[1]['active'] = return_val;
                    });
                folder.addColor(params, 'available_hover')
                    .name('Available hover')
                    .onChange(function () {
                        let return_val = params.available_hover.replace('#', '');
                        flat_statuses[1]['hover'] = return_val;
                    });
                folder.addColor(params, 'unavailable')
                    .name('Unavailable')
                    .onChange(function () {
                        let return_val = params.unavailable.replace('#', '');
                        flat_statuses[0]['color'] = return_val;
                    });
                folder.addColor(params, 'unavailable_active')
                    .name('Unavailable active')
                    .onChange(function () {
                        let return_val = params.unavailable_active.replace('#', '');
                        flat_statuses[0]['active'] = return_val;
                    });
                folder.addColor(params, 'unavailable_hover')
                    .name('Unavailable hover')
                    .onChange(function () {
                        let return_val = params.unavailable_hover.replace('#', '');
                        flat_statuses[0]['hover'] = return_val;
                    });
                folder.open();
            }
            {

                r_animation_type = TWEEN.Easing.Linear.None;
                let r_animate = get_url_param('r_animate');
                if (r_animate == 'true') {
                    gui = new GUI();
                    var params = {
                        easings: r_animation_type,
                        duration: r_animate_duration,
                        'Зависимость от растояния' : r_angle_mod,
                        'Коефициент зависимости от растояния' : r_angle_mod_coef
                    };
                    var folder = gui.addFolder('Animation');
                    let easings = {
                        'Linear.None' : TWEEN.Easing.Linear.None,
                        'Quadratic.In' : TWEEN.Easing.Quadratic.In,
                        'Quadratic.Out' : TWEEN.Easing.Quadratic.Out,
                        'Quadratic.InOut' : TWEEN.Easing.Quadratic.InOut,
                        'Cubic.In' : TWEEN.Easing.Cubic.In,
                        'Cubic.Out' : TWEEN.Easing.Cubic.Out,
                        'Quartic.In' : TWEEN.Easing.Quartic.In,
                        'Quartic.Out' : TWEEN.Easing.Quartic.Out,
                        'Quartic.InOut' : TWEEN.Easing.Quintic.In,
                        'Quintic.Out' : TWEEN.Easing.Quintic.Out,
                        'Quintic.InOut' : TWEEN.Easing.Quintic.InOut,
                        'Sinusoidal.In' : TWEEN.Easing.Sinusoidal.In,
                        'Sinusoidal.Out' : TWEEN.Easing.Sinusoidal.Out,
                        'Sinusoidal.InOut' : TWEEN.Easing.Sinusoidal.InOut,
                        'Exponential.In' : TWEEN.Easing.Exponential.In,
                        'Exponential.Out' : TWEEN.Easing.Exponential.Out,
                        'Circular.In' : TWEEN.Easing.Circular.In,
                        'Circular.Out' : TWEEN.Easing.Circular.Out,
                        'Circular.InOut' : TWEEN.Easing.Circular.InOut,
                        'Elastic.In' : TWEEN.Easing.Elastic.In,
                        'Elastic.Out' : TWEEN.Easing.Elastic.Out,
                        'Elastic.InOut' : TWEEN.Easing.Elastic.InOut,
                        'Back.In' : TWEEN.Easing.Back.In,
                        'Back.Out' : TWEEN.Easing.Back.Out,
                        'Back.InOut' : TWEEN.Easing.Back.InOut,
                        'Bounce.In' : TWEEN.Easing.Bounce.In,
                        'Bounce.Out' : TWEEN.Easing.Bounce.Out,
                        'Bounce.InOut' : TWEEN.Easing.Bounce.InOut,
                    }
                    folder.add( params, 'easings', Object.keys( easings ) ).onChange( function () {
                        r_animation_type = easings[params.easings];
                    } );
                    folder.add( params, 'duration', 500, 5000 ).step( 100 ).onChange( function () {
                         r_animate_duration = params.duration;
                    } );
                    folder.add( params, 'Зависимость от растояния').onChange( function () {
                        r_angle_mod = params['Зависимость от растояния'];
                    } );
                    folder.add( params, 'Коефициент зависимости от растояния' , 0.1, 2 ).step( 0.1).onChange( function () {
                        r_angle_mod_coef = params['Коефициент зависимости от растояния'];
                    } );

                    folder.open();
                    document.querySelector('.dg.ac').classList.add('non-canvas');
                }
            }

        }
    }

    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize( window.innerWidth, window.innerHeight );
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0';
    labelRenderer.domElement.style.pointerEvents = 'none';
    document.getElementById( 'three_d_css' ).appendChild( labelRenderer.domElement );

    let labels_i = 0;
    while (labels_i <= 12) {
        var text = document.createElement( 'div' );
        text.className = 'flat_status_2d_css';
        var label = new CSS2DObject( text );
        label.position.set(0,0,0);

        label.renderOrder = 1;
        label.visible = false;
        scene.add(label);
        flat_labels_group[labels_i] = label;
        labels_i++;
    }
    var floor_center_text = document.createElement( 'div' );

    floor_center_text.className = 'floor_center_2d_css';
    var floor_center_text_obj = new CSS2DObject( floor_center_text );
    floor_center_text_obj.renderOrder = 0;
    floor_center_text_obj.position.set(0,0,0);
    floor_center_text_obj.visible = false;
    scene.add(floor_center_text_obj);

    var last_click_point = document.createElement( 'div' );

    last_click_point.className = 'last_click_point';
    var last_click_point_obj = new CSS2DObject( last_click_point );
    last_click_point_obj.renderOrder = 0;
    last_click_point_obj.position.set(0,0,0);
    let inner_html = `
            <div class="pulse"></div>
    `;
    last_click_point_obj.element.innerHTML = inner_html;
    last_click_point_obj.visible = false;


    scene.add(last_click_point_obj);
    window.last_clicked_point_css = last_click_point_obj;

    flat_labels_group[12] = floor_center_text_obj;

    update_renderer_size ();


}
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = $('.three_js #c').width();
    const height = $('.three_js #c').height();
    const needResize = canvas.width !== width || canvas.height !== height;
    return needResize;
}
function update_renderer_size () {
    var width = renderer.domElement.offsetWidth;
    var height = renderer.domElement.offsetHeight;
    perspectiveCamera.aspect = canvas.clientWidth / canvas.clientHeight;
    perspectiveCamera.updateProjectionMatrix();
    renderer.setSize(width, height);
    labelRenderer.setSize(width, height);
}
let progress_bar_update_bool = true;
window.mixer_first_time = true;
let percentLoader = 0;

function loaderLineProgress() {
    if (!document.querySelector('.preloader.completed')) {
        let current_value = Number($('.preloader svg .st0').css('stroke-dashoffset').replace('px',''));
        let local_percent;
        local_percent = totalPercent;
        let target_value =  930 * ((100  - local_percent) / 100) + 270;
        let max_value = 1200 - 270;
        let diff = target_value - current_value;
        let new_value = current_value + diff * 0.2;
        let progress_bar_data_percent = 100 - Math.floor((new_value - 270) /  max_value * 100);
        $('.preloader svg .st0').css('stroke-dashoffset', String(new_value));
        set_progress_bar_data(progress_bar_data_percent,'');
        requestAnimationFrame(loaderLineProgress);
    }


    function set_progress_bar_data (current_percent, text) {
        if (current_percent != Infinity) {
            $('.custom-progress-bar .progress-line-active .custom-tooltip .text .change').html(current_percent);
            $('.custom-progress-bar .bottom-text').html(text);
            $('.custom-progress-bar .progress-line-active').css('width' , current_percent  + '%');
            // let stroke_offset =  930 * ((100  - current_percent) / 100) + 270;
            // $('.preloader svg .st0').css('stroke-dashoffset', String(stroke_offset));
        }
    }

}

requestAnimationFrame(loaderLineProgress);


function animate() {
    TWEEN.update();

    if (document.querySelector('.filter-module-container.open')) {
        if (!document.querySelector('.filter-module-container.clear')) {
            $('.popup-info').addClass('hide');
        }
    }
    if (!document.querySelector('.main-wrap').filter_active) {
        if (crmStatusLoadBool && model_loaded) {
            add_filter($('.main-wrap'), 'img/filter-module/');
        }
    }
    if ($('.popup.open').length === 0 && window.render_pause != true) {
        if (resizeRendererToDisplaySize(renderer)) {
            update_renderer_size();
        }
        let target_zoom_diff = target_zoom - perspectiveCamera.position.z;
        if (!isNaN(target_zoom)) {
            if (Math.sqrt(target_zoom_diff * target_zoom_diff) > 0.3) {
                perspectiveCamera.position.z += (target_zoom - perspectiveCamera.position.z) * 0.1;
            } else {
                perspectiveCamera.position.z = target_zoom;
            }
        }


        if (!rotation_animated) {
            let rotation_diff = targetRotationX - window.camera_target.rotation.y;
            if (Math.sqrt(rotation_diff * rotation_diff) > 0.001) {
                window.camera_target.rotation.y += (targetRotationX - window.camera_target.rotation.y) * 0.1;
                if (!scroll_controls_dragger) {
                    var object = $('.rotation-controller');
                    var range_width = object.width();
                    var degree = rotation_in_degree(window.camera_target.rotation.y);
                    var position = (degree / 360) * range_width;
                    var pointer = object.find('.circle');
                    pointer.css('right', position);
                    $('.compass').css('transform', 'rotateZ(' + degree + 'deg)');
                }
                update_line_position();

            } else {
                window.camera_target.rotation.y = targetRotationX;
                if (!scroll_controls_dragger) {
                    var object = $('.rotation-controller');
                    var range_width = object.width();
                    var degree = rotation_in_degree(window.camera_target.rotation.y);
                    var position = (degree / 360) * range_width;
                    var pointer = object.find('.circle');
                    pointer.css('right', position);
                    $('.compass').css('transform', 'rotateZ(' + degree + 'deg)');
                }
                update_line_position();
            }
        }

        if (lock_mouse_rotation_x) {
            $('.last_click_point .pulse').hide();
        } else {
            $('.last_click_point .pulse').show();
        }


        if (update_line_position_enabled) {
            if (click_flat_intersection_point != null) {
                update_line_position();
            }
        }
        raycaster.setFromCamera(mouse, perspectiveCamera);

        renderer.render(scene, perspectiveCamera);
        labelRenderer.render(scene, perspectiveCamera);
        if (intersection_on) {
            checkIntersection();
        }

        stats.update();

        // console.log(stats.getFPS());
        if (progress_bar_update_bool) {
            if (model_loaded) {
                window.floor_obj.forEach(function (floor) {
                    floor.forEach(function (flat) {
                        if (!flat.userData.world_position) {
                            flat.userData.world_position = flat.children[0].getWorldPosition(new global_three.Vector3());
                        }
                    });
                });

                let textures_percent = loaded_texture_counter / 29 * 100;
                // progress_bar_update(3, textures_percent, `Loading textures ${loaded_texture_counter} from  ${textures_counter}`);

                if ((loaded_texture_counter === 29) || (low_performance_mode && loaded_texture_counter === 11)) {
                    $('.to-page').addClass('active');
                    // progress_bar_update(1, 100, 'Load complete');
                    // progress_bar_update(1, 'Load complete');
                    $('.preloader').addClass('completed');
                    $('.preloader .to-page').trigger('click');
                    progress_bar_update_bool = false;

                    flat_number_bubble('hide');
                    {
                        const queryString = window.location.search;
                        const urlParams = new URLSearchParams(queryString);
                        if (urlParams) {
                            let flat_card = urlParams.get('flat_card');
                            if (flat_card != null) {
                                let target_flat = null;
                                all_appartments.forEach(function (flat) {
                                    let prop_num = flat.userData.crm_data.propNum;
                                    if (prop_num == flat_card) {
                                        target_flat = flat;
                                    }
                                });
                                if (target_flat != null) {
                                    flat_click(target_flat);
                                    last_clicked_flat = target_flat;
                                    setTimeout(function () {
                                        $('.three_js .popup-info .flat-plan .popups-togglers-box div.floor-plan-toggler').click();
                                    }, 500);
                                }
                            }
                            let flat_popup = urlParams.get('flat_popup');
                            if (flat_popup != null) {
                                let target_flat = null;
                                all_appartments.forEach(function (flat) {
                                    let prop_num = flat.userData.crm_data.propNum;
                                    if (prop_num == flat_popup) {
                                        target_flat = flat;
                                    }
                                });
                                if (target_flat != null) {
                                    flat_click(target_flat);
                                    setTimeout(function () {
                                        $('.three_js .popup-info .flat-plan .popups-togglers-box div.toggler-2d').click();
                                    }, 500);
                                }
                            }
                        }
                        ;
                    }
                }
            }
        }
        ;
        if (new_floor_selector_obj != undefined) {
            if (new_floor_selector_obj.target_top != undefined) {
                let current_top = new_floor_selector_obj.current_top;
                let target_top = new_floor_selector_obj.target_top;
                let top_diff = target_top - current_top;
                let smooth_number = floors_slider_top_mod;
                let changed_value = top_diff * smooth_number;
                if (Math.sqrt(changed_value * changed_value) > 1) {
                    let local_target_top = current_top + changed_value;
                    new_floor_selector_obj.track.css('top', local_target_top);
                    new_floor_selector_obj.current_top = local_target_top;
                } else {
                    new_floor_selector_obj.track.css('top', target_top);
                    new_floor_selector_obj.current_top = target_top;
                    if (new_floor_selector_obj.scrolled == true) {
                        new_floor_selector_obj.scrolled = false;
                        new_floor_selector_obj.set_building_changes(new_floor_selector_obj.temp_floor_index);
                        new_floor_selector_obj.mouse_down_bool = false;
                        new_floor_selector_obj.dragged = false;
                        let target_floor_index = new_floor_selector_obj.btns.length - new_floor_selector_obj.current_track_index - 1;
                        new_floor_selector_obj.target_top = new_floor_selector_obj.get_current_position(target_floor_index) * -1;
                    }
                }
            }
        }
        // if ($('body').hasClass('he') === true) {
        //     window.sprite.visible = false;
        //     window.sprite_2.visible = true;
        // } else {
        //     window.sprite.visible = true;
        //     window.sprite_2.visible = false;
        // }


    if (show_resolution == true) {
        $('.current-resolution .width .number').html($(window).width());
        $('.current-resolution .height .number').html($(window).height());
    }
    object_to_opacity.forEach(function (item) {
        let obj_a = perspectiveCamera.getWorldPosition(new THREE.Vector3());
        if (item.userData.world_center == undefined) {
            item.userData.world_center = getCenterPoint(item);
        }

        let obj_b = item.userData.world_center;
        let angle_obj = get_angle_between(obj_a, obj_b)

        if (item.userData.base_opacity == undefined) {
            item.userData.base_opacity = item.material.opacity;
        }
        let base_opacity = item.userData.base_opacity;
        if (angle_obj.degs < 90) {
            let opacity = (angle_obj.degs / 90) - 0.25;
            if (opacity > 0.05) {
                item.material.opacity = opacity;
                item.visible = true;
            } else {
                // window.test_cube.material.opacity = opacity;
                item.visible = false;

            }

        } else {
            item.material.opacity = base_opacity;
            item.visible = true;
        }
    });
    // if (window.enviroment != undefined) {
    //     if (window.enviroment.children[12] != undefined) {
    //         if (window.enviroment.children[12].userData.base_y == undefined) {
    //             window.enviroment.children[12].userData.base_y = window.enviroment.children[12].position.y;
    //         }
    //         window.enviroment.children[12].position.y = window.enviroment.children[12].userData.base_y - (window.camera_target.position.y - 5) * 2892 / 10;
    //     }
    // }
    if (lock_autorotate != true) {
        let intersection_limit = last_interaction + autorotate_timeout;
        if ( intersection_limit < Date.now()) {
            model_autorotate = true;
        }
    } else {
        model_autorotate = false;
    }
    if (model_autorotate == true) {
        targetRotationX += 0.01;
    }

/*    if (window.water != undefined) {
        window.water.material.uniforms[ 'time' ].value += 0.5 / 60.0;
    }*/

        street_names_n_positions_angle ();

        if ( human_animation_array.length > 0) {
            if (window.mixer_first_time) {
                human_animation_array.forEach(function(mixer, i){
                    mixer.time = 3 * Math.random();
                });
                window.mixer_first_time = false;
            }
            human_animation_array.forEach(function(mixer, i){
                mixer.update(0.016);
            });
        }


        {
            if (scene.userData.flat_boxes_sphere) {
                if (last_clicked_flat) {
                    let sphere_group = scene.userData.flat_boxes_sphere;
                    if (lock_mouse_rotation_x) {
                        scene.remove(sphere_group);
                    } else {
                        if (last_clicked_flat.material.opacity > 0 && last_clicked_flat.userData.color_locked) {
                            scene.add(sphere_group);
                            let flat_world_position = last_clicked_flat.getWorldPosition(new global_three.Vector3());
                            let flat_position = last_clicked_flat.getWorldPosition(new global_three.Vector3())
                            let camera_world_position = perspectiveCamera.getWorldPosition(new global_three.Vector3());
                            camera_world_position.y = flat_position.y + 1.5;

                            let ray = new global_three.Raycaster(camera_world_position, flat_world_position.sub(camera_world_position).normalize());
                            let intersects = ray.intersectObjects(all_appartments);
                            if (intersects.length > 0) {
                                if (intersects[0].object === last_clicked_flat) {
                                    let sphere_position = intersects[0].point;
                                    sphere_group.position.set(sphere_position.x, flat_position.y + 1.5, sphere_position.z);
                                    sphere_group.lookAt(camera_world_position);
                                }
                            }
                        } else {
                            scene.remove(sphere_group);
                        }

                    }
                } else {
                    let sphere_group = scene.userData.flat_boxes_sphere;
                    scene.remove(sphere_group);
                }
            }
        }


        animate_cylinder_floor_numbers (Math.PI / 2 + 0.4);
        if ($(window).width() < 1024) {
            floor_numbers_visibility_by_zoom(200 * 1.6, 130 * 1.6);
        } else {
            floor_numbers_visibility_by_zoom(250, 150);
        }

    }


    requestAnimationFrame( animate );
}

if (!getCookie('access_token')) {
    $.post(
        "https://identity.bmby.com/connect/token", {
            client_id: client_id,
            client_secret: client_secret,
            grant_type: grant_type,
            scope: scope,
        },

        function (data) {
            let token = data.access_token;
            Object.entries(data).forEach(item => {
                setCookie(item[0], item[1], {'max-age': 3600});
            });
            get_json(token, build_id);
        });
} else {
    const token = getCookie('access_token');
    get_json(token, build_id);
}

function get_json(token, build_id) {
    // let res = 3700000;

    // let myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');
    // myHeaders.append('Authorization', 'Bearer ' + token);
    //
    // let envResponce = fetch('https://igorl.bmby.com/api/dreamsv2/register-app', {
    //     method: 'GET',
    //     headers: myHeaders,
    //     mode: 'cors',
    //     cache: 'default'
    // }).then(response => {
    //     return response;
    // });
    let is_mobile_safari = false;
    {
        const isMobileApple = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (isSafari) {
            if (isMobileApple) {
                is_mobile_safari = true;
            }
        }
    }
    if (is_mobile_safari) {
        $.ajax({
            type: "GET",
            url: "https://mbeat.bmby.com/api/dreams/props?houseId=" + build_id,
            beforeSend: function (request) {
                request.setRequestHeader('Content-Type', 'application/json');
                request.setRequestHeader('Authorization', 'Bearer ' + token);
                $('.preloader .percents').html('Update CRM data');
                // progress_bar_update(1, 100, 'Update CRM data');
            },

            success: function (response) {
                showContent(response);
            },

            ajaxComplete: function () {
            }
        });
    } else {
        const dataNow = Date.now();
        let storeData = JSON.parse(localStorage.getItem('timeObjLoaded'));
        let res = dataNow - storeData;
        if (JSON.parse(localStorage.getItem('apartments')) && res < 3600000) {
            showContent(JSON.parse(localStorage.getItem('apartments')));
        } else {
            $.ajax({
                type: "GET",
                url: "https://mbeat.bmby.com/api/dreams/props?houseId=" + build_id,
                beforeSend: function (request) {
                    request.setRequestHeader('Content-Type', 'application/json');
                    request.setRequestHeader('Authorization', 'Bearer ' + token);
                    $('.preloader .percents').html('Update CRM data');
                    // progress_bar_update(1, 100, 'Update CRM data');
                },

                success: function (response) {
                    // console.log('AJAX');
                    localStorage.setItem('timeObjLoaded', JSON.stringify(Date.now()));
                    localStorage.setItem('apartments', JSON.stringify(response));
                    showContent(response);
                },

                ajaxComplete: function () {
                }
            });
        }
    }

}
// {
//     let xhr = new XMLHttpRequest();
//     // xhr.open('GET', 'http://www.gindi_cms.bohdan-web.xyz/wp-admin/admin-ajax.php?action=get_actual_cms_data');
//     xhr.open('GET', 'http://www.gindi_cms.bohdan-web.xyz/actual_apt_crm_data.json');
//     xhr.send();
//     xhr.onload = function() {
//         console.log(xhr.response);
//         showContent(JSON.parse(xhr.response));
//     };
//
// }
/*$.ajax({
    beforeSend: function(request) {
        request.setRequestHeader('Access-Control-Allow-Origin', '*');
    },
    dataType: "json",
    url: ,
    success: function(data) {
       console.log(data);
    }
});*/

function showContent(response) {

    let json_obj = {};
    response.forEach(item => {
        // json_obj[item['engineId']] = item;
        if (json_obj[item.propNum] === undefined) {
            json_obj[item['propNum']] = {};
        }
        json_obj[item['propNum']] = item;
    });

    window.actual_JSON = response;
    sorted_json = json_obj;

    crmStatusLoadBool = true;

    // init();
    // animate();
    // initFullscreenAction();
}

document.addEventListener('contextmenu',function(e){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams != undefined) {
        let dev = urlParams.get('dev');
        if (dev != null) {

        } else {
            e.preventDefault();
        }
    }
});

/*
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var items = this.responseXML.getElementsByTagName("item");
        var i = 0;
        for (i = 0; i <items.length; i++) {
            var currency_name = items[i].getElementsByTagName("targetCurrency")[0].childNodes[0].nodeValue;
            if (currency_name == 'EUR') {
                EUR_currency = items[i].getElementsByTagName("exchangeRate")[0].childNodes[0].nodeValue;
            }
            if (currency_name == 'GBP') {
                GBP_currency = items[i].getElementsByTagName("exchangeRate")[0].childNodes[0].nodeValue;
            }
            if (currency_name == 'ILS') {
                ILS_currency = items[i].getElementsByTagName("exchangeRate")[0].childNodes[0].nodeValue;
            }
        }
    }
};
xmlhttp.open("GET", "http://www.floatrates.com/daily/usd.xml", true);
xmlhttp.send();*/

function getCenterPoint(mesh) {
    var middle = new THREE.Vector3();
    var geometry = mesh.geometry;

    geometry.computeBoundingBox();

    middle.x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
    middle.y = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
    middle.z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;

    mesh.localToWorld( middle );
    return middle;
}

function get_triangle_angle (a,b,c) {

}

init();
animate();
initFullscreenAction();