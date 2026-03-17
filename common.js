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

        // Функция для получения списка пунктов с атрибутами и их шириной
        function getMenuItems() {
            const temp = document.createElement('div');
            temp.innerHTML = originalHTML;
            return Array.from(temp.querySelectorAll('ul > li'));
        }

        // Функция для измерения ширины пункта в пикселях
        function measureItemWidth(item) {
            const clone = item.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.visibility = 'hidden';
            clone.style.whiteSpace = 'nowrap';
            clone.style.display = 'inline-block';
            document.body.appendChild(clone);
            const width = clone.offsetWidth;
            document.body.removeChild(clone);
            return width;
        }

        // Функция для обновления меню в зависимости от ширины
        function updateMenu() {
            const width = window.innerWidth;

            // Мобильная версия (до 768px)
            if (width <= 768) {
                buildMobileMenu();
                return;
            }

            // Десктопная версия – строим горизонтальное меню с возможным "Ещё"
            buildFlexibleDesktopMenu();
        }

        // ---- Построение мобильного меню (вертикальное с подменю) ----
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

        // ---- Построение гибкого десктопного меню с вычислением "Ещё" ----
        function buildFlexibleDesktopMenu() {
            const items = getMenuItems();
            // Получаем ширину контейнера nav (минус отступы, но упростим – берем ширину самого nav)
            const navWidth = nav.offsetWidth;

            // Измеряем ширину каждого пункта (включая иконки и текст)
            const itemsWithWidth = items.map(item => {
                const a = item.querySelector('a');
                if (!a) return null;
                const href = a.getAttribute('href');
                const active = a.classList.contains('active') ? 'active' : '';
                const icon = a.querySelector('i') ? a.querySelector('i').outerHTML : '';
                const text = a.textContent.trim().replace(/^\s*|\s*$/g, '');
                // Создаем HTML для измерения
                const tempHTML = `<li style="display:inline-block; white-space:nowrap;"><a href="${href}" class="${active}">${icon} ${text}</a></li>`;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = tempHTML;
                const tempLi = tempDiv.firstChild;
                document.body.appendChild(tempLi);
                const w = tempLi.offsetWidth;
                document.body.removeChild(tempLi);
                return {
                    href, active, icon, text,
                    width: w
                };
            }).filter(item => item !== null);

            // Считаем суммарную ширину всех пунктов + запас на разделители (gap)
            // В CSS у .desktop-menu gap: 2rem, переведем в пиксели (приблизительно)
            const gap = parseFloat(getComputedStyle(document.querySelector('.desktop-menu')?.style?.gap || '2rem')) * parseFloat(getComputedStyle(document.documentElement).fontSize) || 32;
            let totalWidth = 0;
            let visibleCount = 0;
            for (let i = 0; i < itemsWithWidth.length; i++) {
                totalWidth += itemsWithWidth[i].width;
                if (i > 0) totalWidth += gap;
                if (totalWidth <= navWidth) {
                    visibleCount++;
                } else {
                    break;
                }
            }

            // Если все помещаются, visibleCount = itemsWithWidth.length
            const visibleItems = itemsWithWidth.slice(0, visibleCount);
            const moreItems = itemsWithWidth.slice(visibleCount);

            let html = '<ul class="desktop-menu">';
            visibleItems.forEach(item => {
                html += `<li><a href="${item.href}" class="${item.active}">${item.icon} ${item.text}</a></li>`;
            });

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

            // Добавляем обработчики для "Ещё"
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

        // Запускаем при загрузке и изменении размера окна с debounce для оптимизации
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
})();