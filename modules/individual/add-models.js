import * as THREE from '../../node_modules/three/build/three.module.js';
import { FBXLoader } from '../../node_modules/three/examples/jsm/loaders/FBXLoader.js';

import { add_humans } from '../core/live/humans/add_humans.js';
import { add_cars } from '../core/live/car/add_cars.js';
import {add_bicycle} from "../core/live/bicycle/add_bicycle.js";

import { add_cylinder_floor_numbers } from '../core/cylinder-floor-numbers/add-cylinder-floor-numbers.js';
import { trees_position } from './trees/trees-positions.js';
import {langSwitcher} from "../core/language/langSwitcher.js";
import {optionsMenu} from "../core/navigation/optionsMenu.js";
import {setCookie, getCookie} from "../core/cookies/setAndGetCookies.js";
import {checkAll2Dplans} from "../../js/checlAll2DPlans.js";

window.floor_obj = [];
window.appartments = [];
window.drag_objects = [];
window.floor_looring_list = [];
var appartments_array = {};
var svg_plans_url =  './resources/2d_plans';

const optionsMenuShowHide = true;

const environmentDataAttribyte = {
    "environment": {
        "movement": [
            {
                "type": "birds",
                "active": false
            },
            {
                "type": "bicycles",
                "active": true
            },
            {
                "type": "pedestrians",
                "active": true
            },
            {
                "type": "cars",
                "active": true
            }
        ]
    }
}

export function add_models( scene, all_appartments) {
    const loader = new FBXLoader();
    const texture_loader = new THREE.TextureLoader();
    let beton_texture;
    let reflection_material;
    let materials_array = {};
    let grass_map, grass_map_2;
    let floor_map;
    let new_merged_glass_map;
    let white_lightmap;
    let white_lightmap_2 = texture_loader.load('resources/2020/04/white-lightmap-2.jpg');
    //sphere pointer start
/*    {
        let z_base = 0;
        var geometry = new THREE.SphereGeometry( 1, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xC1AC87} );
        //let sphereMaterial = new THREE.MeshLambertMaterial( { color: 0xC1AC87, envMap: texture_loader.load('resources/material/textures/2124.jpg'), lightMap : white_lightmap_2 } );
        //sphereMaterial.envMap.mapping = THREE.EquirectangularReflectionMapping;

        var sphere = new THREE.Mesh( geometry, material );
         let  sphere_group = new THREE.Group();
        sphere.position.set(0,0,z_base + 1);
        sphere_group.add(sphere)
        scene.userData.flat_boxes_sphere = sphere_group;
        scene.add(sphere_group);
        window.animation_duration = 1000;
        window.animation_easing = TWEEN.Easing.Quadratic.InOut;
        add_animation(1, 1.5, sphere);
        function add_animation(animation_start_scale, animation_target_scale, sphere) {
            var animation = new TWEEN.Tween({target_scale:animation_start_scale}).to({target_scale: animation_target_scale}, window.animation_duration);
            TWEEN.add(animation);
            animation.delay(0);
            animation.onUpdate(function (e) {
                sphere.scale.set(e.target_scale, e.target_scale, e.target_scale);
                // console.log(e.target_scale);
            });
            animation.onComplete(function(){
                if (animation_start_scale == 1) {
                    animation_start_scale = 1.5;
                    animation_target_scale = 1;
                    window.animation_duration = 900;
                } else {
                    animation_start_scale = 1;
                    animation_target_scale = 1.5;
                    window.animation_duration =  100;
                }
                add_animation(animation_start_scale, animation_target_scale, sphere);
            });
            animation.easing(window.animation_easing);
            animation.start();
        }

        {
            var path = [
                new THREE.Vector3( 0, 0, 0 ),
                new THREE.Vector3( 0, 0, z_base + 2.5 ),
            ];
            var pathBase = new THREE.CatmullRomCurve3(path);

            var geometry = new THREE.TubeGeometry( pathBase, 20, 0.2, 8, false );
            var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            var mesh = new THREE.Mesh( geometry, material );
            mesh.position.set(0,0,-1);
           // sphere_group.add( mesh );
        }
        {

            var geometry = new THREE.SphereGeometry( 0.4, 32, 32 );
            var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
            var sphere = new THREE.Mesh( geometry, material );
            sphere.position.set(0,0,-1);
          //  sphere_group.add(sphere);
        }
    }*/
    //sphere pointer end
    {
        const isMobileApple = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (isSafari && isMobileApple) {
            let iphone_type = getiPhoneModel();
            if (iphone_type == "10-") {
                low_performance_mode = true;
                setCookie('environmentBool', !low_performance_mode, {'max-age': 999999});
            }
        }
        if (get_url_param('low_performance')) {
            low_performance_mode = true;
            setCookie('environmentBool', !low_performance_mode, {'max-age': 999999});
        }
    }

    function on_load_texture() {
        loaded_texture_counter++;
    }

    let envAttrOptionsArray = environmentDataAttribyte.environment.movement.filter(item => item.active);
    let arrOptionsFromCookie;

    if (optionsMenuShowHide) {
        const environmentBool = getCookie('environmentBool');

        if (getCookie('envOptions')) {
            arrOptionsFromCookie = JSON.parse(getCookie('envOptions'));
        }

        envAttrOptionsArray = (getCookie('envOptions')) ? arrOptionsFromCookie : envAttrOptionsArray;

        if (environmentBool && environmentBool === 'false') {
            envAttrOptionsArray.forEach(item => item.active = false);
        }

        optionsMenu(envAttrOptionsArray);
    }
    {
        const texture = texture_loader.load(
            'resources/material/textures/360.jpg',
            () => {
                const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
                rt.fromEquirectangularTexture(renderer, texture);
                scene.background = rt;
            }, onProgressCallback , onErrorCallback);
    }
    // sceneGlobus();
    loadMainBuilding(loader, texture_loader, white_lightmap, white_lightmap_2, on_load_texture);
    // loadSea(texture_loader);

    low_performance_mode = (getCookie('environmentBool') === 'false') ?  true :  false;

    if (!low_performance_mode) {
        loadEnvironment(on_load_texture);
        liveToggler(envAttrOptionsArray);
        loadTrees();
    }

    langSwitcher(); //Include language button
}

