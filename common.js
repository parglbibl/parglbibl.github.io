// common.js – общие скрипты для всех страниц
(function() {
    "use strict";

    // ---- Загрузка скрипта VK.Share ----
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

    // ---- Адаптивное меню ----
    (function() {
        const nav = document.getElementById('nav');
        if (!nav) return;

        const originalHTML = nav.innerHTML;

        function getMenuItems() {
            const temp = document.createElement('div');
            temp.innerHTML = originalHTML;
            return Array.from(temp.querySelectorAll('ul > li'));
        }

        function updateMenu() {
            const width = window.innerWidth;

            // Мобильная версия (до 768px)
            if (width <= 768) {
                buildMobileMenu();
                return;
            }

            // Десктопная версия – фиксированный набор из 8 пунктов
            buildDesktopMenuFixed();
        }

        function buildMobileMenu() {
            const items = getMenuItems();
            const mainItems = [];
            const moreItems = [];

            items.forEach(li => {
                const a = li.querySelector('a');
                if (!a) return;
                const text = a.textContent.trim();
                // На мобильных показываем все основные (Главная...Контакты), остальные под "Ещё"
                const isMain = text.includes('Главная') || text.includes('О нас') || text.includes('Краеведение') ||
                               text.includes('Новинки') || text.includes('Услуги') || text.includes('События') ||
                               text.includes('Вопросы') || text.includes('Библиотеки района') || text.includes('Партнёры') ||
                               text.includes('Контакты');
                if (isMain) {
                    mainItems.push(li);
                } else {
                    moreItems.push(li);
                }
            });

            let html = '<ul>';
            mainItems.forEach(li => {
                const a = li.querySelector('a');
                if (a) {
                    const href = a.getAttribute('href');
                    const active = a.classList.contains('active') ? 'active' : '';
                    const icon = a.querySelector('i') ? a.querySelector('i').outerHTML : '';
                    const text = a.textContent.trim();
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
                        const text = a.textContent.trim();
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

        function buildDesktopMenuFixed() {
            const items = getMenuItems();

            // Только эти 8 пунктов будут видны всегда
            const visibleNames = [
                'Главная', 'О нас', 'Краеведение', 'Новинки',
                'Услуги', 'События', 'Вопросы', 'Контакты'
            ];

            let visibleHtml = '';
            let hiddenHtml = '';

            items.forEach(li => {
                const a = li.querySelector('a');
                if (!a) return;
                const href = a.getAttribute('href');
                const active = a.classList.contains('active') ? 'active' : '';
                const icon = a.querySelector('i') ? a.querySelector('i').outerHTML : '';
                const text = a.textContent.trim();

                if (visibleNames.includes(text)) {
                    visibleHtml += `<li><a href="${href}" class="${active}">${icon} ${text}</a></li>`;
                } else {
                    // Все остальные (включая Библиотеки района, Партнёры и второстепенные) уходят в "Ещё"
                    hiddenHtml += `<li><a href="${href}" class="${active}">${icon} ${text}</a></li>`;
                }
            });

            let finalHtml = '<ul class="desktop-menu">' + visibleHtml;
            if (hiddenHtml) {
                finalHtml += `<li class="desktop-more">
                    <a href="#" id="desktopMoreToggle">Ещё <i class="fas fa-chevron-down"></i></a>
                    <ul class="desktop-submenu">` + hiddenHtml + `</ul></li>`;
            }
            finalHtml += '</ul>';
            nav.innerHTML = finalHtml;

            const desktopMore = document.getElementById('desktopMoreToggle');
            if (desktopMore) {
                desktopMore.addEventListener('click', function(e) {
                    e.preventDefault();
                    const sub = this.nextElementSibling;
                    sub.classList.toggle('show');
                });

                const parentLi = desktopMore.closest('.desktop-more');
                if (parentLi) {
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
        }

        // Запускаем при загрузке и изменении размера окна
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateMenu, 100);
        });
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

    // ---- Кнопка "Наверх" ----
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
    }
})();