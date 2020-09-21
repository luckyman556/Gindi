import { add_street_names } from "../modules/street-names/add-street-names.js";
import {getCookie, setCookie} from "./setAndGetCookies.js";

export const langSwitcher = () => {
    const languages = ['EN', 'HE'];
    let currentLang = languages[0];

    const body = document.querySelector('body');
    const container = createHtmlLanguage('div', 'class', 'lang-container language-switch non-canvas');
    const button = createHtmlLanguage('div', 'class', `lang-button language active`);
    const dropdown = createHtmlLanguage('div', 'class', 'lang-dropdown');

    languageUserdetector(button, dropdown, currentLang, languages);

    body.append(container);
    container.append(button);
    container.append(dropdown);

    container.addEventListener('click', (event) => {
        dropdown.classList.toggle('active');
        button.classList.toggle('open');

        changeLanguageByUserSelect(event, button, dropdown, currentLang, languages);
    });
}

function changeContentText(currentLang) {
    const textNodes = document.querySelectorAll('.language-string');

    textNodes.forEach(item => {
        if (item.getAttribute('data-dictionary')) {
            if (item.getAttribute('data-dictionary-param')) {
                const param = item.getAttribute('data-dictionary-param');
                item.setAttribute(param, get_lang (item.getAttribute('data-dictionary')));
            } else {
                item.innerText = get_lang (item.getAttribute('data-dictionary'));
            }

        } else {
            if (currentLang === 'HE') {
                item.innerText = item.getAttribute('data-he');
            } else if (currentLang === 'EN') {
                item.innerText = item.getAttribute('data-en');
            }
        }
    });
}

function createHtmlLanguage(elementTag, name, attribute) {
    const element = document.createElement(elementTag);
    element.setAttribute(name, attribute);

    return element;
}
function setActiveLanguage(button, dropdown, currentLang, languages) {
    const html = document.querySelector('html');
    const body = document.querySelector('body');

    button.innerHTML = `${currentLang}`;
    dropdown.innerHTML = '';
    languages.forEach(lang => {
        if (lang !== currentLang) {
            dropdown.innerHTML += `<p class="lang-list" data-language=${lang}>${lang}</p>`;
        }

        if (body.classList.contains(lang.toLowerCase())) {
            body.classList.remove(lang.toLowerCase());
        }
    });

    body.classList.add(currentLang.toLowerCase());
    html.setAttribute('lang', currentLang.toLowerCase());
    html.setAttribute('dir', (currentLang === 'HE') ? 'rtl' : 'ltr');

    if (!low_performance_mode) {
        add_street_names(true);
    }
    changeContentText(currentLang);
    setCookie('language', currentLang, {'max-age': 9999999});
}
function languageUserdetector(button, dropdown, currentLang, languages) {

    if (!getCookie('language')) {
        let userLang = window.navigator.language.toUpperCase();
        languages.forEach(lang => (userLang === lang) ? currentLang = userLang : currentLang);
    } else {
        currentLang = getCookie('language');
    }

    setActiveLanguage(button, dropdown, currentLang, languages);
}
function changeLanguageByUserSelect(event, button, dropdown, currentLang, languages) {
    const targetList = document.querySelectorAll('.lang-list');

    targetList.forEach(target => {
        if (event.target === target) {
            const userSelect = event.target.getAttribute('data-language');
            currentLang = userSelect;
            setActiveLanguage(button, dropdown, currentLang, languages);
        }
    });
}
// function getCookie(name) {
//     let matches = document.cookie.match(new RegExp(
//         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//     ));
//     return matches ? decodeURIComponent(matches[1]) : undefined;
// }
// function setCookie(name, value, options= {}) {
//     options = {
//         path: '/',
//         ...options
//     };
//
//     if (options.expires instanceof Date) {
//         options.expires = options.expires.toUTCString();
//     }
//
//     let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
//
//     for (let optionKey in options) {
//         updatedCookie += "; " + optionKey;
//         let optionValue = options[optionKey];
//         if (optionValue !== true) {
//             updatedCookie += "=" + optionValue;
//         }
//     }
//
//     document.cookie = updatedCookie;
// }
