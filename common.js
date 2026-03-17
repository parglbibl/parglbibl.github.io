// common.js – общие скрипты для всех страниц
(function() {
    "use strict";

    // Загрузка VK.Share
    (function() {
        if (!document.querySelector('script[src*="vk.com/js/api/share.js"]')) {
            var script = document.createElement('script');
            script.src = 'https://vk.com/js/api/share.js?95';
            script.charset = 'windows-1251';
            document.head.appendChild(script);
        }
    })();

    // Бургер-меню
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => nav.classList.toggle('active'));
    }

    // Поиск
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

    // Адаптивное меню
    (function() {
        const nav = document.getElementById('nav');
        if (!nav) return;

        const originalHTML = nav.innerHTML;

        // Функция получения пунктов с атрибутами
        function getMenuItems() {
            const temp = document.createElement('div');
            temp.innerHTML = originalHTML;
            return Array.from(temp.querySelectorAll('ul > li'));
        }

        // Функция для измерения ширины элемента
        function measureItemWidth(htmlString) {
            const div = document.createElement('div');
            div.innerHTML = htmlString;
            const li = div.firstChild;
            li.style.position = 'absolute';
            li.style.visibility = 'hidden';
            li.style.whiteSpace = 'nowrap';
            li.style.display = 'inline-block';
            document.body.appendChild(li);
            const width = li.offsetWidth;
            document.body.removeChild(li);
            return width;
        }

        // Получаем ширину контейнера (учитывая padding, но упростим)
        function getNavWidth() {
            return nav.offsetWidth;
        }

        // Функция обновления меню
        function updateMenu() {
            const width = window.innerWidth;

            // Мобильная версия (до 768px)
            if (width <= 768) {
                buildMobileMenu();
                return;
            }

            // Десктоп – строим гибкое меню
            buildDesktopMenu();
        }

        // Мобильное меню (вертикальное)
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

        // Десктопное меню с динамическим "Ещё"
        function buildDesktopMenu() {
            const items = getMenuItems();
            // Превращаем каждый пункт в объект с данными и измеряем его ширину
            const itemsData = items.map(li => {
                const a = li.querySelector('a');
                if (!a) return null;
                const href = a.getAttribute('href');
                const active = a.classList.contains('active') ? 'active' : '';
                const icon = a.querySelector('i') ? a.querySelector('i').outerHTML : '';
                const text = a.textContent.trim();
                // Создаём HTML для измерения
                const tempHTML = `<li style="display:inline-block; white-space:nowrap;"><a href="${href}" class="${active}">${icon} ${text}</a></li>`;
                const width = measureItemWidth(tempHTML);
                return { href, active, icon, text, width };
            }).filter(item => item !== null);

            const navWidth = getNavWidth();

            // Ширина кнопки "Ещё" (с иконкой)
            const moreButtonHTML = `<li class="desktop-more" style="display:inline-block; white-space:nowrap;"><a href="#">Ещё <i class="fas fa-chevron-down"></i></a></li>`;
            const moreButtonWidth = measureItemWidth(moreButtonHTML);

            // Расчёт отступа между пунктами (gap) – возьмём из CSS, но для простоты зададим 2rem = 32px
            const gap = 32; // пикселей

            // Определяем, сколько пунктов можно показать
            let totalWidth = 0;
            let visibleCount = 0;
            for (let i = 0; i < itemsData.length; i++) {
                if (i > 0) totalWidth += gap;
                totalWidth += itemsData[i].width;
                if (totalWidth + (visibleCount < itemsData.length ? moreButtonWidth : 0) <= navWidth) {
                    visibleCount++;
                } else {
                    break;
                }
            }

            // Собираем HTML
            let html = '<ul class="desktop-menu">';
            for (let i = 0; i < visibleCount; i++) {
                const item = itemsData[i];
                html += `<li><a href="${item.href}" class="${item.active}">${item.icon} ${item.text}</a></li>`;
            }

            const moreItems = itemsData.slice(visibleCount);
            if (moreItems.length > 0) {
                html += `<li class="desktop-more">
                    <a href="#" id="desktopMoreToggle">Ещё <i class="fas fa-chevron-down"></i></a>
                    <ul class="desktop-submenu">`;
                moreItems.forEach(item => {
                    html += `<li><a href="${item.href}" class="${item.active}">${item.icon} ${item.text}</a></li>`;
                });
                html += `</ul></li>`;
            }
            html += '</ul>';
            nav.innerHTML = html;

            // Обработчики для "Ещё"
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

        // Запускаем и подписываемся на ресайз с debounce
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateMenu, 100);
        });
        updateMenu();
        window.addEventListener('load', updateMenu);
    })();

    // Аккордеон в подвале
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const accordion = this.closest('.footer-accordion');
            if (accordion) accordion.classList.toggle('open');
        });
    });

    // Версия для слабовидящих
    const specialLink = document.getElementById('specialFooterLink');
    if (specialLink) {
        specialLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.toggle('special-mode');
        });
    }

    // Кнопка "Наверх"
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