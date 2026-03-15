// common.js – общие скрипты для всех страниц
(function() {
    "use strict";

    // ---- Бургер-меню ----
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

    // ---- Адаптивное меню (новая версия с data-атрибутами) ----
    (function() {
        const nav = document.getElementById('nav');
        if (!nav) return;
        const originalHTML = nav.innerHTML;

        function buildMobile() {
            // Получаем все пункты меню из оригинального HTML
            const temp = document.createElement('div');
            temp.innerHTML = originalHTML;
            const items = Array.from(temp.querySelectorAll('ul > li'));

            const mainItems = [];
            const moreItems = [];

            // Разделяем пункты по data-атрибуту
            items.forEach(li => {
                if (li.dataset.mobile === 'main') {
                    mainItems.push(li);
                } else if (li.dataset.mobile === 'more') {
                    moreItems.push(li);
                } else {
                    // Если атрибут не указан, по умолчанию считаем основным
                    mainItems.push(li);
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
            return html;
        }

        function updateMobileMenu() {
            if (window.innerWidth <= 768) {
                nav.innerHTML = buildMobile();
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
            } else {
                nav.innerHTML = originalHTML;
            }
        }

        const mq = window.matchMedia('(max-width: 768px)');
        if (mq.addEventListener) {
            mq.addEventListener('change', updateMobileMenu);
        } else {
            mq.addListener(updateMobileMenu);
        }
        window.addEventListener('load', updateMobileMenu);
        if (mq.matches) updateMobileMenu();
    })();

    // ---- КНОПКА «НАВЕРХ» (УПРАВЛЕНИЕ ЧЕРЕЗ ИНЛАЙН-СТИЛИ) ----
    function setupBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) {
            setTimeout(setupBackToTop, 300);
            return;
        }

        // Убедимся, что у кнопки есть базовые стили
        backToTop.style.position = 'fixed';
        backToTop.style.bottom = '2rem';
        backToTop.style.right = '2rem';
        backToTop.style.zIndex = '99';
        backToTop.style.transition = 'opacity 0.3s, visibility 0.3s';
        backToTop.style.display = 'flex';
        backToTop.style.alignItems = 'center';
        backToTop.style.justifyContent = 'center';
        backToTop.style.width = '50px';
        backToTop.style.height = '50px';
        backToTop.style.borderRadius = '50%';
        backToTop.style.background = '#e5989b';
        backToTop.style.color = '#fff';
        backToTop.style.textDecoration = 'none';
        backToTop.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

        function toggleButton() {
            if (window.scrollY > 300 || document.documentElement.scrollTop > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        }

        window.addEventListener('scroll', toggleButton);
        window.addEventListener('touchmove', toggleButton);
        toggleButton();

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Запускаем после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupBackToTop);
    } else {
        setupBackToTop();
    }

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

    // ---- Cookie-баннер и Яндекс.Метрика ----
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
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true
        });
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

    // ---- Fancybox (если есть) ----
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind("[data-fancybox]");
    }
})();