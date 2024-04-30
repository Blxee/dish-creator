// ###################################
// # Populate dishes and ingredients #
// ###################################

let dishes;
let ingredients;
let types;

function reloadDishes() {
  const dishesData = localStorage.getItem('dishes');
  dishes = JSON.parse(dishesData);
}

function reloadIngredients() {
  const ingredientsData = localStorage.getItem('ingredients');
  ingredients = JSON.parse(ingredientsData);

  types = [...new Set(Object.values(ingredients).map((ingr) => ingr.type))];
}

reloadDishes();
reloadIngredients();

// #########################
// # File upload handeling #
// #########################

const filesForm = document.querySelector('#files-form');

filesForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const dishesFileInput = event.target.querySelector('#dishes-file-input');
  const ingredientsFileInput = event.target.querySelector('#ingredients-file-input');

  if (dishesFileInput.files.length > 0) {
    loadDishes(dishesFileInput.files[0]);
  }

  if (ingredientsFileInput.files.length > 0) {
    loadIngredients(ingredientsFileInput.files[0]);
  }
});

function loadDishes(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const content = event.target.result;
    dishes = JSON.parse(content);
    localStorage.setItem('dishes', content);
  };
  reader.readAsText(file);
}

function loadIngredients(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const content = event.target.result;
    ingredients = JSON.parse(content);
    localStorage.setItem('ingredients', content);
  };
  reader.readAsText(file);
}

// ###########################
// # File download handeling #
// ###########################

const anchor = document.createElement('a')

function downloadDishes() {
  const data = localStorage.getItem('dishes');
  anchor.href = 'data:text/json;charset:utf-8,' + encodeURIComponent(data);
  anchor.download = `dishes-${dishes.length}.json`;
  anchor.click();
}

function downloadIngredients() {
  const data = localStorage.getItem('ingredients');
  anchor.href = 'data:text/json;charset:utf-8,' + encodeURIComponent(data);
  anchor.download = `ingredients-${Object.keys(ingredients).length}.json`;
  anchor.click();
}

// #########################
// # Dishes form handeling #
// #########################

const dishesForm = document.querySelector('#dishes-form');
const dishesList = dishesForm.querySelector('#dishes-list');
const dishListItem = dishesList.children[0];
dishesList.removeChild(dishListItem);

let selectedDishIdx = null;

for (const [i, dish] of dishes.entries()) {
  const item = dishListItem.cloneNode();
  item.textContent = dish.name;
  item.setAttribute('data-dish-index', i);
  item.addEventListener('click', onDishClicked);
  dishesList.appendChild(item);
}

function onDishClicked(event) {
  selectedDishIdx = event.target.getAttribute('data-dish-index');
  const dish = dishes[selectedDishIdx];
  dishesForm.elements['name'].value = dish.name;
}

dishesForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

// #########################
// # Dishes form handeling #
// #########################

const ingredientsForm = document.querySelector('#ingredients-form');
const newTypeInput = ingredientsForm.querySelector('#new-type-input')

function createNewType() {
  const type = newTypeInput.value;

  if (type.length > 0 && !types.includes(type)) {
    types.push(type);
    reloadIngredients();
    newTypeInput.value = '';
  }
}
