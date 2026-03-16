// common.js – общие скрипты для всех страниц
(function() {
    "use strict";

    // ---- Загрузка скрипта VK.Share (для кнопок "Поделиться") ----
    (function() {
        if (!document.querySelector('script[src*="vk.com/js/api/share.js"]')) {
            var script = document.createElement('script');
            script.src = 'https://vk.com/js/api/share.js?95';
            script.charset = 'windows-1251';
            document.head.appendChild(script);
        }
    })();

    // ---- Бургер-меню (мобильное) ----
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => nav.classList.toggle('active'));
    }

    // ---- Поиск ----
    const searchIcon = document.getElementById('searchIcon');
    const searchPopup = document.getElementById('searchPopup');
    if (searchIcon && searchPopup) {
        searchIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            searchPopup.classList.toggle('active');
            if (searchPopup.classList.contains('active')) {
                const input = searchPopup.querySelector('input');
                if (input) input.focus();
            }
        });
        document.addEventListener('click', (e) => {
            if (!searchPopup.contains(e.target) && e.target !== searchIcon) {
                searchPopup.classList.remove('active');
            }
        });
    }

    // ---- Адаптивное меню (универсальное) ----
    (function() {
        const nav = document.getElementById('nav');
        if (!nav) return;

        // Сохраняем оригинальный HTML меню (один раз)
        const originalHTML = nav.innerHTML;

        // Функция для получения списка пунктов с атрибутами
        function getMenuItems() {
            const temp = document.createElement('div');
            temp.innerHTML = originalHTML;
            return Array.from(temp.querySelectorAll('ul > li'));
        }

        // Функция для обновления меню в зависимости от ширины
        function updateMenu() {
            const width = window.innerWidth;

            // Мобильная версия (до 768px)
            if (width <= 768) {
                buildMobileMenu();
                return;
            }

            // Десктопная версия (с выпадающим "Ещё")
            buildDesktopMenu();
        }

        // ---- Построение мобильного меню ----
        function buildMobileMenu() {
            const items = getMenuItems();
            const mainItems = [];
            const moreItems = [];

            items.forEach(li => {
                if (li.dataset.mobile === 'main') {
                    mainItems.push(li);
                } else if (li.dataset.mobile === 'more') {
                    moreItems.push(li);
                } else {
                    mainItems.push(li); // по умолчанию
                }
            });

            let html = '<ul>';
            mainItems.forEach(li => {
                const a = li.querySelector('a');
                if (a) {
                    const href = a.getAttribute('href');
                    const active = a.classList.contains('active') ? 'active' : '';
                    const icon = a.querySelector('i') ? a.querySelector('i').outerHTML : '';
                    const text = a.textContent.trim().replace(/^\s*|\s*$/g, '');
                    html += `<li><a href="${href}" class="${active}">${icon} ${text}</a></li>`;
                }
            });

            if (moreItems.length > 0) {
                html += `<li class="mobile-more"><a href="#" id="mobileMoreToggle">Ещё <i class="fas fa-chevron-down"></i></a><ul class="mobile-submenu" style="display: none;">`;
                moreItems.forEach(li => {
                    const a = li.querySelector('a');
                    if (a) {
                        const href = a.getAttribute('href');
                        const active = a.classList.contains('active') ? 'active' : '';
                        const icon = a.querySelector('i') ? a.querySelector('i').outerHTML : '';
                        const text = a.textContent.trim().replace(/^\s*|\s*$/g, '');
                        html += `<li><a href="${href}" class="${active}">${icon} ${text}</a></li>`;
                    }
                });
                html += '</ul></li>';
            }
            html += '</ul>';
            nav.innerHTML = html;

            const moreToggle = document.getElementById('mobileMoreToggle');
            if (moreToggle) {
                moreToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    const sub = this.nextElementSibling;
                    const icon = this.querySelector('i');
                    if (sub.style.display === 'none' || sub.style.display === '') {
                        sub.style.display = 'block';
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                    } else {
                        sub.style.display = 'none';
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    }
                });
            }
        }

        // ---- Построение десктопного меню с выпадающим "Ещё" ----
        function buildDesktopMenu() {
            const items = getMenuItems();
            const mainItems = [];
            const moreItems = [];

            items.forEach(li => {
                if (li.dataset.mobile === 'main') {
                    mainItems.push(li);
                } else if (li.dataset.mobile === 'more') {
                    moreItems.push(li);
                } else {
                    mainItems.push(li);
                }
            });

            let html = '<ul class="desktop-menu">';

            mainItems.forEach(li => {
                const a = li.querySelector('a');
                if (a) {
                    const href = a.getAttribute('href');
                    const active = a.classList.contains('active') ? 'active' : '';
                    const icon = a.querySelector('i') ? a.querySelector('i').outerHTML : '';
                    const text = a.textContent.trim().replace(/^\s*|\s*$/g, '');
                    html += `<li><a href="${href}" class="${active}">${icon} ${text}</a></li>`;
                }
            });

            if (moreItems.length > 0) {
                html += `<li class="desktop-more">
                    <a href="#" id="desktopMoreToggle">Ещё <i class="fas fa-chevron-down"></i></a>
                    <ul class="desktop-submenu">`;
                moreItems.forEach(li => {
                    const a = li.querySelector('a');
                    if (a) {
                        const href = a.getAttribute('href');
                        const active = a.classList.contains('active') ? 'active' : '';
                        const icon = a.querySelector('i') ? a.querySelector('i').outerHTML : '';
                        const text = a.textContent.trim().replace(/^\s*|\s*$/g, '');
                        html += `<li><a href="${href}" class="${active}">${icon} ${text}</a></li>`;
                    }
                });
                html += `</ul></li>`;
            }

            html += '</ul>';
            nav.innerHTML = html;

            const desktopMore = document.getElementById('desktopMoreToggle');
            if (desktopMore) {
                desktopMore.addEventListener('click', function(e) {
                    e.preventDefault();
                    const sub = this.nextElementSibling;
                    sub.classList.toggle('show');
                });

                const parentLi = desktopMore.closest('.desktop-more');
                parentLi.addEventListener('mouseenter', function() {
                    const sub = this.querySelector('.desktop-submenu');
                    if (sub) sub.classList.add('show');
                });
                parentLi.addEventListener('mouseleave', function() {
                    const sub = this.querySelector('.desktop-submenu');
                    if (sub) sub.classList.remove('show');
                });
            }
        }

        // Запускаем при загрузке и изменении размера окна
        window.addEventListener('resize', updateMenu);
        updateMenu();
        window.addEventListener('load', updateMenu);
    })();

    // ---- Аккордеон в подвале ----
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const accordion = this.closest('.footer-accordion');
            if (accordion) accordion.classList.toggle('open');
        });
    });

    // ---- Версия для слабовидящих ----
    const specialLink = document.getElementById('specialFooterLink');
    if (specialLink) {
        specialLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.toggle('special-mode');
        });
    }

    // ---- Cookie-баннер и Яндекс.Метрика (обновлённая версия с дополнительными параметрами) ----
    function loadYandexMetrica() {
        if (window.ym && window.yaCounter107242178) return;
        (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
            }
            k=e.createElement(t), a=e.getElementsByTagName(t)[0], k.async=1, k.src=r, a.parentNode.insertBefore(k,a)
        })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(107242178, "init", {
            ssr: true,
            webvisor: true,
            clickmap: true,
            ecommerce: "dataLayer",
            referrer: document.referrer,
            url: location.href,
            accurateTrackBounce: true,
            trackLinks: true
        });

        // Добавляем noscript-пиксель для старых браузеров
        var noscript = document.createElement('noscript');
        var div = document.createElement('div');
        var img = document.createElement('img');
        img.src = 'https://mc.yandex.ru/watch/107242178';
        img.style = 'position:absolute; left:-9999px;';
        img.alt = '';
        div.appendChild(img);
        noscript.appendChild(div);
        document.body.appendChild(noscript);
    }

    const banner = document.getElementById('cookie-banner');
    const accept = document.getElementById('cookie-accept');
    const decline = document.getElementById('cookie-decline');

    if (banner && accept && decline) {
        if (!localStorage.getItem('cookieConsent')) {
            banner.style.display = 'block';
        } else if (localStorage.getItem('cookieConsent') === 'true') {
            loadYandexMetrica();
        }

        accept.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            banner.style.display = 'none';
            loadYandexMetrica();
        });
        decline.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'false');
            banner.style.display = 'none';
        });
    }
})();