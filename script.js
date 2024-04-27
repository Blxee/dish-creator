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
  loadFile(file, 'dishes');
}

function loadIngredients(file) {
  loadFile(file, 'ingredients');
}

function loadFile(file, name) {
  const reader = new FileReader();
  reader.onload = (event) => {
    localStorage.setItem(name, event.target.result);
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
  anchor.download = 'dishes.json';
  anchor.click();
}

function downloadIngredients() {
  const data = localStorage.getItem('ingredients');
  anchor.href = 'data:text/json;charset:utf-8,' + encodeURIComponent(data);
  anchor.download = 'ingredients.json';
  anchor.click();
}
