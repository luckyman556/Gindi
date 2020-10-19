import * as THREE from '../../../node_modules/three/build/three.module.js';
export function floor_numbers_visibility_by_zoom (border_1, border_2) {
    if (window.text_groups) {
        let camera_zoom = perspectiveCamera.position.z;
        let base = globalSettings.floorCylinderNumbers.desktop;
        if (detectMobile) {
            base = globalSettings.floorCylinderNumbers.mobile;
        }
        if (destroyedMode) {
            window.text_groups.forEach(function(text_group){
                text_group.visible = false;
            });
        } else {
            if (camera_zoom > base.max) {
                window.text_groups.forEach(function(text_group){
                    text_group.visible = false;
                });
            } else {

                if (camera_zoom > base.min) {
                    window.text_groups.forEach(function(text_group){
                        const key_floor = text_group.userData.key_floor;
                        if (key_floor) {
                            text_group.visible = true;
                        } else {
                            text_group.visible = false;
                        }
                    });
                } else {
                    window.text_groups.forEach(function(text_group){
                        text_group.visible = true;
                    });
                }
            }
        }

    }
}
export function animate_cylinder_floor_numbers (modifier = 0) {

    if (window.text_groups) {
        if (window.text_groups.length > 0) {
            let floor_numbers_type = get_url_param('floor_numbers_type');
            let target_text_rotation = 0;
            if (floor_numbers_type ) {
                if (floor_numbers_type == '1') {
                    let rotation = get_normilize_camera_rotation_x();

                    let mod = -0.1;
                    if (rotation < 1.3924 + mod) {
                        target_text_rotation = 2.099;
                    } else if (rotation < 1.3924 + Math.PI * 2 / 3 + mod) {
                        target_text_rotation = 2.099 + Math.PI * 2 / 3;
                    } else if (rotation < 1.3924 + Math.PI * 2 / 3 * 2 + mod) {
                        target_text_rotation = 2.099 + Math.PI * 2 / 3 * 2;
                    } else {
                        target_text_rotation = 2.099;
                    }
                } else {
                    target_text_rotation = window.camera_target.rotation.y + modifier;
                }
            } else {
                target_text_rotation = window.camera_target.rotation.y + modifier;
            };

            window.text_groups.forEach(function(text_group, i){
                text_group.rotation.y = target_text_rotation ;
                if (window.change_plan_animation) {
                    set_lines_on_destroyed_building();
                } else {
                    if (lock_mouse_rotation_x) {
                        if (!window.floor_add_animation) {
                            set_lines_on_destroyed_building();
                           // console.log(10);
                        }
                    } else {
                        set_lines_on_full_building ();
                    }
                }
                function set_lines_on_destroyed_building() {
                    if (i > current_floor) {
                        text_group.getObjectByName('line').visible = false;
                    } else {
                        text_group.getObjectByName('line').visible = true;
                    }
                }
                function set_lines_on_full_building () {
                    text_group.getObjectByName('line').visible = true;
                }
                if (lock_mouse_rotation_x) {
                   if (current_floor == i) {
                        text_group.children[0].visible = false;
                        text_group.getObjectByName('bold_text').visible = true;
                        text_group.getObjectByName('circle').visible = true;
                    } else {
                        text_group.children[0].visible = true;
                        text_group.getObjectByName('bold_text').visible = false;
                        text_group.getObjectByName('circle').visible = false;
                    }
                    text_group.visible = false;
                } else {
                    text_group.children[0].visible = true;
                    text_group.getObjectByName('bold_text').visible = false;
                    text_group.getObjectByName('circle').visible = false;
                }
            });
        }
    }
}
export function add_cylinder_floor_numbers () {
    var fontloader = new THREE.FontLoader();
    fontloader.load( 'resources/font/almoni-nue.json', function ( font ) {
        fontloader.load( 'resources/font/almoni-nue-bold.json', function ( font_bold ) {
            if (window.floor_obj.length > 0) {
                window.text_groups = [] ;
                window.floor_obj.forEach(function(floor , i){
                        let key_floor = false;
                        if (floor[0].userData.crm_data.floorNum  % 10) {
                            key_floor = false;
                        } else {
                            key_floor = true;
                        }
                        var xMid, text, xmid_bold, bold_text;

                        var color = 0x1a2f43;

                        var matLite = new THREE.MeshBasicMaterial( {
                            color: color,
                            transparent: true,
                            opacity: 1,
                            side: THREE.DoubleSide
                        } );

                        var message = new String(floor[0].userData.crm_data.floorNum).toString();

                        let size;
                        if (key_floor) {
                            size = 3;
                        } else {
                            size = 1.5;
                        }
                        var shapes = font.generateShapes( message, size );

                        var geometry = new THREE.ShapeBufferGeometry( shapes );
                        geometry.computeBoundingBox();



                        xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

                        geometry.translate( xMid, 0, 0 );

                        // make shape ( N.B. edge view not visible )

                        var bold_shapes = font_bold.generateShapes( message, size );
                        var bold_geometry = new THREE.ShapeBufferGeometry( bold_shapes );
                        bold_geometry.computeBoundingBox();
                        xmid_bold = - 0.5 * ( bold_geometry.boundingBox.max.x - bold_geometry.boundingBox.min.x );
                        bold_geometry.translate( xmid_bold, 0, 0 );

                        text = new THREE.Mesh( geometry, matLite );
                        text.position.set(0, 0, -1 * (globalSettings.cylinderNumbersBase + 5));
                        text.position.y = Math.PI;
                        text.name = 'text';
                        text.renderOrder =  12;

                        bold_text = new THREE.Mesh( bold_geometry, matLite );
                        bold_text.position.set(0, 0, -1 * (globalSettings.cylinderNumbersBase + 5));
                        bold_text.position.y = Math.PI;
                        bold_text.name = 'bold_text';
                        bold_text.renderOrder =  12;



                        let text_group = new THREE.Group();
                        text_group.name = 'text_group';
                        let floor_center = floor[0].parent.getObjectByName( "floor_center");
                        if (floor_center) {
                            let floor_position = floor_center.getWorldPosition(new THREE.Vector3());
                            text_group.position.set(0, floor_position.y, 0);
                            text_group.add(text);
                            text_group.add(bold_text);
                            scene.add( text_group );
                            window.text_groups.push(text_group);
                        }
                        {
                            var material = new THREE.LineBasicMaterial({
                                color: 0x1a2f43
                            });
                            let second_point = -1 * (globalSettings.cylinderNumbersBase + 2);
                            if (!key_floor) {
                                second_point = -1 * (globalSettings.cylinderNumbersBase + 3);
                            }
                            var points = [];
                            points.push( new THREE.Vector3( 0,  1.5, 0 ) );
                            points.push( new THREE.Vector3( 0,   1.5, second_point ) );

                            var geometry = new THREE.BufferGeometry().setFromPoints( points );

                            var line = new THREE.Line( geometry, material );
                            line.name = 'line';
                            text_group.add( line );
                            line.renderOrder =  12;
                        }



                        text_group.userData.key_floor = key_floor;
                        text_group.userData.floor_i = i;
                        text_group.children[0].rotation.y = Math.PI / 2 * -1;
                        text_group.children[0].position.y = 1.5 + (size / 2) * -1;
                        if (text_group.userData.key_floor) {
                            text_group.children[0].position.y = 0;
                        }


                        bold_text.rotation.y = Math.PI / 2 * -1;
                        bold_text.position.y = 1.5 + (size / 2) * -1;
                        if (text_group.userData.key_floor) {
                            bold_text.position.y = 0;
                        }
                        bold_text.renderOrder = 0;
                        bold_text.visible = false;
                        {
                            var geometry = new THREE.PlaneGeometry( message.length * size , size * 1.3  );
                            var material = new THREE.MeshBasicMaterial( {
                                color: 0xffff00,
                                side: THREE.DoubleSide,
                                depthWrite : false,
                                transparent : true,
                                opacity : 0
                            } );
                            var plane = new THREE.Mesh( geometry, material );
                            plane.name = 'text';
                            plane.position.set(0.2, 0, -1 * (globalSettings.cylinderNumbersBase + 5));
                            plane.rotation.y = Math.PI / 2 * -1;
                            if (text_group.userData.key_floor) {
                                plane.position.y =  (size / 2) ;
                            } else {
                                plane.position.y =  size  ;
                            }

                            text_group.add( plane );

                            var geometry = new THREE.CircleGeometry( size, 32 );
                            var material = new THREE.MeshBasicMaterial( {
                                color: 0xc1ac87,
                                side: THREE.DoubleSide,
                            } );
                            var circle = new THREE.Mesh( geometry, material );
                            circle.position.set(0.2, 0, -1 * (globalSettings.cylinderNumbersBase + 5));
                            circle.rotation.y = Math.PI / 2 * -1;
                            circle.name = 'circle';
                            if (text_group.userData.key_floor) {
                                circle.position.y =  (size / 2)  - ((size / 2) * 0.1);
                            } else {
                                circle.position.y =  size  - (size * 0.1);
                            }
                            circle.renderOrder = 0;
                            text_group.add( circle );
                            circle.renderOrder =  12;

                        }

                });
            }
        } , onProgressCallback , onErrorCallback);
    } , onProgressCallback , onErrorCallback);
}