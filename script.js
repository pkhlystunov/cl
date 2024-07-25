const form = document.getElementById("checklist-form");
const addItemBtn = document.getElementById("add-item-btn");
const itemsList = document.getElementById("items");

// Добавление пункта проверки
addItemBtn.addEventListener("click", () => {
  const newItem = document.createElement("li");
  newItem.innerHTML = `
    <input type="text" placeholder="Пункт">
    <input type="file" accept="image/*">
  `;

  itemsList.appendChild(newItem);
});

// Отправка формы
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Извлечение данных из формы
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const items = [];
  for (let i = 0; i < itemsList.children.length; i++) {
    const item = itemsList.children[i];
    items.push({
      text: item.querySelector('input[type="text"]').value,
      photos: item.querySelector('input[type="file"]').files
    });
  }

  // Создание объекта чек-листа
  const checklist = {
    title,
    description,
    items
  };

  // Отправка запроса на сервер
  const response = await fetch("/create-checklist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(checklist)
  });

  // Обработка ответа сервера
  const data = await response.json();
  if (data.success) {
    alert("Чек-лист успешно создан");
  } else {
    alert("Не удалось создать чек-лист");
  }
});
