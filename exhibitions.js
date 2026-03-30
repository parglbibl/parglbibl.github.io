// exhibitions.js – данные о выставках на 2026 год

const exhibitionsData = {
    current: [
        {
            title: "Неделя детской книги",
            date: "24–30 марта 2026",
            description: "Традиционный весенний праздник книги. Выставка лучших детских изданий, сказок, приключений и новинок для детей и подростков.",
            books: "С. Маршак, К. Чуковский, А. Линдгрен, современные авторы",
            image: "exhibition_detbook.jpg",
            link: "#"
        },
        {
            title: "М.Е. Салтыков-Щедрин: 200 лет сатиры",
            date: "март – декабрь 2026",
            description: "Совместная выставка с Домом культуры Парголово, посвящённая 200-летию великого сатирика. Представлены материалы из фондов библиотеки и ДК, редкие издания, иллюстрации.",
            books: "«История одного города», «Господа Головлёвы», «Сказки»",
            image: "exhibition_saltykov.jpg",
            link: "#"
        }
    ],
    upcoming: [
        {
            title: "Весна в поэзии",
            date: "апрель 2026",
            description: "Стихи о весне от Пушкина до современников. Выставка поэтических сборников, романсы, музыкальные иллюстрации.",
            books: "А. Пушкин, Ф. Тютчев, А. Фет, А. Ахматова, Б. Пастернак",
            image: "exhibition_spring.jpg",
            link: "#"
        },
        {
            title: "Новые голоса",
            date: "апрель 2026",
            description: "Выставка дебютных книг современных авторов, поступивших в фонд в 2025–2026 годах. Откройте для себя новые имена!",
            books: "Д. Кузнецова, Е. Карабет, А. Литвинова и другие",
            image: "exhibition_newvoices.jpg",
            link: "#"
        },
        {
            title: "Победа в сердцах",
            date: "май 2026",
            description: "К 81-й годовщине Победы. Книги о Великой Отечественной войне: поэзия, проза, документальная литература.",
            books: "Б. Васильев, В. Быков, К. Симонов, Ю. Друнина, В. Некрасов",
            image: "exhibition_victory.jpg",
            link: "#"
        },
        {
            title: "Семейные саги",
            date: "май 2026",
            description: "Ко Дню семьи. Книги о семейных ценностях, династиях, любви и верности. Классика и современная проза.",
            books: "Л. Толстой, М. Митчелл, А. Иванов, М. Степнова",
            image: "exhibition_family.jpg",
            link: "#"
        },
        {
            title: "Пушкинский день",
            date: "июнь 2026",
            description: "Выставка к 227-летию А.С. Пушкина. Издания поэта, литература о нём, иллюстрации, редкие книги из фонда.",
            books: "«Евгений Онегин», «Капитанская дочка», лирика",
            image: "exhibition_pushkin.jpg",
            link: "#"
        },
        {
            title: "Детство, открытое миру",
            date: "июнь 2026",
            description: "Современная детская литература: книги, которые помогают познавать мир, развивают воображение и учат добру.",
            books: "А. Жвалевский, Е. Пастернак, Н. Дашевская, Т. Михеева",
            image: "exhibition_childlit.jpg",
            link: "#"
        },
        {
            title: "Летнее чтение",
            date: "июль 2026",
            description: "Книги для отдыха: приключения, детективы, лёгкая проза, фантастика. Идеальные спутники для отпуска и дачи.",
            books: "Д. Донцова, Б. Акунин, С. Лукьяненко, Ж. Верн",
            image: "exhibition_summer.jpg",
            link: "#"
        },
        {
            title: "Парголово в литературе",
            date: "июль 2026",
            description: "Краеведческая выставка: книги о Парголово, произведения писателей, связанных с нашим краем, старые карты и фотографии.",
            books: "Е. Александрова, С. Глезеров, очерки Грибоедова, Познякова",
            image: "exhibition_pargolovo.jpg",
            link: "#"
        },
        {
            title: "Три цвета русской прозы",
            date: "август 2026",
            description: "К 110-летию В.П. Астафьева. Выставка «деревенской прозы»: Астафьев, Распутин, Шукшин, Белов.",
            books: "«Царь-рыба», «Прощание с Матёрой», «Калина красная»",
            image: "exhibition_village.jpg",
            link: "#"
        },
        {
            title: "Природа в русской поэзии",
            date: "август 2026",
            description: "Стихи о родной природе: от Фета до Рубцова. Выставка поэтических сборников, репродукции пейзажей.",
            books: "Ф. Тютчев, А. Фет, С. Есенин, Н. Рубцов",
            image: "exhibition_nature.jpg",
            link: "#"
        },
        {
            title: "Здравствуй, школа!",
            date: "сентябрь 2026",
            description: "Книги для школьников и учителей: энциклопедии, справочники, художественная литература по школьной программе.",
            books: "«Всё обо всём», словари, произведения из списка литературы",
            image: "exhibition_school.jpg",
            link: "#"
        },
        {
            title: "Краеведческая осень",
            date: "сентябрь 2026",
            description: "Выставка к конкурсу «История одной улицы». Работы участников, старые фотографии, документы, воспоминания.",
            books: "Архивные материалы, книги по истории Парголово",
            image: "exhibition_kraeved.jpg",
            link: "#"
        },
        {
            title: "Лермонтовский октябрь",
            date: "октябрь 2026",
            description: "К 212-летию М.Ю. Лермонтова. Выставка произведений поэта, прозы, иллюстраций, литературы о жизни и творчестве.",
            books: "«Герой нашего времени», «Демон», лирика",
            image: "exhibition_lermontov.jpg",
            link: "#"
        },
        {
            title: "Золотая осень в литературе",
            date: "октябрь 2026",
            description: "Стихи и проза об осени, выставка репродукций осенних пейзажей русских художников.",
            books: "И. Бунин, А. Пушкин, М. Пришвин, К. Паустовский",
            image: "exhibition_autumn.jpg",
            link: "#"
        },
        {
            title: "Итоги конкурса «История одной улицы»",
            date: "ноябрь 2026",
            description: "Выставка лучших работ, присланных на конкурс. Фотографии, воспоминания, документы, творческие проекты участников.",
            books: "Работы участников, книги по краеведению",
            image: "exhibition_konkurs.jpg",
            link: "#"
        },
        {
            title: "Писатели на войне",
            date: "ноябрь – декабрь 2026",
            description: "Книги о военном опыте, фронтовые дневники, поэзия и проза писателей-фронтовиков.",
            books: "К. Симонов, В. Некрасов, Ю. Бондарев, В. Астафьев",
            image: "exhibition_war.jpg",
            link: "#"
        },
        {
            title: "Новогодние чудеса",
            date: "декабрь 2026",
            description: "Сказки, рождественские рассказы, книги о зиме. Подарочные издания для детей и взрослых.",
            books: "Н. Гоголь, Ч. Диккенс, Э.Т.А. Гофман, современные новогодние истории",
            image: "exhibition_newyear.jpg",
            link: "#"
        },
        {
            title: "Книги под ёлку",
            date: "декабрь 2026",
            description: "Лучшие книги года: рекомендации библиотекарей для подарков. Иллюстрированные издания, бестселлеры.",
            books: "Новинки 2026, подарочные энциклопедии, книги для всей семьи",
            image: "exhibition_gifts.jpg",
            link: "#"
        }
    ]
};

