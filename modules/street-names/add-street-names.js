import * as THREE from '../../node_modules/three/build/three.module.js';
import { names_n_positions } from './names-n-positions.js';
export function add_street_names () {
    const body = document.querySelector('body');


    street_names_objs.forEach(item => {
       if (item.name === 'street') {
           scene.remove(item);
       }
    });
    street_names_objs = [];

    var fontloader = new THREE.FontLoader();
    fontloader.load( 'resources/font/almoni-nue.json', function ( font ) {
        if (names_n_positions.length > 0) {
            names_n_positions.forEach(function(street){

                var xMid, text;
                var color = 0xffffff;

                var matDark = new THREE.LineBasicMaterial( {
                    color: color,
                    side: THREE.DoubleSide
                });

                var matLite = new THREE.MeshBasicMaterial( {
                    color: color,
                    transparent: true,
                    opacity: 1,
                    side: THREE.DoubleSide
                } );

                // var message = "דרך מנחם בגין";
                let message;

                if (body.classList.contains('he')) {
                    message = street.name.he;
                    let message_array = message.split('');
                    message = '';
                    message_array.reverse().forEach(function(letter){
                        message += letter;
                    });
                } else {
                    message = street.name.en;
                }

                var shapes = font.generateShapes( message, 5 );
                var geometry = new THREE.ShapeBufferGeometry( shapes );
                geometry.computeBoundingBox();
                xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
                geometry.translate( xMid, 0, 0 );

                // make shape ( N.B. edge view not visible )

                text = new THREE.Mesh( geometry, matLite );
                // text.position.z = - 150;
                // text.rotation.x = Math.PI * 2 / 4;

                text.position.set(street.position[0], street.position[1], street.position[2]);
                text.rotation.set(street.rotation[0],  street.rotation[1],  street.rotation[2]);
                text.userData.base_rotation_z = street.rotation[2];
                text.userData.base_position_z = street.position[2];
                text.userData.add = street.add;
                text.name = 'street';


                // scene.add( text );
                street_names_objs.push(text);
                street_names_objs.forEach(item => scene.add( item ));

                setTimeout(function(){
                    name_fn (text);
                }, 1000);


               function name_fn (text) {
                   // let text = street_names_objs[0];

                   let line_point_2;
                   {
                       var geometry = new global_three.BoxBufferGeometry( 1, 1, 1 );
                       var material = new global_three.MeshBasicMaterial( {
                           color: 0xffff00,
                           //transparent: true,
                           //opacity : 0
                       } );
                       var mesh = new global_three.Mesh( geometry, material );
                       mesh.position.set(text.position.x , 0 , 0);
                       text.add( mesh );

                       line_point_2 = mesh.getWorldPosition(new global_three.Vector3());
                   }
                    {
                        var material = new global_three.LineBasicMaterial({
                            color: 0x0000ff
                        });

                        let point_1 = new global_three.Vector3( 0,5,0);
                        let point_2 = new global_three.Vector3(text.position.x, 5, text.position.z);
                        let point_3 = new global_three.Vector3(line_point_2.x, 5, line_point_2.z);

                        let side_a = point_1.distanceTo(point_3);
                        let side_b = point_3.distanceTo(point_2);
                        let side_c = point_2.distanceTo(point_1);
                        let side_number = (side_a * side_a + side_b * side_b - side_c * side_c) / (2 * side_a * side_b);
                        let radians = Math.acos(side_number);
                        // console.log( radians);
                        let new_side_b = side_a * Math.cos(radians);
                        let mesh_2 = mesh.clone();
                        mesh_2.name = 'angle_point';
                        mesh_2.position.x = mesh.position.x + new_side_b;
                        text.add( mesh_2 );



/*                        let new_line_point_3 = mesh_2.getWorldPosition(new global_three.Vector3());
                        let point_4 = new global_three.Vector3(new_line_point_3.x, 5, new_line_point_3.z);
                        var points = [];
                        points.push( point_1 );
                        points.push( point_4 );
                        points.push( point_3 );
                        points.push( point_1 );
                        var geometry = new global_three.BufferGeometry().setFromPoints( points );

                        var line = new global_three.Line( geometry, material );

                        scene.add( line );*/
                    }
                }
            });
        }
    });
}