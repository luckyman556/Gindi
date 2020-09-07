import * as THREE from './node_modules/three/build/three.module.js';
import Stats from './node_modules/three/examples/jsm/libs/stats.module.js';

import { DragControls } from './node_modules/three/examples/jsm/controls/DragControls.js';
import { TransformControls } from './node_modules/three/examples/jsm/controls/TransformControls.js';

import { PerspectiveCamera_init } from './modules/camera.js?ver=202008311746';
import { controls_init } from './modules/controls/controls.js?ver=202008311746';
import { add_models } from './modules/add-models.js?ver=202008311746';
import { animate_cylinder_floor_numbers } from './modules/cylinder-floor-numbers/add-cylinder-floor-numbers.js?ver=202008311746';
import { floor_numbers_visibility_by_zoom } from './modules/cylinder-floor-numbers/add-cylinder-floor-numbers.js?ver=202008311746';
import { add_mouse_n_touches } from './modules/controls/mouse-n-touches.js?ver=202008311746';
import { add_filter } from './modules/filter/filter.js';
import { GUI } from './node_modules/three/examples/jsm/libs/dat.gui.module.js';
import { CSS2DRenderer, CSS2DObject } from './node_modules/three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS3DRenderer, CSS3DObject } from './node_modules/three/examples/jsm/renderers/CSS3DRenderer.js';
import { dictionary_array } from './modules/language/dictionary.js';
import { EffectComposer } from './node_modules/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './node_modules/three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from './node_modules/three/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from './node_modules/three/examples/jsm/postprocessing/OutlinePass.js';
import { FXAAShader } from './node_modules/three/examples/jsm/shaders/FXAAShader.js';
import { find_n_clone_material } from './modules/add-models.js';

// street names and position angle

import { street_names_n_positions_angle } from './modules/street-names/names-angle.js';
dictionary = dictionary_array;
global_three = THREE;
var drag_controls;
var container, stats;
var camera, controls;
var show_resolution = false;
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

