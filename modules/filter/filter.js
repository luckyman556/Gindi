import { card_fns } from './filter_card.js';
export function  add_filter (container, img_path = 'img/filter-module/') {

    let filter_btn = ` 
            <div class="filter-module-open-btn new-ui-circle-btn  m-dark"> 
                <div class="ic-img">
                    <img src="${img_path}search-ic.svg" alt="">
                </div>
            </div>
    `;
    let search_fields = [
        {
          crm_name : 'floorNum',
        },
        {
          crm_name : 'modelName',
        },
        {
          crm_name : 'propNum',
        },
        {
          crm_name : 'roomNum',
        },
    ];



    let filter_controls = [
        {
            crm_name : 'salePrice',
            filter_type  : 'range',
            options : {
                max_text_class : 'nmf-max-text',
                min_text_class : 'nmf-min-text',
                price_symbol : '&#8362',
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
                title : 'Bedrooms',
                ic_name : 'bedroom-ic.svg',
                with_sep : false,
                sep : ',',
                dictionary : null,
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
        {
            crm_name : 'facing',
            filter_type  : 'togglers',
            options : {
                title : 'Exposure',
                ic_name : 'exposure-ic.svg',
                with_sep : true,
                sep : ',',
                dictionary : {
                    'צפון' :  'north',
                    'מערב' :  'west',
                    'מזרח' :  'east' ,
                    'דרום' : 'south',
                }
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
    ];

    let sorting_controls = [
        {
            crm_name : 'salePrice',
            sorting_type  : 'desc',
            options : {
                title : 'price',
            }
        },
        {
            crm_name : 'salePrice',
            sorting_type  : 'asc',
            options : {
                title : 'price',
            }
        },
    ]

    let filter_module_container = `
        <div class="filter-module-container non-canvas clear">
            <div class="mobile-full-filter-back">
                <div class="title language-string" data-dictionary="Sort&filter">Sort&filter</div>
            </div>        
            <div class="flat-cards"></div>
            <div class="filter-controls-tabs">
                <div class="controls-tab" data-key="sort-item-sort-tab">Sort by</div>
            </div>
            <div class="filter-controls open"></div>
            <div class="close-btn-mobile">
                <div class="icon"></div>
            </div>
            <div class="close-btn filter-module-open-btn new-ui-circle-btn">
                <div class="ic-img">
                    <img src="${img_path}close-ic.svg" alt="">
                </div>
            </div>
            <div class="flat-counter">
                <div class="ic">
                    <img src="${img_path}flat-counter-ic.svg" alt="">
                </div>                
                <div class="ic short white">
                    <img src="${img_path}flat-counter-short-ic.svg" alt="">
                </div>
                <div class="count"></div>
                <div class="text language-string" data-dictionary="apartments found">${get_lang('apartments found')}</div>
            </div>
            <div class="reset-filter new-ui-circle-btn"> 
                <div class="ic-img">
                    <img src="${img_path}/reset-ic.svg" alt="">
                </div>  
            </div>
            <div class="input-search">                
                <input type="text" id="input-search" class="language-string"  placeholder="${get_lang('search')}"  data-dictionary="search" data-dictionary-param="placeholder">
                <label class="ic" for="input-search">
                    <img src="${img_path}search-input-ic.svg" alt="">
                </label>
            </div>
        </div>

    `;

    let crm_sorted_by_floors = {};
    let crm_array = actual_JSON;
    crm_array.forEach(function(item){
        const floor_num = item.floorNum;
        if (!crm_sorted_by_floors[floor_num]) {
            crm_sorted_by_floors[floor_num] = [];
        }
        crm_sorted_by_floors[floor_num].push(item);
    });
    let crm_sorted_by_price = {};
    crm_array.forEach(function(item){
        const sale_price = item.salePrice;
        if (!crm_sorted_by_price[sale_price]) {
            crm_sorted_by_price[sale_price] = [];
        }
        crm_sorted_by_price[sale_price].push(item);
    });

    container.append(filter_btn);
    container.append(filter_module_container);
    add_sorting_html ();
    add_filters_html();
    add_tabs_html();


    function add_tabs_html() {
        let tabs_html = ""
        filter_controls.forEach(function(item,i) {

            if (i < 2) {
                let tab_html = `
                    <div class="controls-tab language_string" data-dictionary="${item.options.title}" data-key="sort-item-${item.crm_name}"> ${get_lang(item.options.title)}</div>
                `;
                tabs_html += tab_html;
            }
        });
        tabs_html += `
            <div class="controls-tab language_string" data-dictionary="More" data-key="more">${get_lang('More')}</div>
        `
        container.find('.filter-controls-tabs').append(tabs_html);
    }

    function add_sorting_html () {
        let sorting_html = '';
        sorting_controls.forEach(function(item, i) {
            let active_class = 'hide';
            if (i === 0) {
                active_class = 'active show';
            }
            let sort_btn = `
                <div id="sort-tab" class="sort-btn-item ${item.sorting_type} ${active_class}" data-crm-name="${item.crm_name}" data-sort-type="${item.sorting_type}">
                    <div class="name language-string" data-dictionary="${item.options.title}">${get_lang(item.options.title)}</div>
                    <div class="ic">
                        <img src="${img_path}down-ic.svg" alt="">
                    </div>
                </div>
            `;
            sorting_html += sort_btn;
        });
        container.find('.filter-module-container .filter-controls').append(`<div class="nfm-sorting-box" id="sort-item-sort-tab">
            <div class="title language-string" data-dictionary="Sort by:">${get_lang('Sort by:')}</div>
            <div class="sorting-list">
            
            </div>
        </div>`);
        $('.nfm-sorting-box .sorting-list').append(sorting_html);
    };
    function add_filters_html() {
        let filters_html = '';
        filter_controls.forEach(function(item){
            if (item.filter_type == 'range') {
                let range_html = get_range_html(item);
                filters_html += range_html;
            }
            if (item.filter_type == 'togglers') {
                const togglers_html = get_togglers_html (crm_array, item.crm_name, item.options.with_sep, item.options.sep, item.options.dictionary);
                let togglers_filter_html = `
                    <div id="sort-item-${item.crm_name}" class="nfm-togglers ${item.crm_name} ">
                        <div class="nfm-first-line">
                            <div class="title language-string" data-dictionary="${ item.options.title }">${get_lang (item.options.title)}</div>
                            <div class="icon-box">
                                <img src="${ img_path + item.options.ic_name }" alt="">
                            </div>
                        </div>
                        <div class="second-line togglers-row">
                            ${togglers_html}
                        </div>
                    </div>
                `;
                filters_html += togglers_filter_html;
            }
            if (item.filter_type === 'radio') {

                let checked = '';
                if (item.options.default) {
                    checked = 'active';
                }
                let toggler_html = `
                    <div id="sort-item-${item.crm_name}" class="true-false-toggler ${item.crm_name}">
                        <div class="nfm-first-line">
                            <div class="title language-string" data-dictionary="${ item.options.title }">${get_lang (item.options.title)}</div>
                        </div>
                        <div class="toggle ${checked}">
                          <input type="checkbox" class="check ${checked}">
                          <b class="b switch"></b>
                          <b class="b track"></b>
                        </div>
                    </div>
                `;
                filters_html += toggler_html;
            }

        });
        container.find('.filter-module-container .filter-controls').append(filters_html);
        filter_controls.forEach(function(item){
            if (item.filter_type === 'range') {
                range_init ($('.' + item.crm_name) ,item.options , range_change);
            }
            if (item.filter_type === 'radio') {
                $('.' + item.crm_name + ' input').change(function(){
                    let val = $(this)[0].checked;
                    if (val) {
                        $(this).parent().addClass('active');
                    } else {
                        $(this).parent().removeClass('active');
                    }
                });
            }

        });
        let sorting_btns = $('.nfm-sorting-box .sort-btn-item');
        sorting_btns.click(function(){
            sorting_btns.removeClass('active');
            $(this).addClass('active');
            let parent = $(this).parent();
            let list_status = parent.hasClass('open');
            if (list_status) {
                let show_btns = [];
                sorting_btns.each(function(){
                    if ($(this).hasClass('show')){
                        if (!$(this).hasClass('active')) {
                            show_btns.push($(this));
                        };
                    }
                });
                show_btns.forEach(function(btn, i){
                    let current_width = btn.outerWidth();
                    setTimeout(function(){
                        btn.animate({
                            width: 0,
                            'padding-right' : 0,
                        }, {
                            duration: 500,
                            complete: function() {
                                btn.css('width', current_width);
                                btn.css('padding-right', '');
                                btn.removeClass('show');
                                btn.addClass('hide');
                            }
                        });
                    }, 20 * i);
                });
                parent.removeClass('open');
            }  else {
                let hidden_btns = [];
                sorting_btns.each(function(){
                    if ($(this).hasClass('hide')){
                        hidden_btns.push($(this));
                    }
                });
                hidden_btns.forEach(function(btn, i){
                    let current_width = btn.outerWidth();
                    btn.width(0);
                    btn.removeClass('hide');
                    btn.addClass('show');
                    setTimeout(function(){
                        btn.animate({
                            width: current_width,
                        }, {
                            duration: 500,
                            complete: function() {
                                btn.css('width', '');
                            }
                        });
                    }, 20 * i);
                    });

                parent.addClass('open');
            }
        });
        $('.filter-module-open-btn').click(function(){
            $('.filter-module-container').toggleClass('open');

            if ($('.filter-module-container').hasClass('open')) {
                if ($(window).width() <= 1024) {
                    if ($('.filter-module-container .filter-controls-tabs .controls-tab.active').length == 0) {

                        $('.filter-module-container .filter-controls-tabs .controls-tab').eq(0).click();
                    }
                }
                if ($('.filter-module-container').hasClass('clear')) {
                    setTimeout(function(){
                        $('.main-wrap')[0].set_defaults();
                        $('.main-wrap')[0].filter_run();
                        $('.main-wrap')[0].filter_update();
                    }, 600);
                }
            }
        });

        $('.toggler-btn').click(function(){
            if (!$(this).hasClass('unactive')) {
                $(this).toggleClass('active');
                filter_run();
                filter_update();
            }
        });
        $('.check').change(function(){
            if (!$(this).hasClass('unactive')) {
                $(this).toggleClass('active');
                filter_run();
                filter_update();
            }
        });

        $('.flat-counter').click(flat_counter_click);
        $('.reset-filter').click(function(){
                if (!$('.filter-controls').hasClass('open')) {
                    replace_filters_n_cards();
                    $('#input-search').val('');
                    $('#input-search').html('');
                    $('.flat-counter').fadeOut();
                    setTimeout(function(){
                        $('.flat-cards').empty();
                    }, 500);                               
                    reset_filter();
                    set_defaults();
                } else {
                    set_defaults();
                }

        });
        let input_search = $('#input-search');
        input_search[0].addEventListener('input',input_change);
        function input_change (event) {
            let dom_input = $(event.target);
            let word = dom_input.val();
            input_search_fn(word);
        };
        input_search.focusin(function(){
            $(this).parent().addClass('active');
            $('.filter-module-container .filter-controls').addClass('unactive');
        });;
        input_search.focusout(function(){
            $(this).parent().removeClass('active');
            $('.filter-module-container .filter-controls').removeClass('unactive');
        });


    }
    function input_search_fn(word) {
        crm_array = window.actual_JSON;
        let new_crm_array = [];
        search_fields.forEach(function(item){
            const unic_filter_class = item.crm_name;
            crm_array.forEach(function(crm_item){

                let val = String(crm_item[unic_filter_class]);
                let search_result = val.search(word);
                let match = false;
                if (search_result !== -1) {
                    match = true;
                }
                val = val.toUpperCase();
                search_result = val.search(word);
                if (search_result !== -1) {
                    match = true;
                }
                val = val.toLowerCase();
                search_result = val.search(word);
                if (search_result !== -1) {
                    match = true;
                }
                if (match === true) {
                    new_crm_array.push(crm_item);
                }
            });

        });
        crm_array = new_crm_array;
        let crm_array_by_id = {};
        let crm_array_by_id_arr = [];
        crm_array.forEach(function(crm_item){
            const id = crm_item.bmbyPropID;
            if (!crm_array_by_id[id]) {
                crm_array_by_id[id] = [];
                crm_array_by_id_arr.push(crm_array_by_id[id] );
            }
            crm_array_by_id[id].push(crm_item);
        });

        new_crm_array = [];
        crm_array_by_id_arr.forEach(function(crm_array_item){
            new_crm_array.push(crm_array_item[0]);
        });
        crm_array = new_crm_array;
        if (crm_array.length > 0) {
            filter_update ();
            if ($('.filter-controls').hasClass('open')) {
                replace_filters_n_cards();
            }
            $(".flat-cards-slider").unmark({
                done: function() {
                    $(".flat-cards-slider").mark(word);
                }
            });
        } else {

        }
    }
    function get_max_n_min_params_from_array (array, key) {
        let min_num = 99999999999;
        let max_num = -1;
        array.forEach(function(item){
            const num = item[key];
            if (num < min_num) {
                min_num = num;
            }
            if (num > max_num) {
                max_num = num;
            }
        });
        return {
            'min_num' : Math.floor(min_num),
            'max_num' : Math.floor(max_num),
        }
    }
    function get_togglers_html (array, key, with_sep = false, sep = undefined, dictionary = null) {
        let togglers_array = {};
        let togglers_html = '';
        array.forEach(function(item){
            const toggler_value = item[key];
            if (with_sep) {
                let sep_array = toggler_value.split(sep);
                sep_array.forEach(function (sep_array_item) {
                    if (!togglers_array[sep_array_item]) {
                        togglers_array[sep_array_item] = {
                            name : sep_array_item,
                        }
                    }
                });
            } else {
                if (!togglers_array[toggler_value]) {
                    togglers_array[toggler_value] = {
                        name : toggler_value,
                    }
                }
            }

        });
        for (key in togglers_array) {
            const item = togglers_array[key];
            let toggler_html = `
                <div class="toggler-btn" data-val="${item.name}">
                    ${item.name}
                </div>
            `;
            if (dictionary) {
                toggler_html = `
                <div class="toggler-btn language-string" data-dictionary="${dictionary[item.name]}" data-val="${item.name}">
                    ${get_lang(dictionary[item.name])}
                </div>
            `;
            }
            togglers_html += toggler_html;
        };
        return togglers_html;
    }
    function get_filter_params () {

    }
    function filter_run () {
        crm_array = actual_JSON;
        container.find('.filter-module-container').removeClass('clear');
        // get_filtered_params
        filter_controls.forEach(function(item){
            const unic_filter_class = item.crm_name;
            const filter_type = item.filter_type;
            if (filter_type == 'range') {
                const min_number = $("." + unic_filter_class).find('.circle.' + item.options.min_btn_class).attr('data-current-number');
                const max_number = $("." + unic_filter_class).find('.circle.' + item.options.max_btn_class).attr('data-current-number');
                let new_crm_array = [];
                crm_array.forEach(function(crm_item){
                    if (min_number <= Math.floor(crm_item[unic_filter_class])) {
                        new_crm_array.push(crm_item);
                    }
                });
                crm_array = new_crm_array;

                new_crm_array = [];

                crm_array.forEach(function(crm_item){
                    if (max_number >= Math.floor(crm_item[unic_filter_class])) {
                        new_crm_array.push(crm_item);
                    }
                });
                crm_array = new_crm_array;
            }
            if (filter_type == 'togglers') {
                let new_crm_array = []
                let active_togglers_array = [];
                let active_togglers = $('.' +  item.crm_name + ' .toggler-btn.active');
                if (active_togglers.length > 0) {
                    active_togglers.each(function(){
                        const value = $(this).attr('data-val');
                        active_togglers_array.push(value);
                    });
                    crm_array.forEach(function(crm_item){
                        const value = crm_item[item.crm_name];
                        let crm_item_array = [];
                        if (item.options.with_sep) {
                            crm_item_array =  value.split(item.options.sep);
                        } else {
                            crm_item_array.push(value);
                        }
                        let match = false;
                        crm_item_array.forEach(function(crm_item_array_val){
                            active_togglers_array.forEach(function(active_togglers_array_item){
                                if (active_togglers_array_item == crm_item_array_val) {
                                    match = true;
                                }
                            });
                        });
                        if (match) {
                            new_crm_array.push(crm_item);
                        }
                    });
                    crm_array = new_crm_array;
                }


            }
            if (filter_type === 'radio') {
                let new_crm_array = []
                let check_status = $('.true-false-toggler.' + item.crm_name + ' input').hasClass('active');
                console.log(check_status);
                if (check_status) {
                    crm_array.forEach(function(crm_item){
                        let value = crm_item[item.crm_name];
                        value = item.options.callback(value);
                        if (value === check_status) {
                            new_crm_array.push(crm_item);
                        }
                    });
                    crm_array = new_crm_array;
                }
            }
        });
        sort_search_result();
        filter_update();

    }
    function range_change () {
        filter_run();
        // filter_update();
    }
    container[0].filter_update = filter_update;
    container[0].reset_filter = reset_filter;
    container[0].set_defaults = set_defaults;
    container[0].filter_run = filter_run;
    function reset_filter () {
        crm_array = [];
        filter_update();
    }
    function set_defaults () {
        crm_array = [];
        filter_update();
        container.find('.filter-module-container').addClass('clear');
        filter_controls.forEach(function(item) {
            if (item.filter_type == 'togglers') {
                $('.nfm-togglers.' + item.crm_name).find('.toggler-btn').removeClass('active');
            }
            if (item.filter_type == 'radio') {
                let input_box = $('.true-false-toggler.' + item.crm_name);
                let input =  input_box.find('input');
                input[0].checked = item.options.default;
                if ( item.options.default) {
                    input_box.addClass('active');
                    input.addClass('active');
                } else {
                    input_box.removeClass('active');
                    input.removeClass('active');
                }
            }
            if (item.filter_type == 'range') {

                let object  = $('.nmf-range-selector.' + item.crm_name);
                let min_text_class = item.options.min_text_class;
                let max_text_class = item.options.max_text_class;
                let min_btn_class = item.options.min_btn_class;
                let max_btn_class = item.options.max_btn_class;
                var min_btn = object.find('.' + min_btn_class);
                var max_btn = object.find('.' + max_btn_class);
                var range_width = object.width() - 30;
                let min_num = object.data('min');
                let max_num = object.data('max');
                let current_min_number = min_btn.attr('data-current-number');
                let current_max_number = max_btn.attr('data-current-number');
                min_btn.attr('data-current-number', min_num);
                max_btn.attr('data-current-number', max_num);
                let start_min_num = Math.floor(current_min_number);
                let start_min_difference = start_min_num - min_num;
                let start_max_num = Math.floor(current_max_number);
                let start_max_difference = max_num - start_max_num;
                // object.parent().find('.min-text').html(min_num);
                // object.parent().find('.max-text').html(max_num);


                let number_with_comas = item.options.number_with_comas;
                console.log(number_with_comas);
                object.find('.range-line-active').animate({
                    width: range_width + 24,
                    left : 0
                }, {
                    duration : 500,
                    progress : function (animation,  progress,  remainingMs) {
                        {
                            let min_text = start_min_num - Math.floor((start_min_difference * progress));
                            let add_text = '';
                            if (min_text > 1000000) {
                                min_text = Math.floor(min_text / 100000) / 10;
                                add_text = ' m';
                            }
                            if (number_with_comas) {
                                object.parent().find('.' + min_text_class).html(numberWithCommas(min_text) + add_text);
                            } else {
                                object.parent().find('.' + min_text_class).html(min_text + add_text);
                            }
                        }
                        {
                            let max_text = max_num - Math.floor((start_max_difference * (1 - progress)));
                            let add_text = '';
                            if (max_text > 1000000) {
                                max_text = Math.floor(max_text / 100000) / 10;
                                add_text = ' m';
                            }
                            if (number_with_comas) {
                                object.parent().find('.' + max_text_class).html(numberWithCommas(max_text) + add_text);
                            } else {
                                object.parent().find('.' + max_text_class).html(max_text + add_text);
                            }
                        }
                    }
                });


                object.find('.range-line-active').css('left', 0);
                min_btn.animate({
                    left: "0",
                }, 500, function() {

                });
                max_btn.animate({
                    left: range_width,
                }, 500, function() {

                });
            }
        });
    }
    function filter_update () {
        if (!window.appartments_by_bmby_id) {
            window.appartments_by_bmby_id = [];
            all_appartments.forEach(function(mesh){
                const id = mesh.userData.crm_data.bmbyPropID;
                window.appartments_by_bmby_id[id] = mesh;
            });
        }
        all_appartments.forEach(function(mesh){
            mesh.userData.color_filter_locked = false;
        });
        crm_array.forEach(function(item){
            const id = item.bmbyPropID;
            let mesh = window.appartments_by_bmby_id[id];
            mesh.userData.color_filter_locked = true;
        });
        set_floor_status_color([current_floor]);
        if ($('.popup-info.hide').length > 0) {
            checkIntersection();
        } else {
            last_clicked_flat.userData.color_locked = true;
        }
        let flat_counter = container.find('.flat-counter');
        if (crm_array.length > 0) {
            flat_counter.fadeIn();
            flat_counter.css('display' , 'flex');
            flat_counter.find('.count').html(crm_array.length);
        } else {
            flat_counter.fadeOut();
        };
        update_flat_cards ();
    }

    function sort_search_result () {

        let active_btn = $('.sort-btn-item.active') ;
        const active_sorting = active_btn.attr('data-crm-name');
        const sorting_type = active_btn.attr('data-sort-type');
        let sorted_obj = {};
        crm_array.forEach(function(item){
            let value = item[active_sorting];
            if (!sorted_obj[value]) {
                sorted_obj[value] = [];
                sorted_obj[value].push(item);
            } else {
                sorted_obj[value].push(item);
            }

        });
        let keys_for_sorting = Object.keys(sorted_obj);
        let sorted_keys;
        if (sorting_type === 'asc' ) {
            sorted_keys = keys_for_sorting.sort(function(a,b){
                return b - a;
            });
        } else  {
            sorted_keys = keys_for_sorting.sort(function(a,b){
                return a - b;
            });
        }
        let new_crm_array = [];
        sorted_keys.forEach(function(item){
            let local_array = sorted_obj[item];
            local_array.forEach(function(flat) {
                new_crm_array.push(flat);
            });
        });
        crm_array = new_crm_array;
    }

    function find_filter_match (item,  array) {
        array.forEach(function(crm_element){

        });
        let key = item.crm_name;
        let togglers_array = [];
        let togglers_btns = $('.' + key + ' .toggler-btn');
        togglers_btns.addClass('unactive');
        togglers_btns.each(function(){
            let toggler_value = $(this).attr('data-val');
            togglers_array.push(toggler_value);
        });
        togglers_array.forEach(function(toggler_value, btn_i){
            let toggler_has_match = false;
            array.forEach(function(crm_item){
                let crm_value = crm_item[key];
                let values_for_check = [crm_value];
                let sep = item.options.sep;
                if (item.options.with_sep) {
                    values_for_check = crm_value.split(sep);
                }
                values_for_check.forEach(function(values_for_check_item){
                    if (values_for_check_item == toggler_value) {
                        toggler_has_match = true;
                    }
                });
            });
            if (toggler_has_match) {
                togglers_btns.eq(btn_i).removeClass('unactive');
            }
        });

    }
    function get_range_html (item) {
        const max_n_min = get_max_n_min_params_from_array (crm_array, item.crm_name);
        let range_html = `
            <div class="nmf-range-selector-box" id="sort-item-${item.crm_name}">
                <div class="search-filter-title two-lined">
                    <div class="nfm-first-line">
                        <div class="title language-string" data-dictionary="${ item.options.title }">${get_lang (item.options.title)}</div>
                        <div class="icon-box">
                            <img src="${ img_path + item.options.ic_name }" alt="">
                        </div>
                    </div>
                     <div class="nfm-selected">
                        <div class="min-number-box number-box"> 
                            <span class="simbol">&#8362;</span> 
                             <div class="nmf-min-text"></div>
                        </div>
                        <div class="middle"> - </div>
                        <div class="max-number-box  number-box">
                            <span class="simbol">&#8362;</span>
                            <div class="nmf-max-text"></div>
                        </div>
                    </div>
                 </div>
                <div class="${item.crm_name} nmf-range-selector" data-min="${max_n_min.min_num}" data-max="${max_n_min.max_num}">
                    <div class="circle nmf-min" data-value="">
                        <div class="circle-tooltip"><span class="simbol">&#8362;</span><span class="text"></span></div>
                    </div>
                    <div class="circle nmf-max"  data-value="">
                        <div class="circle-tooltip"><span class="simbol">&#8362;</span><span class="text"></span></div>
                    </div>
                    <div class="range-line"></div>
                    <div class="range-line-active"></div>
                </div>
            </div>  
        `;
        return range_html;
    }

    function active_bubble (event){
        let target = $(event.target);
        $('.number-bubble').removeClass('active');
        if (target.hasClass('number-bubble') == true) {
            target.addClass('active');
            target.find('input').focus();
        } else {
            if (target.parents('.number-bubble').length > 0) {
                target.parents('.number-bubble').addClass('active');
                target.parents('.number-bubble').find('input').focus();
            }
        }
        $('.number-bubble input').change(function(){
            let value = $(this).val();
            let min = Number($(this).attr('min'));
            let max = Number($(this).attr('max'));
            if (value < min) {
                $(this).val(min);
            }
            if (value > max) {
                $(this).val(max);
            }
            let parent = $(this).parents('.range-item');

            $(this).parent().find('.number').html(value);
            if (parent.hasClass('price') == true) {
                $(this).parent().find('.number').html(numberWithCommas(value));
            }
            if ($(this).parent().hasClass('min-bubble')) {
                parent.find('.min').attr('data-current-number', value);
                parent.find('.max-bubble input').attr('min', value);
            }
            if ($(this).parent().hasClass('max-bubble')) {
                parent.find('.max').attr('data-current-number', value);
                parent.find('.min-bubble input').attr('max', value);
            }
            let event = new Event('update');

            parent[0].dispatchEvent(event);
            flats_filter_update ();

        });
    }
    function update_flat_cards () {
        let flat_cards_container = container.find('.flat-cards');
        flat_cards_container.html('<div class="flat-cards-slider" data-current-position="0"></div>');
        let flat_cards_list_html = '';
        let cards_for_screen = get_card_for_screen();
        crm_array.forEach(function(flat, i){
            let inner_html = card_fns.get_card_html_inner (flat, i, img_path);
            if (i > cards_for_screen) {
                inner_html = '';
            }
            let flat_card_html = `
                <div class="nfm-flat-card" data-count="${i}"  data-bmby-id="${flat.bmbyPropID }" >
                    ${inner_html}
                </div>
            `;
            flat_cards_list_html += flat_card_html;
        });
        flat_cards_container.find('.flat-cards-slider').html(flat_cards_list_html);
        $('.flat-cards-slider .nfm-flat-card').each(function(i){
            let card = $(this);
            if (i <= cards_for_screen) {
                card_fns.bind_flat_cards_events(card);
            }
        });
        let flat_slider = $('.flat-cards-slider');
        flat_slider[0].onwheel = function(event){
            if ($('.nfm-flat-card').length >  get_card_for_screen()) {
                if (!flat_slider.attr('data-target-left')) {
                    flat_slider.attr('data-target-left', 0);
                    flat_slider.css('left', 0);
                }

                let target_left = Number(flat_slider.attr('data-target-left'));
                let delta = event.wheelDeltaY;
                let new_target_left =  target_left + delta;
                let max_left = ($(flat_slider).width() - $('.flat-cards').width()) * -1;
                if (new_target_left > 0) {
                    new_target_left = 0;
                }
                if (new_target_left < max_left) {
                    new_target_left = max_left;
                }


                flat_slider.attr('data-target-left', new_target_left);
            }
        };
        {
            let start_event;
            let start_left;
            let mouse_press = false;
            {
                flat_slider[0].addEventListener('mousedown', on_mouse_down);
                flat_slider[0].addEventListener('touchstart', on_mouse_down);
                flat_slider[0].addEventListener('mouseup', on_mouse_up);
                flat_slider[0].addEventListener('touchend', on_mouse_up);
                flat_slider[0].addEventListener('mousemove', on_mouse_move);
                flat_slider[0].addEventListener('touchmove', on_mouse_move);
                flat_slider[0].addEventListener('mouseleave', on_mouse_up);
                function on_mouse_down(event) {
                    if (!flat_slider.attr('data-target-left')) {
                        flat_slider.attr('data-target-left', 0);
                        flat_slider.css('left', 0);
                    }
                    start_event = event;
                    mouse_press = true;
                    start_left = Number(flat_slider.attr('data-target-left'));
                }
                function on_mouse_up(event) {
                    mouse_press = false;
                }
                function on_mouse_move(event) {
                    event.preventDefault();
                    if ($('.nfm-flat-card').length >  get_card_for_screen()) {

                        if (mouse_press) {

                            let direction =document.querySelector('html').getAttribute('dir');
                            let start_x;
                            let current_x;
                            if ( event.changedTouches ) {
                                start_x = start_event.changedTouches[0].pageX;
                                current_x = event.changedTouches[0].pageX;
                            } else {
                                start_x = start_event.pageX;
                                current_x = event.pageX;
                            }
                            let max_left = ($(flat_slider).width() - $('.flat-cards').width()) * -1;
                            let delta =  current_x - start_x;
                            let target_left;
                            let new_target_left =  start_left + delta;
                            if (direction == 'rtl') {
                                new_target_left = start_left - delta;
                            }
                            if (new_target_left > 0) {
                                new_target_left = 0;
                            }
                            if (new_target_left < max_left) {
                                new_target_left = max_left;
                            }
                            flat_slider.attr('data-target-left', new_target_left);


    /*                        $('.flat-cards-slider .nfm-flat-card').each(function(i){
                                if (i < min_num) {
                                    $(this).empty();
                                } else if (i > max_num) {
                                    $(this).empty();
                                } else {
                                    $(this).html(get_card_html_inner(crm_array[i], i));
                                }
                            });*/
                        }

                    }

                }
            }

        }
        requestAnimationFrame(animate_scroll);
        function get_card_for_screen () {
           return  Math.floor($(window).width() / ($('.filter-module-container .flat-cards .nfm-flat-card').width() + 32)) + 4;
        }
        function animate_scroll () {
            if (flat_slider.length > 0){
                let direction =document.querySelector('html').getAttribute('dir');
                let position_side = 'left';
                if (direction) {
                    if (direction == 'rtl') {
                        position_side = 'right';
                    }
                }
                let left = flat_slider.css(position_side)
                left = left.replace('px', '');
                if (left === '') {
                    left = 0;
                }
                let target_left = Number(flat_slider.attr('data-target-left'));
                let dif =  Number(left) - target_left;
                let new_left;
                if (Math.sqrt(dif * dif) > 1) {
                    new_left = Number(left) - dif * 0.2;
                    //flat_slider.css('left', new_left);

                } else {
                    new_left = target_left;
                }
                flat_slider.css(position_side, new_left);
                let current_postion = Math.floor(Math.sqrt(new_left * new_left)  / ($('.filter-module-container .flat-cards .nfm-flat-card').width() + 32));

                let data_position = Number(flat_slider.attr('data-current-position'));
                if (data_position) {
                    if (current_postion !== data_position) {
                        let cards_for_screen = get_card_for_screen();
                        let max_num = data_position + cards_for_screen - 2;

                       // console.log('cards_for_screen: ' + max_num);
                        let min_num = data_position  - 1;

                        if (data_position < current_postion) {
                            let last_card =  $('.flat-cards-slider .nfm-flat-card').eq(max_num);
                            $('.flat-cards-slider .nfm-flat-card').eq(min_num).empty();

                            if (crm_array[max_num]) {
                                const input_val = $('#input-search').val();
                                last_card.html(card_fns.get_card_html_inner(crm_array[max_num], max_num, img_path));
                                card_fns.bind_flat_cards_events (last_card);
                                if ($('#input-search').val()) {
                                    last_card.mark(input_val);
                                }
                            }
                        } else {
                            if (min_num >= 0) {
                                if (crm_array[min_num]) {
                                    const input_val = $('#input-search').val();
                                    let first_card = $('.flat-cards-slider .nfm-flat-card').eq(min_num)
                                    first_card.html(card_fns.get_card_html_inner(crm_array[min_num], min_num, img_path));
                                    card_fns.bind_flat_cards_events(first_card);
                                    if ($('#input-search').val()) {
                                        first_card.mark(input_val);
                                    }
                                }
                            }
                            $('.flat-cards-slider .nfm-flat-card').eq(max_num).empty();
                        }

                    }

                } else {

                }

                flat_slider.attr('data-current-position', current_postion);

                requestAnimationFrame(animate_scroll);
            }
        }

    }
    function flat_counter_click () {
        if (!check_search_input()) {
            replace_filters_n_cards();
        }

    }
    function replace_filters_n_cards (){

        let filter_controls = container.find('.filter-controls');
        let card_div = container.find('.flat-cards');
        let tabs_container = $('.filter-controls-tabs');
        if (!filter_controls.hasClass('open')){
            filter_controls.addClass('open');
            container_appear (filter_controls);
            container_disappear (card_div);
            tabs_container.removeClass('hide');
            filter_controls.parent().css('height', '');
        } else {
            filter_controls.removeClass('open');
            container_disappear (filter_controls)
            container_appear (card_div);
            tabs_container.addClass('hide');
            filter_controls.parent().css('height', card_div.height());
        };
        function container_appear (object) {
            object.addClass('transition-off');
            object.removeClass('on-back');
            object.css('top', '300px');
            object.css('opacity', '1');
            object.animate({
                'top' : '0px'
            },{
                duration: 500,
                complete : function() {
                    object.removeClass('transition-off');
                }
            });

        }
        function container_disappear (object) {
            object.addClass('on-back');
            setTimeout(function(){
                object.css('opacity', '0');
                object.css('top', '300px');
            }, 500);
        }
    }
    function check_search_input () {
        let input_value = document.getElementById('input-search').value;
        if (input_value.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    function results_not_found () {

    }
    {
        $('.controls-tab').click(function(){
            let key = $(this).data('key');
            $('.controls-tab').removeClass('active');
            $(this).addClass('active');
            if (key !== 'more') {
                $('.filter-module-container .filter-controls > *').removeClass('mobile-open');
                $('#' + key).addClass('mobile-open');
                console.log(key);
                if ($('#' + key + ' .nmf-range-selector')[0]) {
                     $('#' + key + ' .nmf-range-selector')[0].object_update();
                }
               
                $('.filter-module-container').removeClass('full-window');
            } else {
                $('.filter-module-container').addClass('full-window');
                $('.lang-container').hide();
                resize_function ();
            }
        });
        $('.mobile-full-filter-back').click(function(){
            $('.filter-module-container').removeClass('full-window');  
             $('.controls-tab').eq(0).click();          
            $('.lang-container').show();
            resize_function ();
        });

    }
    // mobile touch events
    {
        let touch_start_on_filter_close_btn = false;
        let start_event;
        let current_filter_box_bottom;
        let close_btn_mobile = document.querySelector('.close-btn-mobile');
        let filter_module_container = document.querySelector('.filter-module-container');
        document.addEventListener('touchstart', event_start, {'passive' : false});
        document.addEventListener('touchmove', event_move, {'passive' : false});
        document.addEventListener('touchend', event_end, {'passive' : false});
        function event_start (event){
            let target_on_touch_start;
            let target_array = event.path.filter(function (target) {
                if (target === close_btn_mobile)
                    return true;
                else {
                    return false;
                }
            });
            if (target_array.length > 0) {
                event.preventDefault();
                touch_start_on_filter_close_btn = true;
                start_event = event;
                current_filter_box_bottom = Number(window.getComputedStyle(filter_module_container).bottom.replace('px',''));
            } else {
                touch_start_on_filter_close_btn = false;
            }
        };
        function event_move (event){
            if (start_event) {
                if (touch_start_on_filter_close_btn) {

                    event.preventDefault();
                    let start_y;
                    let current_y;
                    if (event.changedTouches) {
                        start_y = start_event.touches[0].pageY;
                        current_y = event.touches[0].pageY;
                    } else {
                        start_y = start_event.pageY;
                        current_y = event.pageY;
                    }
                    let difference = start_y - current_y;
                    if (difference < 0) {
                        console.log(current_filter_box_bottom);
                        console.log(difference);
                        filter_module_container.style.bottom = current_filter_box_bottom + difference + 'px';
                        filter_module_container.style.transitionDuration = '0s';
                    } else {
                        // filter_module_container.style.bottom = current_filter_box_bottom + 'px';
                    }
                }
            }
        };
        function event_end (event){
            if (start_event) {
                if (touch_start_on_filter_close_btn) {

                    event.preventDefault();
                    if (Number(filter_module_container.style.bottom.replace('px','')) < -60){
                        console.log(Number(filter_module_container.style.bottom.replace('px','')));
                        filter_module_container.style.bottom = '';
                        filter_module_container.style.transitionDuration = '';
                        filter_module_container.classList.remove("open");
                    }
                }
            }
            touch_start_on_filter_close_btn = false;
            start_event = undefined;
            filter_module_container.style.transitionDuration = '';
            filter_module_container.style.bottom = '';
        };
    }
    $(window).resize(resize_function);
    resize_function ();
    function resize_function () {
        filter_controls.forEach(function(control){
            if (control.filter_type === 'range') {
                $('.nmf-range-selector.' + control.crm_name)[0].object_update();
            };
        });
    }

}