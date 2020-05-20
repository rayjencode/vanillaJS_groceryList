const addItemAction = document.querySelector('.addItems-action');
const displayItemsAction = document.querySelector('.displayItems-action');
const input = document.querySelector('.addItems-input');
const form = document.querySelector('form');
const clear = document.querySelector('.displayItems-clear');
const listItems = document.querySelector('.grocery-list');

document.addEventListener('DOMContentLoaded', function () {
    loadStorage();
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value === '') {
        showAction(addItemAction, 'Please enter a valid value', 'alert');
    } else {
        showAction(addItemAction, 'Succesfully Added', 'success');
        addItem(input.value);
        addLocalStorage(input.value);
        input.value = '';
    }
});

clear.addEventListener('click', function () {
    localStorage.removeItem('list');

    items = document.querySelectorAll('.grocery-item');

    if (items.length > 0) {
        items.forEach(function (item) {
            listItems.removeChild(item);
            showAction(
                displayItemsAction,
                'All Items has been Removed',
                'success'
            );
        });
    } else {
        showAction(displayItemsAction, 'No Items to be delete', 'alert');
    }
});

function addItem(input) {
    const div = document.createElement('div');
    div.classList.add('grocery-item');
    div.innerHTML = `<h4 class="grocery-item__title">${input}</h4>
    <a href="#" class="grocery-item__link">
     <i class="far fa-trash-alt"></i>
    </a>`;
    listItems.appendChild(div);
}

function showAction(element, text, action) {
    element.textContent = text;
    element.classList.add(`${action}`);

    console.log(action);

    setTimeout(function () {
        element.classList.remove(`${action}`);
    }, 3000);
}

function addLocalStorage(value) {
    let items;
    items = localStorage.getItem('list')
        ? JSON.parse(localStorage.getItem('list'))
        : [];

    items.push(value);
    localStorage.setItem('list', JSON.stringify(items));
}

function loadStorage() {
    if (localStorage.getItem('list')) {
        let items = JSON.parse(localStorage.getItem('list'));
        items.forEach(function (item) {
            addItem(item);
        });
    } else {
        console.log(`No stored Items to load`);
    }
}

listItems.addEventListener('click', function (e) {
    if (e.target.parentElement.classList.contains('grocery-item__link')) {
        let parent = e.target.parentElement.parentElement;
        let textValue = parent.children[0].textContent;

        listItems.removeChild(parent);
        showAction(
            displayItemsAction,
            `${textValue} has been removed`,
            'success'
        );

        //  console.log(parent.children[0].textContent);
        removeItemStorage(textValue);
    }
});

function removeItemStorage(text) {
    let tempItems = JSON.parse(localStorage.getItem('list'));

    let index = tempItems.indexOf(text);
    tempItems.splice(index, 1);

    //  let result = tempItems.filter(function (item) {
    //      return item !== text;
    //  });

    localStorage.removeItem('list');
    localStorage.setItem('list', JSON.stringify(tempItems));
}
