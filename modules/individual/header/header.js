import { SwipeScript } from "../../../js/swipe.js";
import {langSwitcher} from "../../core/language/langSwitcher.js";

export const Header = () => {

    if (document.querySelector('.header') || document.querySelector('.header__wrapper-mobile')) {
        const header = document.querySelector('.header');
        const headerWrapper= document.querySelector('.header__wrapper-mobile');
        header.remove();
        headerWrapper.remove();
    }

    const menuItems = [
        {
            name: '3D Model',
            url: {
                en: '#',
                he: '#'
            }
        },
        {
            name: 'About',
            url: {
                en: 'https://www.odessa2020.net/en/new-homepage-en/#about',
                he: 'https://www.odessa2020.net/#abuot'
            }
        },
        {
            name: 'The Developers',
            url: {
                en: 'https://www.odessa2020.net/en/new-homepage-en/#hayazamim',
                he: 'https://www.odessa2020.net/#hayazamim'
            }
        },
        {
            name: 'Get app',
            url: {
                en: '#',
                he: '#'
            }
        },
        {
            name: 'Contact us',
            url: {
                en: '#',
                he: '#'
            }
            // url: {
            //     en: 'https://www.odessa2020.net/en/new-homepage-en/#contact',
            //     he: 'https://www.odessa2020.net/#contact'
            // }
        },
    ];
    const contacts = [
        {
            type: 'phone',
            number: '*6591',
        },
        {
            type: 'email',
            number: 'office@odessa2020.net',
        },
    ];

    createHtml(menuItems, contacts);
    burgerMenu();

    const contacrUs = document.querySelector('.navigation__contactus');

    contacrUs.addEventListener('click', () => {
        document.querySelector('.popup-apply').classList.add('open');
        document.querySelector('.popup-outer').style = 'display: block';

        console.log('click');

        // const applyContainer = document.querySelector('.popup-apply');
        // applyContainer.classList.add('open');
        // applyContainer
    });
}
function burgerMenu() {
    const btnBurger = document.querySelector('.burger-btn');
    const headerWrapper = document.querySelector('.header__wrapper-mobile');
    const header = document.querySelector('.header');
    SwipeScript(headerWrapper);

    btnBurger.addEventListener('click', handleMenu);
    headerWrapper.addEventListener('swiped-up', handleMenu);

    function handleMenu() {
        const card = document.querySelector('.popup-info');

        if (card.classList.contains('show') && header.classList.contains('show')) {
            card.classList.remove('hide');
            card.classList.add('show');
        } else {
            card.classList.add('hide');
            card.classList.remove('show');
        }
        // window.render_pause = (!window.render_pause && header.classList.contains('show'));

        headerWrapper.classList.toggle('show');
        btnBurger.classList.toggle('show');
        header.classList.toggle('show');

    }
}
function createHtml(menuItems, contacts) {

    document.body.insertAdjacentHTML('afterbegin', `<header class="header">
    <div class="logo__container">
        <a href="https://www.odessa2020.net/" class="logo__link">
            <img src="img/logo_header.svg" alt="company logo">
        </a>
    </div>
    <div class="header__wrapper">
        <nav class="navigation">
            <ul class="navigation__list"></ul>
        </nav>
        <div class="navigation__contacts">
            <a href='mailto:${contacts[1].number}' class="navigation__mail">${contacts[1].number}</a>
            <a href="tel:${contacts[0].number}" class="navigation__phone">${contacts[0].number}</a>
        </div>        
        <div class="navigation__social">
            <a href="https://www.facebook.com/Odessa2020Arcadia/" class="navigation__social-item" target="_blank"></a>
        </div>
    </div>
    <button type="button" class="burger-btn"></button>
</header>
    <div class="header__wrapper-mobile">
        <nav class="navigation">
            <ul class="navigation__list">
            </ul>
        </nav>
    <div class="navigation__contacts">
        <a href='mailto:${contacts[1].number}' class="navigation__mail">${contacts[1].number}</a>
        <a href="tel:${contacts[0].number}" class="navigation__phone">${contacts[0].number}</a>
    </div>
    <div class="navigation__social">
        <a href="https://www.facebook.com/Odessa2020Arcadia/" class="navigation__social-item" target="_blank"></a>
    </div>
</div>`);

    const menuList = document.querySelectorAll('.navigation__list');
    const navItemMenu = document.querySelectorAll('.navigation__contacts');

    setItemsMenu(menuList, menuItems, navItemMenu);
}

function setItemsMenu(menuList, menuItems, navItemMenu) {
    // langSwitcher();
    menuItems.forEach(item => {
        if (item.name !== 'Contact us') {
            menuList.forEach(menu => menu.insertAdjacentHTML('beforeend', `
                <li class="navigation__item ${(item.name === '3D Model') ? 'active' : ''}">
                    <a href="${item.url[c_lang ()]}" class="navigation__link language-string" data-dictionary="${item.name}">${get_lang(item.name)}</a>
                </li>`
            ));
        } else {
            navItemMenu.forEach(menu => menu.insertAdjacentHTML('afterend', `<div href="${item.url[c_lang ()]}" class="apply-now scroll_to_contacts navigation__contactus language-string" data-dictionary="${item.name}">${get_lang(item.name)}</div>`));
        }
    });
}
