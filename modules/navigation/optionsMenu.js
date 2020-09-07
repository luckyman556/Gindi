import {liveToggler} from "../add-models.js";

let environmentShow = true;

export const optionsMenu = (optionsObject) => {
    const containerLeft = createElements('div', 'left-nav-bar', document.body);
    const containerMenu = createElements('div', 'options__menu', document.body);
    const options = createElements('button', 'button-options', containerLeft);
    options.setAttribute('data-type', 'options');

    containerLeft.addEventListener('click', function(event) {
        const btn = event.target;

        if (btn.getAttribute('data-type') === 'options') {
            const menu = document.querySelector('.options__menu');
            loadHTML(containerMenu, optionsObject);
            showAndSetStatusesButtons(optionsObject);
            setInputListener(optionsObject);
            menu.classList.add('open');
        }
    });

    return optionsObject;
}

function createElements(tag, className, parent) {
    const element = document.createElement(tag);
    element.classList.add(className);

    if (tag === 'button') {
        element.setAttribute('type', 'button');
    }

    parent.append(element);

    return element;
}

function loadHTML(containerMenu) {
    containerMenu.insertAdjacentHTML('afterbegin', `
        <div class="options__menu-wrapper">
            <button type="button" class="options__menu-close"></button>
            <div class="options__menu-content">
                <div class="options__menu-header">
                    <h2 class="options__menu-title language-string" data-dictionary="environment">${get_lang('environment')}</h2>
                    <div class="options__menu-switcher">                        
                        <label for="optionsSwitch" class="options__menu-switch"></label>
                    </div>
                </div>
                <div class="options__menu-buttons"></div>
            </div>
        </div>
    `);

    const btnClose = document.querySelector('.options__menu-close');
    const menu = document.querySelector('.options__menu');

    btnClose.addEventListener('click', event => {
        menu.classList.remove('open');
        containerMenu.innerHTML = '';
    });
}

function showAndSetStatusesButtons(optionsObject) {
    const buttonSwitcher = document.querySelector('.options__menu-switcher');
    const buttonsContainer = document.querySelector('.options__menu-buttons');

    buttonsContainer.innerHTML = '';

    optionsObject.forEach(item => {
        let status = item.active;
        (!environmentShow) ? status = false : status;

        buttonsContainer.insertAdjacentHTML('beforeend', `<div class="options__menu-button">
            <input type="checkbox" class="options__menu-input" data-input=${item.type} id="options_${item.type}" ${(status) ? 'checked' : ''} ${(!environmentShow) ? 'disabled' : ''}>
            <label for="options_${item.type}" class="language-string options__menu-label options__menu-label--${item.type}" data-dictionary=${item.type}><span>${get_lang(item.type)}</span></label>
        </div>`);
    });

    console.log(environmentShow);
    const inputSwitch = document.getElementById('optionsSwitch');

    if (!inputSwitch) {
        buttonSwitcher.insertAdjacentHTML('afterbegin', `<input type="checkbox" data-input="optionsSwitch" class="options__menu-input" id="optionsSwitch" ${(environmentShow) ? 'checked' : ''}>`);
    } else {

    }
}

function setInputListener(optionsObject) {
    const inputSwitch = document.getElementById('optionsSwitch');
    const buttonsContainer = document.querySelector('.options__menu-buttons');

    inputSwitch.addEventListener('change', handleChangeInput);
    buttonsContainer.addEventListener('change', handleChangeInput);

     function handleChangeInput(event) {
         const targetInput = event.target.getAttribute('data-input');

         if (targetInput === 'optionsSwitch') {
             environmentShow = !environmentShow;
         } else {
             optionsObject.forEach(option => {
                if (option.type === targetInput) {
                    option.active = !option.active;
                }
             });
         }
         showAndSetStatusesButtons(optionsObject);
         liveToggler(optionsObject);
     }
}