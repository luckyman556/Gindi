import * as THREE from '../../../node_modules/three/build/three.module.js';
export function street_names_n_positions_angle () {
    if (street_names_objs.length > 0) {
        street_names_objs.forEach(function (street_name){

            let point_a_mesh = street_name.getObjectByName('angle_point');
            if (point_a_mesh != undefined) {
                if (point_a_mesh.userData.world_position == undefined) {
                    let point_a_position = point_a_mesh.getWorldPosition(new global_three.Vector3());
                    point_a_mesh.userData.world_position = point_a_position;
                }
                let obj_a = point_a_mesh.userData.world_position;
                let obj_b = perspectiveCamera.getWorldPosition(new THREE.Vector3());
                let angle_obj = get_angle_between (obj_a, obj_b);
                let degs = angle_obj.degs;
                if ( degs > 90) {
                   let base_rotation =  street_name.userData.base_rotation_z;
                   let base_position =  street_name.userData.base_position_z;
                    street_name.rotation.z = base_rotation;
                    street_name.position.z = base_position;
                } else {

                    let base_rotation =  street_name.userData.base_rotation_z;
                    let base_position =  street_name.userData.base_position_z;
                    street_name.rotation.z = base_rotation + Math.PI;
                    street_name.position.z = base_position + street_name.userData.add;

                }
                street_name.children[0].visible = false;
                street_name.children[1].visible = false;
            }
        });
    }
}