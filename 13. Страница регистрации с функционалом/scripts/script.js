   window.onload = function () {

    let form = document.querySelector('.form');
    let fullNameInput = document.getElementById('name');
    let usernameInput = document.getElementById('username');
    let emailInput = document.getElementById('mail');
    let passwordInput = document.getElementById('password');
    let repeatPasswordInput = document.getElementById('repeat');
    let checkbox = document.querySelector('.input__click');
    let button = document.querySelector('.button');
    let title = document.querySelector('h1');
    let subtitle = document.querySelector('h3');
    let linkBlock = document.querySelector('.link a');
    /* ===== 2. Запрет цифр в Full Name ===== */
    fullNameInput.addEventListener('input', function() {
        fullNameInput.value = fullNameInput.value.replace(/[0-9]/g, '');
    });

    /* ===== 3. Запрет . и , в username ===== */
    usernameInput.addEventListener('input', function() {
        usernameInput.value = usernameInput.value.replace(/[.,]/g, '');
    });

    /* ===== 4. Чекбокс ===== */
    checkbox.addEventListener('change', function() {
        console.log(checkbox.checked ? 'Согласен' : 'Не согласен');
    });

    /* ===== 5. Submit формы ===== */
    form.addEventListener('submit', function signUpHandler() {
        signUpHandler.preventDefault();
        
        // проверки пустых полей
        if (!fullNameInput.value.trim()) {
            alert('Заполните поле Full Name');
            return;
        } 
        if (!usernameInput.value.trim()) {
            alert('Заполните поле Your username');
            return;
        }
        if (!emailInput.value.trim()) {
          alert("Заполните поле E-mail");
          return;
        } else {
          let emailPattern = /^\S+@\S+\.\S+$/;
          if (!emailPattern.test(emailInput.value)) {
            alert("Введите корректный E-mail");
            return;
          }
        }
        if (!passwordInput.value.trim()) {
            alert('Заполните поле Password');
            return;
        }
        if (!repeatPasswordInput.value.trim()) {
            alert('Заполните поле Repeat Password');
            return;
        }

        // длина пароля
        if (passwordInput.value.length < 8) {
            alert('Пароль должен содержать не менее 8 символов');
            return;
        }

        // совпадение паролей
        if (passwordInput.value !== repeatPasswordInput.value) {
            alert('Пароли не совпадают');
            return;
        }

        // чекбокс
        if (!checkbox.checked) {
        alert('Необходимо согласиться с условиями');
        return;
        }

        showModal();
    });

    /* ===== 5. Попап ===== */
    function showModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal__content">
                <p>На вашу почту выслана ссылка, перейдите по ней, чтобы завершить регистрацию</p>
                <button class="modal__btn">ОК</button>
            </div>
        `;
        document.body.append(modal);

        modal.querySelector('.modal__btn').addEventListener('click', function() {
            modal.remove();
            form.reset();
            switchToLogin();
        });
    }

    /* ===== 6. Переход на логин ===== */
    linkBlock.addEventListener('click', function(error) {
        error.preventDefault();
        switchToLogin();
    });

    function switchToLogin() {
        form.removeEventListener('submit', signUpHandler);
        title.textContent = 'Log in to the system';
        subtitle.remove();

        fullNameInput.closest('label').remove();
        emailInput.closest('label').remove();
        repeatPasswordInput.closest('label').remove();
        checkbox.closest('label').remove();
        linkBlock.remove();

        button.textContent = 'Sign In';

        // новый обработчик
        form.addEventListener('submit', loginHandler, { once: true });
    }

    function loginHandler(event) {
        event.preventDefault();

        if (!usernameInput.value) {
            return alert('Заполните поле Your username');
        }
        if (!passwordInput.value) {
            return alert('Заполните поле Password');
        }

        alert(`Добро пожаловать, ${usernameInput.value}!`);

    }
