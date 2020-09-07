export const optionsMenu = (optionsObject) => {
    const containerLeft = createElements('div', 'left-nav-bar', document.body);
    const containerMenu = createElements('div', 'options__menu', document.body);

    const options = createElements('button', 'button-options', containerLeft);
    options.setAttribute('data-type', 'options');

    console.log(optionsObject);

    loadHTML(containerMenu);

    const btnClose = document.querySelector('.options__menu-close');
    const menu = document.querySelector('.options__menu');

    containerLeft.addEventListener('click', function(event) {
        const btn = event.target;

        if (btn.getAttribute('data-type') === 'options') {
            menu.classList.add('open');
            console.log(optionsObject);
        }
    });

    btnClose.addEventListener('click', event => {
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');
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
    <!--                <div id="options-toggler" class="options-toggler">-->
    <!--                    <div class="options-toggle">-->
    <!--                        <input type="checkbox" class="options-check">-->
    <!--                        <b class="b options-switch"></b>-->
    <!--                        <b class="b options-track"></b>-->
    <!--                    </div>-->
    <!--                </div>-->
                    <div class="options__menu-switcher">
                        <input type="checkbox" class="options__menu-input" id="options-switch" checked>
                        <label for="options-switch" class="options__menu-switch"></label>
                    </div>
                </div>
                <div class="options__menu-buttons">
                    <div class="options__menu-button">
                        <input type="checkbox" class="options__menu-input" id="optionsPedestrians">
                        <label for="optionsPedestrians" class="language-string options__menu-label options__menu-label--pedestrians" data-dictionary="pedestrians"><span>${get_lang('pedestrians')}</span></label>
                    </div>
                    <div class="options__menu-button">
                        <input type="checkbox" class="options__menu-input" id="optionsBicycles">
                        <label for="optionsBicycles" class="language-string options__menu-label options__menu-label--bicycles" data-dictionary="bicycles"><span>${get_lang('bicycles')}</span></label>
                    </div>
                    <div class="options__menu-button">
                        <input type="checkbox" class="options__menu-input" id="optionsCars">
                        <label for="optionsCars" class="language-string options__menu-label options__menu-label--cars" data-dictionary="cars"><span>${get_lang('cars')}</span></label>
                    </div>
                    <div class="options__menu-button">
                        <input type="checkbox" class="options__menu-input" id="optionsBirds">
                        <label for="optionsBirds" class="language-string options__menu-label options__menu-label--birds" data-dictionary="birds"><span>${get_lang('cars')}</span></label>
                    </div>
                </div>
            </div>
        </div>
    `);
}