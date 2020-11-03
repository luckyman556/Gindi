{
    document.addEventListener('DOMContentLoaded', function() {
    let html = `

    <section class="three_js" id="model">
        <div class="ui-hide">UI toggler</div>
        <div class="click-point"></div>
        <div class="popup-outer"></div>
        <div class="popup popup-2d non-canvas" data-toggler="toggler-2d">
            <div class="close-btn popup-btn"></div>
            <div class="print-btn popup-btn"></div>
            <div class="content">
                <div class="loading-overlay">
                    <div class="loading-ic"></div>
                </div>
                <div  class="img-box">
                    <img src="" alt="">
                </div>
            </div>
            <div class="popups-togglers-box">
                <div class="toggler-2d " data-popup="popup-2d">2D</div>
                <div class="toggler-3d language-string" data-popup="popup-3d" data-en="gallery" data-he="הדמיה"></div>
                <div class="toggler-360 language-string" data-popup="popup-360" data-en="360" data-he="360"></div>
            </div>
        </div>
    
        <div class="popup not-flat-360 non-canvas" data-toggler="toggler-2d">
            <div class="close-btn popup-btn"></div>
            <div class="content">
                <div class="iframe-box"></div>
            </div>
        </div>
        <div class="not-flat-360-btn" data-popup="not-flat-360"></div>
        <div class="popup popup-360  non-canvas" data-toggler="toggler-360">
            <div class="close-btn popup-btn"></div>
            <div class="content">
                <template class="mobile"></template>
                <template class="desktop"></template>
                <div class="iframe-box"></div>
                <div class="fullscreen-btn"><div class="icon"></div></div>
            </div>
            <div class="popups-togglers-box">
                <div class="toggler-2d " data-popup="popup-2d">2D</div>
                <div class="toggler-3d language-string" data-popup="popup-3d" data-en="gallery" data-he="הדמיה"></div>
                <div class="toggler-360 language-string" data-popup="popup-360" data-en="360" data-he="360"></div>
            </div>
        </div>
        <div class="popup popup-3d  non-canvas" data-toggler="toggler-3d">
            <div class="close-btn popup-btn"></div>
            <div class="content">
                <div class="loading-overlay">
                    <div class="loading-ic"></div>
                </div>
                <div class="iframe-box"></div>
                <div class="slider-box"></div>
            </div>
            <div class="popups-togglers-box">
                <div class="toggler-2d " data-popup="popup-2d">2D</div>
                <div class="toggler-3d language-string" data-popup="popup-3d" data-en="gallery" data-he="הדמיה"></div>
                <div class="toggler-360 language-string" data-popup="popup-360" data-en="360" data-he="360"></div>
            </div>
        </div>
        <div class="pages-box">
            <div class="main-wrap active">
                <div class="canvas-box">
                    <div class="floor-form">
                        <p class="page-description">3D View</p>
                        <div class="relative-block">
                            <h2 class="page-title">
                                <div class="text-box">
                                    <span>HaAlon 20</span>
                                </div>
                            </h2>
                            <span class="btn circle plus">+</span>
                            <span class="btn circle minus">-</span>
                        </div>
                    </div>
                    <canvas id="c">
                    </canvas>
                    <div id="three_d_css">
                    </div>
                    <div class="float-line-wrap">
                        <div class="float-line"></div>
                    </div>
                    <div class="repair-btn"></div>
    
                    <div class="floors-selector-n-back non-canvas">
                        <div class="bomb-btn"></div>
                        <div class="left-floors-selector-wrap">
                            <div class="left-floors-selector track" data-position="0"></div>
                        </div>
                        <div class="new-floors-selector non-canvas"></div>
                    </div>
                    <div class="rotation-controller non-canvas">
                        <div class="circle"></div>
                        <div class="line"></div>
                    </div>
                    <div class="zoom-controls non-canvas">
                        <div class="zoom plus" data-step="20" data-mod="-1">
                            <div class="img-box">
                                <img src="img/Controls_ic_plus.svg" alt="">
                            </div>
                        </div>
                        <div class="sep"></div>
                        <div class="zoom minus" data-step="20" data-mod="1">
                            <div class="img-box">
                                <img src="img/Controls_ic_minus.svg" alt="">
                            </div>
                        </div>
                    </div>
                    
                    <div class="compass"><div class="ic"></div></div>
                </div>
                <div class="left-corner-block non-canvas">
                    <div class="top-part">
                        <div class="zoom-by-mousewheel non-canvas">
                            <div class="text language-string" data-he='זום ע"י גלגלת העכבר' data-en="zoom"></div>
                            <div class="box">
                                <div class="check"></div>
                            </div>
                        </div>
                        <div class="lobby-n-roof-360 pea-parent">
                            <div class="visible-part pea-box"><div class="pea"></div><span class="icon"></span><span class="text language-string" data-he="סיור" data-en="Tours" >Tours</span><span class="dropdown-ic"></span></div>
                            <div class="hidden-part">
                                <ul>
                                    <li class="open-model-360-popup" data-type="roof"><span class="text language-string" data-he="סיור על הגג" data-en="360 Roof">360 Roof</span></li>
                                    <li class="open-model-360-popup" data-type="lobby"><span class="text language-string" data-he="סיור בקומת קרקע" data-en="360 Lobby">360 Lobby</span></li>
                                </ul>
                            </div>
                        </div>
                        <div class="clear-search-filter pea-parent pea-box">
                            <div class="text  language-string" data-he="אפס חיפוש" data-en="Clear filters">Clear filters</div>
                            <div class="icon"></div>
                            <div class="pea"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mouse-wheel-info non-canvas">
            <h3>Use ctrl + scroll to zoom building</h3>
        </div>
        <div class="mini-popup"></div>
        <div class="fullscren-toggler"></div>
        <div class="mobile-console">Console text</div>
        <div class="flat-bubble"></div>
        <div class="popup-info non-canvas show hide">
            <div class="close-btn"></div>
            <div class="flat-plan folder-box">
                <div class="border-top-left"></div>
                <div class="border-top-center"></div>
                <div class="border-top-right"></div>
                <div class="bottom-right"></div>
                <div class="toggle-btn">
                    <span></span>
                    <span></span>
                </div>
                <div class="flat-plan-box">
                    <p class="page-description">Apt Plan</p>
                    <div class="title-with-selector">
                        <h2 class="page-title"><span class="text">FLAT 028</span><span class="down btn circle"></span></h2>
                        <div class="flat-selector">
                        </div>
                    </div>
                    <div class="flat-status">
                        <div class="circle"></div><div class="text"></div>
                    </div>
                    <!--<div class="flat-img">
                        <img src="img/flat-plan.svg" alt="">
                    </div>-->
                    <div class="price">
                        <div class="top-part language-string" data-he="החל מ -" data-en="from"></div>
                        <div class="bottom-part">
                            <span class="currency">&#8362;</span><span class="text">160,000,00</span>
                        </div>
                    </div>
                    <div class="flat-options">
                        <div class="flat-option type">
                            <div class="top-part">
                                <div class="ic"><img src="img/gindi-ic-type.svg" alt="" class="ic-img"></div>
                                <div class="middle-text language-string" data-he="סוג הדירה" data-en="apt. type"></div>
                                <div class="number">4</div>
                            </div>
                        </div>
                        <div class="flat-option floor">
                            <div class="top-part">
                                <div class="ic"><img src="img/gindi-ic-floor.svg" alt="" class="ic-img"></div>
                                <div class="middle-text language-string" data-he="קומה" data-en="floor"></div>
                                <div class="number">4</div>
                            </div>
                            <div class="bottom-part"></div>
                        </div>
                        <div class="flat-option area">
                            <div class="top-part">
                                <div class="ic"><img src="img/gindi-ic-area.svg" alt="" class="ic-img"></div>
                                <div class="middle-text language-string" data-he="אֵזוֹר" data-en="area"></div>
                                <div class="number">120</div>
                            </div>
                            <div class="bottom-part">area</div>
                        </div>
                        <div class="flat-option badroom">
                            <div class="top-part">
                                <div class="ic"><img src="img/gindi-ic-rooms.svg" alt="" class="ic-img"></div>
                                <div class="middle-text language-string" data-he="חדרים" data-en="rooms"></div>
                                <div class="number">4</div>
                            </div>
                        </div>
                    </div>
    
                    <div class="popups-togglers-box">
                        <div class="non-flat-360" data-type="">360 Tour</div>
                        <div class="toggler-2d language-string" data-he="תכנית דירה" data-en="Floor plan" data-popup="popup-2d">Floor Plan</div>
                        <div class="floor-plan-toggler language-string" data-he="תכנית קומה" data-en="Key plan">Key plan</div>
                        <div class="toggler-3d language-string" data-popup="popup-3d" data-en="gallery" data-he="הדמיה"></div>
                        <div class="toggler-360 language-string" data-popup="popup-360" data-en="360" data-he="360"></div>
                    </div>
                </div>
                <div class="right">
                    <div class="compass-btn-box">
                        <span class="n">N</span>
                        <span class="w">W</span>
                        <span class="s">S</span>
                        <span class="e">E</span>
                        <div class="compass-btn"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nfm-point-1"></div>
        <div class="nfm-point-2"></div>
        <div class="points-line hide"></div>
    <!--    <div class="point-1"></div>
        <div class="point-2"></div>
        <div class="points-line hide"></div>-->
    </section>
    <div class="current-resolution">
        <p class="width">Width: <span class="number"></span></p>
        <p class="height">Height: <span class="number"></span></p>
    </div>
    <style>
        .flat-status {
            width: 200px;
            height: 50px;
            background-color: black;
        }
    </style>
    <a id="download-canvas-img"></a>
    `;
        document.querySelector(threeJSBoxSelector).style.height = '100%';
    document.querySelector(threeJSBoxSelector).innerHTML = html;
});
}