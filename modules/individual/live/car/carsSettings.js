let scale = globalSettings.live.cars.scale;
export const carsSettings = [
    {
        name: 'CarSuv',
        position: {x: 0, y: 1.2, z: 0},
        rotation: {x: 0, y:0, z: 0},
        scale: {x: scale, y:scale, z: scale},
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
        clone: 0
    },
    {
        name: 'CarWag',
        position: {x: 0, y:0.5, z: 0},
        rotation: {x: 0, y:0, z: 0},
        scale: {x: scale, y:scale, z: scale},
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
        clone: 0
    },
    {
        name: 'CarTaxi',
        position: {x: 0, y:0.8, z: 0},
        rotation: {x: 0, y:0, z: 0},
        scale: {x: scale, y:scale, z: scale},
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
        clone: 0
    },
];