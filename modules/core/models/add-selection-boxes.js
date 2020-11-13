import {FBXLoader} from '../../../node_modules/three/examples/jsm/loaders/FBXLoader.js';
import * as THREE from '../../../node_modules/three/build/three.module.js';

export var SelectionBoxes = {
    /*
        Boxes array
        0 : {
            start_position : {
                x : 0,
                y : 0,
                z : 0,
            },
            y_diff : 0,
            count : 1,
            floor_group,
            array_to_push : array(),
            floor_pivot_mod :

        }
    */
    addOnScene : function(boxes_array){
        boxes_array.forEach(function(floor){
            let target_y;
            let start_y = floor.start_position.y;
            let i = 0;
            let floor_1;
            while (i < floor.count) {
                let object_to_clone = floor.floor_group;
                floor_1 = object_to_clone.clone();
                target_y = start_y + floor.y_diff * i;
                floor_1.position.set(floor.start_position.x, target_y, floor.start_position.z);
                scene.add(floor_1);
                floor.array_to_push.push(floor_1);
                i++;
            }
        });
    },
    towerTwoSelectionsAdd : function (set_mesh_base_color,getCenterPoint,find_n_clone_material) {
        const loader = new FBXLoader();
        let onProgress = function () {};
        let onLoad = function (object) {

           prepareBuildingObject(object,getCenterPoint);

            let scale = 0.01 * 3.898001;
            let start_y = object.children[0].position.y / 100;
            let diff = (object.children[1].position.y - object.children[0].position.y) / 100 + 0.2;
            let building_2_floors = [];
            object.children.forEach(function (floor, i) {
                let item = floor.clone();
                let zagluha = flooring_obj[0].clone();
                zagluha.position.set(buildings_info[1].camera_position.x , start_y + diff * i ,buildings_info[1].camera_position.z);
                zagluha.scale.set(0.2, 0.2, 0.2);

                let new_name = 'gindi_3_' + item.name;
                item.name = new_name;
                item.add(zagluha);
                item.scale.set(scale, scale, scale);
                item.userData.base_scale = new THREE.Vector3( item.scale.x,  item.scale.y,  item.scale.z);
                item.position.set(buildings_info[1].camera_position.x , start_y + diff * i ,buildings_info[1].camera_position.z);

                scene.add(item);
                building_2_floors.push(item);

                //control.attach(building_2_floors[0]);
            });

            addBoxesData();
            function addBoxesData() {
                var flat_count = 0;
                var flat_number =0;
                var svg_plans_url =  'resources/2d_plans/';
                window.floor_obj_2=[];
                window.flooring_obj_2=[];
                if (buildings_info[1].crm_data) {
                    let building_2_appartments = [];
                    let crm_by_number = {};
                    buildings_info[1].crm_data.forEach(function(item){
                        crm_by_number[item.propNum] = item;
                    });
                    building_2_floors.forEach(function(floor,floor_index){

                        flat_number =0;
                        window.floor_obj_2[floor_index] = [];

                        floor.children.forEach(function(elem){
                            if (elem.name !== 'zagluha') {
                                let flat = elem;
                                let names_array = flat.name.split('_');
                                let flat_number2 = names_array[2];
                                elem.userData.crm_data = crm_by_number[flat_number2];

                                var flat_clone = elem.clone();

                                if (elem.name !== 'floor_center') {
                                    find_n_clone_material(elem, flat_clone);
                                }else {
                                    elem.userData.crm_data = buildings_info[1].crm_data[0];
                                }

                                var status_index;
                                let flat_2d_status = 'Available';
                                if (elem.userData.crm_data.status === "Available") {
                                    status_index = 1;
                                } else {
                                    status_index = 0;
                                    flat_2d_status = 'Unavailable';
                                }

                                let flat_model_name = elem.userData.crm_data.modelName;
                                set_mesh_base_color(elem);
                                elem.userData.base_position = {x: elem.position.x, y: elem.position.y, z: elem.position.z};
                                elem.userData.change_color = true;
                                elem.userData.target_color = true;
                                elem.userData.center_point = getCenterPoint(elem);
                                elem.userData.current_color = 'color';
                                elem.userData.floor = floor_index;
                                elem.userData.flat_i = flat_number;
                                elem.userData.flat_counter = flat_count;
                                elem.userData.svg_plan = svg_plans_url + flat_model_name + '.jpg';
                                elem.userData.status_index = status_index;
                                elem.userData.status_color = flat_statuses[status_index]['color'];

                                window.floor_obj_2[floor_index][flat_number] = elem;

                                if (flat.name !== 'floor_center') {
                                    building_2_appartments.push(flat);
                                }


                                let white_lightmap = new global_three.TextureLoader().load('resources/2020/04/white-lightmap.jpg');
                                flat.material = new global_three.MeshPhongMaterial({
                                    color: '#b32d57',
                                    transparent: true,
                                    opacity: 0,
                                    side : 2,
                                    lightMap : white_lightmap,
                                    depthWrite : false,
                                });
                                flat_count++;
                                flat_number++;
                            } else {
                                elem.name = 'zagluha';
                                window.flooring_obj_2[floor_index] = elem;
                            }
                        });
                        // window.floor_obj_2[floor_index].push(floor);
                    });
                    window.tower3Selection = building_2_appartments;
                } else {
                    setTimeout(function(){
                        addBoxesData();
                    }, 100);
                }
            }


        };
        let onError = function(e){
            console.log(e);
        };

        loader.load('resources/2020/03/GindiTower3_selection_boxes.fbx', onLoad, onProgress, onError )

    }
}

function prepareBuildingObject (building,getCenterPoint) {
   building.children.forEach(floor =>{
       floor.userData.center_flat_index = 1;

       let floor_center_geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
       let floor_center_material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
       let floor_center_mesh = new THREE.Mesh( floor_center_geometry, floor_center_material );

       floor_center_mesh.name = 'floor_center';
       floor_center_mesh.position.set(0, 0, 0);
       floor_center_mesh.userData.crm_data = buildings_info[1].crm_data[0];
       floor_center_mesh.userData.status_index = 0;
       floor_center_mesh.userData.center_point = getCenterPoint(floor_center_mesh);

       floor.add(floor_center_mesh);

       floor.children.forEach(flat => {
           let cube_geometry = new THREE.BoxBufferGeometry(0.0001, 0.0001, 0.0001);
           let cube_material = new THREE.MeshPhongMaterial({
               color: 'red',
               opacity: 1,
               transparent: true,
           });

           let cubeA = new THREE.Mesh(cube_geometry, cube_material);
           flat.userData.center_point = getCenterPoint(flat);

           cubeA.position.set(flat.userData.center_point.x, flat.userData.center_point.y, flat.userData.center_point.z);
           cubeA.name = 'center';

           flat.add(cubeA);

       });
   });
}