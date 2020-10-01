export const cardsInfoSettings = {
    UnitCardOptions : [
        {
            'crmName' : 'modelName',
            'imgUrl' : './img/gindi-ic-type.svg',
            'dictionary' : 'apt. type'
        },
        {
            'crmName' : 'floorNum',
            'imgUrl' : './img/gindi-ic-floor.svg',
            'dictionary' : 'floor'
        },
        {
            'crmName' : 'totalSpace',
            'imgUrl' : './img/gindi-ic-area.svg',
            'dictionary' : 'area'
        },
        {
            'crmName' : 'roomNum',
            'imgUrl' : './img/gindi-ic-rooms.svg',
            'dictionary' : 'rooms'
        },
    ],
    PopupCardOptions : [
        {
            'crmName' : 'modelName',
            'imgUrl' : './img/gindi-ic-type.svg',
            'dictionary' : 'apt. type'
        },
        {
            'crmName' : 'floorNum',
            'imgUrl' : './img/gindi-ic-floor.svg',
            'dictionary' : 'floor'
        },
        {
            'crmName' : 'totalSpace',
            'imgUrl' : './img/gindi-ic-area.svg',
            'dictionary' : 'area'
        },
        {
            'crmName' : 'facing',
            'imgUrl' : './img/ic_side.svg',
            'dictionary' : 'balcony size',
            'callback' : function (data) {
                let facing_translates =  globalSettings.exposure.dictionary;
                let facing_string_array = data.split(',');
                let facing_string_en = '';
                let facing_string_he = '';
                facing_string_array.forEach(function(facing_item){
                    let sep = ', ';
                    if (facing_string_en.length == 0 || facing_string_he.length === 0) {
                        sep = '';
                    }
                    facing_string_en += sep + facing_translates[facing_item];
                    facing_string_he += sep + facing_item;
                    // console.log(facing_string_);
                });
                let lang = document.querySelector('html').getAttribute('lang');
                if (lang == 'he') {
                    return facing_string_he;
                } else {
                    return facing_string_en;
                }
            }
        },
        {
            'crmName' : 'balconySize',
            'imgUrl' : './img/balcony-ic.svg',
            'dictionary' : 'exposure',
            'boolCallback' : function (data) {
                if (data > 0) {
                    return true;
                } else {
                    return false;
                }
            }
        },
    ]
}