export let  filterSettings = {
    search_fields : [
        {
            crm_name: 'floorNum',
        },
        {
            crm_name: 'modelName',
        },
        {
            crm_name: 'propNum',
        },
        {
            crm_name: 'roomNum',
        },
    ],
    filter_controls : [
        {
            crm_name : 'salePrice',
            filter_type  : 'range',
            options : {
                max_text_class : 'nmf-max-text',
                min_text_class : 'nmf-min-text',
                price_symbol : globalSettings.currency.symbol,
                min_btn_class : 'nmf-min',
                max_btn_class : 'nmf-max',
                title : 'budget',
                ic_name : 'budget-ic.svg',
                number_with_comas : true
            }
        },
        {
            crm_name : 'floorNum',
            filter_type  : 'range',
            options : {
                max_text_class : 'nmf-max-text',
                min_text_class : 'nmf-min-text',
                price_symbol : '',
                min_btn_class : 'nmf-min',
                max_btn_class : 'nmf-max',
                title : 'Floor number',
                ic_name : 'floor-ic.svg',
            }
        },
        {
            crm_name : 'roomNum',
            filter_type  : 'togglers',
            options : {
                title : 'rooms',
                ic_name : 'bedroom-ic.svg',
                with_sep : false,
                sep : ',',
                dictionary : null,
            }
        },
        {
            crm_name : 'facing',
            filter_type  : 'togglers',
            options : {
                title : 'Exposure',
                ic_name : 'exposure-ic.svg',
                with_sep : true,
                sep : ',',
                dictionary : globalSettings.exposure.dictionary
            }
        },

        {
            crm_name : 'totalSpace',
            filter_type  : 'range',
            options : {
                max_text_class : 'nmf-max-text',
                min_text_class : 'nmf-min-text',
                price_symbol : '',
                min_btn_class : 'nmf-min',
                max_btn_class : 'nmf-max',
                title : 'Area',
                ic_name : 'area-ic.svg',
            }
        },
        /*        {
                   crm_name : 'modelName',
                   filter_type  : 'togglers',
                   options : {
                        title : 'Flat type',
                        ic_name : 'exposure-ic.svg',
                        with_sep : false,
                        sep : ','
                   }
                },*/
        {
            crm_name : 'status',
            filter_type  : 'radio',
            options : {
                title : 'Available only',
                default : true,
                callback : function (value) {
                    if (value === 'Available') {
                        return true;
                    }
                    if (value === 'Sold') {
                        return false;
                    }
                    if (value === 'Unavailable') {
                        return false;
                    }
                    return false;
                },
                change_callback : function (this_el) {
                    let range_el = document.querySelector('#sort-item-salePrice');
                    if (range_el) {
                        let current_min_num = Number(range_el.querySelector('.nmf-min').dataset.currentNumber);
                        let current_max_num = Number(range_el.querySelector('.nmf-max').dataset.currentNumber);
                        let range_object = range_el.querySelector('.nmf-range-selector');
                        let min_num = Number(range_object.dataset.min);
                        let max_num = Number(range_object.dataset.max);
                        if (this_el.checked) {
                            range_el.querySelector('.nmf-min').dataset.currentNumber = range_object.last_min_value;
                            range_el.querySelector('.nmf-max').dataset.currentNumber = range_object.last_max_value;
                            range_el.classList.remove('disabled');
                            range_object.object_update();
                        } else {
                            range_el.querySelector('.nmf-min').dataset.currentNumber = min_num;
                            range_el.querySelector('.nmf-max').dataset.currentNumber = max_num;
                            range_object.last_min_value = current_min_num;
                            range_object.last_max_value = current_max_num;
                            range_el.classList.add('disabled');
                            range_object.object_update();
                        }

                    }
                }
            }
        },
        /*        {
                    crm_name : 'balconySize',
                    filter_type  : 'radio',
                    options : {
                        title : 'Big balcony',
                        callback : function (value) {
                            if (value > 10) {
                                return true;
                            }
                            return false;
                        }
                    }
                },*/
    ],
    sorting_controls : [
        {
            crm_name : 'salePrice',
            options : {
                title : 'price',
            }
        },        {
            crm_name : 'roomNum',
            options : {
                title : 'rooms',
            }
        },        {
            crm_name : 'floorNum',
            options : {
                title : 'floor',
            }
        },
    ],

}