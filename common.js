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
            // Отправляем событие в Метрику, если она уже загружена
            if (typeof ym !== 'undefined') {
                ym(107242178, 'reachGoal', 'cookie_declined');
            }
        });
    }

    // Автоматическое скрытие баннера через 30 секунд, если пользователь не выбрал
    setTimeout(() => {
        if (cookieBanner && cookieBanner.style.display !== 'none' && 
            !localStorage.getItem('cookieAccepted') && !localStorage.getItem('cookieDeclined')) {
            cookieBanner.style.display = 'none';
        }
    }, 30000);

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
                { name: 'Календарь праздников', href: 'holidays-calendar.html', icon: 'fas fa-calendar-day' },
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
                { name: 'Народы России', href: 'narody-rossii.html', icon: 'fas fa-flag' },
                { name: 'Народы Парголово', href: 'narody-pargolovo.html', icon: 'fas fa-users' },
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

    // ===== ПОИСК В ШАПКЕ =====
    const searchIcon = document.getElementById('searchIcon');
    const searchPopup = document.getElementById('searchPopup');
    if (searchIcon && searchPopup) {
        searchIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            searchPopup.classList.toggle('active');
            const searchInput = searchPopup.querySelector('input[type="text"]');
            if (searchInput && searchPopup.classList.contains('active')) {
                setTimeout(function() {
                    searchInput.focus();
                }, 100);
            }
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
    function initBackToTop() {
        const oldBtns = document.querySelectorAll('#scrollUp, .back-to-top, #backToTop, #toTop');
        oldBtns.forEach(btn => btn.remove());
        
        const backBtn = document.createElement('a');
        backBtn.href = '#';
        backBtn.className = 'back-to-top';
        backBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        document.body.appendChild(backBtn);
        
        backBtn.style.position = 'fixed';
        backBtn.style.bottom = '20px';
        backBtn.style.right = '20px';
        backBtn.style.backgroundColor = '#e5989b';
        backBtn.style.color = '#fff';
        backBtn.style.width = '50px';
        backBtn.style.height = '50px';
        backBtn.style.borderRadius = '50%';
        backBtn.style.display = 'flex';
        backBtn.style.alignItems = 'center';
        backBtn.style.justifyContent = 'center';
        backBtn.style.textDecoration = 'none';
        backBtn.style.fontSize = '24px';
        backBtn.style.opacity = '0';
        backBtn.style.visibility = 'hidden';
        backBtn.style.transition = 'all 0.3s ease';
        backBtn.style.zIndex = '999999';
        backBtn.style.cursor = 'pointer';
        backBtn.style.border = 'none';
        
        function toggleButton() {
            if (window.pageYOffset > 100) {
                backBtn.style.opacity = '1';
                backBtn.style.visibility = 'visible';
            } else {
                backBtn.style.opacity = '0';
                backBtn.style.visibility = 'hidden';
            }
        }
        
        window.addEventListener('scroll', toggleButton);
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        toggleButton();
    }
    
    initBackToTop();

    // ===== СИСТЕМА ЛАЙКОВ (СЕРДЕЧКО) =====
    
    function sendLikeToMetric(itemId, itemName, itemType, isLiked) {
        if (typeof ym !== 'undefined') {
            ym(107242178, 'reachGoal', 'item_like', {
                item_id: itemId,
                item_name: itemName,
                item_type: itemType,
                action: isLiked ? 'unlike' : 'like'
            });
        }
        
        const stats = JSON.parse(localStorage.getItem('likes_stats') || '{}');
        const key = `${itemType}_${itemId}`;
        stats[key] = stats[key] || { name: itemName, type: itemType, likes: 0 };
        stats[key].likes += isLiked ? -1 : 1;
        localStorage.setItem('likes_stats', JSON.stringify(stats));
    }
    
    function initBookLikes() {
        const likeBtns = document.querySelectorAll('.like-btn');
        
        likeBtns.forEach(btn => {
            const bookId = btn.dataset.id;
            const bookName = btn.dataset.name || 'Книга';
            const isLiked = localStorage.getItem(`liked_book_${bookId}`) === 'true';
            
            if (isLiked) {
                btn.classList.add('liked');
                const icon = btn.querySelector('i');
                if (icon) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                }
            }
            
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const wasLiked = this.classList.contains('liked');
                const icon = this.querySelector('i');
                
                if (wasLiked) {
                    this.classList.remove('liked');
                    if (icon) {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                    }
                    localStorage.setItem(`liked_book_${bookId}`, 'false');
                    sendLikeToMetric(bookId, bookName, 'book', true);
                } else {
                    this.classList.add('liked');
                    if (icon) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                    }
                    localStorage.setItem(`liked_book_${bookId}`, 'true');
                    sendLikeToMetric(bookId, bookName, 'book', false);
                }
                
                const countSpan = this.querySelector('.like-count');
                if (countSpan) {
                    let currentCount = parseInt(countSpan.textContent) || 0;
                    countSpan.textContent = wasLiked ? currentCount - 1 : currentCount + 1;
                }
            });
        });
    }
    
    window.initHolidayLikes = function() {
        const likeBtns = document.querySelectorAll('.holiday-like-btn');
        
        likeBtns.forEach(btn => {
            const holidayId = btn.dataset.id;
            const holidayName = btn.dataset.name || 'Праздник';
            const isLiked = localStorage.getItem(`liked_holiday_${holidayId}`) === 'true';
            
            if (isLiked) {
                btn.classList.add('liked');
                const icon = btn.querySelector('i');
                if (icon) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                }
            }
            
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const wasLiked = this.classList.contains('liked');
                const icon = this.querySelector('i');
                
                if (wasLiked) {
                    this.classList.remove('liked');
                    if (icon) {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                    }
                    localStorage.setItem(`liked_holiday_${holidayId}`, 'false');
                    sendLikeToMetric(holidayId, holidayName, 'holiday', true);
                } else {
                    this.classList.add('liked');
                    if (icon) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                    }
                    localStorage.setItem(`liked_holiday_${holidayId}`, 'true');
                    sendLikeToMetric(holidayId, holidayName, 'holiday', false);
                }
            });
        });
    };
    
    setTimeout(initBookLikes, 500);
});