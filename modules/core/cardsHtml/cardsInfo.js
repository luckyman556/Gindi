export const cardsInfoHTML = {
    getUnitCardOptionsHtml : function (options, crmData) {
        let htmlForReturn = ``;
        options.forEach(function(option){
            let crmDataHtml = crmData[option.crmName];
            if (option.callback) {
                crmDataHtml = option.callback(crmData[option.crmName]);
            }
            let addToDictionary = '';
            if (option.addToDictionary) {
                addToDictionary = `<div class="add-to-dictionary">${ option.addToDictionary(crmData[option.crmName]) }</div>`;
            }
            let addClass = '';
            if (option.addClassCallback) {
                addClass = option.addClassCallback(crmData[ option.crmName ]);
            }
            let optionHtml = `
                    <div class="flat-option ${option.crmName} ${addClass}">
                        <div class="top-part">
                            <div class="ic"><img src="${option.imgUrl}" alt="" class="ic-img"></div>
                            <div class="text-box"><div class="middle-text language-string" data-dictionary="${option.dictionary}">${get_lang(option.dictionary)}</div>${addToDictionary}</div>
                            <div class="number">${crmDataHtml}</div>
                        </div>
                    </div>
            `;
            htmlForReturn += optionHtml;
        });
        return htmlForReturn;
    },
    getSearchCardOptionsHtml : function (options, crmData) {
        let htmlForReturn = ``;
        options.forEach(function(option){
            let crmDataHtml = crmData[ option.crmName ];
            let addClass = '';
            if (option.addClassCallback) {
                addClass = option.addClassCallback(crmData[ option.crmName ]);
            }
            if (option.callback) {
                crmDataHtml = option.callback(crmData[ option.crmName ]);
            }
            let addToDictionary = '';
            if (option.addToDictionary) {
                addToDictionary = `<div class="add-to-dictionary">${ option.addToDictionary(crmData[option.crmName]) }</div>`;
            }
            let optionHtml = `
                    <div class="option-item ${addClass}">
                        <div class="top">
                            <div class="ic">
                                <img src="${option.imgUrl}" alt="">
                            </div>
                            <div class="number">${crmDataHtml}</div>
                        </div>
                        <div class="bottom">
                            <div class="text language-string" data-dictionary="${option.dictionary}">${get_lang(option.dictionary)}</div>
                            ${addToDictionary}
                        </div>
                    </div> 
            `
            htmlForReturn += optionHtml;
        });
        return htmlForReturn;
    },
    getPopupCardOptionsHtml : function (options, crmData) {
        let htmlForReturn = ``;
        options.forEach(function(option){
            let bool = true;
            if (option.boolCallback) {
                bool = option.boolCallback(Number(crmData[option.crmName]));
            }

            if (bool) {
                let crmDataHtml = crmData[option.crmName];
                if (option.callback) {
                    crmDataHtml = option.callback(crmData[option.crmName]);
                }
                let addToDictionary = '';
                if (option.addToDictionary) {
                    addToDictionary = `<div class="add-to-dictionary">${ option.addToDictionary(crmData[option.crmName]) }</div>`;
                }

                let addClass = '';
                if (option.addClassCallback) {
                    addClass = option.addClassCallback(crmData[ option.crmName ]);
                }
                let optionHtml = `
                    <div class="info-item ${addClass}">
                        <div class="row">
                        <div class="icon">
                            <img src="${option.imgUrl}" alt="">
                        </div>
                        <span class="bottom">${crmDataHtml}</span></div>            
                         <div class="text"><span class="top language-string" data-dictionary="${option.dictionary}">${get_lang(option.dictionary)}</span>${addToDictionary}</div>
                    </div>
                `
                htmlForReturn += optionHtml;
            }
        });
        return htmlForReturn;
    },
}