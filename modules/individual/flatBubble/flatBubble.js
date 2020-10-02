export function flatBubbleHTML (crmData) {
    let html = `<span class="prop-num">${crmData.propNum}</span> · <span class="model-name">${crmData.modelName}</span>`
    return html;
}