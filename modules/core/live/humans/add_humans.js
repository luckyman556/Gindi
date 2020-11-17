import * as THREE from '../../../../node_modules/three/build/three.module.js';
import { human_routes } from '../../../individual/live/humans/human_routes.js';
import { live_element_animation } from '../rotation.js';
import {humansSettings} from "../../../individual/live/humans/humansSettings.js";

let humansArray = [];
export function add_humans (loader, action) {
    let index = 0;
    if (action === 'add' && humansArray.length === 0) {
        human_routes.forEach(function(route,index){
            loader.load('resources/humans/Man_3_LOD2@Strut_Walking.fbx', function (human) {
              let animation_counter = 0;
                let colorsSet = [
                    {
                        shirt : '0x423f2f',
                        pens : '0x7e985f'
                    },
                    {
                        shirt : '0x2f4233',
                        pens : '0x5f7198'
                    },
                    {
                        shirt : '0x42392f',
                        pens : '0x98815f'
                    },
                ];
                let randomNumber = Math.floor(colorsSet.length * Math.random());
                let color = colorsSet[randomNumber].shirt;
                let color_2 = colorsSet[randomNumber].pens;
                let man_mesh = human.getObjectByName( "Man_3_LOD2" );

                let shirt = man_mesh.material[3];
                let pens = man_mesh.material[1];
                if (detectMobile) {
                    man_mesh.material.forEach(function(material){
                        material.lightMap =  new THREE.TextureLoader().load('./resources/textures/white-lightmap.jpg');
                    });
                } else {
                    man_mesh.castShadow = true;
                }

                shirt.color.setHex(color);
                pens.color.setHex(color_2);
                let human_animation_points = route;

                let first_position = human_animation_points[0].position;
                human.position.set(first_position.x, first_position.y, first_position.z);
                human.scale.set(humansSettings.scale, humansSettings.scale, humansSettings.scale);
                human.name = `human-${index++}`;

                scene.add(human);

                humansArray.push(human);
                window.human = human;
                let mixer = new THREE.AnimationMixer(human);
                let walk_action = mixer.clipAction(human.animations[0]);
                walk_action.play();
                human_animation_array.push(mixer);
                if (get_url_param('human_speed')) {
                    let humanSpeed = Number(get_url_param('human_speed'));
                    console.log(humanSpeed);
                    humansSettings.speed = humanSpeed;
                }
                live_element_animation(human,route,animation_counter,humansSettings.speed,1);

            },onProgressCallback, onErrorCallback);
        });
    } else if (action === 'remove') {
        humansArray.forEach(human => {
           let humanToRemove = scene.getObjectByName(human.name);
            humanToRemove.visible = false;
            scene.remove(humanToRemove);
        });
        humansArray = [];
    }
}