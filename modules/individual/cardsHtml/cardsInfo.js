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
            'dictionary' : 'area',
            'metrics' : 'm2',
            'addToDictionary' :  function () {
                return '<span class="language-string" data-dictionary="mHtml">' + get_lang('mHtml') + '</span>';
            }
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
            'crmName' : 'roomNum',
            'imgUrl' : './img/gindi-ic-rooms.svg',
            'dictionary' : 'rooms',
            'metrics' : 'm2',
            'callback' : function (data) {
                if (data == 0) {
                    return get_lang('Studio')
                } else {
                    return data;
                }
            },
            addClassCallback : function(data) {
                if (data == 0) {
                    return 'studio'
                } else {
                    return '';
                }
            }
        },
        {
            'crmName' : 'floorNum',
            'imgUrl' : './img/gindi-ic-floor.svg',
            'dictionary' : 'floor'
        },
        {
            'crmName' : 'totalSpace',
            'imgUrl' : './img/gindi-ic-area.svg',
            'dictionary' : 'area',
            /*            'callback' : function (data) {
                            return data +  ', ft<sup>2</sup>';
                        },*/
            'callback' : function (data) {
                if (c_lang () == 'he') {
                    return data +  ' מ"ר ';
                } else {
                    return data +  ' m<sup>2</sup>';
                }

            },
        },
        {
            'crmName' : 'facing',
            'imgUrl' : './img/ic_side.svg',
            'dictionary' : 'Exposure',
            'callback' : function (data) {
                let facing_translates = {
                    'צפון' :  'N',
                    'מערב' :  'W',
                    'מזרח' :  'E' ,
                    'דרום' : 'S',
                };
                let facing_string_array = data.split(',');
                let facing_string_en = '';
                let facing_string_he = '';
                facing_string_array.forEach(function(facing_item){
                    let sep = ', ';
                    if (facing_string_en.length == 0 || facing_string_he.length === 0) {
                        sep = '';
                    }
                    facing_string_en += sep + facing_translates[facing_item];
                    facing_string_he += sep + facing_translates[facing_item];
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
            'dictionary' : 'balcony size',
            //'addToDictionary' : ', ft<sup>2</sup>',
            'callback' : function (data) {
                if (c_lang () == 'he') {
                    return data +  ' מ"ר ';
                } else {
                    return data +  ' m<sup>2</sup>';
                }
            },
            //'addToDictionary' : ', ft<sup>2</sup>',
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