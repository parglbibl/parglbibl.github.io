// common.js – общие скрипты для всего сайта

document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Десктопное меню с "Ещё"
    const navContainer = document.querySelector('.nav ul');
    if (navContainer && window.innerWidth > 768) {
        const mainItems = document.querySelectorAll('li[data-mobile="main"]');
        const moreItems = document.querySelectorAll('li[data-mobile="more"]');

        if (moreItems.length > 0) {
            const moreLi = document.createElement('li');
            moreLi.className = 'desktop-more';
            moreLi.innerHTML = '<a href="#"><i class="fas fa-ellipsis-h"></i> Ещё <i class="fas fa-chevron-down"></i></a><ul class="desktop-submenu"></ul>';

            navContainer.appendChild(moreLi);

            const submenu = moreLi.querySelector('.desktop-submenu');
            moreItems.forEach(item => {
                submenu.appendChild(item.cloneNode(true));
                item.remove();
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

    // ===== НОВАЯ КНОПКА "НАВЕРХ" (чистый JS) =====
    const btn = document.getElementById('scrollUp');
    if (btn) {
        // Показываем/скрываем при прокрутке (порог 100px)
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }
        });

        // Плавная прокрутка вверх при клике
        btn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});