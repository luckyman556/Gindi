export class ScrollDrag  {
    constructor(domElement ) {
        this.container = domElement;
    }
    init () {
        let container = this.container;
        let wrap = container.firstElementChild;
        let startEventObject;
        wrap.style.left = '0px';
        this.startScroll = 0;
        container.addEventListener('mousedown', startEvent, { passive: false });
        container.addEventListener('touchstart', startEvent, { passive: false });
        container.addEventListener('mousemove', moveEvent, { passive: false });
        container.addEventListener('touchmove', moveEvent, { passive: false });
        container.addEventListener('mouseup', endEvent, { passive: false });
        container.addEventListener('mouseleave', endEvent, { passive: false });
        container.addEventListener('touchend', endEvent, { passive: false });
        container.addEventListener('wheel', wheelEvent, { passive: false });
        function  startEvent (event) {
                let closest = event.target.closest('.nmf-range-selector .circle');
                if (!closest) {
                    startEventObject = event;
                    this.startScrollLeft = Number(this.scrollLeft);
                    this.startScrollTop = Number(this.scrollTop);
                }
        }
        function  moveEvent (event) {
            if (window.matchMedia("(min-width: 1024px)").matches) {
                let start_x;
                let current_x;
                if (startEventObject) {
                    if (wrap.offsetWidth > container.offsetWidth) {
                        event.preventDefault();
                        if (event.changedTouches) {
                            start_x = startEventObject.changedTouches[0].pageX;
                            current_x = event.changedTouches[0].pageX;
                        } else {
                            start_x = startEventObject.pageX;
                            current_x = event.pageX;
                        }
                        let difference = start_x - current_x;
                        let targetScroll = this.startScrollLeft + difference;
                        this.scrollLeft = targetScroll;
                    }
                }
            } else {
                let start_y;
                let current_y;
                if (startEventObject) {
                    if (wrap.offsetHeight > container.offsetHeight) {
                        event.preventDefault();
                        if (event.changedTouches) {
                            start_y = startEventObject.changedTouches[0].pageY;
                            current_y = event.changedTouches[0].pageY;
                        } else {
                            start_y = startEventObject.pageY;
                            current_y = event.pageY;
                        }
                        let difference = start_y - current_y;
                        let targetScroll = this.startScrollTop + difference;
                         this.scrollTop = targetScroll;
                    }
                }
            }
        }

        function  wheelEvent (event) {
            if (window.matchMedia("(min-width: 1024px)").matches) {
                if (wrap.offsetWidth > container.offsetWidth) {
                    let delta = event.wheelDeltaY;
                    let startScroll = Number(this.scrollLeft);
                    // console.log(startScroll);
                    let direction = document.querySelector('html').getAttribute('dir');
                    let targetScroll;
                    if (direction) {
                        if (direction == 'rtl') {
                            targetScroll = startScroll + delta;
                        } else {
                            targetScroll = startScroll - delta;
                        }
                    }
                    this.scrollLeft = targetScroll;
                }
            }
        }

        function endEvent (event) {
            startEventObject = undefined;
        }
    }
    update () {
        let container = this.container;
        let allElementsWidth 
    }
}