var group = new THREE.Group();
var canvas;
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
  container = document.createElement('div');
  document.body.appendChild(container);
  var width = window.innerWidth;
  var height = window.innerHeight;
  canvas = document.querySelector('#c');
  var renderer_params = {
    canvas,
    antialias: true,
    outputEncoding: THREE.LinearEncoding,
    // sortObjects: true,
    // powerPreference: 'high-performance',
  };
  /*    if (detect_mobile()) {
       renderer_params.antialias = false;
    }*/
  renderer = new THREE.WebGLRenderer(renderer_params);
  // renderer.gammaOutput = true;
  renderer.autoClear = false;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  scene = new THREE.Scene();

  const colorFog = 0xffffff;
  const nearFog = 650;
  const farFog = 1500;  
  scene.fog = new THREE.Fog(colorFog, nearFog, farFog);

  perspectiveCamera = PerspectiveCamera_init(perspectiveCamera);

  controls = controls_init(perspectiveCamera, canvas, controls);
  // model
  var manager = new THREE.LoadingManager();
  manager.onProgress = function (item, loaded, total) {};
  var geometry_var = 5;
  var geometry = new THREE.BoxBufferGeometry(geometry_var, geometry_var, geometry_var);
  var geometry_2 = new THREE.BoxBufferGeometry(geometry_var, geometry_var, geometry_var);
  var material = new THREE.MeshPhongMaterial({
    color: 'red',
  });
  var material_2 = new THREE.MeshPhongMaterial({
    color: 'green',
  });

  var cubeA = new THREE.Mesh(geometry, material);
  cubeA.position.set(0, 0, 0);
  cubeA.name = 'center';

  var cubeB = new THREE.Mesh(geometry_2, material_2);
  cubeB.position.set(0, 0, 0);
  cubeB.name = 'outer';
  if (transform_controls) {
    control = new TransformControls(perspectiveCamera, renderer.domElement);
    window.addEventListener('keydown', function (event) {
      switch (event.keyCode) {
        case 81: // Q
          control.setSpace(control.space === 'local' ? 'world' : 'local');
          break;
        case 87: // W
          control.setMode('translate');
          break;
        case 69: // E
          control.setMode('rotate');
          break;
        case 82: // R
          control.setMode('scale');
          break;
        /*                case 84: // T
                    control.detach();
                    break;*/
        case 32: // Spacebar
          control.enabled = !control.enabled;
          break;
      }
      if (event.ctrlKey) {
        if (event.shiftKey) {
          switch (event.keyCode) {
            case 70: // F
              document.querySelector('.three_js').appendChild(stats.dom);
              break;
            case 86: // V
          }
        }
      }
      control.addEventListener('dragging-changed', function (event) {
        //    console.log(control.object.position);
      });
    });

    scene.add(control);

    control.addEventListener('mouseDown', function (event) {
      window.disable_drag_controls = true;
    });
    control.addEventListener('mouseUp', function (event) {
      window.disable_drag_controls = false;
    });
  }

  window.camera_target = new THREE.Group();
  window.camera_target.add(cubeA);
  window.camera_target.add(cubeB);
  window.camera_target.position.y = 10;
  window.camera_target.position.z = 0;
  window.camera_target.position.x = 0;
  scene.add(window.camera_target);
  window.camera_target.visible = false;
  add_models(scene, window.all_appartments);

  scene.add(group);

  window.camera_target.children[0].add(perspectiveCamera);

  window.camera_target.children[0].rotation.x = -0.2;

  add_mouse_n_touches();

  drag_controls = new DragControls(window.drag_objects, perspectiveCamera, canvas);
  drag_controls.addEventListener('dragstart', function (event) {
    window.disable_drag_controls = true;
    last_dragged_object = event.object;
  });

  drag_controls.addEventListener('dragend', function (event) {
    window.disable_drag_controls = false;
    last_dragged_object = event.object;
    // console.log(last_dragged_object);
  });

  set_default_camera_position();

  var light = new THREE.AmbientLight(0x404040); // soft white light
  light.intensity = 1.5;
  scene.add(light);

  let bgMesh;
  {
    const loader = new THREE.TextureLoader();
    const texture_day = loader.load('resources/material/textures/360.jpg');

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
    const plane = new THREE.SphereBufferGeometry(550, 550, 550);
    // const plane2 = new THREE.SphereGeometry(700, 32, 32, 0, Math.PI, 0, Math.PI);

    // var geometryGround = new THREE.CircleBufferGeometry( 710, 32 );
    // var materialGround = new THREE.MeshBasicMaterial({
    //     color: 0xffffff,
    // });
    // var circleGround = new THREE.Mesh( geometryGround, materialGround );

    bgMesh = new THREE.Mesh(plane, material);
    // bgMesh = new THREE.Mesh(plane2, material);
    // bgMesh.rotation.x = Math.PI * -0.5;
    // circleGround.rotation.x = Math.PI * -0.5;
    // window.bgMesh = bgMesh;
    // window.circleGround = circleGround;
    // scene.add(circleGround);
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
        folder
          .addColor(params, 'available')
          .name('Available')
          .onChange(function () {
            let return_val = params.available.replace('#', '');
            flat_statuses[1]['color'] = return_val;
          });
        folder
          .addColor(params, 'available_active')
          .name('Available active')
          .onChange(function () {
            let return_val = params.available_active.replace('#', '');
            flat_statuses[1]['active'] = return_val;
          });
        folder
          .addColor(params, 'available_hover')
          .name('Available hover')
          .onChange(function () {
            let return_val = params.available_hover.replace('#', '');
            flat_statuses[1]['hover'] = return_val;
          });
        folder
          .addColor(params, 'unavailable')
          .name('Unavailable')
          .onChange(function () {
            let return_val = params.unavailable.replace('#', '');
            flat_statuses[0]['color'] = return_val;
          });
        folder
          .addColor(params, 'unavailable_active')
          .name('Unavailable active')
          .onChange(function () {
            let return_val = params.unavailable_active.replace('#', '');
            flat_statuses[0]['active'] = return_val;
          });
        folder
          .addColor(params, 'unavailable_hover')
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
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0';
  labelRenderer.domElement.style.pointerEvents = 'none';
  document.getElementById('three_d_css').appendChild(labelRenderer.domElement);

  let labels_i = 0;
  while (labels_i <= 12) {
    var text = document.createElement('div');
    text.className = 'flat_status_2d_css';
    var label = new CSS2DObject(text);
    label.position.set(0, 0, 0);

    label.renderOrder = 1;
    label.visible = false;
    scene.add(label);
    flat_labels_group[labels_i] = label;
    labels_i++;
  }
  var floor_center_text = document.createElement('div');

  floor_center_text.className = 'floor_center_2d_css';
  var floor_center_text_obj = new CSS2DObject(floor_center_text);
  floor_center_text_obj.renderOrder = 0;
  floor_center_text_obj.position.set(0, 0, 0);
  floor_center_text_obj.visible = false;
  scene.add(floor_center_text_obj);

  var last_click_point = document.createElement('div');

  last_click_point.className = 'last_click_point';
  var last_click_point_obj = new CSS2DObject(last_click_point);
  last_click_point_obj.renderOrder = 0;
  last_click_point_obj.position.set(0, 0, 0);
  let inner_html = `
            <div class="pulse"></div>
    `;
  last_click_point_obj.element.innerHTML = inner_html;
  last_click_point_obj.visible = false;

  scene.add(last_click_point_obj);
  window.last_clicked_point_css = last_click_point_obj;

  flat_labels_group[12] = floor_center_text_obj;

  update_renderer_size();

  if (get_url_param('dev')) {
    add_filter($('.main-wrap'), 'img/filter-module/');
  }
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = $('.three_js #c').width();
  const height = $('.three_js #c').height();
  const needResize = canvas.width !== width || canvas.height !== height;
  return needResize;
}
function update_renderer_size() {
  var width = renderer.domElement.offsetWidth;
  var height = renderer.domElement.offsetHeight;
  perspectiveCamera.aspect = canvas.clientWidth / canvas.clientHeight;
  perspectiveCamera.updateProjectionMatrix();
  renderer.setSize(width, height);
  labelRenderer.setSize(width, height);
}
let progress_bar_update_bool = true;
window.mixer_first_time = true;

