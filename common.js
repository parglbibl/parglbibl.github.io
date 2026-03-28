// common.js – общие скрипты для всего сайта

document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню (гамбургер)
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    // Сохраним оригинальную структуру меню (она будет использоваться на десктопе)
    if (nav && !window.originalNavHTML) {
        window.originalNavHTML = nav.innerHTML;
    }

    // Структура категорий для мобильного аккордеона
    const mobileCategories = [
        {
            title: 'Библиотека',
            items: [
                { name: 'Главная', href: 'index.html', icon: 'fas fa-home' },
                { name: 'О нас', href: 'about.html', icon: 'fas fa-users' },
                { name: 'Услуги', href: 'services.html', icon: 'fas fa-concierge-bell' },
                { name: 'Контакты', href: 'contacts.html', icon: 'fas fa-phone-alt' }
            ]
        },
        {
            title: 'Читателям',
            items: [
                { name: 'Новинки', href: 'newbooks.html', icon: 'fas fa-book-open' },
                { name: 'Электронные ресурсы', href: 'digital-resources.html', icon: 'fas fa-laptop' },
                { name: 'Литературный календарь', href: 'literary-calendar.html', icon: 'fas fa-calendar-alt' },
                { name: 'Спидкубинг', href: 'speedcubing.html', icon: 'fas fa-puzzle-piece' }
            ]
        },
        {
            title: 'События и проекты',
            items: [
                { name: 'События', href: 'events.html', icon: 'fas fa-calendar-alt' },
                { name: 'Фотогалерея', href: 'gallery.html', icon: 'fas fa-images' },
                { name: 'Примерочная книг', href: 'bookmatcher.html', icon: 'fas fa-magic' },
                { name: 'Что почитать по интересу', href: 'book-recommendations.html', icon: 'fas fa-star' },
                { name: 'Книжная кухня', href: 'book-kitchen.html', icon: 'fas fa-utensils' }
            ]
        },
        {
            title: 'Краеведение',
            items: [
                { name: 'Краеведение', href: 'kraevedenie.html', icon: 'fas fa-map-signs' },
                { name: 'История Парголово', href: 'timeline.html', icon: 'fas fa-stream' },
                { name: 'Карта достопримечательностей', href: 'map.html', icon: 'fas fa-map-marked-alt' }
            ]
        },
        {
            title: 'Информация',
            items: [
                { name: 'Вопросы (FAQ)', href: 'faq.html', icon: 'fas fa-question-circle' },
                { name: 'Библиотеки района', href: 'district-libraries.html', icon: 'fas fa-building' },
                { name: 'Партнёры', href: 'partners.html', icon: 'fas fa-handshake' }
            ]
        }
    ];

    // Функция для построения мобильного меню-аккордеона
    function buildMobileMenu() {
        if (!nav) return;
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        let html = '<ul class="mobile-accordion">';
        mobileCategories.forEach(cat => {
            html += `<li class="accordion-category">
                        <div class="accordion-header">${cat.title} <i class="fas fa-chevron-down"></i></div>
                        <ul class="accordion-content">`;
            cat.items.forEach(item => {
                const isActive = (item.href === currentPath);
                html += `<li><a href="${item.href}" class="${isActive ? 'active' : ''}"><i class="${item.icon}"></i> ${item.name}</a></li>`;
            });
            html += `</ul></li>`;
        });
        html += `</ul>`;
        nav.innerHTML = html;

        // Добавляем обработчики для заголовков аккордеона
        const headers = nav.querySelectorAll('.accordion-header');
        headers.forEach(header => {
            header.addEventListener('click', function(e) {
                e.preventDefault();
                const parent = this.closest('.accordion-category');
                parent.classList.toggle('open');
                const icon = this.querySelector('i');
                if (parent.classList.contains('open')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
    }

    // Функция для восстановления десктопного меню (оригинальная структура)
    function restoreDesktopMenu() {
        if (!nav) return;
        if (window.originalNavHTML) {
            nav.innerHTML = window.originalNavHTML;
        }
        // Переинициализируем обработчики для десктопного меню
        initDesktopMenu();
    }

    // Инициализация десктопного меню (код, который был в common.js)
    function initDesktopMenu() {
        // Десктопное меню с "Ещё" – перемещение пунктов
        const navContainer = document.querySelector('.nav ul');
        if (navContainer && window.innerWidth > 768) {
            const moreItems = document.querySelectorAll('li[data-mobile="more"]');
            if (moreItems.length > 0) {
                // Создаём пункт "Ещё", если его ещё нет
                let moreLi = document.querySelector('.desktop-more');
                if (!moreLi) {
                    moreLi = document.createElement('li');
                    moreLi.className = 'desktop-more';
                    moreLi.innerHTML = '<a href="#"><i class="fas fa-ellipsis-h"></i> Ещё <i class="fas fa-chevron-down"></i></a><ul class="desktop-submenu"></ul>';
                    navContainer.appendChild(moreLi);
                }
                const submenu = moreLi.querySelector('.desktop-submenu');
                // Перемещаем все пункты с data-mobile="more" в подменю
                moreItems.forEach(item => {
                    submenu.appendChild(item);
                });

                // Обработчики
                const moreLink = moreLi.querySelector('a');
                moreLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    submenu.classList.toggle('show');
                });

                document.addEventListener('click', function(event) {
                    if (!moreLi.contains(event.target)) {
                        submenu.classList.remove('show');
                    }
                });
            }
        }

        // Поиск
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

        // Версия для слабовидящих
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

        // Баннер cookie
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

        // Fancybox (если используется)
        if (typeof Fancybox !== 'undefined') {
            Fancybox.bind('[data-fancybox]');
        }

        // Кнопка "наверх"
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
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // Функция для переключения между мобильным и десктопным меню при изменении размера окна
    function handleResize() {
        if (window.innerWidth <= 768) {
            // Мобильный вид – используем аккордеон
            buildMobileMenu();
        } else {
            // Десктопный вид – восстанавливаем оригинальное меню
            restoreDesktopMenu();
            // Если меню было открыто, закрываем его
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    }

    // Инициализация при загрузке
    handleResize();

    // Обработчик изменения размера окна
    window.addEventListener('resize', handleResize);

    // Обработчик клика по гамбургеру
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                nav.classList.toggle('active');
                if (nav.classList.contains('active')) {
                    buildMobileMenu();
                }
            } else {
                nav.classList.toggle('active');
            }
        });
        // Регистрация service worker для PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('Service Worker зарегистрирован с областью:', registration.scope);
    })
    .catch(error => {
      console.log('Ошибка регистрации Service Worker:', error);
    });
}
    }

    // Дополнительно: если на десктопе меню уже построено, переинициализируем десктопные функции
    initDesktopMenu();
});