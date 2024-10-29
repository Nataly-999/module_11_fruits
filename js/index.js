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
      newLi.classList.add('fruit__item');
      if (fruits[i].color == "фиолетовый"){
        newLi.classList.add('fruit_violet');
        //newLi.innerHTML = "<li class=\"fruit__item fruit_violet\"> </li>";
      } else
      if (fruits[i].color == "зеленый"){
        newLi.classList.add('fruit_green');
        //newLi.innerHTML = "<li class=\"fruit__item fruit_green\"> </li>";
      } else
      if (fruits[i].color == "розово-красный"){
        newLi.classList.add('fruit_carmazin');
        //newLi.innerHTML = "<li class=\"fruit__item fruit_carmazin\"> </li>";
      } else
      if (fruits[i].color == "желтый"){
        newLi.classList.add('fruit_yellow');
        //newLi.innerHTML = "<li class=\"fruit__item fruit_yellow\"> </li>";
      } else
      if (fruits[i].color == "светло-коричневый"){
        newLi.classList.add('fruit_lightbrown');
        //newLi.innerHTML = "<li class=\"fruit__item fruit_lightbrown\"> </li>";
      } else
        newLi.classList.add('fruit_none');
      fruitsList.appendChild(newLi);     // добавляем в конец списка fruitsList при помощи document.appendChild
     
      const div = document.createElement("div");
      div.classList.add('fruit__info');
      newLi.appendChild(div);  // добавляем div в родительский элемент li при помощи document.appendChild
      div.innerHTML = `
        <div>index: ${i + 1}</div>
        <div>kind: ${fruits[i].kind}</div>
        <div>color: ${fruits[i].color}</div>
        <div>weight: ${fruits[i].weight}</div>
        `;
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
/*const filterFruits = () => {
  let minWeight = Number(minWeight.value);
  let maxWeight = Number(maxWeight.value);
  if (minWeight > maxWeight || !Number.isFinite(minWeight) || !Number.isFinite(maxWeight) || !Number.isInteger(maxWeight.value) || !Number.isInteger(minWeight.value)){
    alert('Введите корректные значения');
  } else {
    let fruitFilter = fruits.filter((item) => {
      ((item.weight >= parseInt(minWeight.value)) && (item.weight <= parseInt(maxWeight.value)));
  });
  fruits = fruitFilter;
}};*/

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
    // TODO: допишите функцию
  if (isNaN(maxWeight.value) || isNaN(minWeight.value) || maxWeight.value == '' || minWeight.value == '' || maxWeight.value < 0 || minWeight.value < 0) {
    alert('Введите корректные значения веса');
    minWeight.value = "";
    maxWeight.value = "";
    return fruits;
  };
  let result = fruits.filter((item) => {
    if (parseInt(maxWeight.value) < parseInt(minWeight.value)) {
      [maxWeight.value, minWeight.value] = [minWeight.value, maxWeight.value]; // Значения меняются местами если max меньше min.
    }
      return ((item.weight >= parseInt(minWeight.value)) && (item.weight <= parseInt(maxWeight.value)));
  });
  fruits = result;
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
  const priority = ['желтый', 'зеленый', 'розово-красный', 'светло-коричневый', 'фиолетовый']
  const priority1 = priority.indexOf(a.color);
  const priority2 = priority.indexOf(b.color);
  return priority1 > priority2;
};

 /* // функция обмена элементов
function swap(items, firstIndex, secondIndex){
  const temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
  }
  
  // функция разделитель
  function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)],
        i = left,
        j = right;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
  }*/

const sortAPI = {
  bubbleSort(fruits, comparationColor) {
    // TODO: допишите функцию сортировки пузырьком
    const n = fruits.length;
    // внешняя итерация по элементам
    for (let i = 0; i < n-1; i++) { 
        // внутренняя итерация для перестановки элемента в конец массива
        for (let j = 0; j < n-1-i; j++) { 
            // сравниваем элементы
            if (comparationColor(fruits[j], fruits[j+1])) { 
                // делаем обмен элементов
                let temp = fruits[j+1]; 
                fruits[j+1] = fruits[j]; 
                fruits[j] = temp; 
            }
        }
    } 
  },

/*// алгоритм быстрой сортировки
  quickSort(items, left, right) {
    // TODO: допишите функцию быстрой сортировки
    var index;
    if (items.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }
    }
    return items;
  },*/


// алгоритм быстрой сортировки
 //quickSort (arr) {
  quickSort (arr) {
  // Условие остановки, выхода из рекурсии, возвращем массив с 1 элементом
  if (arr.length < 2) return arr;
  // Выбираем опорный элемент
  let pivot = arr[0];
  // Определяем массивы для тех, что меньше и больше опорного
  const left = [];
  const right = [];

  // Проходим циклом по всем элементам из массива и разносим их в массивы созданные ранее согласно условию, больше опорного - в правый, меньше - в левый  
  for (let i = 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  // Рекурсивно повторяем процесс для новых двух массивов, текущий опорный элемент - кладем как первый в правый массив.
  //return quickSort(left).concat(pivot, quickSort(right)); 
  return [...quickSort(left), pivot, ...quickSort(right)]; 
  },


  // выполняет сортировку и производит замер времени
  startSort(sort, fruits, comparationColor) {
    const start = new Date().getTime();
    sort(fruits, comparationColor);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKind === 'bubbleSort'){
    sortKind = 'quickSort';
  } else sortKind = 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if (kindInput.value === "" || colorInput.value === "" || weightInput.value === "") {
    alert('Заполните все поля!')
  } else {
    if ((weightInput.value < 0) || isNaN(weightInput.value)){
      alert('Введите корректное значение веса (целое положительное число)!')
      weightInput.value = "";
    } else {
        fruits.push({"kind": kindInput.value, "color": colorInput.value, "weight": weightInput.value});
      display();
      kindInput.value = "";
      colorInput.value = "";
      weightInput.value = "";
    }
  }
  display();
});
