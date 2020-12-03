export function flatBubbleHTML (flat) {
    let crmData = flat.userData.crm_data;
    let html;
    let textContainer = document.querySelector('.flat-bubble .text-container');
    if (textContainer.innerHTML.length == 0) {
        html = `<span class="prop-num">${crmData.propNum}</span> · <span class="model-name">${crmData.modelName}</span>`
        textContainer.innerHTML  = html;
    } else {
        textContainer.querySelector('.prop-num').innerHTML = crmData.propNum;
        textContainer.querySelector('.model-name').innerHTML = crmData.modelName;
    }

    return html;
}