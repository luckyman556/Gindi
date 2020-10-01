export const cardsInfoHTML = {
    getUnitCardOptionsHtml : function (options, crmData) {
        let htmlForReturn = ``;
        options.forEach(function(option){
            let crmDataHtml = crmData[option.crmName];
            let optionHtml = `
                    <div class="flat-option ${option.crmName}">
                        <div class="top-part">
                            <div class="ic"><img src="${option.imgUrl}" alt="" class="ic-img"></div>
                            <div class="middle-text language-string" data-dictionary="${option.dictionary}">${get_lang(option.dictionary)}</div>
                            <div class="number">${crmDataHtml}</div>
                        </div>
                    </div>
            `
            htmlForReturn += optionHtml;
        });
        return htmlForReturn;
    },
    getSearchCardOptionsHtml : function (options, crmData) {
        let htmlForReturn = ``;
        options.forEach(function(option){
            let crmDataHtml = crmData[option.crmName];
            let optionHtml = `
                    <div class="option-item">
                        <div class="top">
                            <div class="ic">
                                <img src="${option.imgUrl}" alt="">
                            </div>
                            <div class="number">${crmDataHtml}</div>
                        </div>
                        <div class="bottom">
                            <div class="text language-string" data-dictionary="${option.dictionary}">${get_lang(option.dictionary)}</div>
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
                let optionHtml = `
                    <div class="info-item">
                        <div class="row">
                        <div class="icon">
                            <img src="${option.imgUrl}" alt="">
                        </div>
                        <span class="bottom">${crmDataHtml}</span></div>
                         <div class="text"><span class="top language-string" data-dictionary="${option.dictionary}">${get_lang(option.dictionary)}</span></div>
                    </div>
                `
                htmlForReturn += optionHtml;
            }
        });
        return htmlForReturn;
    },
}