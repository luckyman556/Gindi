export function labelHtml (flat) {
    let inner_html;

    let flat_status = flat.userData.crm_data.status;
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
    if (flat.userData.status_index == 1) {
        let icon_360 = `<img src="./img/flat-card_360.svg" alt="icon-360">`;
        let empty = '';
        inner_html = `
                        <div class="flat-card-box">
                            <h3><span class="flat-card-title_name language-string" data-he="${apt_text_he}" data-en="${apt_text_en}">${apt_text}</span> <span class="flat-card-title_number">${flat.userData.crm_data.modelName + ' - ' +  flat.userData.crm_data.propNum}</span></h3>
                            <div class="price-row">
                                <span class="pulse blue"></span>
                                <span class="circle" style="background-color: #${flat.userData.status_color}"></span>
                                ${flat.userData.url_360_type === 'custom' ? icon_360 : empty}
                            </div>                            
                        </div>`
    } else {
        inner_html = `
                        <div class="flat-card-box">
                        <h3><span class="flat-card-title_name language-string" data-he="${apt_text_he}" data-en="${apt_text_en}">${apt_text}</span> <span class="flat-card-title_number">${flat.userData.crm_data.modelName + ' - ' + flat.userData.crm_data.propNum}</span></h3>
                            <p class="unavailable-row">
                                <span class="circle" style="background-color: #${flat.userData.status_color}"></span> 
                                <span class="pulse red"></span><span class="language-string"  data-he="${status_text_he}" data-en="${status_text_en}" >${status_text}</span>
                            </p>
                        </div>
                    `;
    }
    return inner_html;
}