import * as THREE from './node_modules/three/build/three.module.js';
import Stats from './node_modules/three/examples/jsm/libs/stats.module.js';

import { DragControls } from './node_modules/three/examples/jsm/controls/DragControls.js';
import { TransformControls } from './node_modules/three/examples/jsm/controls/TransformControls.js';
import { OrbitControls  } from './node_modules/three/examples/jsm/controls/OrbitControls.js';

import {PerspectiveCamera_init, camera_keys} from './modules/camera.js';
// import {controls_init} from './modules/controls.js';
 import {add_models} from './modules/add-models-t.js';
import { GUI } from './node_modules/three/examples/jsm/libs/dat.gui.module.js';
global_three = THREE;
var drag_controls;
var container, stats;
var camera , controls;
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();
var selectedObjects = [];
var group = new THREE.Group();
var  canvas;
var summ_of_fps = 0;
var fps_frames = 0;
var avarage_fps = 0;
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
        powerPreference: 'high-performance',
        logarithmicDepthBuffer : true,
    };
    if (detect_mobile()) {
        renderer_params.antialias = false;
        renderer_params.shadows = false;
        renderer_params.sortObjects = false;
    }
    renderer = new THREE.WebGLRenderer(renderer_params);
   // renderer.gammaOutput = true;
    renderer.autoClear = false;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );
    scene = new THREE.Scene();
    perspectiveCamera = PerspectiveCamera_init(perspectiveCamera);
    camera_keys(perspectiveCamera);

    
    // model







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
    update_renderer_size ();
    var params = {
        available: '#' + flat_statuses[1]['color'],
        available_active: '#' + flat_statuses[1]['active'],
        unavailable_active: '#' + flat_statuses[0]['active'],
        unavailable: '#' + flat_statuses[0]['color'],
    };
    stats = new Stats();
    stats.dom.style.top = '100px';
    stats.dom.style.left = '10px';
    document.querySelector('.three_js').appendChild( stats.dom );
    add_models(scene , window.all_appartments);
    controls = new OrbitControls( perspectiveCamera, renderer.domElement );

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 100;
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI / 2;

    // world
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
}

function animate() {
    // scene.updateMatrixWorld();
    TWEEN.update();
    stats.update();
    controls.update();
    if (resizeRendererToDisplaySize(renderer)) {
        update_renderer_size ();
    }
    renderer.render(scene,perspectiveCamera);
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

$.post(
    "https://identity.bmby.com/connect/token", {
        client_id: client_id,
        client_secret: client_secret,
        grant_type: grant_type,
        scope: scope,
    },
    function(data) {
        var token = data.access_token;
        get_json(token, build_id);
        function get_json (token , build_id) {
            $.ajax({
                type: "GET",
                url: "https://mbeat.bmby.com/api/dreams/props?houseId=" + build_id,
                beforeSend : function( request){
                    request.setRequestHeader('Content-Type', 'application/json');
                    request.setRequestHeader('Authorization', 'Bearer ' + token);
                    $('.preloader .percents').html( 'Update CRM data');
                    progress_bar_update(1, 100, 'Update CRM data');
                },
                success: function (response) {
                    var json_obj = {};
                   response.forEach(function(item, index){
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
                },
                ajaxComplete : function () {

                }
            });

        }

    });