function animate() {
  TWEEN.update();
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
    if (progress_bar_update_bool) {
      if (model_loaded) {
        window.floor_obj.forEach(function (floor) {
          floor.forEach(function (flat) {
            if (!flat.userData.world_position) {
              flat.userData.world_position = flat.children[0].getWorldPosition(new global_three.Vector3());
            }
          });
        });

        let textures_percent = (loaded_texture_counter / 32) * 100;
        progress_bar_update(
          3,
          textures_percent,
          `Loading textures ${loaded_texture_counter} from  ${textures_counter}`,
        );
        if (loaded_texture_counter === 32) {
          $('.to-page').addClass('active');
          progress_bar_update(3, 100, 'Load complete');
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
          }
        }
      }
    }
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
            let target_floor_index =
              new_floor_selector_obj.btns.length - new_floor_selector_obj.current_track_index - 1;
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
      let angle_obj = get_angle_between(obj_a, obj_b);

      if (item.userData.base_opacity == undefined) {
        item.userData.base_opacity = item.material.opacity;
      }
      let base_opacity = item.userData.base_opacity;
      if (angle_obj.degs < 90) {
        let opacity = angle_obj.degs / 90 - 0.25;
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
      if (last_interaction + 20000 < Date.now()) {
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

    street_names_n_positions_angle();

    if (human_animation_array.length > 0) {
      if (window.mixer_first_time) {
        human_animation_array.forEach(function (mixer, i) {
          mixer.time = 3 * Math.random();
        });
        window.mixer_first_time = false;
      }
      human_animation_array.forEach(function (mixer, i) {
        mixer.update(0.016);
      });
    }

    {
      if (last_clicked_flat) {
        let sphere_group = scene.userData.flat_boxes_sphere;
        if (lock_mouse_rotation_x) {
          scene.remove(sphere_group);
        } else {
          if (last_clicked_flat.material.opacity > 0) {
            scene.add(sphere_group);
            let flat_world_position = last_clicked_flat.getWorldPosition(new global_three.Vector3());
            let flat_position = last_clicked_flat.getWorldPosition(new global_three.Vector3());
            let camera_world_position = perspectiveCamera.getWorldPosition(new global_three.Vector3());
            camera_world_position.y = flat_position.y + 1.5;

            let ray = new global_three.Raycaster(
              camera_world_position,
              flat_world_position.sub(camera_world_position).normalize(),
            );
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

    animate_cylinder_floor_numbers(Math.PI / 2 + 0.4);
    if ($(window).width() < 1024) {
      floor_numbers_visibility_by_zoom(200 * 1.6, 130 * 1.6);
    } else {
      floor_numbers_visibility_by_zoom(250, 150);
    }
  }

  requestAnimationFrame(animate);
}

function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }
  document.cookie = updatedCookie;
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

if (!getCookie('access_token')) {
  $.post(
    'https://identity.bmby.com/connect/token',
    {
      client_id: client_id,
      client_secret: client_secret,
      grant_type: grant_type,
      scope: scope,
    },

    function (data) {
      let token = data.access_token;
      Object.entries(data).forEach((item) => {
        setCookie(item[0], item[1], { 'max-age': 3600 });
      });
      get_json(token, build_id);
    },
  );
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
      type: 'GET',
      url: 'https://mbeat.bmby.com/api/dreams/props?houseId=' + build_id,
      beforeSend: function (request) {
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', 'Bearer ' + token);
        $('.preloader .percents').html('Update CRM data');
        progress_bar_update(1, 20, 'Update CRM data');
      },

      success: function (response) {
        showContent(response);
      },

      ajaxComplete: function () {},
    });
  } else {
    const dataNow = Date.now();
    let storeData = JSON.parse(localStorage.getItem('timeObjLoaded'));
    let res = dataNow - storeData;
    if (JSON.parse(localStorage.getItem('apartments')) && res < 3600000) {
      showContent(JSON.parse(localStorage.getItem('apartments')));
    } else {
      $.ajax({
        type: 'GET',
        url: 'https://mbeat.bmby.com/api/dreams/props?houseId=' + build_id,
        beforeSend: function (request) {
          request.setRequestHeader('Content-Type', 'application/json');
          request.setRequestHeader('Authorization', 'Bearer ' + token);
          $('.preloader .percents').html('Update CRM data');
          progress_bar_update(1, 20, 'Update CRM data');
        },

        success: function (response) {
          // console.log('AJAX');
          localStorage.setItem('timeObjLoaded', JSON.stringify(Date.now()));
          localStorage.setItem('apartments', JSON.stringify(response));
          showContent(response);
        },

        ajaxComplete: function () { },
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
    progress_bar_update(1, 50, 'Update CRM data');
    let interval;
    let json_obj = {};
    response.forEach((item) => {
    // json_obj[item['engineId']] = item;
    if (json_obj[item.propNum] === undefined) {
      json_obj[item['propNum']] = {};
    }
    json_obj[item['propNum']] = item;
  });

  window.actual_JSON = response;
    sorted_json = json_obj;
    interval = setInterval(() => { 
        if (isBuildingDoneBool && model_loaded) {
            buildingHighlights();
            clearInterval(interval);
        }
    }, 1000);
    
  //   init();
  //   animate();
  //   initFullscreenAction();
}

document.addEventListener('contextmenu', function (e) {
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

  mesh.localToWorld(middle);
  return middle;
}

function get_triangle_angle(a, b, c) {}

function buildingHighlights() {
   
        building.forEach(function (element, floor_index) {
          if (element.name === 'Roof') {
            window.roof = element;
            var user_data = window.roof.userData;
            user_data.base_position_z = window.roof.position.z;
            var flat_clone = element.clone();

            find_n_clone_material(element, flat_clone);

            user_data.lobby_or_roof = true;
            user_data.status_color = lobby_n_roof_hover_color;
            user_data.url_360 = roof_360;
            // set_mesh_base_color (element);
          } else if (element.name === 'Lobby') {
            window.lobby = element;
            var user_data = window.lobby.userData;
            user_data.base_position_z = window.lobby.position.z;
            user_data.lobby_or_roof = true;
            user_data.status_color = lobby_n_roof_hover_color;
            user_data.url_360 = lobby_360;
            // set_mesh_base_color (element);
          } else {
            all_floors[floor_index] = element;
            window.floor_obj[floor_index] = [];
            var flat_number = 0;

            element.children.forEach(function (flat, flat_index) {
              if (flat.name.search('zagluha') === -1) {
                objects_to_intersection.push(flat);
                // flat.material[2].color.setColorName('blue');

                var flat_clone = flat.clone();

                if (flat.name !== 'floor_center') {
                  find_n_clone_material(flat, flat_clone);
                }

                window.floor_obj[floor_index][flat_number] = flat;

                flat.renderOrder = 0;

                var user_data = flat.userData;
                user_data.base_position = { x: flat.position.x, y: flat.position.y, z: flat.position.z };
                user_data.change_color = true;
                user_data.target_color = true;
                var random_number = Math.floor(flat_statuses.length * Math.random());

                var rooms_array = ['0', '1', '2'];
                var rooms_array_index = Math.floor(3 * Math.random());

                user_data.center_point = getCenterPoint(flat);
                var flat_name_letter = flat.name.replace('APT_', '').replace('_F_', '').replace(floor_index, '');
                user_data.letter = flat_name_letter;
                user_data.crm_data = sorted_json[4001];

                if (floor_index < 17) {
                  flat.userData.url_360 = 'https://dreamsimages.bmby.com/new/dev/gindi/5_22floor/index.htm';
                  flat.userData.url_360_type = 'default';
                } else if (floor_index < 27) {
                  flat.userData.url_360 = 'https://dreamsimages.bmby.com/new/dev/gindi/22_32floor/index.htm';
                  flat.userData.url_360_type = 'default';
                } else if (floor_index < 48) {
                  flat.userData.url_360 = 'https://dreamsimages.bmby.com/new/dev/gindi/32_42floor/index.htm';
                  flat.userData.url_360_type = 'default';
                }

                if (floor_index < 3) {
                  if (flat.name === 'APT_5-7_Int_4Rw_001') {
                    let current_prop_num = 4000 + floor_index * 12 + 1;
                    let current_crm_data = sorted_json[current_prop_num];
                    user_data.crm_data = current_crm_data;
                  } else if (flat.name === 'APT_5-7_Int_2A_003') {
                    let current_prop_num = 4000 + floor_index * 12 + 2;
                    let current_crm_data = sorted_json[current_prop_num];
                    user_data.crm_data = current_crm_data;
                  } else if (flat.name === 'APT_5-7_Int_2A_002') {
                    let current_prop_num = 4000 + floor_index * 12 + 3;
                    let current_crm_data = sorted_json[current_prop_num];
                    user_data.crm_data = current_crm_data;
                  } else if (flat.name === 'APT_5-7_Int_4Re_001') {
                    let current_prop_num = 4000 + floor_index * 12 + 4;
                    let current_crm_data = sorted_json[current_prop_num];
                    user_data.crm_data = current_crm_data;
                    let local_scale = { x: 1.01, y: 1, z: 1.01 };
                    flat.scale.set(local_scale.x, local_scale.y, local_scale.z);
                  } else if (flat.name === 'APT_5-7_Int_3Ra') {
                    let current_prop_num = 4000 + floor_index * 12 + 5;
                    let current_crm_data = sorted_json[current_prop_num];
                    user_data.crm_data = current_crm_data;
                    let local_scale = { x: 1.01, y: 1, z: 1.01 };
                    flat.scale.set(local_scale.x, local_scale.y, local_scale.z);
                  } else if (flat.name === 'APT_5-7_Int_3Da_001') {
                    let current_prop_num = 4000 + floor_index * 12 + 6;
                    let current_crm_data = sorted_json[current_prop_num];
                    user_data.crm_data = current_crm_data;
                    let local_scale = { x: 1.01, y: 1, z: 1.01 };
                    flat.scale.set(local_scale.x, local_scale.y, local_scale.z);
                  } else if (flat.name === 'APT_5-7_Int_3Da') {
                    let current_prop_num = 4000 + floor_index * 12 + 7;
                    let current_crm_data = sorted_json[current_prop_num];
                    user_data.crm_data = current_crm_data;
                    let local_scale = { x: 1.01, y: 1, z: 1.01 };
                    flat.scale.set(local_scale.x, local_scale.y, local_scale.z);
                  } else if (flat.name === 'APT_5-7_Int_3Rs') {
                    let current_prop_num = 4000 + floor_index * 12 + 8;
                    let current_crm_data = sorted_json[current_prop_num];
                    let local_scale = { x: 1.01, y: 1, z: 1.01 };
                    user_data.crm_data = current_crm_data;
                  } else if (flat.name === 'APT_5-7_Int_4Re') {
                    let current_prop_num = 4000 + floor_index * 12 + 9;
                    let current_crm_data = sorted_json[current_prop_num];
                    user_data.crm_data = current_crm_data;
                  } else if (flat.name === 'APT_5-7_Int_2A_001') {
                    let current_prop_num = 4000 + floor_index * 12 + 10;
                    let current_crm_data = sorted_json[current_prop_num];
                    user_data.crm_data = current_crm_data;
                  } else if (flat.name === 'APT_5-7_Int_2A') {
                    let current_prop_num = 4000 + floor_index * 12 + 11;
                    let current_crm_data = sorted_json[current_prop_num];
                    user_data.crm_data = current_crm_data;
                  } else if (flat.name === 'APT_5-7_Int_4Rw') {
                    let current_prop_num = 4000 + floor_index * 12 + 12;
                    let current_crm_data = sorted_json[current_prop_num];
                    user_data.crm_data = current_crm_data;
                  }
                } else if (floor_index < 7) {
                  let flats_names = [
                    'APT_8-11_Int_4Rw',
                    'APT_8-11_Int_2A_001',
                    'APT_8-11_Int_2A_002',
                    'APT_8-11_Int_4Re_001',
                    'APT_8-11_Int_3Ra_001',
                    'APT_8-11_Int_3Da',
                    'APT_8-11_Int_3Da_001',
                    'APT_8-11_Int_3Ra',
                    'APT_8-11_Int_4Re',
                    'APT_8-11_Int_2A',
                    'APT_8-11_Int_2A_003',
                    'APT_8-11_Int_4Rw_001',
                  ];
                  let floor_mod = floor_index - 3;
                  let start_prop_num = 4036;
                  flats_names.forEach(function (flat_name, i) {
                    let flat_number_in_floor = i + 1;
                    if (flat.name === flat_name) {
                      let current_prop_num = start_prop_num + floor_mod * 12 + flat_number_in_floor;
                      let current_crm_data = sorted_json[current_prop_num];
                      user_data.crm_data = current_crm_data;
                    }
                  });
                  if (flat.name === 'APT_8-11_Int_3Ra_001') {
                  }
                  if (flat.name === 'APT_8-11_Int_3Ra') {
                  }
                } else if (floor_index < 16) {
                  let flats_names = [
                    'APT_12-20_Int_4Rw',
                    'APT_12-20_Int_4M',
                    'APT_12-20_Int_4Re',
                    'APT_12-20_Int_3Ra_001',
                    'APT_12-20_Int_3Da',
                    'APT_12-20_Int_3Da_001',
                    'APT_12-20_Int_3Ra',
                    'APT_12-20_Int_3Re',
                    'APT_12-20_Int_3Ds',
                    'APT_12-20_Int_3Ds_001',
                    'APT_12-20_Int_3Rw',
                  ];
                  let floor_mod = floor_index - 7;
                  let start_prop_num = 4084;
                  flats_names.forEach(function (flat_name, i) {
                    let flat_number_in_floor = i + 1;
                    if (flat.name === flat_name) {
                      let current_prop_num = start_prop_num + floor_mod * 11 + flat_number_in_floor;
                      let current_crm_data = sorted_json[current_prop_num];
                      user_data.crm_data = current_crm_data;
                    }
                  });
                  if (flat.name === 'APT_12-20_Int_3Ds') {
                  }
                  if (flat.name === 'APT_12-20_Int_3Ds_001') {
                  }

                  if (flat.name === 'APT_12-20_Int_3Ra_001') {
                  }

                  if (flat.name === 'APT_12-20_Int_3Ra') {
                  }

                  if (flat.name === 'APT_12-20_Int_3Re') {
                  }
                } else if (floor_index < 36) {
                  let flats_names = [
                    'APT_21-43_Int_5R',
                    'APT_21-43_Int_4P_001',
                    'APT_21-43_Int_5P',
                    'APT_21-43_Int_3M_001',
                    'APT_21-43_Int_3M',
                    'APT_21-43_Int_5P_001',
                    'APT_21-43_Int_4P',
                    'APT_21-43_Int_5R_001',
                  ];
                  let floor_mod = floor_index - 16;
                  let start_prop_num = 4183;
                  flats_names.forEach(function (flat_name, i) {
                    let flat_number_in_floor = i + 1;
                    if (flat.name === flat_name) {
                      let current_prop_num = start_prop_num + floor_mod * 8 + flat_number_in_floor;
                      let current_crm_data = sorted_json[current_prop_num];
                      user_data.crm_data = current_crm_data;
                    }
                  });
                  if (flat.name === 'APT_21-43_Int_5R') {
                    if (floor_index < 25) {
                      flat.userData.url_360 = 'https://dreamsimages.bmby.com/new/dev/gindi/5w_22n/index.htm';
                      flat.userData.url_360_type = 'custom';
                    } else if (floor_index < 32) {
                      flat.userData.url_360 = 'https://dreamsimages.bmby.com/new/dev/gindi/5w_32n/index.htm';
                      flat.userData.url_360_type = 'custom';
                    } else {
                      flat.userData.url_360 = 'https://dreamsimages.bmby.com/new/dev/gindi/5w_42n/index.htm';
                      flat.userData.url_360_type = 'custom';
                    }
                  }
                  if (flat.name === 'APT_21-43_Int_5R_001') {
                    if (floor_index < 25) {
                      flat.userData.url_360 = 'https://dreamsimages.bmby.com/new/dev/gindi/5w_22/index.htm';
                      flat.userData.url_360_type = 'custom';
                    } else if (floor_index < 32) {
                      flat.userData.url_360 = 'https://dreamsimages.bmby.com/new/dev/gindi/5w_32/index.htm';
                      flat.userData.url_360_type = 'custom';
                    } else {
                      flat.userData.url_360 = 'https://dreamsimages.bmby.com/new/dev/gindi/5w_42/index.htm';
                      flat.userData.url_360_type = 'custom';
                    }
                  }
                  if (flat.name === 'APT_21-43_Int_5P') {
                    if (floor_index < 25) {
                      flat.userData.url_360 = 'https://dreamsimages.bmby.com/new/dev/gindi/5p_22/index.htm';
                      flat.userData.url_360_type = 'custom';
                    } else if (floor_index < 32) {
                      flat.userData.url_360 = 'https://dreamsimages.bmby.com/new/dev/gindi/5p_32/index.htm';
                      flat.userData.url_360_type = 'custom';
                    } else {
                      flat.userData.url_360 = 'https://dreamsimages.bmby.com/new/dev/gindi/5p_42/index.htm';
                      flat.userData.url_360_type = 'custom';
                    }
                  }
                  if (flat.name === 'APT_21-43_Int_5P_001') {
                    if (floor_index < 25) {
                      flat.userData.url_360 = 'https://dreamsimages.bmby.com/new/dev/gindi/5p_22ws/index.htm';
                      flat.userData.url_360_type = 'custom';
                    } else if (floor_index < 32) {
                      flat.userData.url_360 = 'https://dreamsimages.bmby.com/new/dev/gindi/5p_32ws/index.htm';
                      flat.userData.url_360_type = 'custom';
                    } else {
                      flat.userData.url_360 = 'https://dreamsimages.bmby.com/new/dev/gindi/5p_42ws/index.htm';
                      flat.userData.url_360_type = 'custom';
                    }
                  }
                } else if (floor_index < 42) {
                  let flats_names = [
                    'APT_21_43_Int_6wn_4344',
                    'APT_21_43_Int_5Pwn_4345',
                    'APT_21_43_Int_3M_4346',
                    'APT_21_43_Int_3M_4347',
                    'APT_21_43_Int_5MPws_4348',
                    'APT_21_43_Int_6ws_4349',
                  ];
                  let floor_mod = floor_index - 36;
                  let start_prop_num = 4343;
                  flats_names.forEach(function (flat_name, i) {
                    let flat_number_in_floor = i + 1;
                    if (flat.name === flat_name) {
                      let current_prop_num = start_prop_num + floor_mod * 6 + flat_number_in_floor;
                      let current_crm_data = sorted_json[current_prop_num];
                      if (current_crm_data == undefined) {
                        debugger;
                      }
                      user_data.crm_data = current_crm_data;
                    }
                  });
                } else if (floor_index < 43) {
                  let flats_names = [
                    'APT_21_43_Int_6wn_4380',
                    'APT_21_43_Int_6E_4381',
                    'APT_21_43_Int_6E_4382',
                    'APT_21_43_Int_6ws_4383',
                  ];
                  let floor_mod = floor_index - 42;
                  let start_prop_num = 4379;
                  flats_names.forEach(function (flat_name, i) {
                    let flat_number_in_floor = i + 1;
                    if (flat.name === flat_name) {
                      let current_prop_num = start_prop_num + floor_mod * 4 + flat_number_in_floor;
                      let current_crm_data = sorted_json[current_prop_num];
                      user_data.crm_data = current_crm_data;
                      if (current_crm_data === undefined) {
                        debugger;
                      }
                    }
                  });
                } else if (floor_index < 44) {
                  let flats_names = ['APT_21_43_Int_6P_4384', 'APT_21_43_Int_6P_4385'];
                  let floor_mod = floor_index - 43;
                  let start_prop_num = 4383;
                  flats_names.forEach(function (flat_name, i) {
                    let flat_number_in_floor = i + 1;
                    if (flat.name === flat_name) {
                      let current_prop_num = start_prop_num + floor_mod * 2 + flat_number_in_floor;
                      let current_crm_data = sorted_json[current_prop_num];
                      user_data.crm_data = current_crm_data;
                      if (current_crm_data === undefined) {
                        debugger;
                      }
                    }
                  });
                }
                flat.userData.current_color = 'color';

                let model_name = user_data.crm_data.modelName;

                if (int_360_array[model_name] !== undefined) {
                  user_data.int_360 = int_360_array_imgs[model_name];
                }

                let current_apt_rooms = user_data.crm_data.roomNum;
                if (current_apt_rooms < min_rooms) {
                  min_rooms = current_apt_rooms;
                }

                if (current_apt_rooms > max_rooms) {
                  max_rooms = current_apt_rooms;
                }

                {
                  let flat_model_name = user_data.crm_data.modelName;
                  if (modelNames[flat_model_name] === undefined) {
                    modelNames[flat_model_name] = {
                      name: flat_model_name,
                      prop_num: user_data.crm_data.propNum,
                      floor_num: user_data.crm_data.floorNum,
                    };
                  }
                }

                let flat_2d_status = 'Available';
                if (user_data.crm_data.status === 'Available') {
                  random_number = 1;
                } else {
                  random_number = 0;
                  flat_2d_status = 'Unavailable';
                }
                let flat_model_name = user_data.crm_data.modelName;

                user_data.svg_plan = svg_plans_url + flat_model_name + '.jpg';
                user_data.status_index = random_number;
                user_data.status_color = flat_statuses[random_number]['color'];
                flat.material.color.setHex('0x' + user_data.status_color);

                user_data.status_name = flat_statuses[random_number]['name'];

                // facings array set
                let facing_string = user_data.crm_data.facing;
                let facing_string_array = facing_string.split(',');
                facing_string_array.forEach(function (item) {
                  let new_facing = true;
                  facings_array.forEach(function (old_facing) {
                    if (old_facing === item) {
                      new_facing = false;
                    }
                  });
                  if (new_facing === true) {
                    facings_array.push(item);
                  }
                });

                // Flat types array set
                let flat_type_string = user_data.crm_data.propType;
                let new_flat_type_string = true;
                flats_types.forEach(function (flats_types_item) {
                  if (flat_type_string === flats_types_item) {
                    new_flat_type_string = false;
                  }
                });
                if (new_flat_type_string === true) {
                  flats_types.push(flat_type_string);
                }

                user_data.rent_price = user_data.crm_data.salePrice;

                var geometry = new THREE.BoxBufferGeometry(0.0001, 0.0001, 0.0001);
                var material = new THREE.MeshPhongMaterial({
                  color: 'red',
                  opacity: 1,
                  transparent: true,
                });
                var cubeA = new THREE.Mesh(geometry, material);
                cubeA.position.set(user_data.center_point.x, user_data.center_point.y, user_data.center_point.z);
                cubeA.name = 'center';

                flat.add(cubeA);

                set_mesh_base_color(flat);

                user_data.floor = floor_index;
                user_data.flat_i = flat_number;
                user_data.flat_counter = flat_count;
                if (flat.name !== 'floor_center') {
                  all_appartments.push(flat);
                }
                flat_count++;
                flat_number++;

                json_i++;

                if (json_i > 104) {
                  json_i = 0;
                }
              } else {
                objects_to_intersection.push(flat);
                flooring_obj[floor_index] = flat;
              }
            });
            floor_obj_length++;
          }
        });
      
}

function set_mesh_base_color(mesh) {
    if (mesh.material.length === undefined) {
      if (mesh.material.name.search(emissive_mat_name) !== -1) {
        mesh.material.emissive.setHex('0x' + mesh.material.color.getHexString());
        mesh.material.emissiveIntensity = 1;
      }
      mesh.userData['base_color_'] = mesh.material.color.getHexString();
    } else {
      var metarial_i = 0;
      while (metarial_i < mesh.material.length) {
        if (mesh.material[metarial_i].name.search(emissive_mat_name) !== -1) {
          mesh.material[metarial_i].emissive.setHex('0x' + mesh.material[metarial_i].color.getHexString());
          mesh.material[metarial_i].emissiveIntensity = 1;
        }
        mesh.userData['base_color_' + metarial_i] = mesh.material[metarial_i].color.getHexString();
        metarial_i++;
      }
    }
  }

init();
animate();
initFullscreenAction();
