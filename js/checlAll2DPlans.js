'use strict';
export async function checkAll2Dplans() {
    const array = [];
    await setTimeout(() => {
        all_appartments.forEach(appt => {
            const svgUrl = appt.userData.svg_plan;
            const model = appt.userData.crm_data.modelName;

            // const img = `<img class="test-img" src=${svgUrl.horizontal.en} alt=${model} data-model=${model} style="position: absolute; opacity: 0;">`;
            document.body.insertAdjacentHTML('beforeend', `<img class="test-img" src=${svgUrl.horizontal.en} alt=${model} data-model=${model} style="position: absolute; opacity: 0;">`);
            document.body.insertAdjacentHTML('beforeend', `<img class="test-img" src=${svgUrl.vertical.en} alt=${model} data-model=${model} style="position: absolute; opacity: 0;">`);
            document.body.insertAdjacentHTML('beforeend', `<img class="test-img" src=${svgUrl.printA4.en} alt=${model} data-model=${model} style="position: absolute; opacity: 0;">`);
            document.body.insertAdjacentHTML('beforeend', `<img class="test-img" src=${svgUrl.horizontal.he} alt=${model} data-model=${model} style="position: absolute; opacity: 0;">`);
            document.body.insertAdjacentHTML('beforeend', `<img class="test-img" src=${svgUrl.vertical.he} alt=${model} data-model=${model} style="position: absolute; opacity: 0;">`);
            document.body.insertAdjacentHTML('beforeend', `<img class="test-img" src=${svgUrl.printA4.he} alt=${model} data-model=${model} style="position: absolute; opacity: 0;">`);

        });

    }, 2000);
    await setTimeout(() => {
        const testImg = document.querySelectorAll('.test-img');
        testImg.forEach(img => {
            img.onerror = () => {
                let model = img.getAttribute('data-model');
                // console.log(model);
                array.push(model);
            }
        });
    }, 2000);

    await setTimeout(() => {
        console.log([...new Set(array)]);
        console.log(array);
    }, 7000);
}
