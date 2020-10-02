 export let card_fns = {

    bind_flat_cards_events : function (card) {
        let card_html = card.html();
        card.unbind();
        if (card_html.length > 0) {
            card.click(function(event){
                window.card_clicked = true;
                if (lastSearchCardClick + 1050 < Date.now()) {
                    lastSearchCardClick = Date.now();
                    $('.nfm-flat-card.active').removeClass('active');
                    $(this).addClass('active');
                    let flat_id = $(this).attr('data-bmby-id');
                    let target_flat = window.appartments_by_bmby_id[flat_id];
                    all_appartments.forEach(function(item, index){
                        if (item == target_flat) {
                            $('body').attr('data-current-app-index', index);
                        }
                    });
                    var popup_info = $('.popup-info');
                    set_appartment_data_in_block (target_flat, popup_info);
                    if (!$(event.target).hasClass('.btns-row')) {
                        if ($(event.target).parents('.btns-row').length == 0) {
                            if (lock_mouse_rotation_x) {
                                let target_floor = target_flat.userData.floor;
                                new_floor_selector_obj.set_current_floor(target_floor);
                                new_floor_selector_obj.temp_floor_index = target_floor;
                                new_floor_selector_obj.set_building_changes(target_floor);
                                current_floor = target_floor;
                                flat_click(target_flat, true);
                                last_clicked_flat = target_flat;
                                set_floor_status_color([current_floor]);
                                setTimeout(function(){
                                    rotation_to_flat ();
                                },50);
                            } else {
                                last_clicked_flat = target_flat
                                current_floor = last_clicked_flat.userData.floor;
                                set_floor_status_color([current_floor]);
                                // flat_click(target_flat);
                                rotation_to_flat ();
                            }


                        }
                    }
                }
            });
            card.find('.floor-plan-btn-back').click(function(){
                if (floor_plan_btn_last_click + 1100 < Date.now()) {
                    $('.bomb-btn').click();
                    floor_plan_btn_last_click =  Date.now();
                }
            });
            card.find('.floor-plan-btn').click(function(){
                if (floor_plan_btn_last_click + 1100 < Date.now()) {
                    document.querySelector('.floor-plan-toggler').classList.add('active');
                    let flat_id = $(this).parents('.nfm-flat-card').attr('data-bmby-id');
                    let target_flat =  window.appartments_by_bmby_id[flat_id];
                    last_clicked_flat = target_flat;
                    current_floor = last_clicked_flat.userData.floor;
                    $('.bomb-btn').click();
                    flat_click(last_clicked_flat, true);
                    floor_plan_btn_last_click =  Date.now();
                }

            });
            card.find('.apt-plan').click(function(){
                    setTimeout(function(){   
                        $('.three_js .popup-info .flat-plan .popups-togglers-box div.toggler-2d').click(); 
                    },100);
            });
        }
    },
    get_card_html_inner :  function  (flat, i, img_path) {
        let add_hide_floor_plan_text = '';
        let add_hide_back_text = '';
        if (lock_mouse_rotation_x) {
            add_hide_floor_plan_text = 'style="display: none;"';
        } else {
            add_hide_back_text = 'style="display: none;"';
        }

        let status_class = 'unavailable';
        available_status.forEach(function(item){
            if (item === flat.status) {
                status_class = 'available';
            }
        });
        let price_html = '';
        if (status_class == 'available') {
            price_html = `
            <div class="price">${get_price_html(flat.salePrice, '', true)}</div>
            `;
        } else {
            price_html = `
            <div class="price language-string" data-dictionary="Sold">${get_lang('Sold')}</div>
            `;
        };
        let floor_plan_ic = 'floor-plan-white';
        let flat_3d_object;
        flat_3d_object = all_appartments.find(function(element){
            element.userData.crm_data.bmbyPropID;
            flat.bmbyPropID;
            if (element.userData.crm_data.bmbyPropID === flat.bmbyPropID) {
                return element;
            }
        });
        if (flat_3d_object) {
            if (flat_3d_object.userData.url_360_type === 'custom') {
                floor_plan_ic = 'popup-info-360';
            }
        }
        let flatOptions = globalFunctions.cardsInfoHTML.getSearchCardOptionsHtml(globalSettings.cardsInfoSettings.UnitCardOptions, flat);
        let inner_html = `
        <div class="flat-card-box ${status_class}">
            <div class="name"><span class="flat-name language-string" data-dictionary="Apt.">${get_lang('Apt.')}</span> <span class="number">${flat.propNum}</span></div>
                ${price_html}
                <div class="options">
                    ${flatOptions}
                </div>            
                <div class="btns-row">
                    <div class="new-ui-btn apt-plan">
                        <div class="text language-string" data-dictionary="Floor plan">${get_lang('Floor plan')}</div>
                        <div class="new-ui-icon">
                            <img src="${img_path}${floor_plan_ic}.svg" alt="">
                        </div>
                    </div>
                    
                    <div class="new-ui-btn white floor-plan-btn" ${add_hide_floor_plan_text}>
                        <div class="text language-string" data-dictionary="Key plan">${get_lang('Key plan')}</div>
                        <div class="new-ui-icon">
                            <img src="${img_path}filter-ic-floor-plan.svg" alt="">
                        </div>
                    </div>
                    <div class="new-ui-btn white floor-plan-btn-back" ${add_hide_back_text}>
                        <div class="text language-string" data-dictionary="Back">${get_lang('Back')}</div>
                        <div class="new-ui-icon">
                            <img src="${img_path}back-btn.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        return inner_html;
    },
    update_cards_btns_visibility : function () {
        if (lock_mouse_rotation_x) {
            $('.floor-plan-btn').hide();
            $('.floor-plan-btn-back').fadeIn();
        } else {
            $('.floor-plan-btn').fadeIn();
            $('.floor-plan-btn-back').hide();
        }
    }
}