import * as THREE from '../../../node_modules/three/build/three.module.js';
import { cars_routes } from './cars_routes.js';

export function add_cars (texture_loader, loader) {
    loader.load('resources/cars/carpack.fbx', function (carPack) {
        const cars = [
            {
                name: 'CarSuv',
                position: {x: 0, y:1.2, z: 0},
                rotation: {x: 0, y:0, z: 0},
                scale: {x: 0.01, y:0.01, z: 0.01},
                map: 'resources/cars/lightmap/carsuv-opt.png',
                lightMap: 'resources/2020/04/white-lightmap.jpg',
                wheels: {
                    modelName: 'WS1',
                    amount: 4,
                    position: [
                        {x: 70.73445478694316, y: -72.24080427496177, z: 235.4089635738065},
                        {x: 80.417, y: -72.370, z: -66.834},
                        {x: -79.915, y: -74.475, z: 235.686},
                        {x: -75.132, y: -72.635, z: -67.148}
                    ],
                    rotation: [
                        {x: 0, y: 0, z: 0},
                        {x: 0, y: 0, z: 0},
                        {x: -1.5707962335901773, y: -1.7170703597857524e-7, z: -3.0742714551122785},
                        {x: -1.5707962335901773, y: -1.7170703597857524e-7, z: -3.0742714551122785},
                    ],
                },
                clone: 2
            },
            {
                name: 'CarWag',
                position: {x: 0, y:0.5, z: 0},
                rotation: {x: 0, y:0, z: 0},
                scale: {x: 0.01, y:0.01, z: 0.01},
                map: 'resources/cars/lightmap/carwag-opt.png',
                lightMap: 'resources/2020/04/white-lightmap.jpg',
                wheels: {
                    modelName: 'WW1',
                    amount: 4,
                    position: [
                        {x: 74.465, y: -17.588, z: 124.264},
                        {x: 74.465, y: -17.588, z: -186.864},
                        {x: -84.552, y: -17.588, z: -187.520},
                        {x: -84.552, y: -17.588, z: 127.596},
                    ],
                    rotation: [
                        {x: 0, y: 0, z: 0},
                        {x: 0, y: 0, z: 0},
                        {x: -1.5707962335901773, y: -1.7170703597857524e-7, z: -3.0742714551122785},
                        {x: -1.5707962335901773, y: -1.7170703597857524e-7, z: -3.0742714551122785},
                    ],
                },
                clone: 2
            },
            {
                name: 'CarTaxi',
                position: {x: 0, y:0.8, z: 0},
                rotation: {x: 0, y:0, z: 0},
                scale: {x: 0.01, y:0.01, z: 0.01},
                map: 'resources/cars/lightmap/cartaxi-opt.png',
                lightMap: 'resources/2020/04/white-lightmap.jpg',
                wheels: {
                    modelName: 'WT',
                    amount: 4,
                    position: [
                        {x: 79.396, y: -54.486, z: 166.733},
                        {x: 79.396, y: -54.486, z: -144.884},
                        {x: -83.431, y: -54.486, z: 169.675},
                        {x: -84.071, y: -54.486, z: -141.088},
                    ],
                    rotation: [
                        {x: 0, y: 0, z: 0},
                        {x: 0, y: 0, z: 0},
                        {x: -1.5707962335901773, y: -1.7170703597857524e-7, z: -3.0742714551122785},
                        {x: -1.5707962335901773, y: -1.7170703597857524e-7, z: -3.0742714551122785},
                    ],
                },
                clone: 2
            },
        ];
        const initialCarsRotation = [1.3004297965220035, 0.23, -3.1223535, -0.8641343586856935,  -1.823423, 1.723423425345, -0.8009263232562879, -2.88055875653077543, -1.3879574656306857];
        let allCars = constructNewCar(carPack, cars, texture_loader, 2);

        // add_new_route

        window.allCars = allCars;

        window.allCars = allCars;
        for (let i = 0; i < allCars.length; i++) {
            let animation_counter = 0;
            let car = allCars[i];
            let route = cars_routes[i];

            car.position.set(route[0].position.x, route[0].position.y, route[0].position.z);
            car.rotation.y = initialCarsRotation[i];

            car.userData.base_y_rotation = car.rotation.y;
            car.userData.base_position = car.rotation;

            scene.add(car);
            add_car_animation(car, route, animation_counter);
        }

    //Mesh handle options START
    //     let carClone = allCars[0].clone();
    //     let carRouteClone = cars_routes[8];
    //     carClone.position.set( carRouteClone[0].position.x, carRouteClone[0].position.y,  carRouteClone[0].position.z);
    //     carClone.rotation.y = initialCarsRotation[8];
    //     scene.add(carClone);
    //     window.carClone = carClone;
    //Mesh handle options END

    }, onProgressCallback, onErrorCallback);
}

