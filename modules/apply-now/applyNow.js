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

export function applyNow (parent) {
  const contentWrapper = creatHtmlElement(parent,'','div',['apply__content__wrapper']);
  const closeBtn = creatHtmlElement(parent,'','div',['apply-btn__close']);
  closeBtn.setAttribute('id','applyCloseBtn');
  const titleContainer = creatHtmlElement(contentWrapper,'','div',['apply__title-container']);
  const title = creatHtmlElement(titleContainer,'Get in touch today','h2',['apply__title']);
  const span = creatHtmlElement(titleContainer,'Our customer service representatives are happy to help 24/7','span',['apply__sub-title']);
  //Icons
  const socialIcons = creatHtmlElement(contentWrapper,'','ul',['apply__social-icons']);
  const iconsArray =[
    {
      name: 'Messenger',
      href: 'https://m.me/Gindi.Tel.Aviv'
    },
    // {
    //   name: 'Chat',
    //   href: '#',
    // },
    {
      name: 'Whatsapp',
      href: 'https://wa.me/972548620020'
    },
    // {
    //   name: 'E-mail',
    //   href: '#'
    // },
    {
      name: 'SMS',
      href: 'tel:972524037449'
    },
    {
      name: 'Phone',
      href: 'tel:0747290013'
    },
    // {
    //   name: 'Video Chat',
    //   href: '#'
    // },
  ];
  iconsArray.forEach(icon=>{
    const socialIconItem = creatHtmlElement(socialIcons,'','li',['apply__social-icon__item']);
    const href = creatHtmlElement(socialIconItem,'','a',['apply__social-href']);
    href.href = icon.href;
    const socialImg = creatHtmlElement(href,'','img',['apply__social-icon__img']);
    socialImg.src = `./img/social-icons/${icon.name.toLowerCase()}.svg`;
    socialImg.alt = icon.name;
    const socialIconText = creatHtmlElement(href,icon.name,'span',['apply__social-icon__text']);
    socialIconText.dataset.name= icon.name;
  });
  //separator
  const separatorContainer = creatHtmlElement(contentWrapper,'','div',['apply__separator-container']);
  // creatHtmlElement(separatorContainer,'','div',['apply__left-separator']);
  // const separatorText = creatHtmlElement(separatorContainer,'or','span',['apply__separator-text']);
  // creatHtmlElement(separatorContainer,'','div',['apply__left-separator']);
  // last title to form
  // const childTitle = creatHtmlElement(contentWrapper,'Prefer we get back to you with a customized quote?','h3',['apply__form-titlle']);
  closeBtn.addEventListener('click',closeBtnHandler);
}

function closeBtnHandler () {
  const container = document.querySelector('.apply__main-container');
  container.classList.remove('open');
  openedPopup.classList.add('open');
  openedPopup.style.display = 'block';
  const printerBtn = document.querySelector('.print-btn');
  printerBtn.style.display='block';
}