function loadMainBuilding(loader, texture_loader, white_lightmap, white_lightmap_2, on_load_texture, new_merged_glass_map, beton_texture, reflection_material) {
    let env_grass_map;

    return loader.load('resources/new_merged/Gindi_MainBuilding_js_v5.fbx', function(empty_model) {
        white_lightmap = texture_loader.load('resources/2020/04/white-lightmap.jpg', on_load_texture);
        textures_counter++;

        // const crmCheckInterval = setInterval(() => { 
        //     if (crmStatusLoadBool) {
        //         clearInterval(crmCheckInterval);
                loadBoxes(loader, texture_loader, empty_model, beton_texture, reflection_material, new_merged_glass_map, on_load_texture, white_lightmap);
        //     }
        // }, 100);

        // console.log(empty_model);
        return empty_model;
    },onProgressCallback);
}

function find_n_clone_material (object_to_work, object_from_clone) {
    if (object_to_work.children.length === 0) {
        var material_length = object_to_work.material.length;
        if (material_length === undefined) {
            object_to_work.material = object_from_clone.material.clone();
        } else {
            object_to_work.material = [];
            var while_counter = 0;
            while (while_counter < material_length) {
                object_to_work.material[while_counter] = object_from_clone.material[while_counter].clone();
                while_counter++;
            }
        }
    }
}

