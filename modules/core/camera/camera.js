import * as THREE from '../../../node_modules/three/build/three.module.js';
export  function PerspectiveCamera_init (perspectiveCamera) {
    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;

    let far = (get_url_param('dev')) ? 10000 : 10000;
    perspectiveCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    return perspectiveCamera;
}


