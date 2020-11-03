export function  customSelectionClick (picked_object) {
    if (scene.userData.lastCustomSelectionId) {
        let flatCard = document.querySelector('.popup-info');
        flatCard.classList.remove('custom-selection');
        let object = scene.getObjectById(scene.userData.lastCustomSelectionId);
        if (document.querySelector('.unit_info-points')) $('.unit_info-points').remove();
        if (object) {
            object.userData.color_locked = false;
            appartment_hoverout(object)
            setTimeout(function(){
                scene.userData.lastCustomSelectionId = null;
            }, 100);
        }
    }

    if (last_clicked_flat) {
        if (last_clicked_flat.userData.color_locked) {
            last_clicked_flat.userData.color_locked = false;
            last_clicked_flat.userData.apartment_locked = false;
            appartment_hoverout(last_clicked_flat);
        }
    } else {
        var popup_info = $('.popup-info');
        set_appartment_data_in_block (all_appartments[0], popup_info);
    }

    setTimeout(function(){
        scene.userData.lastCustomSelectionId = picked_object.id;
    }, 150);
    picked_object.userData.color_locked = true;
    let flatCard = document.querySelector('.popup-info');
    flatCard.classList.add('show');
    flatCard.classList.remove('hide');
    flatCard.classList.add('custom-selection');
    let domTitle = flatCard.querySelector('.title-with-selector .title-text-row');
    domTitle.innerHTML = picked_object.userData.customSelectionTitleHtml;
    flatCard.querySelector('.flat-plan').classList.remove('unavailable');
    if (destroyedMode) {
        $('.bomb-btn').trigger('click');
    }

    let box = $('.title-with-selector');
    if (document.querySelector('.unit_info-points')) $('.unit_info-points').remove();
    let data = {
        info_points: picked_object.userData.unitCardInfoPoints,
        icons: picked_object.userData.unitCardIcons,
    };
    add_data_to_info_points_roof_n_lobby(box, data);



}