export function loadEnvironment(on_load_texture) {
    setTimeout(() => {
        const loader = new FBXLoader();
        const texture_loader = new THREE.TextureLoader();
        loader.load('resources/enviroment/enviroment.fbx', function(enviroment) {
            const mainEnvironmentLightMap = texture_loader.load('resources/enviroment/lightmaps/complete-opt.jpg', on_load_texture);
            const roadLightMap = texture_loader.load('resources/enviroment/lightmaps/road-opt.jpg', on_load_texture);
            const alphaMap = texture_loader.load('resources/enviroment/textures/alpha.png', on_load_texture);
            const textureGrassMap = texture_loader.load('resources/enviroment/textures/grass.jpg', on_load_texture);
            const whiteLightMap = texture_loader.load('resources/2020/04/white-lightmap.jpg', on_load_texture);
            const glassMap = texture_loader.load('resources/new_merged/textures/glass_map.jpg', on_load_texture);
            const pavingTextureMap = texture_loader.load('resources/enviroment/textures/paving.jpg', on_load_texture);
            const concretteMap = texture_loader.load('resources/material/textures/concrette_diffuse_2_o.jpg', on_load_texture);

        const roadMapsTextures = ['Road_2_Material_7168_AlbedoTransparency', 'Road_2_Material_7169_AlbedoTransparency', 'Road_2_Material_7170_AlbedoTransparency'];

        enviroment.children.forEach(env_item => {
            switch (env_item.name) {
                case 'roads': {
                    for (let i = 0; i < env_item.children.length; i++) {
                        let road = env_item.children[i];
                        road.material = new THREE.MeshPhongMaterial({
                            transparent: false,
                            lightMap: roadLightMap,
                            // map: texture_loader.load(`resources/enviroment/textures/${roadMapsTextures[i]}.png`, on_load_texture),
                            //color: 'lightgray',
                        });
                        road.material.color.setHex('0x373b42');
                    }
                    break;
                }
                case 'City': {
                    env_item.material.alphaMap = alphaMap;
                    env_item.material.lightMap = mainEnvironmentLightMap;
                    env_item.material.map = null;
                    break;
                }
                case 'circle': {
                    env_item.material = {
                        lightMap: mainEnvironmentLightMap,
                        map: textureGrassMap,
                        color: 'lightgray',
                        transparent: true,
                        opacity: 0.5,
                        visible: false,
                    }
                    env_item.material.map.repeat.set(50, 50);
                    break;
                }
                case 'Grass': {
                    let grassTexture = textureGrassMap;
                    grassTexture.wrapS = THREE.RepeatWrapping;
                    grassTexture.wrapT = THREE.RepeatWrapping;
                    grassTexture.repeat.set(5, 5);
                    window.grass = env_item;

                    env_item.position.y = -6244.152170725635;

                    env_item.children.forEach(({material}) => {
                        material.map = grassTexture;
                        material.lightMap = whiteLightMap;
                    });
                    break;
                }
                case 'Water': {
                    env_item.material.map = glassMap;
                    env_item.material.lightMap = whiteLightMap;
                    env_item.material.alphaMap = alphaMap;
                    env_item.material.transparent = true;
                    env_item.material.color.setHex('0x67EEFF');
                    env_item.position.set(-391262.74, 0, -730724.1514921772);
                    env_item.scale.set (0.2, 0.5, 0.2);
                    break;
                }
                case 'Enviroment': {
                    env_item.material.forEach(environmentMaterial => {
                        switch (environmentMaterial.name) {
                            case 'concrette': {
                                environmentMaterial.map = concretteMap;
                                environmentMaterial.lightMap = mainEnvironmentLightMap;
                                environmentMaterial.map.wrapS = THREE.RepeatWrapping;
                                environmentMaterial.map.wrapT = THREE.RepeatWrapping;
                                environmentMaterial.map.repeat.set(0.1, 0.1);
                                environmentMaterial.color.setColorName('lightgray');
                                break;
                            }
                            case 'grass': {
                                let textureMap = textureGrassMap;
                                textureMap.wrapS = THREE.RepeatWrapping;
                                textureMap.wrapT = THREE.RepeatWrapping;
                                textureMap.repeat.set(0.5, 0.5);

                                environmentMaterial.lightMap = mainEnvironmentLightMap;
                                environmentMaterial.map = textureMap;
                                environmentMaterial.color.setColorName('lightgray');
                                break;
                            }
                            case 'tree': {
                                environmentMaterial.map = textureGrassMap;
                                environmentMaterial.lightMap = mainEnvironmentLightMap;
                                environmentMaterial.map.repeat.set(0.5, 0.5);
                                break;
                            }
                            case 'tree_1': {
                                environmentMaterial.map = textureGrassMap;
                                environmentMaterial.lightMap = mainEnvironmentLightMap;
                                environmentMaterial.map.repeat.set(0.5, 0.5);
                                break;
                            }
                            case 'floor': {
                                let textureMap = pavingTextureMap;
                                textureMap.repeat.set(0.5, 0.5);
                                textureMap.wrapS = THREE.RepeatWrapping;
                                textureMap.wrapT = THREE.RepeatWrapping;

                                environmentMaterial.map = textureMap;
                                environmentMaterial.lightMap = mainEnvironmentLightMap;
                                environmentMaterial.color.setColorName('lightgray');
                                break;
                            }
                            case 'wood': {
                                environmentMaterial.map = pavingTextureMap;
                                environmentMaterial.lightMap = mainEnvironmentLightMap;
                                environmentMaterial.map.repeat.set(0.2, 0.2);
                                environmentMaterial.color.setColorName('lightgray');
                                break;
                            }
                            case "glass": {
                                environmentMaterial.envMap = texture_loader.load('resources/material/textures/360_half.jpg', on_load_texture);
                                environmentMaterial.lightMap = mainEnvironmentLightMap;
                                environmentMaterial.envMap.mapping = THREE.EquirectangularReflectionMapping;
                                environmentMaterial.envMap.minFilter = THREE.NearestMipmapLinearFilter;
                                environmentMaterial.envMap.roughness = 0;
                                environmentMaterial.envMap.wrapS = THREE.RepeatWrapping;
                                environmentMaterial.envMap.wrapT = THREE.RepeatWrapping;
                                environmentMaterial.envMap.magFilter = THREE.LinearFilter;
                                environmentMaterial.transparent = true;
                                environmentMaterial.opacity = 0.6;
                                environmentMaterial.color.setColorName('lightgray');
                                break;
                            }
                            default: break;
                        }
                    });
                    break;
                }
                default: {
                    break;
                }
            }
        });

        let buildingsNamesArray = ['tower_03', 'tower_02', 'tower_01', 'tower_t', 'Nei_buildings03', 'Nei_buildings02', 'Nei_buildings01', 'Nei_buildings00', 'Nei_buildings04'];
        let temp_material = enviroment.getObjectByName('tower_03').material.clone();
        temp_material.depthWrite = false;
        enviroment.children.forEach(building => {
            buildingsNamesArray.forEach(name => {
                if (building.name === name) {
                    object_to_opacity.push(building);
                    enviroment.getObjectByName(name).material = temp_material.clone();
                    on_load_texture();
                }
            });
        });

            const scale = 0.001;
            enviroment.scale.set(scale, scale, scale);
            enviroment.position.set(-52.7081922533268, 0, 62.36794882308486);
            enviroment.name = 'environment';

        window.enviroment = enviroment;

        scene.add(enviroment);

        }, onProgressCallback , onErrorCallback);
    },1000);

}
function loadBoxes(loader, texture_loader, empty_model, beton_texture, reflection_material, new_merged_glass_map, on_load_texture, white_lightmap) {
    loader.load('resources/2020/04/boxes_6.FBX', function(boxes_model) {
        // console.log(boxes_model);
        let materials_array_skeleton = {};
        beton_texture = texture_loader.load('resources/material/textures/concrette_diffuse_2_o.jpg', on_load_texture);
        textures_counter++;
        beton_texture.wrapS = THREE.RepeatWrapping;
        beton_texture.wrapT = THREE.RepeatWrapping;
        beton_texture.repeat.set(0.1, 0.1);
        beton_texture.encoding = THREE.LinearEncoding;

        reflection_material = texture_loader.load('resources/material/textures/360_half.jpg', on_load_texture);
        textures_counter++;
        reflection_material.mapping = THREE.EquirectangularReflectionMapping;
        reflection_material.minFilter = THREE.NearestMipmapLinearFilter;
        reflection_material.roughness = 0;
        reflection_material.wrapS = THREE.RepeatWrapping;
        reflection_material.wrapT = THREE.RepeatWrapping;
        reflection_material.magFilter = THREE.LinearFilter;
        reflection_material.minFilter = THREE.LinearFilter;

        // new merged materials start
        let new_merged_map;

        {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            if (urlParams !== undefined) {
                let atlas = urlParams.get('atlas');
                if (atlas !== null) {
                    if (atlas === 1) {
                        new_merged_map = texture_loader.load('resources/new_merged/textures/atlas_1.jpg', on_load_texture);
                    } else if (atlas === 2) {
                        new_merged_map = texture_loader.load('resources/new_merged/textures/atlas_2.jpg', on_load_texture);
                    } else if (atlas === 3) {
                        new_merged_map = texture_loader.load('resources/new_merged/textures/atlas_3.jpg', on_load_texture);
                    } else if (atlas === 4) {
                        new_merged_map = texture_loader.load('resources/new_merged/textures/atlas_4.jpg', on_load_texture);
                    } else   {
                        new_merged_map = texture_loader.load('resources/new_merged/textures/atlas_6.jpg', on_load_texture);
                    }
                } else {
                    new_merged_map = texture_loader.load('resources/new_merged/textures/atlas_6.jpg', on_load_texture);
                }
            } else {
                new_merged_map = texture_loader.load('resources/new_merged/textures/atlas_6.jpg', on_load_texture);
            }
        }

        textures_counter++;
        new_merged_map.encoding = THREE.LinearEncoding;

        let new_merged_specular = texture_loader.load('resources/new_merged/textures/atlas_spec.jpg', on_load_texture);
        textures_counter++;
        new_merged_specular.encoding = THREE.LinearEncoding;

        new_merged_glass_map = texture_loader.load('resources/new_merged/textures/glass_map.jpg');
        new_merged_glass_map.encoding = THREE.LinearEncoding;

        let new_merged_lm_5_7 = texture_loader.load('resources/new_merged/lightmaps/5-7_lightmap.jpg', on_load_texture);
        textures_counter++;
        new_merged_lm_5_7.encoding = THREE.LinearEncoding;

        let new_merged_lm_8_11 = texture_loader.load('resources/new_merged/lightmaps/8-11_lightmap.jpg', on_load_texture);
        textures_counter++;
        new_merged_lm_8_11.encoding = THREE.LinearEncoding;

        let new_merged_lm_12_20 = texture_loader.load('resources/new_merged/lightmaps/12-20_lightmap.jpg', on_load_texture);
        textures_counter++;
        new_merged_lm_12_20.encoding = THREE.LinearEncoding;

        let new_merged_lm_21_43 = texture_loader.load('resources/new_merged/lightmaps/21-43_lightmap_2.jpg', on_load_texture);
        textures_counter++;
        new_merged_lm_21_43.encoding = THREE.LinearEncoding;

        let new_merged_lm_lobby = texture_loader.load('resources/new_merged/lightmaps/Lobby_lightmap.jpg', on_load_texture);
        textures_counter++;
        new_merged_lm_lobby.encoding = THREE.LinearEncoding;

        let new_merged_lm_roof = texture_loader.load('resources/new_merged/lightmaps/Roof_lightmap.jpg', on_load_texture);
        textures_counter++;
        new_merged_lm_roof.encoding = THREE.LinearEncoding;

        // new merged lightmaps end
        let materials_array_2 = {
            "_5-7_5-7_atlas": {
                map : new_merged_map,
                specularMap : new_merged_specular,
                lightMap : new_merged_lm_5_7,
                color : new THREE.Color( 'lightgray' ),
                envMap : reflection_material,
            },
            "_8-11_8-11_atlas": {
                map : new_merged_map,
                specularMap : new_merged_specular,
                lightMap : new_merged_lm_8_11,
                color : new THREE.Color( 'lightgray' ),
                envMap : reflection_material,
            },
            "_12-20_12-20_atlas": {
                map : new_merged_map,
                specularMap : new_merged_specular,
                lightMap : new_merged_lm_12_20,
                color : new THREE.Color( 'lightgray' ),
                envMap : reflection_material,
            },
            "_21-43_21-43_atlas": {
                map : new_merged_map,
                specularMap : new_merged_specular,
                lightMap : new_merged_lm_21_43,
                color : new THREE.Color( 'lightgray' ),
                envMap : reflection_material,
            },
            "_Lobby_Lobby_atlas": {
                map : new_merged_map,
                specularMap : new_merged_specular,
                lightMap : new_merged_lm_lobby,
                color : new THREE.Color( 'lightgray' ),
                envMap : reflection_material,
            },
            "_Roof_Roof_atlas": {
                map : new_merged_map,
                specularMap : new_merged_specular,
                lightMap : new_merged_lm_roof,
                color : new THREE.Color( 'lightgray' ),
                envMap : reflection_material,
            },
        };

        let temp_clone_8_11 = empty_model.children[1].children[0].clone();
        find_n_clone_material(empty_model.children[1].children[0],temp_clone_8_11);

        let temp_clone_12_20 = empty_model.children[2].children[0].clone();
        find_n_clone_material(empty_model.children[2].children[0],temp_clone_12_20);

        let temp_clone_21_43 = empty_model.children[3].children[0].clone();
        find_n_clone_material(empty_model.children[3].children[0],temp_clone_21_43);

        let temp_clone_lobby = empty_model.children[4].children[0].clone();
        find_n_clone_material(empty_model.children[4].children[0],temp_clone_lobby);

        let temp_clone_roof = empty_model.children[5].children[0].clone();
        find_n_clone_material(empty_model.children[5].children[0],temp_clone_roof);
        add_materials_to_object(empty_model, materials_array_2, materials_array_skeleton);

        function add_materials_to_object(object, materials_array, materials_array_skeleton, prefix = '') {

            if (object.type === 'Group' && object.children.length > 0) {
                object.children.forEach(function (children) {
                    add_materials_to_object(children, materials_array, materials_array_skeleton, prefix + object.name + '_');
                });
            }

            if (object.type === 'Mesh') {
                add_materials_to_mesh(object.material, materials_array, materials_array_skeleton, prefix + object.name + '_');
            }
        }

        function add_materials_to_mesh(fn_material, materials_array, materials_array_skeleton, prefix) {
            let materials = fn_material;

            if (Array.isArray(materials) === true) {
                materials.forEach(function (material) {
                    add_materials_to_mesh(material, materials_array, materials_array_skeleton, prefix);
                });
            } else {
                let material_name = prefix + materials.name;
                if (materials_array_skeleton[material_name] === undefined) {
                    materials_array_skeleton[material_name] = {};
                }

                if (materials_array[material_name] !== undefined) {
                    let object = materials_array[prefix + materials.name];
                    let obj_keys = Object.keys(object);
                    if (material_name === '_5-7_APT_5-7_Int_2A_002_concrette') {

                    }
                    if (Array.isArray(obj_keys)) {
                        if (obj_keys.length > 0) {
                            obj_keys.forEach(function (key) {
                                materials[key] = object[key];
                            });
                        }
                    }
                }
            }
        }

        window.empty_model = empty_model;
        window.experimental_mesh = empty_model.children[0].children[0];

        let instanced_floors_count = 5;
        let positions_array = {
            start_y: 6.536338065283683,
            start_x: -6.546790795014282,
            start_z: 11.51030694187112,
            y_diff_y: 325.3,
            count: 3,
            scale: {
                x: 0.01,
                y:0.01,
                z:0.01,
            },
            rotation: new THREE.Euler(-1.57, 0, 0, 'XYZ'),
            hidden : false,
        };

        let floor_type_1_inst = empty_model.children[0].children[0];
        add_instances_floor(floor_type_1_inst, positions_array);

        let floor_type_2_inst = empty_model.children[1].children[0];

        positions_array = {
            start_y: 19.58,
            start_x: -0.41682418821129374,
            start_z: 1.0911659408024355,
            y_diff_y: 3380 / 10,
            count: 4,
            scale: {
                x:0.001 * 10,
                y:0.001 * 10,
                z:0.001 * 10,
            },
            rotation: new THREE.Euler(-1.57, 0, (6.28 / 3 * 3), 'XYZ'),
        };
        add_instances_floor(floor_type_2_inst, positions_array);
        // control.attach(window.instance_mesh);

        positions_array = {
            start_y: 29.6177 + 3.38,
            start_x: 0.05166733742336849,
            start_z: 0.26898858317867,
            y_diff_y: 3380 / 10,
            count: 9, // 9
            scale: {
                x:0.001 * 10,
                y:0.001 * 10,
                z:0.001 * 10,
            },
            rotation: new THREE.Euler(-1.57, 0, (6.28 / 3 * -0), 'XYZ'),
        };

        let floor_type_3_inst = empty_model.children[2].children[0];
        add_instances_floor(floor_type_3_inst, positions_array);

        // add_instances_floor(floor_type_3_inst, positions_array);
        positions_array = {
            start_y: 63.138337887465404,
            start_x: 0.5506211603088724,
            start_z: -0.6854284331415981,
            y_diff_y: 3540 / 10,
            count: 28,
            scale: {
                x:0.001 * 10,
                y:0.001 * 10,
                z:0.001 * 10,
            },
            rotation: new THREE.Euler(-1.57, 0, (6.28 / 3 * -0), 'XYZ'),
        };

        let floor_type_4_inst = empty_model.children[3].children[0];
        window.instance_mesh =   add_instances_floor(floor_type_4_inst, positions_array);
        // control.attach(window.instance_mesh);

        function add_instances_floor(floor, positions_array) {
            let count = positions_array.count;
            let mesh = new THREE.InstancedMesh(floor.geometry, floor.material, count);
            mesh.position.set(positions_array.start_x, positions_array.start_y, positions_array.start_z);
            let scale = positions_array.scale;
            mesh.scale.set(scale.x, scale.y, scale.z);
            let i = 0;
            let y = positions_array.y_diff_y;
            while (i < count) {
                let matrix = new THREE.Matrix4();
                matrix.makeRotationFromEuler(positions_array.rotation);
                matrix.setPosition(0, positions_array.y_diff_y * i, 0);
                mesh.setMatrixAt(i, matrix);
                instanced_floors[instanced_floors_count] = {
                    'mesh': mesh,
                    'count': i,
                    'position': [0, positions_array.y_diff_y * i, 0],
                    'rotation': positions_array.rotation,
                    'diff': {
                        x : 0,
                        y : positions_array.y_diff_y,
                        z : 0,
                    },
                    'matrix': matrix
                };
                instanced_floors_count++;
                i++;
            };
            mesh.renderOrder = 1;
            scene.add(mesh);

            return mesh;
        }

        let empty_roof = empty_model.children[0].clone();
        let zoom_i = 0.010010593995981724;
        empty_roof.scale.set(zoom_i, zoom_i, zoom_i);
        empty_roof.position.set(0, 164.73474142266286, -4.7);
        //  scene.add(empty_roof);

        let facings_array = [''];
        let flats_types = [''];

        let elements_array_big = {
            lobby: empty_model.children[4].clone(),
            floor_type_5_7: boxes_model.children[3],
            floor_type_8_11: boxes_model.children[0],
            floor_type_12_20: boxes_model.children[2],
            floor_type_21_40: boxes_model.children[1],
            floor_type_41_46: boxes_model.children[4],
            floor_type_47: boxes_model.children[5],
            floor_type_48: boxes_model.children[6],
            roof: empty_model.children[5].clone(),
        };

        var building = [];

        function prepare_floor(floor) {
            floor.children.forEach(function (flat_mesh) {
                flat_mesh.material = new THREE.MeshPhongMaterial({
                    color: '#b32d57',
                    transparent: true,
                    opacity: 0,
                    lightMap : white_lightmap,
                    side : 2,
                    depthWrite : false,
                });
            });
        }

        let int_360_array = {
            '2AWn' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/2Awn/index.html',
            '2AWs' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/2Awn/index.html',
            '3As' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/3As/index.html',
            '3Ben' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/3Ben/index.html',
            '3Bes' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/3Bes/index.html',
            '3Dws' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/3Dws/index.html',
            '3Me' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/3Me/index.html',
            '3Kse' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/3Kse/index.html',
            '3Rne' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/3Rne/index.html',
            '3Rse' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/3Rse/index.html',
            '3Ws' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/3Ws/index.html',
            '4An' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/4An/index.html',
            '4As' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/4As/index.html',
            '4Mwn' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/4Mwn/index.html',
            '4PWn' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/4Pwn/index.html',
            '4PWs' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/4Pws/index.html',
            '4Wn' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/4Wn/index.html',
            '4Ws' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/4Ws/index.html',
            '5Pwn' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/5Pwn/index.html',
            '5Pws' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/5Pws/index.html',
            '5Wn' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/5Wn/index.html',
            '5Ws' : 'https://dreamseu.z6.web.core.windows.net/new/gindi/interiors/5Wn/index.html',
        };
        let int_3be = [
            '3Be-suite-hr.jpg'
        ];
        let int_3me = [
            '3Me-salon-hrv3.jpg',
            '3Me-suite-hr.jpg',
        ];
        let int_4a = [
            '4An-salon-hr.jpg',
        ];
        let int_4mwn = [
            '4Mwn-salon-hr.jpg',
            '4Mwn-suite-hr.jpg',
        ];
        let int_4pwn = [
            '4Pwn_suite-hr.jpg',
            '4Pwn-salon-hr.jpg',
        ];
        let int_4wn= [
            '4wn-salon-hr.jpg',
        ];
        let int_5pw= [
            '5Pwn-salon-hr.jpg',
            '5Pws-salon-hr.jpg',
            '5Pws-salon-v2-hr.jpg',
            '5Pws-suite-hr.jpg',
        ];
        let int_5wn = [
            '5wn-balcony-hr.jpg',
            '5wn-salon-hr.jpg',
            '5wn-suite-hr.jpg',
        ];
        let int_360_array_imgs = {
            '3Ben' : int_3be,
            '3Bes' : int_3be,
            '3Me' : int_3me,
            '4An' : int_4a,
            '4As' : int_4a,
            '4Mwn' : int_4mwn,
            '4PWn' : int_4pwn,
            '4PWs' : int_4pwn,
            '4Wn' : int_4wn,
            '4Ws' : int_4wn,
            '5Pwn' : int_5pw,
            '5Pws' : int_5pw,
            '5Wn' : int_5wn,
            '5Ws' : int_5wn,
        };

        function add_building(elements_array, building_array) {
            var zoom_i = 0.001;
            var boxes_zoom = 0.004;
            let lobby = elements_array.lobby;
            lobby.scale.set(zoom_i, zoom_i, zoom_i);
            lobby.position.set(0, 0, -4.7);
            scene.add(lobby);
            let floor_type_5_7_center_geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
            var floor_type_5_7_center_material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
            var floor_type_5_7_center_mesh = new THREE.Mesh( floor_type_5_7_center_geometry, floor_type_5_7_center_material );
            floor_type_5_7_center_mesh.name = 'floor_center';
            floor_type_5_7_center_mesh.position.set(0, 0, elements_array.floor_type_5_7.children[0].position.z);
            elements_array.floor_type_5_7.add(floor_type_5_7_center_mesh);
            elements_array.floor_type_5_7.userData.center_flat_index = 2;
            prepare_floor(elements_array.floor_type_5_7);

            let floor_type_8_11_center_mesh = floor_type_5_7_center_mesh.clone();
            floor_type_8_11_center_mesh.position.z = elements_array.floor_type_8_11.children[0].position.z;
            elements_array.floor_type_8_11.add(floor_type_8_11_center_mesh);
            elements_array.floor_type_8_11.userData.center_flat_index = 1;
            prepare_floor(elements_array.floor_type_8_11);

            let floor_type_12_20_center_mesh = floor_type_5_7_center_mesh.clone();
            floor_type_12_20_center_mesh.position.z = elements_array.floor_type_12_20.children[0].position.z;
            elements_array.floor_type_12_20.add(floor_type_12_20_center_mesh);
            elements_array.floor_type_12_20.userData.center_flat_index = 2;
            prepare_floor(elements_array.floor_type_12_20);

            let floor_type_21_43_center_mesh = floor_type_5_7_center_mesh.clone();
            floor_type_21_43_center_mesh.position.z = elements_array.floor_type_21_40.children[0].position.z;
            elements_array.floor_type_21_40.add(floor_type_21_43_center_mesh);
            elements_array.floor_type_21_40.userData.center_flat_index = 1;
            prepare_floor(elements_array.floor_type_21_40);

            var floor_type_41_46_center_mesh = new THREE.Mesh( floor_type_5_7_center_geometry, floor_type_5_7_center_material );
            floor_type_41_46_center_mesh.name = 'floor_center';
            floor_type_41_46_center_mesh.position.set(0, 0, elements_array.floor_type_41_46.children[0].position.z);
            elements_array.floor_type_41_46.add(floor_type_41_46_center_mesh);
            elements_array.floor_type_41_46.userData.center_flat_index = 1;
            prepare_floor(elements_array.floor_type_41_46);

            var floor_type_47_center_mesh = new THREE.Mesh( floor_type_5_7_center_geometry, floor_type_5_7_center_material );
            floor_type_47_center_mesh.name = 'floor_center';
            floor_type_47_center_mesh.position.set(0, 0, elements_array.floor_type_47.children[0].position.z);
            elements_array.floor_type_47.add(floor_type_47_center_mesh);
            elements_array.floor_type_47.userData.center_flat_index = 1;
            prepare_floor(elements_array.floor_type_47);

            var floor_type_48_center_mesh = new THREE.Mesh( floor_type_5_7_center_geometry, floor_type_5_7_center_material );
            floor_type_48_center_mesh.name = 'floor_center';
            floor_type_48_center_mesh.position.set(0, 0, elements_array.floor_type_48.children[0].position.z);
            elements_array.floor_type_48.add(floor_type_48_center_mesh);
            elements_array.floor_type_48.userData.center_flat_index = 1;
            prepare_floor(elements_array.floor_type_48);

            elements_array.floor_type_5_7.scale.set(boxes_zoom, boxes_zoom, boxes_zoom);
            elements_array.floor_type_8_11.scale.set(boxes_zoom, boxes_zoom, boxes_zoom);
            elements_array.floor_type_12_20.scale.set(boxes_zoom, boxes_zoom, boxes_zoom);
            elements_array.floor_type_21_40.scale.set(boxes_zoom, boxes_zoom, boxes_zoom);
            boxes_zoom = boxes_zoom * 10;
            elements_array.floor_type_41_46.scale.set(boxes_zoom, boxes_zoom, boxes_zoom);
            elements_array.floor_type_47.scale.set(boxes_zoom, boxes_zoom, boxes_zoom);
            elements_array.floor_type_48.scale.set(boxes_zoom, boxes_zoom, boxes_zoom);

            // zoom_i = 0.010010593995981724;
            zoom_i = 0.010010593995981724;
            elements_array.roof.scale.set(zoom_i, zoom_i, zoom_i);
            window.control = control;

            // {x: -0.2149444299569776, y: -10.381874117366038, z: 0.0369304158114625}
            let start_i = 5;
            let target_y;
            let start_y = -10.381874117366038;
            let i = 0;
            let floor_1;
            while (start_i <= 7) {
                let object_to_clone = elements_array.floor_type_5_7;
                floor_1 = object_to_clone.clone();
                target_y = start_y + (11.189571354476431 - 7.936338065283678) * i;
                floor_1.position.set(0, target_y, 0);
                scene.add(floor_1);
                building_array.push(floor_1);
                start_i++;
                i++;
            }

            i = 0;
            start_i = 8;
            start_y = -8;
            while (start_i <= 11) {
                floor_1 = elements_array.floor_type_8_11.clone();
                target_y = start_y + (21.103525837646536 - 17.723277938571606 ) * i;
                floor_1.position.set(0, target_y, 0);
                scene.add(floor_1);
                building_array.push(floor_1);
                start_i++;
                i++;
            }

            // 32.68426953487138
            i = 0;
            start_i = 12;
            start_y = 2.134;
            while (start_i <= 20) {
                floor_1 = elements_array.floor_type_12_20.clone();
                target_y = start_y + (21.103525837646536 - 17.723277938571606) * i;
                floor_1.position.set(0, target_y, 0);
                scene.add(floor_1);
                building_array.push(floor_1);
                start_i++;
                i++;

            }
            i = 0;
            start_i = 21;
            start_y = 28.996500626545846;
            while (start_i <= 40) {
                floor_1 = elements_array.floor_type_21_40.clone();
                target_y = start_y + (22.06352583764656 - 18.523277938571617) * i;
                floor_1.position.set(0, target_y, 0);
                scene.add(floor_1);
                building_array.push(floor_1);
                start_i++;
                i++;
            }

            i = 0;
            start_i = 41;
            start_y = 99.83429315821958;
            while (start_i <= 46) {
                floor_1 = elements_array.floor_type_41_46.clone();
                target_y = start_y + (22.06352583764656 - 18.523277938571617) * i;
                floor_1.position.set(0, target_y, 0);
                scene.add(floor_1);
                building_array.push(floor_1);
                start_i++;
                i++;
            }

            i = 0;
            start_i = 47;
            start_y = 121.5757805526692 - (22.06352583764656 - 18.523277938571617);
            while (start_i <= 47) {
                floor_1 = elements_array.floor_type_47.clone();
                target_y = start_y + (22.06352583764656 - 18.523277938571617) * i;
                floor_1.position.set(0, target_y, 0);
                scene.add(floor_1);
                building_array.push(floor_1);
                start_i++;
                i++;
            }

            i = 0;
            start_i = 48;
            while (start_i <= 48) {
                floor_1 = elements_array.floor_type_48.clone();
                target_y = 117.61602845174409;
                floor_1.position.set(0, target_y, 0);
                scene.add(floor_1);
                building_array.push(floor_1);
                start_i++;
                i++;
            }

            i = 0;
            floor_1 = elements_array.roof.clone();
            floor_1.position.set(0, 164.73474142266286, -4.7);
            scene.add(floor_1);
            building_array.push(floor_1);
            building_array.push(lobby);
            start_i++;
            i++;
        }

        // add_building(elements_array_big, building);

        var flat_count = 0;
        var floor_obj_length = 0;
        var json_i = 0;
        var material_flat_arr = {};
        var flat_texture_loader_count = 0;
        var loaded_flat_texture_counter = 0;
        let flats_without_concessions = 0;
        let min_rooms = 999999;
        let max_rooms = 0;
        let modelNames = {};
        //console.log(building);

        function buildHighlights() {

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

                    element.userData.base_scale = new THREE.Vector3( element.scale.x,  element.scale.y,  element.scale.z);

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
                                let flats_names = [
                                    'APT_21_43_Int_6P_4384',
                                    'APT_21_43_Int_6P_4385',
                                ];
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
                                    }
                                }
                            }
        
                            let flat_2d_status = 'Available';
                            if (user_data.crm_data.status === "Available") {
                                random_number = 1;
                            } else {
                                random_number = 0;
                                flat_2d_status = 'Unavailable';
                            }
                            let flat_model_name = user_data.crm_data.modelName;

                            user_data.svg_plan = {
                                horizontal: {
                                    en: `${svg_plans_url}/horizontal/en/${flat_model_name}.png`,
                                    he: `${svg_plans_url}/horizontal/he/${flat_model_name}.png`
                                },
                                vertical: {
                                    en: `${svg_plans_url}/vertical/en/${flat_model_name}.png`,
                                    he: `${svg_plans_url}/vertical/he/${flat_model_name}.png`
                                },
                                printA4: {
                                    en: `${svg_plans_url}/print/en/${flat_model_name}.png`,
                                    he: `${svg_plans_url}/print/he/${flat_model_name}.png`
                                }
                            };

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
                                    facings_array.push(item)
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
                            flat.name = 'zagluha';
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

        const crmInterval = setInterval(() => { 
            if (crmStatusLoadBool) {
                clearInterval(crmInterval);
                add_building(elements_array_big, building);
                buildHighlights();

        // apply_textures (window.ground, material_flat_arr);
        window.floor_obj.length = floor_obj_length;
        $('.flat-plan .toggle-btn').removeClass('active');
        $('.flat-plan').removeClass('active');
        $('#c').removeClass('active');

        setTimeout(function () {
            new_floor_selector_obj = $('.new-floors-selector').floors_selector();

            model_loaded = true;

            add_cylinder_floor_numbers();
            floors_height_positions = [];
            window.floor_obj.forEach(function(floor){
                let center_position = floor[0].parent.getObjectByName('floor_center');
                let world_position = center_position.getWorldPosition(new global_three.Vector3());
                floors_height_positions.push(world_position);
            });

            if ($(window).width() < 768) {
                // $('body')[0].requestFullscreen();
            }

            $('.language.he').trigger('click');

            globalFunctions.setAllDefaultWorldPositions(scene);
            let defaultData = globalSettings.animations.defaultForeshortening;
            globalFunctions.animateTo(defaultData.position, defaultData.rotation, defaultData.zoom, 1000, TWEEN.Easing.Sinusoidal.InOut);
        }, 1000);
    }
        }, 100)
    }, onProgressCallback, onErrorCallback);


