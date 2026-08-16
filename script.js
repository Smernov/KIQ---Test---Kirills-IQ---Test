const inputField = document.getElementById('github-username');
const saveButton = document.getElementById('save-btn');
const statusMessage = document.getElementById('status-message');
const authContainer = document.getElementById('auth-container');

// 1. Функция чтения куки по имени
function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches) : undefined;
}

// 2. Функция записи данных в настоящие куки (на 1 год)
function setCookie(name, value) {
    // max-age=31536000 — куки будут жить ровно 1 год (в секундах)
    // path=/, Secure и SameSite=Lax обязательны для правильной работы на GitHub Pages (HTTPS)
    document.cookie = `${name}=${encodeURIComponent(value)}; max-age=31536000; path=/; Secure; SameSite=Lax`;
}

// 3. Функция проверки куки при входе на сайт
function checkUser() {
    const savedName = getCookie('my_github_user');
    
    if (savedName) {
        // Если куки найдены — прячем форму ввода и показываем ник
        authContainer.style.display = 'none';
        statusMessage.textContent = `Добро пожаловать! Вы зашли под ником: ${savedName}`;
        statusMessage.style.color = "green";
    } else {
        // Если куки пустые — показываем форму для ввода
        authContainer.style.display = 'block';
        statusMessage.textContent = "Пожалуйста, введите и сохраните ваш ник.";
        statusMessage.style.color = "gray";
    }
}

// 4. Обработчик клика по кнопке «Занять ник»
saveButton.addEventListener('click', () => {
    const username = inputField.value.trim();

    if (!username) {
        statusMessage.textContent = "Пожалуйста, введите ник!";
        statusMessage.style.color = "red";
        return;
    }

    // Записываем ник в куки
    setCookie('my_github_user', username);

    // Мгновенно обновляем интерфейс (скрываем форму)
    checkUser();

    // moy kod na druguy stranizu
    window.location.replace("./test.html");
});

// Запускаем проверку сразу при загрузке страницы
checkUser();
