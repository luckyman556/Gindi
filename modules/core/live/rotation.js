import * as THREE from '../../../node_modules/three/build/three.module.js';

export function live_element_animation (mesh, route, animation_counter,speed,secondCount) {
  let speedBase = speed;
  let second_point_count = animation_counter + secondCount;
  if (second_point_count >= route.length) {
    second_point_count = 0;
  }
  let second_point = route[second_point_count].position;
  let nextCubePositionPointCount = animation_counter + 1;
  if (nextCubePositionPointCount == route.length) {
    nextCubePositionPointCount = 0;
  }
  let nextCubePositionPoint  = route[nextCubePositionPointCount].position;

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
    let live_element_animation_points_length =  route.length;
    if (animation_counter === live_element_animation_points_length) {
      animation_counter = 0;
      live_element_animation_rotation (mesh, targetRotation, durationToRotation);
      live_element_animation (mesh, route, animation_counter,speed,secondCount);
    } else {
      live_element_animation_rotation (mesh, targetRotation, durationToRotation);
      live_element_animation (mesh, route, animation_counter,speed,secondCount);
    }
  };

  let start = { position_x : mesh.position.x , position_y :  mesh.position.y, position_z :  mesh.position.z };
  let target_position = route[animation_counter]['position'];
  let target = { position_x : target_position.x , position_y :  target_position.y , position_z :  target_position.z };
  let current_point = mesh.position;
  let target_point = new THREE.Vector3(target_position.x, target_position.y, target_position.z );
  let distance_between = current_point.distanceTo(target_point);
  let duration = distance_between * (350 / speedBase);
  let durationToRotation;
  {
    let target_position = route[second_point_count]['position'];
    let current_point = route[animation_counter]['position'];
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

// function live_element_animation_rotation (mesh,targetRotation, duration) {
//   let start = {rotation :  mesh.rotation.y};
//   let target = {rotation : targetRotation};
//   let callback = (e) => {
//     mesh.rotation.y = e.rotation;
//   };
//   let easing = TWEEN.Easing.Sinusoidal.InOut;
//   let delay = 0;
//
//   let animation = new TWEEN.Tween(start).to(target, duration );
//   TWEEN.add(animation);
//   animation.delay(delay);
//   animation.onUpdate(callback);
//   // animation.onComplete(on_complete_callback);
//   animation.easing(easing);
//   animation.start();
// }

function live_element_animation_rotation (mesh,targetRotation, duration) {
  let start = {rotation :  mesh.rotation.y};
  let target = {rotation : targetRotation};
  let diff = Math.abs(start.rotation - target.rotation);
  if (diff > Math.PI) {
    if (start.rotation < target.rotation) {
      start.rotation  += Math.PI * 2;
    } else {
      target.rotation += Math.PI * 2;
    }
  };
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