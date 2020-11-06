import {flatBubbleHTML} from "../../individual/flatBubble/flatBubble.js";
export const flatBubble = {
    init : function () {
        let flatBubbleEl = document.querySelector('.flat-bubble');
        flatBubbleEl.innerHTML = `
            <div class="text-container"></div>
            <img src="./img/bubble-360.svg" alt="icon-360" wigth="24" height="24"></div>
        `;
    },
    updateText : function (flat) {
        let flatBubbleEl = document.querySelector('.flat-bubble');
        if (!flatBubbleEl.lastFlat) {
            flatBubbleEl.lastFlat = 'none';
        }
            if (flat.userData.customSelection) {
                let html = flat.userData.customSelectionBubbleHtml;
                flatBubbleHTML(all_appartments[0].userData.crm_data);
                let textContainer = document.querySelector('.flat-bubble .text-container');
                textContainer.classList.add('custom-selection');
                textContainer.querySelector('.model-name').innerHTML = html;
                let modelRooms = textContainer.querySelector('.model-rooms');
                if (modelRooms) {
                    modelRooms.style.display = 'none';
                }
                if (flat.userData.url_360) {
                    flatBubbleEl.querySelector('.flat-bubble > img').style.display = 'block';
                } else {
                    flatBubbleEl.querySelector('.flat-bubble > img').style.display = 'none';
                }
            } else {

                if (flatBubbleEl.lastFlat !== flat.userData.crm_data.propNum) {
                    let crmData = flat.userData.crm_data;
                    flatBubbleHTML(crmData);
                    let textContainer = document.querySelector('.flat-bubble .text-container');
                    textContainer.classList.remove('custom-selection');
                    let modelRooms = textContainer.querySelector('.model-rooms');
                    if (modelRooms) {
                        modelRooms.style.display = 'flex';
                    }
                    if (flat.userData.url_360_type === 'custom') {
                        flatBubbleEl.querySelector('.flat-bubble > img').style.display = 'block';
                    } else {
                        flatBubbleEl.querySelector('.flat-bubble > img').style.display = 'none';
                    }

                    flatBubbleEl.lastFlat = flat.userData.crm_data.propNum;

                }
            }
        //flatBubble.updatePosition(current_mouse_position.y, current_mouse_position.x);
    },
    updatePosition : function (top,left) {
        let flatBubbleEl = document.querySelector('.flat-bubble');
        flatBubbleEl.style.top = top + 'px';
        flatBubbleEl.style.left = left + 'px';
    },
    hide : function () {
        let flatBubbleEl = document.querySelector('.flat-bubble');
        flatBubbleEl.classList.remove('show');
    },
    show : function () {
        let flatBubbleEl = document.querySelector('.flat-bubble');
        flatBubbleEl.classList.add('show');
    }
}