function constructNewCar(carPack, cars, texture_loader) {
    let groupCarsArray = [];

    cars.forEach(car => {
        const groupCar = new THREE.Group();

        const carMesh = carPack.getObjectByName(car.name);
        carMesh.scale.set(car.scale.x, car.scale.y, car.scale.z);
        carMesh.position.set(car.position.x, car.position.y, car.position.z);
        carMesh.rotation.set(car.rotation.x, car.rotation.y, car.rotation.z);

        switch (car.name) {
            case 'CarTaxi': {
                carMesh.material[4].map = texture_loader.load(car.map);
                break;
            }
            case 'CarSuv': {
                carMesh.material[3].map = texture_loader.load(car.map);
                break;
            }
            case 'CarWag': {
                carMesh.material[5].map = texture_loader.load(car.map);
                break;
            }
            default: {
                break;
            }
        }
        carMesh.material.forEach(item => item.lightMap = texture_loader.load(car.lightMap));

        let wheel = carPack.getObjectByName(car.wheels.modelName);

        for (let i = 0; i < car.wheels.amount; i++) {
            let wheelClone = wheel.clone();
            wheelClone.position.set(car.wheels.position[i].x, car.wheels.position[i].y, car.wheels.position[i].z);
            wheelClone.rotation.set(car.wheels.rotation[i].x, car.wheels.rotation[i].y, car.wheels.rotation[i].z);
            carMesh.add(wheelClone);
        }

        groupCar.name = car.name;
        groupCar.add(carMesh);
        groupCarsArray.push(groupCar);

        if (car.clone > 0) {
            for (let i = 0; i < car.clone; i++) {
                let groupCarClone =  groupCar.clone();
                groupCarClone.name = 'clone' + i;
                window.groupCarClone = groupCarClone;
                groupCarsArray.push(groupCarClone);
            }
        }
    });

    return groupCarsArray;
}
function add_car_animation (mesh, carRoute, animation_counter) {
    let callback = (e) => {
        mesh.position.x = e.position_x;
        mesh.position.y = e.position_y;
        mesh.position.z = e.position_z;
    };

    let on_complete_callback = () => {
        animation_counter++;
        let car_animation_points_length =  carRoute.length;
        if (animation_counter === car_animation_points_length) {
            animation_counter = 0;
            add_car_animation_rotation (mesh, carRoute, animation_counter);
            add_car_animation (mesh, carRoute, animation_counter);
        } else {
            add_car_animation_rotation (mesh, carRoute, animation_counter);
            add_car_animation (mesh, carRoute, animation_counter);
        }
    };

    let start = { position_x : mesh.position.x , position_y :  mesh.position.y, position_z :  mesh.position.z };
    let target_position = carRoute[animation_counter]['position'];
    let target = { position_x : target_position.x , position_y :  target_position.y , position_z :  target_position.z };
    let current_point = mesh.position;
    let target_point = new THREE.Vector3(target_position.x, target_position.y, target_position.z );
    let distance_between = current_point.distanceTo(target_point);
    let duration = distance_between * (350 / 4.5);
    let easing = TWEEN.Easing.Linear.None;
    let delay = 0;
    let animation = new TWEEN.Tween(start).to(target, duration);

    TWEEN.add(animation);
    animation.delay(delay);
    animation.onUpdate(callback);
    animation.onComplete(on_complete_callback);
    animation.easing(easing);
    animation.start();
}
function add_car_animation_rotation (mesh, carRoute, animation_counter) {
    let base_rotation_angle = global_three.Math.radToDeg(mesh.rotation.y);
    let new_rotation_angle;
    let floor_rotation_amount;

    if (animation_counter === 0) {
        let rotations_amount = mesh.rotation.y / Math.PI * 2;

        if (rotations_amount > 1) {
            floor_rotation_amount = Math.floor(rotations_amount);
        }

        new_rotation_angle = mesh.userData.base_y_rotation;
        let new_mesh_rotation = mesh.rotation.y - 2 * Math.PI;
        mesh.rotation.y = new_mesh_rotation;
    } else {
        new_rotation_angle = global_three.Math.degToRad(base_rotation_angle - carRoute[animation_counter].angle_number);
    }
    let start = {rotation :  mesh.rotation.y};
    let target = {rotation : new_rotation_angle};
    let callback = (e) => {
        if (!Number.isNaN(e.rotation)) {
            mesh.rotation.y = e.rotation;
        }
    };
    let easing = TWEEN.Easing.Quadratic.InOut;
    let delay = 0;
    let current_point = mesh.position;
    let target_position  = carRoute[animation_counter]['position'];
    let target_point = new THREE.Vector3(target_position.x, target_position.y, target_position.z );
    let distance_between = current_point.distanceTo(target_point);
    let duration = distance_between * (350 / 6);
    let new_duration = duration - 20;
    if (new_duration < 0) {
        new_duration = 10;
    }
    let animation = new TWEEN.Tween(start).to(target, new_duration );
    TWEEN.add(animation);
    animation.delay(delay);
    animation.onUpdate(callback);
    // animation.onComplete(on_complete_callback);
    animation.easing(easing);
    animation.start();
}

