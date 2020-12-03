export function flatBubbleHTML (flat) {
    let crmData = flat.userData.crm_data;
    let html;
    let textContainer = document.querySelector('.flat-bubble .text-container');
    if (textContainer.innerHTML.length == 0) {
        html = `<span class="prop-num">${crmData.userData.crm_data.propNum}</span><span class="model-name">${crmData.userData.crm_data.modelName}</span>`
        textContainer.innerHTML  = html;
    } else {
        textContainer.querySelector('.prop-num').innerHTML = crmData.userData.crm_data.propNum;
        textContainer.querySelector('.model-name').innerHTML = crmData.userData.crm_data.modelName;
    }
    return html;
}