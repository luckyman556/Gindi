import { GUI } from '../../../node_modules/three/examples/jsm/libs/dat.gui.module.js';

export function settingsGui () {
    if (get_url_param('settingsGui') === 'true') {
            let gui = new GUI();
            var params = {
                destroyedBuildingCameraZoom : globalSettings.destroyedBuilding.cameraPosition.zoom
            };
            var folder = gui.addFolder('Destroyed Building Camera position');
            folder.add( params, 'destroyedBuildingCameraZoom', 10, 300 ).step( 1 ).onChange( function () {
                globalSettings.destroyedBuilding.cameraPosition.zoom  = params.destroyedBuildingCameraZoom;
            } );
/*            folder.add( params, 'easings', Object.keys( easings ) ).onChange( function () {
                r_animation_type = easings[params.easings];
            } );
            folder.add( params, 'duration', 500, 5000 ).step( 100 ).onChange( function () {
                r_animate_duration = params.duration;
            } );
            folder.add( params, 'Зависимость от растояния').onChange( function () {
                r_angle_mod = params['Зависимость от растояния'];
            } );
            folder.add( params, 'Коефициент зависимости от растояния' , 0.1, 2 ).step( 0.1).onChange( function () {
                r_angle_mod_coef = params['Коефициент зависимости от растояния'];
            } );*/

            //folder.open();
            document.querySelector('.dg.ac').classList.add('non-canvas');
    }
}