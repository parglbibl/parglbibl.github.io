// notes.js – режим конспектирования для краеведческих страниц

(function() {
    // Создаём панель конспекта, если её ещё нет
    if (document.getElementById('notes-panel')) return;

    const panel = document.createElement('div');
    panel.id = 'notes-panel';
    panel.innerHTML = `
        <div class="notes-header">
            <span>📝 Конспект страницы</span>
            <button id="notes-close" class="notes-close">&times;</button>
        </div>
        <div class="notes-body">
            <div class="notes-quote-area">
                <button id="add-quote-btn" class="notes-btn">➕ Добавить выделенный текст</button>
                <textarea id="manual-note" placeholder="Или напишите свою заметку..."></textarea>
                <button id="save-manual-btn" class="notes-btn">💾 Сохранить заметку</button>
            </div>
            <div class="notes-list">
                <h4>Ваши заметки и цитаты</h4>
                <ul id="notes-list"></ul>
            </div>
            <div class="notes-actions">
                <button id="export-txt-btn" class="notes-btn">📄 Скачать как .txt</button>
                <button id="export-doc-btn" class="notes-btn">📘 Скачать как .doc</button>
                <button id="clear-notes-btn" class="notes-btn notes-clear">🗑️ Очистить все</button>
            </div>
        </div>
    `;
    document.body.appendChild(panel);

    // Кнопка открытия панели (плавающая)
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'notes-toggle';
    toggleBtn.innerHTML = '📝 Конспект';
    toggleBtn.title = 'Открыть конспект страницы';
    document.body.appendChild(toggleBtn);

    // Состояние панели (открыта/закрыта)
    let isOpen = false;

    function openPanel() {
        panel.classList.add('open');
        isOpen = true;
        loadNotesForPage();
    }
    function closePanel() {
        panel.classList.remove('open');
        isOpen = false;
    }

    toggleBtn.addEventListener('click', openPanel);
    document.getElementById('notes-close').addEventListener('click', closePanel);

    // Получаем ключ для текущей страницы (по URL)
    function getPageKey() {
        let path = window.location.pathname.split('/').pop() || 'index.html';
        return `notes_${path}`;
    }

    // Загружаем заметки для текущей страницы
    let currentNotes = [];

    function loadNotesForPage() {
        const key = getPageKey();
        const stored = localStorage.getItem(key);
        currentNotes = stored ? JSON.parse(stored) : [];
        renderNotesList();
    }

    function saveNotesForPage() {
        const key = getPageKey();
        localStorage.setItem(key, JSON.stringify(currentNotes));
        renderNotesList();
    }

    function renderNotesList() {
        const listUl = document.getElementById('notes-list');
        if (!listUl) return;
        if (currentNotes.length === 0) {
            listUl.innerHTML = '<li class="notes-empty">Пока нет заметок. Выделите текст на странице и нажмите «Добавить выделенный текст» или напишите свою заметку.</li>';
            return;
        }
        let html = '';
        currentNotes.forEach((note, index) => {
            const typeLabel = note.type === 'quote' ? '📖 Цитата' : '📝 Заметка';
            html += `
                <li class="notes-item" data-index="${index}">
                    <div class="notes-item-header">
                        <strong>${typeLabel}</strong>
                        <button class="notes-delete" data-index="${index}">🗑️</button>
                    </div>
                    <div class="notes-item-content">${escapeHtml(note.text)}</div>
                    <div class="notes-item-date">${note.date}</div>
                </li>
            `;
        });
        listUl.innerHTML = html;

        // Вешаем обработчики удаления
        document.querySelectorAll('.notes-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(btn.dataset.index);
                if (!isNaN(idx)) {
                    currentNotes.splice(idx, 1);
                    saveNotesForPage();
                }
            });
        });
    }

    function escapeHtml(str) {
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        }).replace(/[\n\r]/g, '<br>');
    }

    // Добавление цитаты из выделенного текста
    function addQuoteFromSelection() {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();
        if (!selectedText) {
            alert('Выделите текст на странице, чтобы добавить цитату.');
            return;
        }
        currentNotes.push({
            type: 'quote',
            text: selectedText,
            date: new Date().toLocaleString()
        });
        saveNotesForPage();
        selection.removeAllRanges();
    }

    // Добавление ручной заметки
    function addManualNote() {
        const textarea = document.getElementById('manual-note');
        const text = textarea.value.trim();
        if (!text) {
            alert('Напишите заметку в поле.');
            return;
        }
        currentNotes.push({
            type: 'manual',
            text: text,
            date: new Date().toLocaleString()
        });
        saveNotesForPage();
        textarea.value = '';
    }

    // Экспорт в .txt
    function exportAsTxt() {
        if (currentNotes.length === 0) {
            alert('Нет заметок для экспорта.');
            return;
        }
        let content = `Конспект страницы: ${window.location.href}\nДата экспорта: ${new Date().toLocaleString()}\n\n`;
        currentNotes.forEach((note, idx) => {
            content += `${idx+1}. ${note.type === 'quote' ? 'ЦИТАТА' : 'ЗАМЕТКА'} (${note.date})\n`;
            content += `${note.text}\n\n`;
        });
        downloadFile(content, 'конспект.txt', 'text/plain');
    }

    function exportAsDoc() {
        if (currentNotes.length === 0) {
            alert('Нет заметок для экспорта.');
            return;
        }
        let htmlContent = `<!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"><title>Конспект</title></head>
        <body>
        <h1>Конспект страницы</h1>
        <p><strong>URL:</strong> ${window.location.href}</p>
        <p><strong>Дата экспорта:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        `;
        currentNotes.forEach((note, idx) => {
            htmlContent += `<h3>${idx+1}. ${note.type === 'quote' ? 'Цитата' : 'Заметка'} (${note.date})</h3>`;
            htmlContent += `<p>${note.text.replace(/\n/g, '<br>')}</p>`;
        });
        htmlContent += `</body></html>`;
        downloadFile(htmlContent, 'конспект.doc', 'application/msword');
    }

    function downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    function clearAllNotes() {
        if (confirm('Удалить все заметки для этой страницы?')) {
            currentNotes = [];
            saveNotesForPage();
        }
    }

    // Добавляем обработчики кнопок после создания панели
    setTimeout(() => {
        const addQuoteBtn = document.getElementById('add-quote-btn');
        const saveManualBtn = document.getElementById('save-manual-btn');
        const exportTxtBtn = document.getElementById('export-txt-btn');
        const exportDocBtn = document.getElementById('export-doc-btn');
        const clearBtn = document.getElementById('clear-notes-btn');
        if (addQuoteBtn) addQuoteBtn.addEventListener('click', addQuoteFromSelection);
        if (saveManualBtn) saveManualBtn.addEventListener('click', addManualNote);
        if (exportTxtBtn) exportTxtBtn.addEventListener('click', exportAsTxt);
        if (exportDocBtn) exportDocBtn.addEventListener('click', exportAsDoc);
        if (clearBtn) clearBtn.addEventListener('click', clearAllNotes);
    }, 100);

    // Стили добавим динамически (чтобы не править common.css)
    const style = document.createElement('style');
    style.textContent = `
        #notes-panel {
            position: fixed;
            top: 0;
            right: -400px;
            width: 380px;
            height: 100%;
            background: #fff;
            box-shadow: -2px 0 10px rgba(0,0,0,0.2);
            z-index: 10001;
            transition: right 0.3s;
            display: flex;
            flex-direction: column;
            font-family: 'Open Sans', sans-serif;
            border-left: 4px solid #b5838d;
        }
        #notes-panel.open {
            right: 0;
        }
        .notes-header {
            background: #b5838d;
            color: white;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: bold;
        }
        .notes-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        }
        .notes-body {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
        }
        .notes-quote-area {
            margin-bottom: 1.5rem;
        }
        #manual-note {
            width: 100%;
            min-height: 80px;
            margin: 0.5rem 0;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-family: inherit;
        }
        .notes-btn {
            background-color: #e5989b;
            color: #fff;
            border: none;
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.8rem;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
        }
        .notes-clear {
            background-color: #666;
        }
        .notes-list {
            margin-top: 1rem;
        }
        .notes-list h4 {
            margin-bottom: 0.5rem;
            color: #5e4b3c;
        }
        #notes-list {
            list-style: none;
            padding: 0;
        }
        .notes-item {
            background: #f9f0e7;
            border-radius: 12px;
            padding: 0.8rem;
            margin-bottom: 0.8rem;
        }
        .notes-item-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }
        .notes-delete {
            background: none;
            border: none;
            cursor: pointer;
            color: #b5838d;
        }
        .notes-item-content {
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            line-height: 1.4;
        }
        .notes-item-date {
            font-size: 0.7rem;
            color: #888;
        }
        .notes-empty {
            color: #888;
            font-style: italic;
        }
        #notes-toggle {
            position: fixed;
            bottom: 80px;
            right: 20px;
            background-color: #b5838d;
            color: white;
            border: none;
            border-radius: 50px;
            padding: 0.6rem 1.2rem;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            z-index: 10000;
            font-weight: bold;
            transition: background 0.3s;
        }
        #notes-toggle:hover {
            background-color: #9f6e7a;
        }
        @media (max-width: 480px) {
            #notes-panel { width: 100%; right: -100%; }
        }
    `;
    document.head.appendChild(style);
})();