// }, function (xhr) {
//     let loaded = xhr.loaded;
//     let total = xhr.total;
//     let progress_number = Math.round((loaded / total) * 100);
//     if ( progress_number < 101) {
//         if (progress_number > 0 ) {
//             let progress_number_text = progress_number + '%';
//             progress_bar_update(2, progress_number, 'Load model ' + progress_number + '%')
//             $('.preloader .percents').html('Load model ' + progress_number + '%');
//         }
//     }
// }, onErrorCallback);
}
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
/*function loadSea(texture_loader) {
    // add sea sprite start
    var sprite_map = texture_loader.load( "resources/sprite/sea_en_2.png" );
    var sprite_material = new THREE.SpriteMaterial( { map: sprite_map } );
    var sprite = new THREE.Sprite( sprite_material );
    var scale_number = 60;
    sprite.position.set( -73.79192326625702, 5, -435.143 );
    sprite.scale.set(scale_number, scale_number / 160 * 116,1);
    window.sprite = sprite;

    var sprite_map_2 = texture_loader.load( "resources/sprite/gindi-sea-location.png" );
    var sprite_material_2 = new THREE.SpriteMaterial( { map: sprite_map_2 } );
    var sprite_2 = new THREE.Sprite( sprite_material_2 );
    var scale_number = 40;
    sprite_2.position.set( -119.75036701229075, 65.15727902081309, -435.143 );
    sprite_2.scale.set(scale_number, scale_number / 138 * 118,1);
    window.sprite_2 = sprite_2;
    window.sprite_2 = sprite_2;
}*/
export function loadTrees() {
    const loader = new FBXLoader();
    const texture_loader = new THREE.TextureLoader();
    let white_lightmap_2 = texture_loader.load('resources/2020/04/white-lightmap-2.jpg');

    loader.load('resources/trees/tree.fbx', function(tree){
        let tree_mesh = tree.children[0];
        tree_mesh.position.set(0,0,0);
        tree_mesh.scale.set(0.1,0.1,0.1);
        let three_map = texture_loader.load('resources/trees/2321.jpg');
        // scene.add(tree_mesh);
        // control.attach(tree_mesh);
        window.tree_mesh = tree_mesh;
        let options = {
            material_map : three_map,
            lightMap : white_lightmap_2,
        }
        tree_mesh.material.map = three_map;
        tree_mesh.material.lightMap = texture_loader.load('resources/2020/04/white-lightmap.jpg');
        // scene.add(tree_mesh);
        {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            trees_position.map(pos => pos.y = -6);
            add_instances_trees(tree_mesh, trees_position, 0.0008, options);
        }
    }, onProgressCallback, onErrorCallback);
}

