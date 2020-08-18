function initFullscreenAction() {
    const popup360 = document.getElementById('content360');
    const fullScreenButton = document.querySelector('.fullscreen-btn');
    const isMobileApple = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
        console.log(`It's Safari browser = ${isSafari}`);

        if (isMobileApple) {
            fullScreenButton.setAttribute('style',  'display: none;');
            console.log(`It's a iPhone/iPad/iPod device = ${isMobileApple}`);
        } else {
            fullScreenButton.removeAttribute('style');
            console.log(`It's NOT iPhone/iPad/iPod device = ${isMobileApple}`);
        }
    }


    popup360.addEventListener('fullscreenchange', (event) => {
        const flatInfoSideBar = document.querySelectorAll('.flat-info');

        if (document.fullscreenElement) {
            console.log(`Element: ${document.fullscreenElement.id} entered fullscreen mode.`);
            flatInfoSideBar[1].setAttribute('style', 'display: none;');
        } else {
            console.log('Leaving full-screen mode.');
            flatInfoSideBar[1].removeAttribute('style');
        }
    });

    fullScreenButton.addEventListener('click', () => {
        if(document.fullscreenElement) {
            document.exitFullscreen();
        }else {
            popup360.requestFullscreen();
        }
    });
}
