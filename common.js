// common.js – общие скрипты для всего сайта

document.addEventListener('DOMContentLoaded', function() {
    // --- Cookie-баннер с согласием на Яндекс.Метрику (строгий режим) ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');

    function loadYandexMetrika() {
        if (typeof ym !== 'undefined') return;
        (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=107242178', 'ym');
        ym(107242178, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
    }

    const cookieAccepted = localStorage.getItem('cookieAccepted');
    const cookieDeclined = localStorage.getItem('cookieDeclined');

    if (cookieAccepted === 'true') {
        loadYandexMetrika();
        if (cookieBanner) cookieBanner.style.display = 'none';
    } else if (cookieDeclined === 'true') {
        if (cookieBanner) cookieBanner.style.display = 'none';
    } else {
        if (cookieBanner) {
            cookieBanner.style.display = 'flex';
            cookieBanner.classList.add('cookie-banner');
        }
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieAccepted', 'true');
            if (cookieBanner) cookieBanner.style.display = 'none';
            loadYandexMetrika();
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            localStorage.setItem('cookieDeclined', 'true');
            if (cookieBanner) cookieBanner.style.display = 'none';
        });
    }

    // --- Меню: десктоп – горизонтальное с раскрытием по ховеру, мобильные – вертикальный аккордеон ---
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    if (nav && !window.originalNavHTML) {
        window.originalNavHTML = nav.innerHTML;
    }

    const menuCategories = [
        {
            title: 'Библиотека',
            icon: 'fas fa-landmark',
            items: [
                { name: 'Главная', href: 'index.html', icon: 'fas fa-home' },
                { name: 'О нас', href: 'about.html', icon: 'fas fa-users' },
                { name: 'Услуги', href: 'services.html', icon: 'fas fa-concierge-bell' },
                { name: 'Контакты', href: 'contacts.html', icon: 'fas fa-phone-alt' }
            ]
        },
        {
            title: 'Читателям',
            icon: 'fas fa-book-reader',
            items: [
                { name: 'Новинки', href: 'newbooks.html', icon: 'fas fa-book-open' },
                { name: 'Электронные ресурсы', href: 'digital-resources.html', icon: 'fas fa-laptop' },
                { name: 'Литературный календарь', href: 'literary-calendar.html', icon: 'fas fa-calendar-alt' },
                { name: 'Спидкубинг', href: 'speedcubing.html', icon: 'fas fa-puzzle-piece' }
            ]
        },
        {
            title: 'События и проекты',
            icon: 'fas fa-book-open',
            items: [
                { name: 'События', href: 'events.html', icon: 'fas fa-calendar-alt' },
                { name: 'Фотогалерея', href: 'gallery.html', icon: 'fas fa-images' },
                { name: 'Примерочная книг', href: 'bookmatcher.html', icon: 'fas fa-magic' },
                { name: 'Что почитать по интересу', href: 'book-recommendations.html', icon: 'fas fa-star' },
                { name: 'Книжная кухня', href: 'book-kitchen.html', icon: 'fas fa-utensils' },
                { name: 'Выставки', href: 'exhibitions.html', icon: 'fas fa-palette' }
            ]
        },
        {
            title: 'Краеведение',
            icon: 'fas fa-map-marked-alt',
            items: [
                { name: 'Краеведение', href: 'kraevedenie.html', icon: 'fas fa-map-signs' },
                { name: 'История Парголово', href: 'timeline.html', icon: 'fas fa-stream' },
                { name: 'Карта достопримечательностей', href: 'map.html', icon: 'fas fa-map-marked-alt' },
                { name: 'Литературный портрет', href: 'literary-portrait.html', icon: 'fas fa-users' },
                { name: 'Конкурс «История одной улицы»', href: 'konkurs.html', icon: 'fas fa-trophy' }
            ]
        },
        {
            title: 'Информация',
            icon: 'fas fa-info-circle',
            items: [
                { name: 'Вопросы (FAQ)', href: 'faq.html', icon: 'fas fa-question-circle' },
                { name: 'Библиотеки района', href: 'district-libraries.html', icon: 'fas fa-building' },
                { name: 'Партнёры', href: 'partners.html', icon: 'fas fa-handshake' }
            ]
        }
    ];

    // Функция для построения десктопного меню (горизонтальные категории, раскрытие по ховеру)
    function buildDesktopMenu() {
        if (!nav) return;
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        let html = '<ul class="desktop-horizontal-menu">';
        menuCategories.forEach(cat => {
            let isCategoryActive = cat.items.some(item => item.href === currentPath);
            html += `<li class="desktop-category">
                        <div class="desktop-category-header ${isCategoryActive ? 'active' : ''}">
                            <i class="${cat.icon}"></i> ${cat.title} <i class="fas fa-chevron-down"></i>
                        </div>
                        <ul class="desktop-category-content">`;
            cat.items.forEach(item => {
                const isActive = (item.href === currentPath);
                html += `<li><a href="${item.href}" class="${isActive ? 'active' : ''}"><i class="${item.icon}"></i> ${item.name}</a></li>`;
            });
            html += `</ul></li>`;
        });
        html += `</ul>`;
        nav.innerHTML = html;

        // --- ЛОГИКА РАСКРЫТИЯ ПО ХОВЕРУ С ЗАДЕРЖКОЙ ---
        const categories = nav.querySelectorAll('.desktop-category');
        let closeTimeout;
        
        categories.forEach(category => {
            category.addEventListener('mouseenter', function(e) {
                if (closeTimeout) clearTimeout(closeTimeout);
                categories.forEach(cat => {
                    if (cat !== this) cat.classList.remove('open');
                });
                this.classList.add('open');
            });
            
            category.addEventListener('mouseleave', function(e) {
                closeTimeout = setTimeout(() => {
                    this.classList.remove('open');
                }, 300);
            });
        });
    }

    // Функция для построения мобильного меню (вертикальный аккордеон)
    function buildMobileMenu() {
        if (!nav) return;
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        let html = '<ul class="mobile-accordion">';
        menuCategories.forEach(cat => {
            html += `<li class="accordion-category">
                        <div class="accordion-header">
                            <i class="${cat.icon}"></i> ${cat.title} <i class="fas fa-chevron-down"></i>
                        </div>
                        <ul class="accordion-content">`;
            cat.items.forEach(item => {
                const isActive = (item.href === currentPath);
                html += `<li><a href="${item.href}" class="${isActive ? 'active' : ''}"><i class="${item.icon}"></i> ${item.name}</a></li>`;
            });
            html += `</ul></li>`;
        });
        html += `</ul>`;
        nav.innerHTML = html;

        const headers = nav.querySelectorAll('.accordion-header');
        headers.forEach(header => {
            header.addEventListener('click', function(e) {
                e.preventDefault();
                const parent = this.closest('.accordion-category');
                parent.classList.toggle('open');
                const icon = this.querySelectorAll('i')[1];
                if (parent.classList.contains('open')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
    }

    function handleResize() {
        if (window.innerWidth <= 768) {
            buildMobileMenu();
        } else {
            buildDesktopMenu();
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.toggle('active');
                if (nav.classList.contains('active')) {
                    buildMobileMenu();
                }
            } else {
                nav.classList.toggle('active');
            }
        });
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

    // ===== КНОПКА "НАВЕРХ" =====
    // Ждём 100мс, чтобы убедиться, что DOM полностью загружен
    setTimeout(function() {
        // Удаляем все старые кнопки
        const oldBtns = document.querySelectorAll('#scrollUp, .back-to-top, #backToTop');
        oldBtns.forEach(function(btn) {
            if (btn && btn.parentNode) {
                btn.parentNode.removeChild(btn);
            }
        });
        
        // Создаём новую кнопку
        var backBtn = document.createElement('a');
        backBtn.setAttribute('href', '#');
        backBtn.setAttribute('class', 'back-to-top');
        backBtn.setAttribute('id', 'custom-back-to-top');
        backBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backBtn.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#e5989b;color:#fff;width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;font-size:24px;opacity:0;visibility:hidden;transition:all 0.3s ease;z-index:99999;box-shadow:0 2px 10px rgba(0,0,0,0.2);cursor:pointer;border:none;';
        document.body.appendChild(backBtn);
        
        // Функция показа/скрытия
        function toggleButton() {
            if (window.pageYOffset > 100) {
                backBtn.style.opacity = '1';
                backBtn.style.visibility = 'visible';
            } else {
                backBtn.style.opacity = '0';
                backBtn.style.visibility = 'hidden';
            }
        }
        
        // Обработчики
        window.addEventListener('scroll', toggleButton);
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Проверяем сразу
        toggleButton();
    }, 100);
});