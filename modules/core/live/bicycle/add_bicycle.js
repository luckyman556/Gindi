import * as THREE from '../../../../node_modules/three/build/three.module.js';
import { bicycle_routes } from '../../../individual/live/bicycle/bicycle_route.js';
import {live_element_animation } from '../rotation.js';

let bicyclistArray = [];
window.bicyclistRoutes = bicycle_routes;

export function add_bicycle (loader, action) {
    const bicyclistOptions = {
        amount: bicycle_routes.length,
        // scale: 0.009,
        scale: globalSettings.live.bicycles.scale,
    };

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

function createModel({amount, scale}, loader) {
    for (let i = 0; i < amount; i++) {
        let animation_counter = 0;
        loader.load('resources/bicycle/bicycle.fbx', function (bicyclist) {
            bicyclist.name = `bicyclist-${i}`;
            bicyclist.userData.isBicyclist = true;
            bicyclist.scale.set(scale, scale, scale);
            bicyclist.position.set(bicycle_routes[i][i].position.x, bicycle_routes[i][i].position.y,bicycle_routes[i][i].position.z);

            setRandomColor(bicyclist.children[0]);

            let mixer = new THREE.AnimationMixer(bicyclist);
            let move_action = mixer.clipAction(bicyclist.animations[0]);
            move_action.play();

            human_animation_array.push(mixer);

            window.bicyclist = bicyclist;
            scene.add(bicyclist);
            bicyclistArray.push(bicyclist);

            live_element_animation(bicyclist,bicycle_routes[i],animation_counter,globalSettings.live.bicycles.speed,2);

        }, onProgressCallback, onErrorCallback);
    }
}

