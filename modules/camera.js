import * as THREE from '../node_modules/three/build/three.module.js';
export  function PerspectiveCamera_init (perspectiveCamera) {
    const fov = 50;
    const aspect = 1.99;  // the canvas default
    const near = 0.1;
    const far = 100000;
    perspectiveCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    return perspectiveCamera;

}
export function camera_keys (perspectiveCamera) {

}


