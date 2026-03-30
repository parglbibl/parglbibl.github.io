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

    // --- Аккордеон в подвале (Карта сайта) – НАДЁЖНАЯ ИНИЦИАЛИЗАЦИЯ ---
    function initFooterAccordion() {
        const footerAccordion = document.querySelector('.footer-accordion');
        if (!footerAccordion) return;
        
        const header = footerAccordion.querySelector('.accordion-header');
        if (!header) return;
        
        const content = footerAccordion.querySelector('.accordion-content');
        if (!content) return;
        
        // Восстанавливаем состояние из localStorage
        if (localStorage.getItem('footerAccordionOpen') === 'true') {
            footerAccordion.classList.add('open');
        } else {
            footerAccordion.classList.remove('open');
        }
        
        // Удаляем старый обработчик, чтобы не дублировать
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
        
        newHeader.addEventListener('click', function(e) {
            e.preventDefault();
            const accordion = this.closest('.footer-accordion');
            if (accordion) {
                accordion.classList.toggle('open');
                localStorage.setItem('footerAccordionOpen', accordion.classList.contains('open'));
            }
        });
    }

    // --- Мобильное меню (аккордеон) и десктопное "Ещё" ---
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    if (nav && !window.originalNavHTML) {
        window.originalNavHTML = nav.innerHTML;
    }

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
                { name: 'Книжная кухня', href: 'book-kitchen.html', icon: 'fas fa-utensils' },
                { name: 'Выставки', href: 'exhibitions.html', icon: 'fas fa-palette' }
            ]
        },
        {
            title: 'Краеведение',
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
            items: [
                { name: 'Вопросы (FAQ)', href: 'faq.html', icon: 'fas fa-question-circle' },
                { name: 'Библиотеки района', href: 'district-libraries.html', icon: 'fas fa-building' },
                { name: 'Партнёры', href: 'partners.html', icon: 'fas fa-handshake' }
            ]
        }
    ];

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

    function restoreDesktopMenu() {
        if (!nav) return;
        if (window.originalNavHTML) {
            nav.innerHTML = window.originalNavHTML;
        }
        initDesktopMenu();
    }

    function initDesktopMenu() {
        const navContainer = document.querySelector('.nav ul');
        if (navContainer && window.innerWidth > 768) {
            const moreItems = document.querySelectorAll('li[data-mobile="more"]');
            if (moreItems.length > 0) {
                let moreLi = document.querySelector('.desktop-more');
                if (!moreLi) {
                    moreLi = document.createElement('li');
                    moreLi.className = 'desktop-more';
                    moreLi.innerHTML = '<a href="#"><i class="fas fa-ellipsis-h"></i> Ещё <i class="fas fa-chevron-down"></i></a><ul class="desktop-submenu"></ul>';
                    navContainer.appendChild(moreLi);
                }
                const submenu = moreLi.querySelector('.desktop-submenu');
                moreItems.forEach(item => {
                    submenu.appendChild(item);
                });
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

    function handleResize() {
        if (window.innerWidth <= 768) {
            buildMobileMenu();
        } else {
            restoreDesktopMenu();
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
        // После изменения размера переинициализируем подвал
        initFooterAccordion();
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
            // После клика по гамбургеру переинициализируем подвал
            setTimeout(initFooterAccordion, 100);
        });
    }

    initDesktopMenu();
    
    // Инициализируем подвал при загрузке
    initFooterAccordion();
    
    // Дополнительная инициализация через MutationObserver на случай, если подвал появится позже
    const observer = new MutationObserver(function(mutations) {
        if (document.querySelector('.footer-accordion')) {
            initFooterAccordion();
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
});