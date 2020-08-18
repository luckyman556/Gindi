import * as THREE from '../../../node_modules/three/build/three.module.js';
import { human_routes } from './human_routes.js';

export function add_humans (loader) {
    human_routes.forEach(function(route){
            add_animation ();
            add_animation ( Math.floor(route.length / 4  ));
            add_animation( Math.floor(route.length / 4 * 2  ));
            add_animation( Math.floor(route.length / 4 * 3  ));

        function add_animation ( start = 1) {
            loader.load('resources/humans/Man_3_LOD2@Strut_Walking.fbx', function (human) {

                let color = Math.random() * 0xffffff;
                let color_2 = Math.random() * 0xffffff;
                let man_mesh = human.getObjectByName( "Man_3_LOD2" );
                let shirt = man_mesh.material[3];
                let pens = man_mesh.material[1];
                shirt.color.setHex(color);
                pens.color.setHex(color_2);
                let human_animation_points = route;
                // console.log(human_animation_points.length);
                let first_position = human_animation_points[start - 1].position;
                human.position.set(first_position.x, first_position.y, first_position.z);
                // human.scale.set(0.020122018798951334, 0.020122018798951334, 0.020122018798951334);
                human.scale.set(0.01, 0.01, 0.01);
                let first_rotation = human_animation_points[start].rotation;
                human.rotation.set(first_rotation.x, first_rotation.y , first_rotation.z);

                scene.add(human);
                window.human = human;
                let mixer = new THREE.AnimationMixer(human);
                let walk_action = mixer.clipAction(human.animations[0]);
                walk_action.play();
                human_animation_array.push(mixer);
                let animation_counter = start;
                add_human_animation (human);
                add_human_animation_rotation (human);
                function add_human_animation_rotation (mesh) {
                    let target_rotation = human_animation_points[animation_counter]['rotation'];

                    mesh.rotation.x = target_rotation.x;
                    mesh.rotation.y = target_rotation.y;
                    mesh.rotation.z = target_rotation.z;
                }
                function add_human_animation (mesh) {
                    let callback =  function (e) {
                        mesh.position.x = e.position_x;
                        mesh.position.y = e.position_y;
                        mesh.position.z = e.position_z;
                    };
                    let on_complete_callback =  function (e) {

                        animation_counter++;
                        let human_animation_points_length =  human_animation_points.length;
                        if (animation_counter == human_animation_points_length) {
                            animation_counter = 0;

                            add_human_animation_rotation (mesh)
                            add_human_animation (mesh);
                        } else {

                            add_human_animation_rotation (mesh)
                            add_human_animation (mesh);
                        }
                    };

                    var  start = { position_x : mesh.position.x , position_y :  mesh.position.y, position_z :  mesh.position.z };

                    let target_position = human_animation_points[animation_counter]['position'];
                    var target = { position_x : target_position.x , position_y :  target_position.y , position_z :  target_position.z };

                    let current_point = mesh.position;
                    let target_point = new THREE.Vector3(target_position.x, target_position.y, target_position.z );
                    let distance_between = current_point.distanceTo(target_point);
                    var  duration = distance_between * 350 / 0.5;
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
            }, onProgressCallback, onErrorCallback);
        }
    });
}