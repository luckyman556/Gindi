import * as THREE from '../node_modules/three/build/three.module.js';
export  function PerspectiveCamera_init (perspectiveCamera) {
    const fov = 45;
    // const aspect = 1.99;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 10000;
    perspectiveCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    return perspectiveCamera;

}


