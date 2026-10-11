/* =========================================================
   BESTAS.KZ — app.js (game + expandable cards fix)
   AI endpoint /api/chat is preserved.
   ========================================================= */
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const I18N = {
    ru: {
      brand_sub: "Қазақтың ұлттық ойыны",
      nav_home: "Главная", nav_history: "История", nav_rules: "Правила",
      nav_game: "Игра", nav_ai: "AI",
      ai_ph: "Напиши вопрос…", btn_send: "Отправить", ai_online: "онлайн",
      ai_name: "Помощник по Бестасу",
      ai_hello: "Сәлем! Я помощник по Бестасу. Спроси про игру, правила или историю.",
      ai_err: "Не удалось получить ответ. Попробуй ещё раз.",
      q1: "Что такое Бестас?", q2: "Какие правила игры?",
      q3: "Как появилась эта игра?", q4: "Что развивает Бестас?",
      game_throw: "Бросить камень", game_throw_hint: "Камень выбран. Нажми на него ещё раз, чтобы подбросить.",
      game_collect: "Собери 4 камня", game_catch: "Поймать камень",
      game_select: "Выбери камень для броска", game_win: "Уровень пройден!",
      game_lose: "Попытки закончились", game_next: "Следующий уровень",
      game_restart: "Начать заново", game_done: "Поздравляем! Все 20 уровней пройдены.",
      game_collect_count: "Собрано", game_over: "Игра окончена",
      game_attempt: "Попытка", game_level: "Уровень",
      card_open_hint: "Нажми, чтобы узнать больше",
      card_close_hint: "Нажми, чтобы свернуть"
    },
    kz: {
      brand_sub: "Қазақтың ұлттық ойыны",
      nav_home: "Басты бет", nav_history: "Тарихы", nav_rules: "Ережелер",
      nav_game: "Ойын", nav_ai: "AI",
      ai_ph: "Сұрағыңды жаз…", btn_send: "Жіберу", ai_online: "онлайн",
      ai_name: "Бестас көмекшісі",
      ai_hello: "Сәлем! Мен Бестас бойынша көмекшімін. Ойын, ережелер немесе тарих туралы сұра.",
      ai_err: "Жауап алу мүмкін болмады. Қайта көр.",
      q1: "Бестас деген не?", q2: "Ойынның ережелері қандай?",
      q3: "Бұл ойын қалай пайда болды?", q4: "Бестас нені дамытады?",
      game_throw: "Тасты лақтыру", game_throw_hint: "Тас таңдалды. Оны жоғары лақтыру үшін қайта бас.",
      game_collect: "4 тасты жина", game_catch: "Тасты ұста",
      game_select: "Лақтыру үшін тасты таңда", game_win: "Деңгей аяқталды!",
      game_lose: "Әрекеттер аяқталды", game_next: "Келесі деңгей",
      game_restart: "Қайта бастау", game_done: "Құттықтаймыз! Барлық 20 деңгейден өттің.",
      game_collect_count: "Жиналды", game_over: "Ойын аяқталды",
      game_attempt: "Әрекет", game_level: "Деңгей",
      card_open_hint: "Толығырақ білу үшін бас", card_close_hint: "Жию үшін бас"
    },
    en: {
      brand_sub: "Kazakh national game",
      nav_home: "Home", nav_history: "History", nav_rules: "Rules",
      nav_game: "Game", nav_ai: "AI",
      ai_ph: "Write your question…", btn_send: "Send", ai_online: "online",
      ai_name: "Bestas Assistant",
      ai_hello: "Hello! I’m the Bestas assistant. Ask about the game, rules or history.",
      ai_err: "Could not get a response. Try again.",
      q1: "What is Bestas?", q2: "What are the rules?",
      q3: "How did this game originate?", q4: "What skills does Bestas develop?",
      game_throw: "Throw stone", game_throw_hint: "Stone selected. Tap it again to toss it up.",
      game_collect: "Collect 4 stones", game_catch: "Catch the stone",
      game_select: "Choose a stone to throw", game_win: "Level complete!",
      game_lose: "No attempts left", game_next: "Next level",
      game_restart: "Restart", game_done: "Congratulations! All 20 levels completed.",
      game_collect_count: "Collected", game_over: "Game over",
      game_attempt: "Attempt", game_level: "Level",
      card_open_hint: "Tap to learn more", card_close_hint: "Tap to collapse"
    }
  };

  const CARD_DETAILS = {
    ru: {
      ab1_t: "Бестас — традиционная игра с пятью небольшими камнями. Игрок подбрасывает один камень, пока он в воздухе подбирает остальные, а затем ловит подброшенный.",
      ab2_t: "Игра передаётся из поколения в поколение и помогает сохранять интерес к казахской культуре, семейным традициям и совместным играм.",
      ab3_t: "Бестас помогает тренировать координацию рук и глаз, точность движений, внимание, чувство времени и терпение.",
      r1_t: "Выбери камень и подбрось его вверх. Следи за его полётом, чтобы успеть выполнить следующий шаг.",
      r2_t: "Пока камень находится в воздухе, подбирай камни с поверхности. Начни с простых попыток и не торопись.",
      r3_t: "После сбора четырёх камней поймай подброшенный камень до того, как закончится время.",
      r4_t: "Повторяй действия на следующих уровнях. Чем выше уровень, тем меньше времени на сбор и ловлю.",
      sk1: "Подбирание камней и ловля тренируют ловкость пальцев и точность движений.",
      sk2: "Нужно быстро замечать момент и действовать, пока камень находится в воздухе.",
      sk3: "Игра объединяет зрение и движения обеих рук, развивая их согласованность.",
      sk4: "Важно следить за летящим камнем и одновременно выполнять другое действие.",
      sk5: "Точные движения помогают подбирать камни и ловить подброшенный.",
      sk6: "Игрок учится сохранять спокойствие, планировать действия и пробовать снова."
    },
    kz: {
      ab1_t: "Бестас — бес ұсақ таспен ойналатын дәстүрлі ойын. Ойыншы бір тасты жоғары лақтырып, ол ауада болғанда қалғандарын жинап, кейін лақтырылған тасты қағып алады.",
      ab2_t: "Ойын ұрпақтан ұрпаққа беріліп, қазақ мәдениетіне, отбасылық дәстүрлерге және бірге ойнауға деген қызығушылықты сақтауға көмектеседі.",
      ab3_t: "Бестас қол мен көз үйлесімін, қозғалыс дәлдігін, зейінді, уақытты сезінуді және шыдамдылықты жаттықтыруға көмектеседі.",
      r1_t: "Бір тасты таңда да, жоғары лақтыр. Келесі әрекетке үлгеру үшін оның ұшуын бақыла.",
      r2_t: "Тас ауада болғанда, жердегі тастарды жина. Алдымен қарапайым әрекеттерден баста.",
      r3_t: "Төрт тасты жинаған соң, уақыт біткенше лақтырылған тасты қағып ал.",
      r4_t: "Келесі деңгейлерде әрекеттерді қайтала. Деңгей өскен сайын уақыт азаяды.",
      sk1: "Тастарды жинау мен қағып алу саусақ ептілігі мен қозғалыс дәлдігін дамытады.",
      sk2: "Ойыншы сәтті тез байқап, тас ауада болғанда әрекет етуі керек.",
      sk3: "Ойын көру қабілеті мен екі қолдың қимылын үйлестіруге көмектеседі.",
      sk4: "Ұшып бара жатқан тасты бақылап, қатарынан басқа әрекет орындау қажет.",
      sk5: "Дәл қимылдар тастарды жинауға және лақтырылған тасты ұстауға көмектеседі.",
      sk6: "Ойын сабыр сақтауға, әрекетті жоспарлауға және қайта байқап көруге үйретеді."
    },
    en: {
      ab1_t: "Bestas is a traditional game played with five small stones. Toss one stone up, collect the others while it is in the air, then catch the tossed stone.",
      ab2_t: "Passed down through generations, the game helps keep interest in Kazakh culture, family traditions and playing together alive.",
      ab3_t: "Bestas can help practise hand–eye coordination, precise movement, attention, timing and patience.",
      r1_t: "Choose a stone and toss it upwards. Watch its flight so you can complete the next step in time.",
      r2_t: "While the stone is in the air, pick up the stones from the surface. Start slowly as you learn.",
      r3_t: "After collecting four stones, catch the tossed stone before time runs out.",
      r4_t: "Repeat the actions on later levels. Higher levels give you less time to collect and catch.",
      sk1: "Picking up and catching stones practises finger dexterity and precise movements.",
      sk2: "You need to notice the moment quickly and act while the stone is in the air.",
      sk3: "The game links what you see with movements from both hands.",
      sk4: "You have to watch the flying stone while carrying out another action.",
      sk5: "Precise movements help you collect the stones and catch the tossed one.",
      sk6: "Players practise staying calm, planning actions and trying again."
    }
  };

  let currentLang = "ru";
  try {
    const savedLang = localStorage.getItem("bestas_lang") || "ru";
    if (I18N[savedLang]) currentLang = savedLang;
  } catch (_) {}

  function t(key) {
    return I18N[currentLang]?.[key] ?? I18N.ru[key] ?? key;
  }

  function detailFor(key) {
    return CARD_DETAILS[currentLang]?.[key] || CARD_DETAILS.ru[key] || "";
  }

  function renderCardDetails() {
    $$('[data-card-detail]').forEach(element => {
      element.textContent = detailFor(element.dataset.cardDetail);
    });
  }

  function setLanguage(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    try { localStorage.setItem("bestas_lang", lang); } catch (_) {}
    document.documentElement.lang = lang === "kz" ? "kk" : lang;

    $$('[data-lang]').forEach(button => {
      const active = button.dataset.lang === lang;
      button.classList.toggle("active", active);
      button.classList.toggle("on", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    $$('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;
      if (I18N[lang][key] !== undefined) element.textContent = I18N[lang][key];
    });
    $$('[data-i18n-ph]').forEach(element => {
      const key = element.dataset.i18nPh;
      if (I18N[lang][key] !== undefined) element.placeholder = I18N[lang][key];
    });
    updateQuickQuestions();
    renderCardDetails();
  }

  function updateQuickQuestions() {
    $$('[data-q]').forEach(button => {
      const key = button.dataset.q;
      if (I18N[currentLang][key]) button.textContent = I18N[currentLang][key];
    });
  }

  function initCommon() {
    $$('[data-lang]').forEach(button => {
      button.addEventListener("click", () => setLanguage(button.dataset.lang));
    });

    const page = document.body.dataset.page;
    $$('[data-nav]').forEach(link => {
      const active = link.dataset.nav === page;
      link.classList.toggle("active", active);
      link.classList.toggle("on", active);
    });

    setLanguage(currentLang);

    const revealItems = $$('.reveal, .reveal-up, [data-reveal]');
    if ("IntersectionObserver" in window && revealItems.length) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      revealItems.forEach(element => observer.observe(element));
    } else {
      revealItems.forEach(element => element.classList.add("is-visible"));
    }

    initExpandableCards();
  }

  function initExpandableCards() {
    const selectors = ['#about .card', '#rules .step', '#skills .skill'];
    const cards = selectors.flatMap(selector => $$(selector));

    cards.forEach(card => {
      if (card.dataset.expandableReady === "true") return;
      const title = $('[data-i18n]', card);
      const detailKey = title?.dataset.i18n;
      if (!detailKey || !CARD_DETAILS.ru[detailKey]) return;
      card.dataset.expandableReady = "true";
      card.dataset.expandableCard = "true";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-expanded", "false");
      card.setAttribute("aria-label", `${title.textContent}. ${t("card_open_hint")}`);
      card.classList.add("is-expandable");

      const detail = document.createElement("div");
      detail.className = "card-details";
      detail.dataset.cardDetail = detailKey;
      detail.hidden = true;
      detail.textContent = detailFor(detailKey);
      card.appendChild(detail);

      const hint = document.createElement("span");
      hint.className = "card-toggle-hint";
      hint.dataset.expandHint = "true";
      hint.textContent = t("card_open_hint");
      card.appendChild(hint);

      const toggle = () => toggleCard(card);
      card.addEventListener("click", event => {
        if (event.target.closest("a, button, input, textarea, select")) return;
        toggle();
      });
      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      });
    });
    renderCardDetails();
  }

  function toggleCard(card) {
    const open = card.getAttribute("aria-expanded") === "true";
    const container = card.closest(".section") || document;
    $$('[data-expandable-card="true"]', container).forEach(other => {
      if (other !== card) closeCard(other);
    });

    if (open) {
      closeCard(card);
      return;
    }

    const detail = $(".card-details", card);
    if (detail) {
      detail.hidden = false;
      detail.classList.remove("open");
      void detail.offsetWidth;
      detail.classList.add("open");
    }
    card.setAttribute("aria-expanded", "true");
    card.classList.add("is-expanded");
    const hint = $("[data-expand-hint]", card);
    if (hint) hint.textContent = t("card_close_hint");
    const title = $('[data-i18n]', card);
    if (title) card.setAttribute("aria-label", `${title.textContent}. ${t("card_close_hint")}`);
  }

  function closeCard(card) {
    const detail = $(".card-details", card);
    if (detail) {
      detail.classList.remove("open");
      detail.hidden = true;
    }
    card.setAttribute("aria-expanded", "false");
    card.classList.remove("is-expanded");
    const hint = $("[data-expand-hint]", card);
    if (hint) hint.textContent = t("card_open_hint");
    const title = $('[data-i18n]', card);
    if (title) card.setAttribute("aria-label", `${title.textContent}. ${t("card_open_hint")}`);
  }

  // Compatibility helpers used by page markup or older inline handlers.
  window.setLanguage = setLanguage;
  window.showPage = function(page) {
    const sections = $$('.page-section, [data-page-section]');
    if (!sections.length) return;
    sections.forEach(section => {
      const name = section.dataset.pageSection || section.dataset.page || section.id;
      section.style.display = name === page ? "" : "none";
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  window.openAI = function() {
    const input = $("#chatInput");
    if (input) { input.focus(); return; }
    window.location.href = "ai.html";
  };
  window.clearChat = function() {
    const list = $("#chatList");
    if (!list) return;
    list.innerHTML = "";
    const welcome = document.createElement("div");
    welcome.className = "msg ai";
    welcome.textContent = t("ai_hello");
    list.appendChild(welcome);
  };

  function initChat() {
    const form = $("#chatForm");
    const input = $("#chatInput");
    const list = $("#chatList");
    const send = $("#chatSend");
    if (!form || !input || !list) return;

    let busy = false;
    let history = [];

    function scrollBottom() { list.scrollTop = list.scrollHeight; }
    function addMessage(role, text, extraClass = "") {
      const message = document.createElement("div");
      message.className = `msg ${role} ${extraClass}`.trim();
      message.textContent = text;
      list.appendChild(message);
      scrollBottom();
      return message;
    }
    function addTyping() {
      const typing = document.createElement("div");
      typing.className = "msg ai typing";
      typing.innerHTML = "<i></i><i></i><i></i>";
      list.appendChild(typing);
      scrollBottom();
      return typing;
    }
    async function ask(rawText) {
      const messageText = String(rawText || "").trim();
      if (!messageText || busy) return;
      busy = true;
      if (send) send.disabled = true;
      input.disabled = true;
      addMessage("user", messageText);
      input.value = "";
      const typing = addTyping();

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ message: messageText, history: history.slice(-10) })
        });
        const raw = await response.text();
        let data = {};
        try { data = raw ? JSON.parse(raw) : {}; }
        catch (_) { throw new Error("Сервер вернул неправильный ответ."); }
        typing.remove();
        if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
        if (!data.reply) throw new Error("Сервер не вернул ответ AI.");
        addMessage("ai", data.reply);
        history.push({ role: "user", text: messageText }, { role: "model", text: data.reply });
        history = history.slice(-10);
      } catch (error) {
        console.error("BESTAS AI ERROR:", error);
        typing.remove();
        addMessage("ai", `${t("ai_err")}\n\n${error.message || ""}`, "err");
      } finally {
        busy = false;
        if (send) send.disabled = false;
        input.disabled = false;
        input.focus();
      }
    }

    form.addEventListener("submit", event => {
      event.preventDefault();
      event.stopPropagation();
      ask(input.value);
    });
    $$('[data-q]').forEach(button => {
      button.addEventListener("click", event => {
        const key = button.dataset.q;
        const question = I18N[currentLang][key];
        // On the home page these chips are just sample questions; submit them only if chat exists.
        if (question && $("#chatForm")) {
          event.preventDefault();
          ask(question);
        }
      });
    });
    input.addEventListener("keydown", event => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        form.requestSubmit();
      }
    });
    updateQuickQuestions();
  }

  const GAME_KEY = "bestas_progress_v1";
  const GAME_LEVELS = Array.from({ length: 20 }, (_, index) => ({
    level: index + 1,
    flight: Math.max(1.25, 3.2 - index * 0.1),
    collectWindow: Math.max(0.7, 1.8 - index * 0.045),
    score: 100 + index * 25
  }));
  const STONE_POSITIONS = [
    [23, 43], [37, 56], [50, 39], [63, 55], [77, 43]
  ];

  function initGame() {
    const arena = $("#arena");
    const slots = $("#slots");
    if (!arena || !slots) return;

    const scoreEl = $("#score");
    const levelEl = $("#level");
    const attemptsEl = $("#att");
    const timeEl = $("#time");
    const statusEl = $("#status");
    const barEl = $("#bar");
    const catchBtn = $("#catchBtn");
    const restartBtn = $("#restartBtn");
    const levelsEl = $("#levels");
    const bestEl = $("#best");
    const modal = $("#modal");
    const mCard = $("#mCard");
    const mTitle = $("#mT");
    const mDesc = $("#mD");
    const mIcon = $("#mIc");
    const modalActions = $("#mA");

    const saved = loadGame();
    let level = Math.min(20, Math.max(1, saved.level || 1));
    let unlockedLevel = Math.min(20, Math.max(level, saved.unlockedLevel || level));
    let score = saved.score || 0;
    let best = Math.max(saved.best || 0, score);
    let attempts = 3;
    let selected = null;
    let thrown = null;
    let collected = [];
    let phase = "select";
    let flightTimer = null;
    let countdownTimer = null;
    let flightStart = 0;
    let lastPoints = 0;

    function loadGame() {
      try {
        const data = JSON.parse(localStorage.getItem(GAME_KEY) || "{}");
        return {
          level: Number(data.level) || 1,
          unlockedLevel: Number(data.unlockedLevel) || Number(data.level) || 1,
          score: Number(data.score) || 0,
          best: Number(data.best) || 0
        };
      } catch (_) {
        return { level: 1, unlockedLevel: 1, score: 0, best: 0 };
      }
    }

    function saveGame() {
      try {
        const levelToSave = phase === "won" ? Math.min(20, level + 1) : level;
        localStorage.setItem(GAME_KEY, JSON.stringify({
          level: levelToSave, unlockedLevel, score, best
        }));
      } catch (error) {
        console.warn("Could not save Bestas progress:", error);
      }
    }

    function setText(element, value) {
      if (element) element.textContent = value;
    }

    function renderAttempts() {
      if (!attemptsEl) return;
      attemptsEl.innerHTML = "";
      for (let i = 0; i < 3; i++) {
        const dot = document.createElement("i");
        if (i >= attempts) dot.classList.add("off");
        dot.setAttribute("aria-hidden", "true");
        attemptsEl.appendChild(dot);
      }
      attemptsEl.setAttribute("aria-label", `${t("game_attempt")}: ${attempts}/3`);
    }

    function updateHUD() {
      setText(scoreEl, score);
      setText(levelEl, `${level}/20`);
      setText(bestEl, best);
      renderAttempts();
      const cfg = GAME_LEVELS[level - 1];
      if (cfg && phase !== "collect" && phase !== "catch") setText(timeEl, `${cfg.flight.toFixed(1)}s`);
      if (barEl && cfg && phase !== "collect" && phase !== "catch") barEl.style.transform = "scaleX(1)";
    }

    function setStatus(message, kind = "") {
      if (!statusEl) return;
      statusEl.textContent = message;
      statusEl.classList.toggle("ok", kind === "ok");
      statusEl.classList.toggle("bad", kind === "bad");
    }

    function clearTimers() {
      clearTimeout(flightTimer);
      clearInterval(countdownTimer);
      flightTimer = null;
      countdownTimer = null;
    }

    function updateSlots(allCaught = false) {
      const indicators = $$(".slot", slots);
      indicators.forEach((slot, index) => {
        const full = index < collected.length || (allCaught && index === 4);
        slot.classList.toggle("full", full);
      });
    }

    function createStones() {
      // Keep #slots and its five indicator circles intact. Stones must be direct children of #arena.
      $$("button[data-stone]", arena).forEach(stone => stone.remove());
      collected = [];
      selected = null;
      thrown = null;
      $$(".slot", slots).forEach(slot => slot.classList.remove("full"));

      for (let i = 0; i < 5; i++) {
        const stone = document.createElement("button");
        stone.type = "button";
        stone.className = `stone game-stone c${i + 1}`;
        stone.dataset.stone = String(i);
        stone.style.left = `${STONE_POSITIONS[i][0]}%`;
        stone.style.top = `${STONE_POSITIONS[i][1]}%`;
        stone.setAttribute("aria-label", `Stone ${i + 1}`);
        stone.setAttribute("aria-pressed", "false");
        stone.innerHTML = '<span class="stone-shape" aria-hidden="true"></span>';
        stone.addEventListener("click", () => stoneClick(i));
        arena.appendChild(stone);
      }
      updateStoneClasses();
      updateSlots();
    }

    function updateStoneClasses() {
      $$("button[data-stone]", arena).forEach(stone => {
        const i = Number(stone.dataset.stone);
        const isSelected = selected === i;
        const isThrown = thrown === i;
        const isCollected = collected.includes(i);
        stone.classList.toggle("selected", isSelected);
        stone.classList.toggle("sel", isSelected);
        stone.classList.toggle("thrown", isThrown);
        stone.classList.toggle("flying", isThrown && (phase === "collect" || phase === "catch"));
        stone.classList.toggle("collected", isCollected);
        stone.setAttribute("aria-pressed", isSelected ? "true" : "false");
        stone.disabled = ["done", "lost", "won", "catch"].includes(phase) || isCollected || isThrown;
      });
    }

    function stoneClick(index) {
      if (phase === "select") {
        selected = index;
        phase = "ready";
        setStatus(t("game_throw_hint"));
        updateStoneClasses();
        return;
      }

      if (phase === "ready") {
        if (selected !== index) {
          selected = index;
          setStatus(t("game_throw_hint"));
          updateStoneClasses();
        } else {
          throwStone();
        }
        return;
      }

      if (phase === "collect") {
        if (index === thrown || collected.includes(index)) return;
        collected.push(index);
        updateSlots();
        updateStoneClasses();
        setStatus(`${t("game_collect_count")}: ${collected.length}/4`);
        if (collected.length === 4) {
          phase = "catch";
          setStatus(t("game_catch"));
          if (catchBtn) {
            catchBtn.hidden = false;
            catchBtn.disabled = false;
            catchBtn.focus({ preventScroll: true });
          }
          updateStoneClasses();
        }
      }
    }

    function throwStone() {
      const cfg = GAME_LEVELS[level - 1];
      thrown = selected;
      selected = null;
      collected = [];
      phase = "collect";
      flightStart = performance.now();
      if (catchBtn) catchBtn.hidden = true;
      setStatus(`${t("game_collect_count")}: 0/4`);
      clearTimers();

      // Set duration before applying the .flying class so the animation starts at the right speed.
      const flyingStone = $(`button[data-stone="${thrown}"]`, arena);
      if (flyingStone) flyingStone.style.animationDuration = `${cfg.flight}s`;
      updateStoneClasses();
      updateSlots();
      countdownTimer = setInterval(() => {
        const elapsed = (performance.now() - flightStart) / 1000;
        const remaining = Math.max(0, cfg.flight - elapsed);
        setText(timeEl, `${remaining.toFixed(1)}s`);
        if (barEl) barEl.style.transform = `scaleX(${Math.max(0, remaining / cfg.flight)})`;
      }, 40);
      flightTimer = setTimeout(() => {
        if (phase === "collect" || phase === "catch") failAttempt();
      }, cfg.flight * 1000);
    }

    function catchStone() {
      if (phase !== "catch") return;
      clearTimers();
      const cfg = GAME_LEVELS[level - 1];
      const elapsed = (performance.now() - flightStart) / 1000;
      const speedBonus = Math.max(0, Math.round((cfg.flight - elapsed) * 25));
      lastPoints = cfg.score + speedBonus;
      score += lastPoints;
      best = Math.max(best, score);
      unlockedLevel = Math.max(unlockedLevel, Math.min(20, level + 1));
      phase = level >= 20 ? "done" : "won";
      const stone = $(`button[data-stone="${thrown}"]`, arena);
      if (stone) {
        stone.classList.remove("flying");
        stone.classList.add("caught");
      }
      updateSlots(true);
      updateStoneClasses();
      updateHUD();
      saveGame();
      setStatus(level >= 20 ? t("game_done") : t("game_win"), "ok");
      showModal(true);
    }

    function failAttempt() {
      clearTimers();
      attempts--;
      if (catchBtn) catchBtn.hidden = true;
      if (attempts <= 0) {
        phase = "lost";
        setStatus(t("game_lose"), "bad");
        updateHUD();
        showModal(false);
        return;
      }
      phase = "select";
      createStones();
      updateHUD();
      const cfg = GAME_LEVELS[level - 1];
      setText(timeEl, `${cfg.flight.toFixed(1)}s`);
      if (barEl) barEl.style.transform = "scaleX(1)";
      setStatus(`${t("game_attempt")}: ${attempts}. ${t("game_select")}`, "bad");
    }

    function restart() {
      clearTimers();
      level = 1;
      unlockedLevel = 1;
      score = 0;
      attempts = 3;
      selected = null;
      thrown = null;
      collected = [];
      phase = "select";
      hideModal();
      createStones();
      updateHUD();
      renderLevels();
      saveGame();
      setText(timeEl, `${GAME_LEVELS[0].flight.toFixed(1)}s`);
      if (barEl) barEl.style.transform = "scaleX(1)";
      setStatus(t("game_select"));
    }

    function showModal(win) {
      if (!modal) return;
      if (mCard) mCard.classList.toggle("bad", !win);
      if (mIcon) mIcon.textContent = win ? (phase === "done" ? "🏆" : "✦") : "↻";
      if (mTitle) mTitle.textContent = win ? (phase === "done" ? t("game_done") : t("game_win")) : t("game_lose");
      if (mDesc) {
        mDesc.textContent = win
          ? `${t("game_level")}: ${level} · +${lastPoints}`
          : `${t("game_level")}: ${level}`;
      }
      if (modalActions) {
        modalActions.innerHTML = "";
        const action = document.createElement("button");
        action.type = "button";
        action.className = "btn primary";
        action.textContent = (phase === "done" || phase === "lost") ? t("game_restart") : t("game_next");
        action.addEventListener("click", () => {
          if (phase === "done" || phase === "lost") {
            restart();
            return;
          }
          if (phase === "won") {
            level = Math.min(20, level + 1);
            attempts = 3;
            phase = "select";
            hideModal();
            createStones();
            updateHUD();
            renderLevels();
            saveGame();
            setStatus(t("game_select"));
            setText(timeEl, `${GAME_LEVELS[level - 1].flight.toFixed(1)}s`);
            if (barEl) barEl.style.transform = "scaleX(1)";
          }
        });
        modalActions.appendChild(action);
      }
      modal.hidden = false;
      modal.classList.add("open");
    }

    function hideModal() {
      if (!modal) return;
      modal.classList.remove("open");
      modal.hidden = true;
    }

    function renderLevels() {
      if (!levelsEl) return;
      levelsEl.innerHTML = "";
      for (let i = 1; i <= 20; i++) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "level-dot";
        if (i < unlockedLevel) button.classList.add("done");
        if (i === level) button.classList.add("current");
        if (i > unlockedLevel) button.classList.add("locked");
        button.textContent = String(i);
        button.disabled = i > unlockedLevel || phase === "collect" || phase === "catch";
        button.setAttribute("aria-label", `${t("game_level")} ${i}`);
        button.setAttribute("aria-current", i === level ? "step" : "false");
        button.addEventListener("click", () => {
          if (i > unlockedLevel || phase === "collect" || phase === "catch") return;
          clearTimers();
          level = i;
          attempts = 3;
          phase = "select";
          hideModal();
          if (catchBtn) catchBtn.hidden = true;
          createStones();
          updateHUD();
          renderLevels();
          saveGame();
          setStatus(t("game_select"));
          setText(timeEl, `${GAME_LEVELS[level - 1].flight.toFixed(1)}s`);
          if (barEl) barEl.style.transform = "scaleX(1)";
        });
        levelsEl.appendChild(button);
      }
    }

    if (catchBtn) {
      catchBtn.addEventListener("click", event => {
        event.preventDefault();
        catchStone();
      });
      catchBtn.hidden = true;
    }
    if (restartBtn) {
      restartBtn.addEventListener("click", event => {
        event.preventDefault();
        restart();
      });
    }

    createStones();
    updateHUD();
    renderLevels();
    setStatus(t("game_select"));
    setText(timeEl, `${GAME_LEVELS[level - 1].flight.toFixed(1)}s`);
    if (barEl) barEl.style.transform = "scaleX(1)";

    window.__bestasGame = {
      restart,
      getState: () => ({ level, unlockedLevel, score, best, attempts, phase, collected: collected.length })
    };
  }

  document.addEventListener("DOMContentLoaded", () => {
    initCommon();
    initChat();
    initGame();
  });
})();
