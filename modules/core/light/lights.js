import * as THREE from '../../../node_modules/three/build/three.module.js';

export const directionlight = () => {
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.7);
    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.2);
    // scene.add( ambientLight );

    if (window.innerWidth < 450) {
        directionalLight.castShadow = false;
    } else {
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1048;
        directionalLight.shadow.mapSize.height = 1048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 2000;
        directionalLight.shadow.radius = 4;
        directionalLight.shadow.bias = -0.0001;

        directionalLight.shadow.camera.right = 17 * 50;
        directionalLight.shadow.camera.left = - 17 * 50;
        directionalLight.shadow.camera.top	= 17 * 35;
        directionalLight.shadow.camera.bottom = - 17 * 35;
    }

    directionalLight.position.set( 300,  1000, -600 );

    directionalLight.name = 'Dir. Light';
    // scene.add( directionalLight );
    const light_group = new THREE.Group();
    light_group.position.set(466.01209820057795, 310.67137729250555, -363.78740915604055);
    light_group.add( directionalLight );
    light_group.add( ambientLight );
    light_group.name = 'light_group';
    // window.light_group = light_group
    scene.add(light_group);

    if (get_url_param('dev')) {
        const helper = new THREE.CameraHelper( directionalLight.shadow.camera );
        scene.add( helper );
    }
}