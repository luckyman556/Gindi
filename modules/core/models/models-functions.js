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
    }
}