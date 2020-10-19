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


export function getApp(logoUrl, qrCode, projectName, appStoreLink,playMarketLink) {
    const mainContainer = creatHtmlElement(document.body,'','div',['get-app__main-container']);
    const contentContainer = creatHtmlElement(mainContainer,'','div',['get-app__content-container']);
    const closeBtn = creatHtmlElement(contentContainer,'','img',['get-app__close-btn']);
    closeBtn.src = './img/close-get-app.svg';
    const title = creatHtmlElement(contentContainer,'Get app','h2',['get-app__title']);

    const logoWrapper = creatHtmlElement(contentContainer,'','div',['get-app__logo-wrapeer']);
    const logoImg = creatHtmlElement(logoWrapper,'','img',['get-app__logo-img']);
    logoImg.src = logoUrl;

    const projectNameTitle = creatHtmlElement(contentContainer,`${projectName}`,'h3',['get-app__project-name']);

    const qrCodeWrapper = creatHtmlElement(contentContainer,'','div',['get-app__qr-code__wrapper']);
    const img = creatHtmlElement(qrCodeWrapper,'','img',['get-app__qr-code__img']);
    img.src = qrCode;
    const btnWrapper = creatHtmlElement(contentContainer,'','div',['get-app__btn-container']);

    const iosLink = creatHtmlElement(btnWrapper,'','a',['get-app__link']);
    iosLink.href=appStoreLink;
    const iosBtn = creatHtmlElement(iosLink,'','img',['get-app__btn']);
    iosBtn.src='./img/appstore_button.svg';

    const androidLink = creatHtmlElement(btnWrapper,'','a',['get-app__link']);
    androidLink.href=playMarketLink;
    const androidBtn = creatHtmlElement(androidLink,'','img',['get-app__btn']);
    androidBtn.src='./img/google_play_button.svg';

    closeBtn.addEventListener('click', closeHandler);
}

function closeHandler() {
    const container = document.querySelector('.get-app__main-container');
    if (container){
        container.remove();
    }
}