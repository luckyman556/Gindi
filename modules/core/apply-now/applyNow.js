import {multiPhoneSelector} from "../../individual/apply-now/multiphoneSelector.js";

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

export function applyNow (parent,contentObject,useSubstrate = true, hideElementsArr =[]) {
  if (document.querySelector('.apply__main-container__outer')) {
    return;
  }

  let mainContainerOuter;
  let mainContainer;

  if (useSubstrate){
    mainContainerOuter = creatHtmlElement(parent,'','div',['apply__main-container__outer', 'non-canvas']);
    mainContainer = creatHtmlElement(mainContainerOuter,'','div',['apply__main-container', 'non-canvas']);
  } else {
    mainContainer = creatHtmlElement(parent,'','div',['apply__main-container']);
  }

  const contentWrapper = creatHtmlElement(mainContainer,'','div',['apply__content__wrapper']);

  const closeBtn = creatHtmlElement(mainContainer,'','div',['apply-btn__close']);
  closeBtn.setAttribute('id','applyCloseBtn');
  const titleContainer = creatHtmlElement(contentWrapper,'','div',['apply__title-container']);
  const title = creatHtmlElement(titleContainer,`${get_lang(contentObject.title.text)}`,'h2',['apply__title','language-string']);
  title.dataset.dictionary = contentObject.title.dic;
  const span = creatHtmlElement(titleContainer, get_lang(contentObject.subTitle.text),'span',['apply__sub-title','language-string']);

  span.dataset.dictionary = contentObject.subTitle.dic;

  //Icons
  const socialIcons = creatHtmlElement(contentWrapper,'','ul',['apply__social-icons']);
  contentObject.iconsArray.forEach(icon=>{
    const socialIconItem = creatHtmlElement(socialIcons,'','li',['apply__social-icon__item']);
    const href = creatHtmlElement(socialIconItem,'','a',['apply__social-href']);
    href.href = icon.href;
    (icon.target) ? href.setAttribute('target', icon.target) : '';
    const socialImg = creatHtmlElement(href,'','img',['apply__social-icon__img']);
    socialImg.src = `./img/social-icons/${icon.name.toLowerCase()}.svg`;
    socialImg.alt = get_lang(icon.name);
    const socialIconText = creatHtmlElement(href, get_lang(icon.name),'span',['apply__social-icon__text', 'language-string']);
    socialIconText.dataset.name= icon.name;
    socialIconText.dataset.dictionary = icon.name;
  });

  //separator
  const separatorContainer = creatHtmlElement(contentWrapper,'','div',['apply__separator-container']);

  // phoneSelector.insertAdjacentHTML('beforeend', `<>`);
  // creatHtmlElement(separatorContainer,'','div',['apply__left-separator']);
  // const separatorText = creatHtmlElement(separatorContainer,'or','span',['apply__separator-text']);
  // creatHtmlElement(separatorContainer,'','div',['apply__left-separator']);
  // last title to form
  // const childTitle = creatHtmlElement(contentWrapper,'Prefer we get back to you with a customized quote?','h3',['apply__form-titlle']);

  hideElements(hideElementsArr);

  closeBtn.addEventListener('click',()=>{
    closeBtnHandler();
    showElements(hideElementsArr);
  });

  multiPhoneSelector(contentWrapper, mainContainer);

}

function hideElements (hideArray) {
  if (hideArray.length > 0){
    hideArray.forEach(element =>{
      const domElement = document.querySelector(`.${element}`);
      if (domElement){
        domElement.style.display = 'none';
      }
    });
  }
}

function showElements (elementsArr) {
  if (elementsArr.length > 0){
    elementsArr.forEach(element => {
      const domElement = document.querySelector(`.${element}`);
      if (domElement){
        domElement.style.removeProperty('display');
      }
    });
  }
}

function closeBtnHandler () {
  const applyContainer = document.querySelector('.apply__main-container');

  const applyContainerOuter = document.querySelector('.apply__main-container__outer');
  if (applyContainerOuter){
    applyContainerOuter.remove();
    applyContainer.remove();
  }else {
    const applyContainer = document.querySelector('.apply__main-container');
    applyContainer.remove();
  }
}


