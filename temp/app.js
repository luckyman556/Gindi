import * as THREE from './node_modules/three/build/three.module.js';
import Stats from './node_modules/three/examples/jsm/libs/stats.module.js';

import { DragControls } from './node_modules/three/examples/jsm/controls/DragControls.js';
import { TransformControls } from './node_modules/three/examples/jsm/controls/TransformControls.js';

import {PerspectiveCamera_init, camera_keys} from './modules/camera.js?ver=202008171634';
import {controls_init} from './modules/controls.js?ver=202008171634';
import {add_models} from './modules/add-models.js?ver=202008171634';
import { GUI } from './node_modules/three/examples/jsm/libs/dat.gui.module.js';
import { CSS2DRenderer, CSS2DObject } from './node_modules/three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS3DRenderer, CSS3DObject } from './node_modules/three/examples/jsm/renderers/CSS3DRenderer.js';

import { EffectComposer } from './node_modules/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './node_modules/three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from './node_modules/three/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from './node_modules/three/examples/jsm/postprocessing/OutlinePass.js';
import { FXAAShader } from './node_modules/three/examples/jsm/shaders/FXAAShader.js';


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
function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas = document.querySelector('#c');
    var renderer_params = {
        canvas,
        antialias: true,
        outputEncoding: THREE.LinearEncoding,
        sortObjects: true,
        // powerPreference: 'high-performance',
    };
    if (detect_mobile()) {
       renderer_params.antialias = false;
    }
    renderer = new THREE.WebGLRenderer(renderer_params);
   // renderer.gammaOutput = true;
    renderer.autoClear = false;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );
    scene = new THREE.Scene();
    perspectiveCamera = PerspectiveCamera_init(perspectiveCamera);
    camera_keys(perspectiveCamera);

    controls = controls_init(perspectiveCamera , canvas, controls);
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
    if (building_name  == 'ooh') {
        var  light = new THREE.AmbientLight( 0x404040 ); // soft white light
        light.intensity = 1.5;
        scene.add( light );
/*        var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.x = 20;
        directionalLight.position.z = 0;
        directionalLight.position.y = 200;
        window.directionalLight = directionalLight;
        scene.add( directionalLight );*/
    }

    var cubeA = new THREE.Mesh( geometry, material );
    cubeA.position.set( 0, 0, 0 );
    cubeA.name = 'center';

    var cubeB = new THREE.Mesh( geometry_2, material_2 );
    cubeB.position.set( 0, 0, 0 );
    cubeB.name = 'outer';
    if (transform_controls == true) {
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

                console.log(event);
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
                console.log(control.object.position);
            });
        } );

        scene.add( control );

        control.addEventListener( 'mouseDown', function ( event ) {
            window.disable_drag_controls = true;
        } );
        control.addEventListener( 'mouseUp', function ( event ) {
            window.disable_drag_controls = false;
        } );

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

   // postprocessing
   // composer = new EffectComposer( renderer );











    document.querySelector('.three_js').addEventListener( 'mousemove', onTouchMove );
    document.querySelector('.three_js').addEventListener( 'touchmove', onTouchMove );
    document.querySelector('.three_js').addEventListener( 'touchstart', onTouchMove );
    $('.non-canvas').click(function(){
        this_is_flat_click = false;
    });
    document.querySelector('.three_js').addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.querySelector('.three_js').addEventListener( 'touchstart', onDocumentMouseDown, false );
    document.addEventListener('dblclick', function (e) {
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
    });
    function onTouchMove( event ) {
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
    }




    drag_controls = new DragControls( window.drag_objects, perspectiveCamera, canvas );
    drag_controls.addEventListener( 'dragstart', function ( event ) {
        window.disable_drag_controls = true;
        last_dragged_object = event.object;
    } );

    drag_controls.addEventListener( 'dragend', function ( event ) {
        window.disable_drag_controls = false;
        last_dragged_object = event.object;
    } );




    perspectiveCamera.position.x = 0;
    perspectiveCamera.position.z = perspectiveCamera_position_z;
    window.camera_target.rotation.y = 2.124;
    targetRotationX = 2.124;
    window.camera_target.position.y = 4;
    if (building_name == 'ooh') {
        perspectiveCamera.position.x = 0;
        perspectiveCamera.position.z = perspectiveCamera_position_z;
        window.camera_target.rotation.y = 3.7524578917878086;
        targetRotationX = 3.7524578917878086;
        window.camera_target.position.y = hide_lock;
        window.camera_target.children[0].rotation.x = -0.1;

    } else {
        perspectiveCamera.position.x = 0;
        perspectiveCamera.position.z = perspectiveCamera_position_z;
        window.camera_target.rotation.y = 2.124;
        targetRotationX = 2.124;
        window.camera_target.position.y = 4;
    }
    let bgMesh;
    {
        const loader = new THREE.TextureLoader();
        const texture_day = loader.load(
            'resources/material/textures/360.jpg',
        );

        texture_day.magFilter = THREE.LinearFilter;
        texture_day.minFilter = THREE.LinearFilter;

        const shader = THREE.ShaderLib.equirect;
        const material = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: THREE.BackSide,
        });
        material.uniforms.tEquirect.value = texture_day;
        const plane = new THREE.SphereBufferGeometry(400, 400, 400);
        bgMesh = new THREE.Mesh(plane, material);
        scene.add(bgMesh);
    }
    // control.attach(window.ground);
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
        if (urlParams != undefined) {
            let dev = urlParams.get('fps');
            if (dev != null) {
                document.querySelector('.three_js').appendChild( stats.dom );
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

/*  composer = new EffectComposer( renderer );
    var renderPass = new RenderPass( scene, perspectiveCamera );
    composer.addPass( renderPass );
    outlinePass = new OutlinePass( new THREE.Vector2( renderer.domElement.offsetWidth, renderer.domElement.offsetHeight ), scene, perspectiveCamera );
    outlinePass.selectedObjects = selectedObjects;

    outlinePass_2 = new OutlinePass( new THREE.Vector2( renderer.domElement.offsetWidth, renderer.domElement.offsetHeight ), scene, perspectiveCamera );
    outlinePass_2.selectedObjects = selectedObjects_2;

    composer.addPass( outlinePass );
    composer.addPass( outlinePass_2 );

    effectFXAA = new ShaderPass( FXAAShader );
    effectFXAA.uniforms[ 'resolution' ].value.set( 1 / renderer.domElement.offsetWidth, 1 / renderer.domElement.offsetHeight );
    composer.addPass( effectFXAA );
    function addSelectedObject( object ) {
        selectedObjects = [];
        selectedObjects.push( object );
    }*/

    {
/*        var geometry = new THREE.BoxGeometry( 40, 100, 40 );
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00, transparent: true, opacity: 0.5} );
        var cube = new THREE.Mesh( geometry, material );
        cube.position.set(40,50,40);
        scene.add(cube);
        window.test_cube = cube;*/

    }



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
   // composer.setSize( width, height );

    // effectFXAA.uniforms[ 'resolution' ].value.set( 1 / width, 1 / height );
}
let animate_count = 0;
let progress_bar_update_bool = true;
function animate() {

    TWEEN.update();
    if ($('.popup.open').length == 0) {
    // console.log('now rendering')
    animate_count++;
    // scene.updateMatrixWorld();
    // console.log(get_angle_to_camera());
    if (resizeRendererToDisplaySize(renderer)) {
        update_renderer_size ();
    }
    /*    if (last_clicked_flat != undefined) {
     control.attach(last_clicked_flat);
     }*/
    let target_zoom_diff = target_zoom - perspectiveCamera.position.z;
    if (target_zoom != NaN) {
        if (Math.sqrt(target_zoom_diff * target_zoom_diff) > 0.3) {
            perspectiveCamera.position.z += ( target_zoom - perspectiveCamera.position.z ) * 0.1;
        } else {
            perspectiveCamera.position.z = target_zoom;
        }
    }


    if (rotation_animated == false) {
            let rotation_diff = targetRotationX - window.camera_target.rotation.y;
            if (Math.sqrt(rotation_diff * rotation_diff) > 0.001) {
                window.camera_target.rotation.y += ( targetRotationX - window.camera_target.rotation.y ) * 0.1;
                if (scroll_controls_dragger == false) {
                    var object = $('.rotation-controller');
                    var range_width =  object.width();
                    var degree = rotation_in_degree(window.camera_target.rotation.y);
                    var position = (degree / 360) * range_width;
                    var pointer = object.find('.circle');
                    pointer.css('right', position);
                }
                update_line_position();

            }  else {
                    window.camera_target.rotation.y = targetRotationX;
                    if (scroll_controls_dragger == false) {
                        var object = $('.rotation-controller');
                        var range_width =  object.width();
                        var degree = rotation_in_degree(window.camera_target.rotation.y);
                        var position = (degree / 360) * range_width;
                        var pointer = object.find('.circle');
                        pointer.css('right', position);
                    }
                    update_line_position();

            }
    }


    if (lock_mouse_rotation_x == true) {
        $('.last_click_point .pulse').hide();
    } else {
        $('.last_click_point .pulse').show();
    }


    if (update_line_position_enabled == true) {
        if (click_flat_intersection_point != null) {
            update_line_position ();
        }
    }
    flat_labels_face_to_camera ();
    raycaster.setFromCamera( mouse, perspectiveCamera );

    renderer.render(scene,perspectiveCamera);
    // composer.render();
    labelRenderer.render( scene, perspectiveCamera );
    if (intersection_on == true) {
        checkIntersection();
    }

    stats.update();
    if (progress_bar_update_bool == true) {
        if (model_loaded == true ) {
            window.floor_obj.forEach(function(floor){
                floor.forEach(function(flat){
                    if (flat.userData.world_position == undefined) {
                        flat.userData.world_position = flat.children[0].getWorldPosition(new global_three.Vector3());
                    }
                });
            });
/*            console.log('loaded_texture_counter: ' + loaded_texture_counter);
            console.log('textures_counter: ' + textures_counter);*/
            let textures_percent = loaded_texture_counter / textures_counter * 100;
            // console.log('material #' + loaded_texture_counter + ' loaded textures percent ' + textures_percent);
            progress_bar_update(3, textures_percent, `Loading textures ${loaded_texture_counter} from  ${textures_counter}`);
            // console.log(loaded_texture_counter);
            if (loaded_texture_counter == 26) {
                $('.to-page').addClass('active');
                progress_bar_update(3, 100, 'Load complete');
                $('.preloader').addClass('completed');
                $('.preloader .to-page').trigger('click');
                progress_bar_update_bool = false;
                flat_number_bubble('hide');
                {
                    const queryString = window.location.search;
                    const urlParams = new URLSearchParams(queryString);
                    if (urlParams != undefined) {
                        let flat_card = urlParams.get('flat_card');
                        if (flat_card != null) {
                            let target_flat = null;
                            all_appartments.forEach(function(flat){
                                let prop_num = flat.userData.crm_data.propNum;
                                if (prop_num == flat_card) {
                                    target_flat = flat;
                                }
                            });
                            if (target_flat != null) {
                                flat_click(target_flat);
                                last_clicked_flat = target_flat;
                                setTimeout(function(){
                                    $('.three_js .popup-info .flat-plan .popups-togglers-box div.floor-plan-toggler').click();
                                }, 500);
                            }
                        }
                        let flat_popup = urlParams.get('flat_popup');
                        if (flat_popup != null) {
                            let target_flat = null;
                            all_appartments.forEach(function(flat){
                                let prop_num = flat.userData.crm_data.propNum;
                                if (prop_num == flat_popup) {
                                    target_flat = flat;
                                }
                            });
                            if (target_flat != null) {
                                flat_click(target_flat);
                                setTimeout(function(){
                                    $('.three_js .popup-info .flat-plan .popups-togglers-box div.toggler-2d').click();
                                }, 500);
                            }
                        }
                    };
                }
            };
        }
    };
    if (new_floor_selector_obj != undefined) {
        if (new_floor_selector_obj.target_top != undefined) {
            let current_top = new_floor_selector_obj.current_top;
            let target_top = new_floor_selector_obj.target_top;
            let top_diff = target_top - current_top;
            let smooth_number = floors_slider_top_mod;
            let changed_value = top_diff * smooth_number;
            if  (Math.sqrt(changed_value * changed_value) > 1) {
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
    if ($('body').hasClass('he') == true) {
        window.sprite.visible = false;
        window.sprite_2.visible = true;
    } else {
        window.sprite.visible = true;
        window.sprite_2.visible = false;
    }

    }
    if (show_resolution == true) {
        $('.current-resolution .width .number').html($(window).width());
        $('.current-resolution .height .number').html($(window).height());
    }
    object_to_opacity.forEach(function(item){
               let obj_a =  perspectiveCamera.getWorldPosition(new THREE.Vector3());
                if (item.userData.world_center == undefined) {
                    item.userData.world_center = getCenterPoint(item);
                }

                let obj_b = item.userData.world_center;
                let angle_obj = get_angle_between (obj_a, obj_b)

                if (item.userData.base_opacity == undefined) {
                    item.userData.base_opacity = item.material.opacity;
                }
                let base_opacity = item.userData.base_opacity;
                if (angle_obj.degs < 120) {
                    let opacity =  (angle_obj.degs / 120 )  - 0.5;
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



    requestAnimationFrame( animate );
}
/*loadJSON(function(response) {
    // Parse JSON string into object

    window.actual_JSON = JSON.parse(response);
    var key;
    var i = 0;
    for (key in window.actual_JSON) {
        sorted_json[window.actual_JSON[key].floorNum] = [];
        i++;
    }

}, 'results.json');*/

function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
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
    const dataNow = Date.now();
    let storeData = JSON.parse(localStorage.getItem('timeObjLoaded'));
    let res = dataNow - storeData;
    // let res = 3700000;

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
                progress_bar_update(1, 100, 'Update CRM data');
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

function showContent(response) {
    let json_obj = {};
    response.forEach(item => {
        // json_obj[item['engineId']] = item;
        if (json_obj[item.propNum] == undefined) {
            json_obj[item['propNum']] = {};
        }
        json_obj[item['propNum']] = item;
    });

    window.actual_JSON = response;
    sorted_json = json_obj;

    init();
    animate();
    initFullscreenAction();
}
/*$.ajax({
    type: "POST",
    url: 'server.php',
    contentType: false,
    processData: false,
    beforeSend : function(){
        $('.preloader .percents').html( 'Update CRM data');
    },
    success: function (response) {
        window.actual_JSON = JSON.parse(response);
         var key;
         var i = 0;
         for (key in window.actual_JSON) {
         sorted_json[window.actual_JSON[key].floorNum] = [];
         i++;
         }
        init();
        animate();
    },
    ajaxComplete : function () {

    }
});*/

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