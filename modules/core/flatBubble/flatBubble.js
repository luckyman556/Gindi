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
        let crmData = flat.userData.crm_data;
        flatBubbleEl.querySelector('.text-container').innerHTML = flatBubbleHTML(crmData);
        if (flat.userData.url_360_type === 'custom') {
            flatBubbleEl.querySelector('img').style.display = 'block';
        } else {
            flatBubbleEl.querySelector('img').style.display = 'none';
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