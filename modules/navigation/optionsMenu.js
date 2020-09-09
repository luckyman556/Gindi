import { liveToggler } from "../add-models.js";
import { add_street_names } from "../street-names/add-street-names.js";
import { SwipeScript } from "../../js/swipe.js";
import { loadEnvironment } from "../add-models.js";

let environmentShow = true;

export const optionsMenu = (optionsObject) => {
    const containerLeft = createElements('div', 'left-nav-bar', document.body);
    const options = createElements('button', 'button-options', containerLeft);
    const containerMenu = createElements('div', 'options__menu', document.body);
    const zoomControls = document.querySelector('.zoom-controls');
    const compass = document.querySelector('.compass');
    const searchBtn = document.querySelector('.search-btn');
    const floorSelection = document.querySelector('.floors-selector-n-back');
    const miniCard = document.querySelector('.popup-info');

    options.setAttribute('data-type', 'options');

    if (low_performance_mode) {
        environmentShow = false;
        optionsObject.forEach(item => item.active = false);
    }

    containerLeft.addEventListener('click', function(event) {
        const btn = event.target;

        if (containerMenu.classList.contains('open')) {
            const wrapper = document.querySelector('.options__menu-wrapper');
            containerMenu.classList.remove('open');
            wrapper.remove();

            return;
        }

        if (btn.getAttribute('data-type') === 'options') {
            loadHTML(containerMenu, optionsObject);
            showAndSetStatusesButtons(optionsObject);
            setInputListener(optionsObject);
            containerMenu.classList.add('open');
            lock_autorotate = true;

            document.querySelector('.three_js').addEventListener('click', closeOptionsMenu);
            document.querySelector('.three_js').addEventListener('touchstart', closeOptionsMenu);

            function closeOptionsMenu() {
                containerMenu.classList.remove('open');
                lock_autorotate = false;
                containerMenu.innerHTML = '';

                if (window.innerWidth < 420) {
                    setOrRemoveClass('hide', 'remove', options, zoomControls, compass, searchBtn, miniCard, floorSelection);
                }
                document.querySelector('.three_js').removeEventListener('click', closeOptionsMenu);
                document.querySelector('.three_js').removeEventListener('touchstart', closeOptionsMenu);
            }

            if (window.innerWidth < 420) {
                SwipeScript();

                setOrRemoveClass('hide', 'set', options, zoomControls, compass, searchBtn, miniCard);

                if (floorSelection.classList.contains('show')) {
                    floorSelection.classList.add('hide');
                }

                document.addEventListener('swiped-down', function(e) {
                    containerMenu.classList.remove('open');

                    setOrRemoveClass('hide', 'remove', options, zoomControls, compass, searchBtn, miniCard, floorSelection);

                    setTimeout(() => {
                        const wrapper = document.querySelector('.options__menu-wrapper');
                        if (wrapper) {
                            wrapper.remove();
                        }
                    }, 1000);
                });
            }
        }
    });

    return optionsObject;
}

function setOrRemoveClass(className, action, ...elements) {

    if (action === 'set') {
        elements.forEach(elem => elem.classList.add(className));
    } else if (action === 'remove') {
        elements.forEach(elem => {
            if (elem.classList.contains(className)) {
                elem.classList.remove(className);
            }
        });
    }
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
        lock_autorotate = false;
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
            <label for="options_${item.type}" class="options__menu-label options__menu-label--${item.type}"><span data-dictionary=${item.type} class="language-string">${get_lang(item.type)}</span></label>
        </div>`);
    });

    const inputSwitch = document.getElementById('optionsSwitch');

    if (!inputSwitch) {
        buttonSwitcher.insertAdjacentHTML('afterbegin', `<input type="checkbox" data-input="optionsSwitch" class="options__menu-input" id="optionsSwitch" ${(environmentShow) ? 'checked' : ''}>`);
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
             turnOffAllEnvironment(optionsObject);


         } else {
             optionsObject.forEach(option => {
                if (option.type === targetInput) {
                    option.active = !option.active;
                }
             });
            liveToggler(optionsObject);
         }
        showAndSetStatusesButtons(optionsObject);
     }
}

function turnOffAllEnvironment(optionsObject) {
    environmentShow = !environmentShow;
    let newOptions = [...optionsObject];
    newOptions.forEach(item => item.active = false);

    if (environmentShow) {
        loadEnvironment(on_load_texture);

        function on_load_texture() {
            loaded_texture_counter++;
        }
    }

    const env = scene.getObjectByName('environment');
    const instaTree = scene.getObjectByName('instanceTree');
    instaTree.visible = environmentShow;
    scene.remove(env);

    liveToggler(newOptions);
    add_street_names(environmentShow);
}

// get_url_param()