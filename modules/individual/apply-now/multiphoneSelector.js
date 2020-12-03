'use strict';

export const multiPhoneSelector = (contentWrapper, mainContainer) => {
    const phoneNumbers = [{country: 'ukraine', phone: '+380677772020', lang: 'en'}, {country: 'israel', phone: '*6591', lang: 'he'}];

    const phoneSelector = creatHtmlElement(contentWrapper,'','div',['apply__content__phone-selector']);
    const activeCountry = creatHtmlElement(phoneSelector,'','div',['phone-selector__active']);
    const phoneList = creatHtmlElement(phoneSelector,'','ul',['phone-selector__list']);
    const activePhoneNumber = creatHtmlElement(phoneSelector,'','a',['phone-selector__active-phone']);
    activePhoneNumber.setAttribute('dir', 'ltr');

    let activePhone;

    phoneNumbers.forEach(item => {
        if (c_lang() === item.lang) {
            activePhone = item.phone;
            activeCountry.innerHTML = `<span data-country=${item.country}>${item.country}</span>`;
            activePhoneNumber.setAttribute('href', `tel:${item.phone}">`);
            activePhoneNumber.innerText = item.phone;
        }
    });

    mainContainer.addEventListener('click', event => {
        let btn = event.target;

        if (phoneList.classList.contains('open')) {
            phoneNumbers.forEach(item => {
               if (btn.dataset.country === item.country) {
                    activeCountry.innerHTML = `<span data-country=${item.country}>${item.country}</span>`;
                    activePhoneNumber.setAttribute('href', `tel:${item.country}">`);
                    activePhoneNumber.innerText = item.phone;
                   activePhone = item.phone;
               } else if (!btn) {
                   phoneList.classList.remove('open');
               }
            });

            phoneList.classList.remove('open');
            phoneList.innerHTML = '';
            return;
        }

        if (!btn) {
            return;
        } else if (btn !== activeCountry) {
            btn = event.target.parentNode;
            if (btn !== activeCountry) {
                return;
            }
        }

        phoneNumbers.forEach(item => {
           if (item.phone !== activePhone) {
               phoneList.innerHTML += `<li class="phone-selector__item" data-country=${item.country} data-phone=${item.sign}${item.phone}>${item.country}</li>`;
           }
        });

        phoneList.classList.add('open');
    });
}

function creatHtmlElement(parent, elementName, elementTag, elementClass) {
    const el = document.createElement(elementTag);
    if (Array.isArray(elementClass)){
        elementClass.forEach(classElement => {
            el.classList.add(classElement);
        });
    }else{
        el.style.cssText=elementClass;
    }
    el.textContent = elementName;
    if (parent) {
        parent.appendChild(el);
    }
    return el;
}