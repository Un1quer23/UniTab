// Search engine dropdown + suggestions + form submission
(() => {
  const ENGINES = [
    {
      id: 'google',
      name: 'Google',
      url: 'https://www.google.com/search?q=',
      suggestUrl: 'https://suggestqueries.google.com/complete/search?client=chrome&q=',
      logo: '<svg viewBox="0 0 24 24" fill="none"><path d="M19.76 10.77L19.67 10.42H12.23V13.58H16.68C16.4317 14.5443 15.8672 15.3974 15.0767 16.0029C14.2863 16.6084 13.3156 16.9313 12.32 16.92C11.0208 16.9093 9.77254 16.4135 8.81999 15.53C8.35174 15.0685 7.97912 14.5191 7.72344 13.9134C7.46777 13.3077 7.33407 12.6575 7.33 12C7.34511 10.6795 7.86792 9.41544 8.79 8.47002C9.7291 7.58038 10.9764 7.08932 12.27 7.10002C13.3779 7.10855 14.4446 7.52101 15.27 8.26002L17.47 6.00002C16.02 4.70638 14.1432 3.9941 12.2 4.00002C11.131 3.99367 10.0713 4.19793 9.08127 4.60115C8.09125 5.00436 7.19034 5.59863 6.43 6.35002C4.98369 7.8523 4.16827 9.85182 4.15152 11.9371C4.13478 14.0224 4.918 16.0347 6.34 17.56C7.12784 18.3449 8.06422 18.965 9.09441 19.3839C10.1246 19.8029 11.2279 20.0123 12.34 20C13.3484 20.0075 14.3479 19.8102 15.2779 19.42C16.2078 19.0298 17.0488 18.4549 17.75 17.73C19.1259 16.2171 19.8702 14.2347 19.83 12.19C19.8408 11.7156 19.8174 11.2411 19.76 10.77Z" fill="currentColor"/></svg>',
      parseSuggestions(data) {
        return (data && data[1]) ? data[1] : [];
      },
    },
    {
      id: 'baidu',
      /* 百度需要 i18n：中文显示"百度"，英文显示"Baidu"；其他引擎名是专有名词，无需翻译 */
      get name() { return (window.__i18n && window.__i18n.t('engine.baidu')) || '百度'; },
      url: 'https://www.baidu.com/s?wd=',
      suggestUrl: 'https://www.baidu.com/sugrec?prod=pc&wd=',
      logo: '<svg viewBox="-3 -2 24 24" fill="currentColor"><path d="M4.503 7.382c.114 1.681-.774 3.115-1.986 3.202-1.21.087-2.285-1.205-2.4-2.887-.115-1.681.774-3.115 1.985-3.202 1.211-.087 2.286 1.205 2.4 2.887zm8.34-6.97c-1.176-.308-2.458.767-2.862 2.4-.406 1.633.219 3.207 1.395 3.515 1.177.308 2.46-.767 2.864-2.4C14.767 1.8 13.126.485 12.844.412zm2.76 5.506c-1.238.018-2.22 1.226-2.193 3.096.027 1.87 1.05 2.722 2.29 2.703 1.236-.019 2.22-.901 2.192-2.772-.036-2.434-1.993-3.032-2.29-3.027zM6.635 0C5.458 0 4.503 1.354 4.503 3.023c0 1.67.955 3.023 2.132 3.023 1.178 0 2.133-1.353 2.133-3.023C8.768 1.353 7.813 0 6.635 0zm-.272 9.389c-.68 1.002-1.452 1.98-2.95 3.262-1.497 1.282-2.132 2.167-2.132 3.472 0 1.304.726 3.471 2.79 3.471 2.065 0 3.063-.466 4.697-.466 1.633 0 2.723.652 4.787.652s2.926-2.003 2.926-3.308c0-1.305-.358-2.043-2.012-3.532-1.06-.955-1.958-1.733-3.365-3.737-.695-.99-1.497-1.118-2.336-1.118-.84 0-1.724.302-2.405 1.304z"/></svg>',
      parseSuggestions(data) {
        return (data && data.g) ? data.g.map((item) => item.q) : [];
      },
    },
    {
      id: 'bing',
      name: 'Bing',
      url: 'https://www.bing.com/search?q=',
      suggestUrl: 'https://api.bing.com/osjson.aspx?query=',
      logo: '<svg viewBox="-4 -2 24 24" fill="currentColor"><path d="M15.973 8.57a.483.483 0 0 0-.317-.434L6.273 5.23c-.175-.054-.255.039-.178.206L7.84 9.269c.077.168.276.367.442.443l2.394 1.096c.166.076.17.209.008.295L.47 16.535c-.161.086-.182.056-.046-.067l3.924-3.534a.86.86 0 0 0 .248-.558L4.6 1.664a.484.484 0 0 0-.318-.435L.355.014C.18-.04.037.067.037.252v16.25c0 .185.122.423.272.529l3.99 2.827c.15.106.4.115.557.02l10.832-6.523a.658.658 0 0 0 .286-.507V8.57z"/></svg>',
      parseSuggestions(data) {
        return (data && data[1]) ? data[1] : [];
      },
    },
    {
      id: 'duckduckgo',
      name: 'DuckDuckGo',
      url: 'https://duckduckgo.com/?q=',
      suggestUrl: 'https://duckduckgo.com/ac/?q=',
      logo: '<svg viewBox="0 0 192 192" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M96 170c40.869 0 74-33.131 74-74 0-40.87-33.131-74-74-74S22 55.13 22 96c0 40.869 33.131 74 74 74Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M80 166 64.844 94.354C61.318 77.686 74.033 62 91.07 62v0c12.301 0 23.023 8.372 26.006 20.305L118 86c6 28-28 14-20 40s16 38 16 38M90 62c-2-8-10-12-18-12"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M118 100c6 0 14-2 20-6m-34 18c6 4 16 6 27 4"/></svg>',
      parseSuggestions(data) {
        if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
          return data.map((item) => item.phrase);
        }
        return (data && data[1]) ? data[1].map((item) => item.phrase) : [];
      },
    },
  ];

  const STORAGE_KEY = 'search-engine';

  const toggle = document.getElementById('engine-toggle');
  const engineDropdown = document.getElementById('engine-dropdown');
  const suggestionsEl = document.getElementById('suggestions-dropdown');
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  const wrapper = document.querySelector('.search-input-wrapper');

  let activeIndex = 0;
  let selectedSuggestIndex = -1;
  let abortController = null;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const idx = ENGINES.findIndex((e) => e.id === saved);
    if (idx !== -1) activeIndex = idx;
  }

  // --- Engine dropdown ---
  function renderEngineDropdown() {
    const items = ENGINES.map((engine, i) => `
      <li class="engine-dropdown-item ${i === activeIndex ? 'active' : ''}" data-index="${i}" role="menuitem">
        <span class="engine-dropdown-name">${engine.name}</span>
        ${i === activeIndex ? '<svg class="engine-dropdown-check" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
      </li>
    `).join('');

    const suffix = document.body.dataset.settingsBtnPosition === 'dropdown' ? `
      <li class="engine-dropdown-separator"></li>
      <li class="engine-dropdown-item engine-dropdown-settings" data-action="settings" role="menuitem">
        <span class="engine-dropdown-name">${(window.__i18n && window.__i18n.t('search.settings')) || '设置'}</span>
      </li>
    ` : '';

    engineDropdown.innerHTML = items + suffix;
  }

  function openEngineDropdown() {
    closeSuggestions();
    renderEngineDropdown();
    engineDropdown.classList.add('visible');
  }

  function closeEngineDropdown() {
    engineDropdown.classList.remove('visible');
  }

  function updateToggleIcon() {
    const logo = ENGINES[activeIndex].logo;
    if (logo) engineToggle.innerHTML = logo;
  }

  function selectEngine(index) {
    activeIndex = index;
    localStorage.setItem(STORAGE_KEY, ENGINES[index].id);
    updateToggleIcon();
    closeEngineDropdown();
    input.focus();
  }

  // --- Suggestions ---
  function closeSuggestions() {
    suggestionsEl.hidden = true;
    suggestionsEl.innerHTML = '';
    selectedSuggestIndex = -1;
    wrapper.classList.remove('has-suggestions');
  }

  function showSuggestions() {
    closeEngineDropdown();
    suggestionsEl.hidden = false;
    wrapper.classList.add('has-suggestions');
  }

  function doSearch(query) {
    const q = query.trim();
    if (!q) return;
    window.location.href = ENGINES[activeIndex].url + encodeURIComponent(q);
  }

  function renderSuggestions(suggestions) {
    selectedSuggestIndex = -1;
    if (!suggestions || suggestions.length === 0) {
      closeSuggestions();
      return;
    }
    suggestionsEl.innerHTML = suggestions.map((text, i) => `
      <li class="suggest-item ${i === selectedSuggestIndex ? 'active' : ''}" data-index="${i}">
        <svg class="suggest-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <span class="suggest-text">${escapeHtml(text)}</span>
      </li>
    `).join('');
    showSuggestions();
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  async function fetchSuggestions(query) {
    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();

    const engine = ENGINES[activeIndex];
    if (!engine.suggestUrl) {
      closeSuggestions();
      return;
    }

    try {
      const resp = await fetch(engine.suggestUrl + encodeURIComponent(query), {
        signal: abortController.signal,
      });
      if (!resp.ok) {
        closeSuggestions();
        return;
      }
      const data = await resp.json();
      const suggestions = engine.parseSuggestions(data).slice(0, 8);
      renderSuggestions(suggestions);
    } catch (err) {
      if (err.name !== 'AbortError') {
        closeSuggestions();
      }
    }
  }

  let debounceTimer = null;
  function onInput() {
    clearTimeout(debounceTimer);
    const query = input.value.trim();

    if (query.length < 2) {
      closeSuggestions();
      return;
    }

    debounceTimer = setTimeout(() => {
      fetchSuggestions(query);
    }, 250);
  }

  // --- Events ---

  // Engine toggle
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (engineDropdown.classList.contains('visible')) {
      closeEngineDropdown();
    } else {
      openEngineDropdown();
    }
  });

  engineDropdown.addEventListener('click', (e) => {
    const settingsItem = e.target.closest('.engine-dropdown-settings');
    if (settingsItem) {
      closeEngineDropdown();
      if (window.__settingsPanel) window.__settingsPanel.open();
      return;
    }
    const item = e.target.closest('.engine-dropdown-item');
    if (!item) return;
    selectEngine(parseInt(item.dataset.index, 10));
  });

  // Suggestion clicks
  suggestionsEl.addEventListener('click', (e) => {
    const item = e.target.closest('.suggest-item');
    if (!item) return;
    const text = item.querySelector('.suggest-text').textContent;
    doSearch(text);
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (engineDropdown.classList.contains('visible') &&
        !toggle.contains(e.target) && !engineDropdown.contains(e.target)) {
      closeEngineDropdown();
    }
    if (!suggestionsEl.hidden && !input.contains(e.target) && !suggestionsEl.contains(e.target)) {
      closeSuggestions();
    }
  });

  // Input events
  input.addEventListener('input', onInput);

  // Keyboard
  document.addEventListener('keydown', (e) => {
    // Escape
    if (e.key === 'Escape') {
      if (engineDropdown.classList.contains('visible')) {
        closeEngineDropdown();
        input.focus();
        return;
      }
      if (!suggestionsEl.hidden) {
        closeSuggestions();
        return;
      }
    }

    // Arrow keys for suggestions
    if (!suggestionsEl.hidden) {
      const items = suggestionsEl.querySelectorAll('.suggest-item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedSuggestIndex = Math.min(selectedSuggestIndex + 1, items.length - 1);
        updateSuggestHighlight(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedSuggestIndex = Math.max(selectedSuggestIndex - 1, -1);
        updateSuggestHighlight(items);
      } else if (e.key === 'Enter' && selectedSuggestIndex >= 0) {
        e.preventDefault();
        const text = items[selectedSuggestIndex].querySelector('.suggest-text').textContent;
        doSearch(text);
      }
    }
  });

  function updateSuggestHighlight(items) {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === selectedSuggestIndex);
    });
  }

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    doSearch(input.value);
  });

  // Init
  renderEngineDropdown();
  updateToggleIcon();
})();
