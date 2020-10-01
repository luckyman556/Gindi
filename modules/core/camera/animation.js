import * as THREE from '../../../node_modules/three/build/three.module.js';
export function animateTo(position = null, rotation = null, zoom = null ,duration = 1000, easing = TWEEN.Easing.Linear.None, delay = 0) {
    let start = {};
    let target = {};
    if (position !== null) {
        start.position = {};
        if (position.x !== null) {
            start.position_x = window.camera_target.position.x;
            target.position_x = position.x;
        }
        if (position.y !== null) {
            start.position_y = window.camera_target.position.y;
            target.position_y = position.y;
        }
        if (position.z !== null) {
            start.position_z = window.camera_target.position.z;
            target.position_z = position.z;
        }
    }
    if (rotation !== null) {
        start.rotation = {};
        if (rotation.x !== null) {
            start.rotation_x = window.camera_target.children[0].rotation.x;
            target.rotation_x = rotation.x;
        }
        if (rotation.y !== null) {
            start.rotation_y = window.camera_target.rotation.y;
            target.rotation_y = rotation.y;
        }
        if (rotation.z !== null) {
            start.rotation_z = window.camera_target.children[0].rotation.z;
            target.rotation_z = rotation.z;
        }
    }
    if (zoom !== null) {
        start.zoom = perspectiveCamera.position.z;
        target.zoom = zoom;
    }


    let animation = new TWEEN.Tween(start).to(target, r_animate_duration);

    TWEEN.add(animation);
    animation.delay(delay);
    animation.onStart(function (e) {

    });
    animation.onUpdate(function (e) {
        if (position !== null) {
            if (position.x !== null) {
                window.camera_target.position.x = e.position_x;
            }
            if (position.y !== null) {
                window.camera_target.position.y = e.position_y;
            }
            if (position.z !== null) {
                window.camera_target.position.z = e.position_z;
            }
        }
        if (rotation !== null) {
/*            console.log(rotation)
            console.log(e)*/
            if (rotation.x !== null) {
                 window.camera_target.children[0].rotation.x = e.rotation_x;
                console.log(e.rotation_x)
            }
            if (rotation.y !== null) {
                window.camera_target.rotation.y = e.rotation_y;
                targetRotationX = e.rotation_y;
            }
            if (rotation.z !== null) {
                 window.camera_target.children[0].rotation.z = e.rotation_z;
            }
        }
        if (zoom !== null) {
            perspectiveCamera.position.z = e.zoom;
            target_zoom = e.zoom;
        }
    });
    animation.onComplete(function (e) {

    });
    animation.easing(easing);
    animation.start();
}
export function setAllDefaultWorldPositions (object) {
    if (object.children.length > 0) {
        setDefaultWorldPosition (object);
        object.children.forEach(function(child){
            setAllDefaultWorldPositions (child);
        });
    } else {
        setDefaultWorldPosition (object);
    }
}
export function setDefaultWorldPosition (object) {
    let worldPosition = object.getWorldPosition(new THREE.Vector3());
    object.userData.defaultWorldPosition = {
        x : worldPosition.x,
        y : worldPosition.y,
        z : worldPosition.z,
    };
}