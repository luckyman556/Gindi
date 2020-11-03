import {CSS2DObject} from "../../../../node_modules/three/examples/jsm/renderers/CSS2DRenderer.js";
import {labelHtml} from "../../../individual/destroyedBuilding/flatLabels/flat-labels.js";

export function init (maxLabelsCount) {
    let labels_i = 0;
    while (labels_i <= maxLabelsCount) {
        var text = document.createElement( 'div' );
        text.className = 'flat_status_2d_css';
        var label = new CSS2DObject( text );
        label.position.set(0,0,0);

        label.renderOrder = 1;
        label.visible = false;
        scene.add(label);
        flat_labels_group[labels_i] = label;
        labels_i++;
    }
    var floor_center_text = document.createElement( 'div' );

    floor_center_text.className = 'floor_center_2d_css';
    var floor_center_text_obj = new CSS2DObject( floor_center_text );
    floor_center_text_obj.renderOrder = 0;
    floor_center_text_obj.position.set(0,0,0);
    floor_center_text_obj.visible = false;
    scene.add(floor_center_text_obj);

    var last_click_point = document.createElement( 'div' );

    last_click_point.className = 'last_click_point';
    var last_click_point_obj = new CSS2DObject( last_click_point );
    last_click_point_obj.renderOrder = 0;
    last_click_point_obj.position.set(0,0,0);
    let inner_html = `
            <div class="pulse"></div>
    `;
    last_click_point_obj.element.innerHTML = inner_html;
    last_click_point_obj.visible = false;

    scene.add(last_click_point_obj);
    window.last_clicked_point_css = last_click_point_obj;
    flat_labels_group[maxLabelsCount] = floor_center_text_obj;


    let flatBubble3dHtml = document.createElement( 'div' );
    let flatBubble3d = new CSS2DObject( flatBubble3dHtml );
    flatBubble3d.name = 'flatBubble3d';
    flatBubble3d.renderOrder = 0;
    flatBubble3d.position.set(0,0,0);
    flatBubble3d.element.innerHTML = '';
    flatBubble3d.visible = false;
    scene.add(flatBubble3d);

}
export function update (dynamic = false) {
    flat_labels_group.forEach(function(item){
        item.visible = false;
        $(item.element).removeClass('active');

    });
    if (last_clicked_flat != undefined) {
        if (lock_mouse_rotation_x == true) {
            window.floor_obj[current_floor].forEach(function(flat, index){
                if (flat.name.search('floor_center') == -1) {

                    let inner_html = '';
                    let price = Math.floor(flat.userData.crm_data.salePrice);
                    let flat_status = flat.userData.crm_data.status;
                    let price_html = get_price_html (price);

                    let apt_text_en = 'Apt.';
                    let apt_text = apt_text_en;
                    let apt_text_he = 'דירה';
                    if ($(window).width() < 1024) {
                        apt_text_he  = 'ד.';
                    }

                    let status_text = '';
                    let status_text_en = flat_status;
                    status_text = status_text_en;
                    let status_text_he = '';
                    if (flat_status == "Sold") {
                        status_text_he = 'נמכר';
                    } else if (flat_status == "Unavailable")  {
                        status_text_he = 'לא זמינה';
                    }
                    if ($(window).width() < 1024) {
                        status_text_he  = '';
                    }

                    if ($('body').hasClass('he') == true) {
                        apt_text = apt_text_he;
                        status_text = status_text_he;
                    }


                    inner_html = labelHtml(flat);
                    $('.float-text.flat-' + flat.userData.flat_i).addClass('active');
                    if (flat.userData.world_position == undefined) {
                        flat.userData.world_position = flat.children[0].getWorldPosition(new global_three.Vector3());
                    }
                    let p;
                    if (dynamic == true) {
                        p = flat.children[0].getWorldPosition(new global_three.Vector3());
                    } else {
                        p = flat.children[0].userData.defaultWorldPosition;
                    }

                    flat_labels_group[index].position.set(p.x , p.y + 3, p.z );
                    flat_labels_group[index].element.innerHTML = inner_html;
                    flat_labels_group[index].visible = true;
                    setTimeout(function(){
                        $(flat_labels_group[index].element).addClass('active');
                    }, 100);
                } else {
                    let floor_text = 'Floor';
                    let floor_number;
                    let floorCenter = flat.parent.getObjectByName('floor_center');
                    if (flat.parent.children[0].name.search('zagluha') == -1) {
                        floor_number = flat.parent.children[0].userData.crm_data.floorNum;
                    } else {
                        floor_number = flat.parent.children[1].userData.crm_data.floorNum;
                    }

                    if ($('body').hasClass('he') == true) {
                        floor_text = 'קומה';
                    }
                    let inner_html = `
                        <div class="floor-center-text">
                            <div class="text language-string" data-dictionary="floor-upper">${floor_text}</div>
                            <div class="number">${floor_number}</div>
                         </div>
                    `;



                    let p;
                    p = floorCenter.userData.defaultWorldPosition;
                    flat_labels_group[flat_labels_group.length - 1].name = 'floorCenterLabel';
                    flat_labels_group[flat_labels_group.length - 1].position.set(p.x , p.y + globalSettings.destroyedBuilding.flatLabels.centerLabelTop , p.z );
                    flat_labels_group[flat_labels_group.length - 1].element.innerHTML = inner_html;
                    flat_labels_group[flat_labels_group.length - 1].visible = true;

                }
            });
        } else {

        }
    }
}