function renderExhibitions() {
    const container = document.getElementById('exhibitions-container');
    if (!container) return;
    let html = '';

    // Текущие выставки
    html += `<div class="exhibition-section"><h2 class="section-title-exhib">📌 Сейчас в библиотеке</h2>`;
    exhibitionsData.current.forEach(ex => {
        html += `
            <div class="exhibition-card">
                <img src="${ex.image || 'https://via.placeholder.com/300x200?text=Фото+выставки'}" alt="${ex.title}">
                <div class="exhibition-content">
                    <div class="exhibition-title">${ex.title}</div>
                    <div class="exhibition-date">${ex.date}</div>
                    <div class="exhibition-desc">${ex.description}</div>
                    <div class="exhibition-books"><strong>📚 Книги:</strong> ${ex.books}</div>
                    <a href="${ex.link}" class="exhibition-link">Подробнее о выставке →</a>
                </div>
            </div>
        `;
    });
    html += `</div>`;

    // Анонсы (будущие)
    html += `<div class="exhibition-section"><h2 class="section-title-exhib">📅 Скоро открываются</h2><div class="archive-grid">`;
    exhibitionsData.upcoming.forEach(ex => {
        html += `
            <div class="archive-card">
                <img src="${ex.image || 'https://via.placeholder.com/300x180?text=Анонс'}" alt="${ex.title}">
                <div class="archive-content">
                    <div class="archive-title">${ex.title}</div>
                    <div class="exhibition-date" style="font-size:0.8rem;">${ex.date}</div>
                    <div class="exhibition-desc" style="font-size:0.85rem;">${ex.description}</div>
                    <div class="exhibition-books" style="font-size:0.8rem;"><strong>📚</strong> ${ex.books}</div>
                </div>
            </div>
        `;
    });
    html += `</div></div>`;

    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', renderExhibitions);