// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeight = document.querySelector('.minweight__input'); // поле с минимальным весом
const maxWeight = document.querySelector('.maxweight__input'); // поле с максимальным весом


// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = '';

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
      const newLi = document.createElement("li");
      if (fruits[i].color == "фиолетовый"){
        newLi.innerHTML = "<li class=\"fruit__item fruit_violet\"> </li>";
      } else
      if (fruits[i].color == "зеленый"){
        newLi.innerHTML = "<li class=\"fruit__item fruit_green\"> </li>";
      } else
      if (fruits[i].color == "розово-красный"){
        newLi.innerHTML = "<li class=\"fruit__item fruit_carmazin\"> </li>";
      } else
      if (fruits[i].color == "желтый"){
        newLi.innerHTML = "<li class=\"fruit__item fruit_yellow\"> </li>";
      } else
      if (fruits[i].color == "светло-коричневый"){
        newLi.innerHTML = "<li class=\"fruit__item fruit_lightbrown\"> </li>";
      } 
      fruitsList.appendChild(newLi);     // добавляем в конец списка fruitsList при помощи document.appendChild
     
      const div = document.createElement("div");
      div.innerHTML = `
        <div class=\"fruit__info\">
        <div>index: ${i + 1}</div>
        <div>kind: ${fruits[i].kind}</div>
        <div>color: ${fruits[i].color}</div>
        <div>weight: ${fruits[i].weight}</div>
        </div>`;
      newLi.appendChild(div);      // добавляем div в родительский элемент li при помощи document.appendChild
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let newFruits = [...fruits]; //Первоначальный масив для проверки на совпадение при перемешивании
  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
      let randomFruit = getRandomInt(0, fruits.length-1); //находим случайный элемент из fruits, используя getRandomInt
      result.push(fruits[randomFruit]);  //вставляю рандомный элемент
      fruits.splice(randomFruit, 1);  //вырезаю рандомный элемент
      //fruits.length--;
  }
    fruits = result;
    if (fruits.every((el, index) => el === newFruits[index])){
      alert("Новый массив идентичен первоначальному. Перемешайте ещё раз!");
    }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
    // TODO: допишите функцию
  if (isNaN(maxWeight.value) || isNaN(minWeight.value) || maxWeight.value == '' || minWeight.value == '') {
    alert('Введите целое число или воспользуйтесь значениями по умолчанию')
    minWeight.value = "";
    maxWeight.value = "";
  }
  let result = fruits.filter((item) => {
    if (parseInt(maxWeight.value) < parseInt(minWeight.value)) {
      [maxWeight.value, minWeight.value] = [minWeight.value, maxWeight.value]; // Значения меняются местами если max меньше min.
    }
      item >= parseInt(minWeight.value) && item <= parseInt(maxWeight.value);
  });
  return result;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
