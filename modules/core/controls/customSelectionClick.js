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
        last_clicked_flat = picked_object;
    }

    setTimeout(function(){
        scene.userData.lastCustomSelectionId = picked_object.id;
    }, 150);
    picked_object.userData.color_locked = true;
    let flatCard = document.querySelector('.popup-info');

    flatCard.classList.add('show');
    flatCard.classList.remove('hide');
    flatCard.classList.add('custom-selection');

    const domTitle = flatCard.querySelector('.title-with-selector .title-text-row');
    const btn360 = flatCard.querySelector('.three_js .popup-info .flat-plan .popups-togglers-box div.toggler-2d');

    btn360.removeAttribute('data-dictionary');
    btn360.setAttribute('data-dictionary', `${picked_object.name} plan`);

    if (picked_object.userData.url_360) {
        btn360.classList.add('icon-360');
    } else if (!picked_object.userData.url_360 && btn360.classList.contains('icon-360')) {
        btn360.classList.remove('icon-360');
    }

    last_clicked_flat = picked_object;

    domTitle.innerHTML = `<span class="title-text language-string" data-dictionary="${picked_object.name}" data-clipboard-text=${picked_object.name}>${get_lang(picked_object.name)}</span>`;
    domTitle.setAttribute('data-language', picked_object.name);
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