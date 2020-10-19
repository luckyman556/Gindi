export const modelsFunctions = {
    loadingCheck : class loadingCheck {
        constructor(checked_object, name, callback) {
            this.checked_object = checked_object;
            this.name = name;
            this.callback = callback;
        }
        start () {
            let class_this = this;
            if (this.checked_object) {
                let checked_item = this.checked_object[this.name];
                if (checked_item) {
                    if (checked_item.loaded) {
                        this.callback( checked_item);
                    } else {
                        setTimeout(function () {
                            class_this.start();
                        }, 50);
                    }
                }
            }
        }
    },
    loadingProgress : function (progress) {
        if (!loading_object[progress.currentTarget.responseURL]) {
            loading_object[progress.currentTarget.responseURL] = {
                'size' : progress.total
            }
        }
        loading_object[progress.currentTarget.responseURL].progress = progress.loaded;
        if (progress.total === progress.loaded) {
            loading_object[progress.currentTarget.responseURL].loaded = true;
        }
        modelsFunctions.setLoadingPercent();
    },
    writeImgLoadingProgress : function (url) {
        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', url, true);
        xhr.onreadystatechange = function(){
            if ( xhr.readyState == 4 ) {
                if ( xhr.status == 200 ) {
                    if (!loading_object[url]) {
                        loading_object[url] = {
                            'size' : Number(xhr.getResponseHeader('Content-Length')),
                            'progress' : Number(xhr.getResponseHeader('Content-Length')),
                        }
                    }
                    loading_object[url].loaded = true;
                }
            }
        };
        xhr.send(null);
    },
    setLoadingPercent : function () {
        let currentSize = 0;
        Object.entries(loading_object).forEach(([key,value],index)=>{
            if (value.progress) {
                currentSize += value.progress;
            }
        });
        totalPercent = Math.floor(currentSize / allLoadingsSize * 100);
    },
    getSizeOfAllLoadings : function (type = '') {
        console.log(type);
        let size = 0;
        Object.entries(loading_object).forEach(([key,value],index)=>{
            console.log(value.type);
            if (type == '') {
                size += value.size;
            } else {
                if (value.type == type) {
                    size += value.size;
                }
            }
        })
        return size;
    }
}