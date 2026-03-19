// common.js – общие скрипты для всего сайта

document.addEventListener('DOMContentLoaded', function() {
    console.log('common.js загружен и выполняется');

    // ===== МОБИЛЬНОЕ МЕНЮ =====
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // ===== МЕНЮ "ЕЩЁ" НА ДЕСКТОПЕ =====
    // Находим контейнер меню (ul внутри .nav)
    const navContainer = document.querySelector('.nav ul');
    if (navContainer) {
        console.log('Контейнер меню найден');

        // Находим все пункты, которые должны быть в подменю "Ещё"
        const moreItems = document.querySelectorAll('li[data-mobile="more"]');
        console.log('Найдено пунктов для "Ещё":', moreItems.length);

        if (moreItems.length > 0) {
            // Создаём новый пункт "Ещё" с выпадающим списком
            const moreLi = document.createElement('li');
            moreLi.className = 'desktop-more';
            moreLi.innerHTML = '<a href="#"><i class="fas fa-ellipsis-h"></i> Ещё <i class="fas fa-chevron-down"></i></a><ul class="desktop-submenu"></ul>';

            // Добавляем его в конец основного меню
            navContainer.appendChild(moreLi);
            console.log('Пункт "Ещё" добавлен в меню');

            // Получаем ссылку на подменю
            const submenu = moreLi.querySelector('.desktop-submenu');

            // Перемещаем все пункты с data-mobile="more" в подменю
            moreItems.forEach(item => {
                submenu.appendChild(item);
                console.log('Перемещён пункт:', item.querySelector('a')?.innerText || item.innerText);
            });

            // Обработчик клика по ссылке "Ещё" – показать/скрыть подменю
            const moreLink = moreLi.querySelector('a');
            moreLink.addEventListener('click', function(e) {
                e.preventDefault();
                submenu.classList.toggle('show');
            });

            // Закрыть подменю при клике вне его
            document.addEventListener('click', function(event) {
                if (!moreLi.contains(event.target)) {
                    submenu.classList.remove('show');
                }
            });

            console.log('Обработчики для "Ещё" добавлены');
        } else {
            console.log('Нет пунктов для "Ещё"');
        }
    } else {
        console.log('Контейнер меню НЕ найден');
    }

    // ===== ПОИСК =====
    const searchIcon = document.getElementById('searchIcon');
    const searchPopup = document.getElementById('searchPopup');
    if (searchIcon && searchPopup) {
        searchIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            searchPopup.classList.toggle('active');
        });

        document.addEventListener('click', function(event) {
            if (!searchIcon.contains(event.target) && !searchPopup.contains(event.target)) {
                searchPopup.classList.remove('active');
            }
        });
    }

    // ===== ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ =====
    const specialLink = document.getElementById('specialFooterLink');
    if (specialLink) {
        specialLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.toggle('special-mode');
            localStorage.setItem('specialMode', document.body.classList.contains('special-mode'));
        });

        if (localStorage.getItem('specialMode') === 'true') {
            document.body.classList.add('special-mode');
        }
    }

    // ===== БАННЕР COOKIE =====
    const cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner) {
        if (!localStorage.getItem('cookieAccepted') && !localStorage.getItem('cookieDeclined')) {
            cookieBanner.style.display = 'block';
        }

        const acceptBtn = document.getElementById('cookie-accept');
        const declineBtn = document.getElementById('cookie-decline');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', function() {
                localStorage.setItem('cookieAccepted', 'true');
                cookieBanner.style.display = 'none';
            });
        }
        if (declineBtn) {
            declineBtn.addEventListener('click', function() {
                localStorage.setItem('cookieDeclined', 'true');
                cookieBanner.style.display = 'none';
            });
        }
    }

    // ===== FANCYBOX (если используется) =====
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind('[data-fancybox]');
    }

    // ===== КНОПКА "НАВЕРХ" =====
    const btn = document.getElementById('scrollUp');
    if (btn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }
        });

        btn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});