export function liveToggler(environmentSettings) {
    const loader = new FBXLoader();
    const texture_loader = new THREE.TextureLoader();

    if (getCookie('environmentBool') === 'false') {
        return;
    }

    setCookie('envOptions', JSON.stringify(environmentSettings), {'max-age': 999999});

    environmentSettings.forEach(({type, active}) => {
        switch (type) {
            case 'cars': {
                if (active) {
                    add_cars(texture_loader, loader, 'add');
                } else {
                    add_cars(texture_loader, loader, 'remove');
                }
                break;
            }
            case 'pedestrians': {
                if (active) {
                    add_humans(loader, 'add');
                } else {
                    add_humans(loader, 'remove');
                }
                break;
            }
            case 'bicycles': {
                if (active) {
                    add_bicycle(loader, 'add');
                } else {
                    add_bicycle(loader, 'remove');
                }
                break;
            }
            default: break;
        }
    });
}
function sceneGlobus() {

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
        transparent: false,
        depthWrite: false,
        side: THREE.BackSide,
    });
    material.uniforms.tEquirect.value = texture_day;

    // const plane = new THREE.SphereBufferGeometry(550, 550, 550);
    const plane = new THREE.SphereGeometry(1500, 32, 32, 0, 3.8, 0, Math.PI);

    var geometryGround = new THREE.CircleBufferGeometry( 1500, 32 );
    var materialGround = new THREE.MeshBasicMaterial({
        color: 0xffffff,
    });
    var circleGround = new THREE.Mesh( geometryGround, materialGround );

    const bgMesh = new THREE.Mesh(plane, material);
    bgMesh.rotation.x = Math.PI * -0.5;
    circleGround.name = 'circleGround';
    bgMesh.name = 'bgMesh';
    circleGround.rotation.x = Math.PI * -0.5;
    circleGround.position.set(0, -7.6, 0);
    bgMesh.position.set(0, -50, 0);

    // const colorFog = 0xFFFFFF;
    // const nearFog = 650;
    // const farFog = 1500;
    // scene.fog = new THREE.Fog(colorFog, nearFog, farFog);

    scene.add(bgMesh);
    scene.add(circleGround);
}

