import * as THREE from '../../../node_modules/three/build/three.module.js';
import { bicycle_routes } from './bicycle_route.js';

let bicyclistArray = [];

export function add_bicycle (loader, action) {
    const bicyclistOptions = {
        amount: 3,
        initialPosition: [
            {
                x: -75.89013459226908,
                y: -5.05,
                z: 41.15972107054229
            },
            {
                x: -67.48,
                y: -5.05,
                z: -2.94
            },
            {
                x: -66.36,
                y: -5.05,
                z: -36.05
            },
        ],
        initialRotation: [-1.93, -2.412, 2.33],
        scale: 0.009,
    }

    if (action === 'add' && bicyclistArray.length === 0) {
        createModel(bicyclistOptions, loader);
    } else if (action === 'remove') {
        bicyclistArray.forEach(bicyclist => {
            const bicyclistToRemove = scene.getObjectByName(bicyclist.name);
            bicyclistToRemove.visible = false;
            scene.remove(bicyclistToRemove);
        });
        bicyclistArray = [];
    }
}

function setRandomColor(obj) {
    obj.material.forEach(item => {
        switch (item.name) {
            case 'Hair': {
                item.color.setHex(Math.random() * 0xffffff);
                break;
            }
            case 'Suit': {
                item.color.setHex(Math.random() * 0xffffff);
                break;
            }
            case 'det': {
                item.color.setHex(Math.random() * 0xffffff);
                break;
            }
            case 'Shoes': {
                item.color.setHex(Math.random() * 0xffffff);
                break;
            }
            default: break;
        }
    });
}

function createModel({amount, initialPosition, initialRotation, scale}, loader) {
    for (let i = 0; i < amount; i++) {
        let animation_counter = 0;
        loader.load('resources/bicycle/bicycle.fbx', function (bicyclist) {
            bicyclist.name = `bicyclist-${i}`;
            bicyclist.scale.set(scale, scale, scale);
            bicyclist.position.set(initialPosition[i].x, initialPosition[i].y, initialPosition[i].z);
            bicyclist.rotation.y = initialRotation[i];

            setRandomColor(bicyclist.children[0]);

            let mixer = new THREE.AnimationMixer(bicyclist);
            let move_action = mixer.clipAction(bicyclist.animations[0]);
            move_action.play();

            human_animation_array.push(mixer);

            window.bicyclist = bicyclist;
            scene.add(bicyclist);
            bicyclistArray.push(bicyclist);


            add_bicycles_animation(bicyclist, bicycle_routes[i], animation_counter);

        }, onProgressCallback, onErrorCallback);
    }
}

function add_bicycles_animation (bicyclist, bicycle_routes, animation_counter) {
        add_human_animation (bicyclist, animation_counter, bicycle_routes);
        add_human_animation_rotation (bicyclist, animation_counter, bicycle_routes);
}
function add_human_animation_rotation (bicyclist, animation_counter, bicycle_routes) {
    const bc = scene.getObjectByName("bicyclist-0")
    let target_rotation = bicycle_routes[animation_counter]['rotation'];

    bicyclist.rotation.x = target_rotation.x;
    bicyclist.rotation.y = target_rotation.y;
    bicyclist.rotation.z = target_rotation.z;

    if (bc) {
        // console.log(bc.rotation);
    }
}
function add_human_animation (bicyclist, animation_counter, bicycle_routes) {
    let callback =  function (e) {
        bicyclist.position.x = e.position_x;
        bicyclist.position.y = e.position_y;
        bicyclist.position.z = e.position_z;
    };
    let on_complete_callback =  function (e) {

        animation_counter++;

        if (animation_counter === bicycle_routes.length) {
            animation_counter = 0;
            add_human_animation_rotation (bicyclist, animation_counter, bicycle_routes);
            add_human_animation (bicyclist, animation_counter, bicycle_routes);

        } else {
            add_human_animation_rotation (bicyclist, animation_counter, bicycle_routes);
            add_human_animation (bicyclist, animation_counter, bicycle_routes);
        }
    }

    var  start = { position_x : bicyclist.position.x , position_y :  bicyclist.position.y, position_z :  bicyclist.position.z };

    let target_position = bicycle_routes[animation_counter]['position'];
    var target = { position_x : target_position.x , position_y :  target_position.y , position_z :  target_position.z };

    let current_point = bicyclist.position;
    let target_point = new THREE.Vector3(target_position.x, target_position.y, target_position.z );
    let distance_between = current_point.distanceTo(target_point);
    var  duration = distance_between * 350 / 2;
    var  easing = TWEEN.Easing.Linear.None;
    var  delay = 0;
    var animation = new TWEEN.Tween(start).to(target, duration);

    TWEEN.add(animation);
    animation.delay(delay);
    animation.onUpdate(callback);
    animation.onComplete(on_complete_callback);
    animation.easing(easing);
    animation.start();
}
