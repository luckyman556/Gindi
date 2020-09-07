export const optionsButton = (optionsObject) => {
    const containerLeft = createElements('div', 'left-nav-bar', document.body);

    const options = createElements('button', 'button-options', containerLeft);
    options.setAttribute('data-type', 'options');

    containerLeft.addEventListener('click', event => {
        console.log(event.type);
        console.log(optionsObject);
    });

    return optionsObject;
}

function createElements(tag, className, parent) {
    const element = document.createElement(tag);
    element.classList.add(className);

    if (tag === 'button') {
        element.setAttribute('type', 'button');
    }

    parent.append(element);

    return element;
}