/*
function handleOptionsFromCRM(environmentDataAttribyte) {
    let envAttrOptionsArray = environmentDataAttribyte.environment.movement.filter(item => item.active);
    let arrOptionsFromCookie;



    if (getCookie('envOptions')) {
        arrOptionsFromCookie = JSON.parse(getCookie('envOptions'));

        // console.log(envAttrOptionsArray);
        // console.log(arrOptionsFromCookie);
        //
        // envAttrOptionsArray.forEach(option => {
        //     arrOptionsFromCookie.forEach(cookieOption => {
        //        if (option.type === cookieOption.type) {
        //            envAttrOptionsArray.splice(envAttrOptionsArray.indexOf(option));
        //        }
        //     });
        // });
        // arrOptionsFromCookie = [arrOptionsFromCookie, ...envAttrOptionsArray];
        //
        // console.log(envAttrOptionsArray);
        // console.log(arrOptionsFromCookie);
    }



    const environmentBool = getCookie('environmentBool');

    if (optionsMenuShowHide) {
        envAttrOptionsArray = (getCookie('envOptions')) ? arrOptionsFromCookie : envAttrOptionsArray;

        if (environmentBool && environmentBool === 'false') {
            envAttrOptionsArray.forEach(item => item.action = false);
        }

        optionsMenu(envAttrOptionsArray);
    }

    return envAttrOptionsArray;
}*/
