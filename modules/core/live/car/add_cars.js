import * as THREE from '../../../../node_modules/three/build/three.module.js';
import { cars_routes } from '../../../individual/live/car/cars_routes.js';
import {carsSettings} from '../../../individual/live/car/carsSettings.js';
import { live_element_animation } from '../rotation.js';

let allCars = [];

export function add_cars (texture_loader, loader, action) {
    loader.load('resources/cars/carpack.fbx', function (carPack) {

        const cars = carsSettings;
        // add_new_route

        window.allCars = allCars;

        if (action === 'add' && allCars.length === 0) {
            allCars = constructNewCar(carPack, cars, texture_loader, 2);
            let carNumber = 0;
            for (let i = 0; i < cars_routes.length; i++) {
                let animation_counter = 0;
                if (carNumber ===  allCars.length) {
                    carNumber = 0;
                }
                console.log(allCars);
                if (allCars[carNumber]) {
                    let car = allCars[carNumber].clone();
                   // car.children[0].castShadow = true;
                    console.log(carNumber);
                    car.name = 'routeCar' + i;
                    let route = cars_routes[i];

                    car.position.set(route[0].position.x, route[0].position.y, route[0].position.z);
                    // car.rotation.y = initialCarsRotation[i];

                    car.userData.base_y_rotation = car.rotation.y;
                    car.userData.base_position = car.rotation;

                    scene.add(car);
                    live_element_animation(car,route,animation_counter,globalSettings.live.cars.speed,2);
                }
                carNumber++;
            }
        } else if (action === 'remove') {
            for (let i = 0; i < cars_routes.length; i++) {
                let car_name = 'routeCar' + i;
                let removeCar = scene.getObjectByName(car_name);
                if (removeCar) {
                    removeCar.visible = false;
                    scene.remove(removeCar);
                }
            };
            allCars = [];
        }

    //Mesh handle options START
    //     let carClone = allCars[0];
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
        //if (!detectMobile) {
            carMesh.castShadow = true;
        //}
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
    let speedBase = 30;
    let second_point_count = animation_counter + 2;
    if (second_point_count >= carRoute.length) {
        second_point_count = 0;
    }
    let second_point = carRoute[second_point_count].position;
    let nextCubePositionPointCount = animation_counter + 1;
    if (nextCubePositionPointCount == carRoute.length) {
        nextCubePositionPointCount = 0;
    }
    let nextCubePositionPoint  = carRoute[nextCubePositionPointCount].position;

    let nextCubePosition = new THREE.Vector3(nextCubePositionPoint.x, nextCubePositionPoint.y, nextCubePositionPoint.z);
    let newVector = new THREE.Vector3(second_point.x, second_point.y, second_point.z);
    mesh.updateWorldMatrix(true);
    let localNewVectorPosition = mesh.worldToLocal(newVector);

    let leftPosition = new THREE.Vector3( 20, 0, 0);
    let rightPosition = new THREE.Vector3( -20, 0, 0);
    let frontPosition = new THREE.Vector3(0, 0, 50);

    {
        if (get_url_param('dev') === 'true') {


            var geometry = new THREE.BoxGeometry( 2,2, 2);
            if (!mesh.getObjectByName('leftCube')) {
                var leftMaterial = new THREE.MeshBasicMaterial( {color: 'blue'} );
                var leftCube = new THREE.Mesh( geometry, leftMaterial );
                leftCube.position.set(leftPosition.x , leftPosition.y , leftPosition.z);
                leftCube.name = 'leftCube';
                mesh.add(leftCube);
            }

            if (!mesh.getObjectByName('rightCube')) {
                var rightMaterial = new THREE.MeshBasicMaterial( {color: 'red'} );
                var rightCube = new THREE.Mesh( geometry, rightMaterial );
                rightCube.position.set(rightPosition.x , rightPosition.y , rightPosition.z);
                rightCube.name = 'rightCube';
                mesh.add(rightCube);
            }
            if (!mesh.getObjectByName('frontCube')) {
                var frontMaterial = new THREE.MeshBasicMaterial( {color: 'green'} );
                var frontCube = new THREE.Mesh( geometry, frontMaterial );
                frontCube.position.set(frontPosition.x , frontPosition.y , frontPosition.z);
                frontCube.name = 'frontCube';
                mesh.add(frontCube);
            }
            let nextCubeName = mesh.name + 'NextCube';
            if (!scene.getObjectByName(nextCubeName)) {
                var nextCubeMaterial = new THREE.MeshBasicMaterial( {color: 'yellow'} );
                var nextCube = new THREE.Mesh( geometry, nextCubeMaterial );
                nextCube.position.set(nextCubePosition.x , nextCubePosition.y , nextCubePosition.z);
                nextCube.name = mesh.name + 'NextCube';
                scene.add(nextCube);
            } else {
                scene.getObjectByName(nextCubeName).position.set(nextCubePosition.x , nextCubePosition.y , nextCubePosition.z);
            }
        }
    }



    let angleBetween = frontPosition.angleTo(newVector);
    let distanceToLeft = leftPosition.distanceTo(localNewVectorPosition);
    let distanceToRight = rightPosition.distanceTo(localNewVectorPosition);

    let currentRotation = mesh.rotation.y;
    let targetRotation;
    if (distanceToLeft < distanceToRight) {
        targetRotation = currentRotation + angleBetween;
    } else {
        targetRotation = currentRotation - angleBetween;
    }


  //  mesh.rotation.y = targetRotation;


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
            add_car_animation_rotation (mesh, targetRotation, durationToRotation);
            add_car_animation (mesh, carRoute, animation_counter);
        } else {
            add_car_animation_rotation (mesh, targetRotation, durationToRotation);
            add_car_animation (mesh, carRoute, animation_counter);
        }
    };

    let start = { position_x : mesh.position.x , position_y :  mesh.position.y, position_z :  mesh.position.z };
    let target_position = carRoute[animation_counter]['position'];
    let target = { position_x : target_position.x , position_y :  target_position.y , position_z :  target_position.z };
    let current_point = mesh.position;
    let target_point = new THREE.Vector3(target_position.x, target_position.y, target_position.z );
    let distance_between = current_point.distanceTo(target_point);
    let duration = distance_between * (350 / speedBase);
    let durationToRotation;
    {
        let target_position = carRoute[second_point_count]['position'];
        let current_point = carRoute[animation_counter]['position'];
        current_point = new THREE.Vector3(current_point.x, current_point.y, current_point.z);
        let target_point = new THREE.Vector3(target_position.x, target_position.y, target_position.z );
        let distance_between = current_point.distanceTo(target_point);
        durationToRotation = distance_between * (350 / (speedBase * 0.95));
        if (durationToRotation > 500) {
            durationToRotation = 500;
        }
    }
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
function add_car_animation_rotation (mesh,targetRotation, duration) {

    let start = {rotation :  mesh.rotation.y};
    let target = {rotation : targetRotation};
    let callback = (e) => {
        mesh.rotation.y = e.rotation;
    };
    let easing = TWEEN.Easing.Sinusoidal.InOut;
    let delay = 0;

    let animation = new TWEEN.Tween(start).to(target, duration );
    TWEEN.add(animation);
    animation.delay(delay);
    animation.onUpdate(callback);
    // animation.onComplete(on_complete_callback);
    animation.easing(easing);
    animation.start();
}