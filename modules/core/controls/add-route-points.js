export function add_route_points () {
    window.addEventListener( 'keydown', function ( event ) {
        if (event.ctrlKey) {
            if (event.altKey) {
                event.code;
                switch ( event.code ) {
                    case 'KeyP':  //  P
                        if (add_points_mode ) {
                            add_points_mode = false;
                            add_car_points_mode = false;
                            lock_autorotate = true;
                            getArrayPointsForRoute();
                            console.log('Режим добавления точек выключен');
                        } else {
                            add_points_mode = true;
                            add_car_points_mode = false;
                            lock_autorotate = false;
                            console.log('Режим добавления точек включен');
                        }
                        break;
                    case 'KeyC' : // CTRL + ALT + C
                        if (add_car_points_mode ) {
                            add_points_mode = false;
                            add_car_points_mode = false;
                            lock_autorotate = true;
                            getArrayPointsForRoute();
                            console.log('Режим добавления точек с плавным поворотом выключен');
                        } else {
                            add_car_points_mode = true;
                            add_points_mode = true;
                            lock_autorotate = false;
                            console.log('Режим добавления точекс плавным поворотом  включен');
                        }
                    break;
                }
            }
            if (event.code === 'KeyZ') {
                if (human_route.length > 0) {
                    human_route.pop();
                    car_route_points_groups.pop();
                    if (scene.children[scene.children.length - 1].name === 'CubePoint') {
                        console.log('Delete last point');
                        scene.children.pop();
                    }
                }
                if (add_car_points_mode) {
                    if (car_route_points_groups.length > 0) {
                        const i = car_route_points_groups.length - 1;
                        const group = car_route_points_groups[i];
                        scene.remove(group);
                        car_route_points_groups.splice(-1,1)
                    }
                    if (car_route_lines.length > 0) {
                        const i = car_route_lines.length - 1;
                        const line = car_route_lines[i];
                        scene.remove(line);
                        car_route_lines.splice(-1,1)
                    }
                }
            }
        }
    });
    document.getElementById('c').addEventListener('mousedown', mouse_down_in_points_mode);

    function  mouse_down_in_points_mode (event) {
        if (add_points_mode === true) {
            if (add_car_points_mode) {
                let mouse = new global_three.Vector2();
                let  x, y;
                x  = event.clientX;
                y = event.clientY;
                mouse.x = ( (x - $('#c').offset().left) / document.querySelector('#c').offsetWidth ) * 2 - 1;
                mouse.y = - ( (y - $('#c')[0].getBoundingClientRect().top) / document.querySelector('#c').offsetHeight ) * 2 + 1;
                let raycaster = new global_three.Raycaster();
                raycaster.setFromCamera(mouse, perspectiveCamera);
                let intersect_objects = raycaster.intersectObjects(scene.children, true);
                if (intersect_objects.length > 0) {
                    let clicked_object = intersect_objects[0];
                    let clicked_point = clicked_object.point;
                    let geometry = new global_three.BoxGeometry( 1, 1, 1 );
                    let material = new global_three.MeshBasicMaterial( {color: 0x00ff00} );
                    let cube = new global_three.Mesh( geometry, material );
                    cube.name = 'CubePoint';
                    cube.position.set(0,0,0);
                    let face_cube = cube.clone();
                    face_cube.position.set(0,0, 5);
                    face_cube.name = 'face_cube';

                    let left_cube = cube.clone();
                    left_cube.position.set(5,0, 0);
                    left_cube.name = 'left_cube';

                    let right_cube = cube.clone();
                    right_cube.position.set(-5,0, 0);
                    right_cube.name = 'right_cube';
                    let points_group = new global_three.Group();
                    points_group.position.set(clicked_point.x, clicked_point.y, clicked_point.z);
                    points_group.add( cube );
                    points_group.add( face_cube );
                    points_group.add( left_cube );
                    points_group.add( right_cube );
                    scene.add( points_group );
                    points_group.lookAt(new global_three.Vector3(0,0,0));
                    car_route_points_groups.push(points_group);
                    // let my_car = window.allCars[0].clone();
                    let my_car = scene.children[scene.children.length-1].clone();
                    my_car.position.set(0,0,0);
                    my_car.rotation.y = 3.2;
                    points_group.add(my_car);
                    if (car_route_points_groups.length > 1) {
                        const i = car_route_points_groups.length - 2;
                        let start =  car_route_points_groups[i].position;
                        let finish =  car_route_points_groups[i + 1].position;
                        car_route_points_groups[i].lookAt(finish);
                        let material = new global_three.LineBasicMaterial({
                            color: 0x0000ff
                        });

                        let points = [];
                        points.push( start);
                        points.push( finish);

                        let geometry = new global_three.BufferGeometry().setFromPoints( points );

                        let line = new global_three.Line( geometry, material );
                        car_route_lines.push(line);

                        scene.add( line );
                        if (car_route_points_groups.length > 2) {
                            const side_a = car_route_points_groups[car_route_points_groups.length - 3].position;
                            const side_b = car_route_points_groups[car_route_points_groups.length - 2].position;
                            const side_c = car_route_points_groups[car_route_points_groups.length - 1].position;
                            const distance_a = new global_three.Vector3(side_a.x, 0, side_a.z).distanceTo(new global_three.Vector3(side_b.x, 0, side_b.z));
                            const distance_b = new global_three.Vector3(side_b.x, 0, side_b.z).distanceTo(new global_three.Vector3(side_c.x, 0, side_c.z));
                            const distance_c = new global_three.Vector3(side_c.x, 0, side_c.z).distanceTo(new global_three.Vector3(side_a.x, 0, side_a.z));
                            const angle = global_three.Math.radToDeg( Math.acos((distance_a * distance_a + distance_b * distance_b - distance_c * distance_c) / (2 * distance_a * distance_b))) ;
                            let left_cube = car_route_points_groups[car_route_points_groups.length - 3].getObjectByName('left_cube');
                            let right_cube = car_route_points_groups[car_route_points_groups.length - 3].getObjectByName('right_cube');
                            const left_cube_position = left_cube.getWorldPosition(new global_three.Vector3());
                            const right_cube_position = right_cube.getWorldPosition(new global_three.Vector3());
                            const distance_to_left_cube = new global_three.Vector3(left_cube_position.x, 0, left_cube_position.z).distanceTo(new global_three.Vector3(side_c.x, 0, side_c.z));
                            const distance_to_right_cube = new global_three.Vector3(right_cube_position.x, 0, right_cube_position.z).distanceTo(new global_three.Vector3(side_c.x, 0, side_c.z));
                            let angle_number = (180 - angle);

                            if (distance_to_left_cube !== distance_to_right_cube) {

                                if (distance_to_left_cube != distance_to_right_cube) {
                                    if (distance_to_left_cube < distance_to_right_cube) {
                                        console.log('negative angle');
                                        angle_number = angle_number * -1;
                                    } else {
                                        console.log('positive angle');
                                    }
                                }
                                car_route_points_groups[car_route_points_groups.length - 2].userData.angle_number = angle_number;
                            }
                        }
                    }
                }

            } else {
                let mouse = new global_three.Vector2();
                let  x, y;
                x  = event.clientX;
                y = event.clientY;
                mouse.x = ( (x - $('#c').offset().left) / document.querySelector('#c').offsetWidth ) * 2 - 1;
                mouse.y = - ( (y - $('#c')[0].getBoundingClientRect().top) / document.querySelector('#c').offsetHeight ) * 2 + 1;
                let raycaster = new global_three.Raycaster();
                raycaster.setFromCamera(mouse, perspectiveCamera);
                let intersect_objects = raycaster.intersectObjects(scene.children, true);
                if (intersect_objects.length > 0) {
                    let clicked_object = intersect_objects[0];
                    let clicked_point = clicked_object.point;
                    let geometry = new global_three.BoxGeometry( 1, 1, 1 );
                    let material = new global_three.MeshBasicMaterial( {color: 0x00ff00} );
                    let cube = new global_three.Mesh( geometry, material );
                    cube.position.set(clicked_point.x, clicked_point.y, clicked_point.z);
                    cube.name = 'CubePoint';
                    scene.add( cube );
                    let route_object = {
                        'position' : clicked_point,
                    };
                    console.log(route_object);
                    human_route.push(route_object);

                    if (human_route.length > 1) {
                        let position_point = human_route[human_route.length - 2].position;
                        window.human.position.set(position_point.x , position_point.y , position_point.z);
                        window.human.lookAt( human_route[human_route.length - 1].position );
                        setTimeout(function(){
                            let rotation = window.human.rotation;
                            human_route[human_route.length - 1].rotation = {};
                            human_route[human_route.length - 1].rotation.x = rotation['_x'];
                            human_route[human_route.length - 1].rotation.y = rotation['_y'];
                            human_route[human_route.length - 1].rotation.z = rotation['_z'];
                        },200);
                    }
                }
            }
        }
    }
}

function getArrayPointsForRoute() {
    car_route_points_array = [];
    car_route_points_groups.forEach(pointRoute => {
        car_route_points_array.push({
            "position": {
                x: pointRoute.position.x,
                y: pointRoute.position.y,
                z: pointRoute.position.z,
            },
            "angle_number": (!pointRoute.userData.angle_number) ? 0 :  pointRoute.userData.angle_number
        });
    });
    localStorage.setItem('routeC', JSON.stringify(car_route_points_array));
    localStorage.setItem('routeP', JSON.stringify(human_route));
    console.log(car_route_points_array);
    console.log(human_route);
}