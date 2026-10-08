/* =========================================================
   BESTAS.KZ — app.js
   ========================================================= */

(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  /* =========================================================
     LANGUAGE
     ========================================================= */

  const I18N = {
    ru: {
      ai_ph: "Напиши вопрос…",
      btn_send: "Отправить",
      ai_online: "онлайн",
      ai_name: "Помощник по Бестасу",
      ai_hello:
        "Сәлем! Я помощник по Бестасу. Спроси про игру, правила или историю.",
      ai_err: "Не удалось получить ответ. Попробуй ещё раз.",
      q1: "Что такое Бестас?",
      q2: "Какие правила игры?",
      q3: "Как появилась эта игра?",
      q4: "Что развивает Бестас?",

      game_throw: "Бросить камень",
      game_collect: "Собери 4 камня",
      game_catch: "Поймать камень",
      game_select: "Выбери камень для броска",
      game_win: "Уровень пройден!",
      game_lose: "Попытки закончились",
      game_next: "Следующий уровень",
      game_restart: "Начать заново",
      game_done: "Поздравляем! Все 20 уровней пройдены.",
      game_collect_count: "Собрано",
      game_over: "Игра окончена",
      game_attempt: "Попытка",
      game_level: "Уровень"
    },

    kz: {
      ai_ph: "Сұрағыңды жаз…",
      btn_send: "Жіберу",
      ai_online: "онлайн",
      ai_name: "Бестас көмекшісі",
      ai_hello:
        "Сәлем! Мен Бестас бойынша көмекшімін. Ойын, ережелер немесе тарих туралы сұра.",
      ai_err: "Жауап алу мүмкін болмады. Қайта көр.",
      q1: "Бестас деген не?",
      q2: "Ойынның ережелері қандай?",
      q3: "Бұл ойын қалай пайда болды?",
      q4: "Бестас нені дамытады?",

      game_throw: "Тасты лақтыру",
      game_collect: "4 тасты жина",
      game_catch: "Тасты ұста",
      game_select: "Лақтыру үшін тасты таңда",
      game_win: "Деңгей аяқталды!",
      game_lose: "Әрекеттер аяқталды",
      game_next: "Келесі деңгей",
      game_restart: "Қайта бастау",
      game_done: "Құттықтаймыз! Барлық 20 деңгейден өттің.",
      game_collect_count: "Жиналды",
      game_over: "Ойын аяқталды",
      game_attempt: "Әрекет",
      game_level: "Деңгей"
    },

    en: {
      ai_ph: "Write your question…",
      btn_send: "Send",
      ai_online: "online",
      ai_name: "Bestas Assistant",
      ai_hello:
        "Hello! I’m the Bestas assistant. Ask about the game, rules or history.",
      ai_err: "Could not get a response. Try again.",
      q1: "What is Bestas?",
      q2: "What are the rules?",
      q3: "How did this game originate?",
      q4: "What skills does Bestas develop?",

      game_throw: "Throw stone",
      game_collect: "Collect 4 stones",
      game_catch: "Catch stone",
      game_select: "Choose a stone to throw",
      game_win: "Level complete!",
      game_lose: "No attempts left",
      game_next: "Next level",
      game_restart: "Restart",
      game_done: "Congratulations! All 20 levels completed.",
      game_collect_count: "Collected",
      game_over: "Game over",
      game_attempt: "Attempt",
      game_level: "Level"
    }
  };

  let currentLang = localStorage.getItem("bestas_lang") || "ru";

  if (!I18N[currentLang]) {
    currentLang = "ru";
  }

  function t(key) {
    return I18N[currentLang]?.[key] ?? I18N.ru[key] ?? key;
  }

  function setLanguage(lang) {
    if (!I18N[lang]) return;

    currentLang = lang;

    localStorage.setItem("bestas_lang", lang);

    document.documentElement.lang =
      lang === "kz" ? "kk" : lang;

    $$("[data-lang]").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.lang === lang
      );

      button.setAttribute(
        "aria-pressed",
        button.dataset.lang === lang
          ? "true"
          : "false"
      );
    });

    $$("[data-i18n]").forEach(element => {
      const key = element.dataset.i18n;

      if (I18N[lang][key] !== undefined) {
        element.textContent = I18N[lang][key];
      }
    });

    $$("[data-i18n-ph]").forEach(element => {
      const key = element.dataset.i18nPh;

      if (I18N[lang][key] !== undefined) {
        element.placeholder = I18N[lang][key];
      }
    });

    updateQuickQuestions();
  }

  function updateQuickQuestions() {
    $$("[data-q]").forEach(button => {
      const key = button.dataset.q;

      if (I18N[currentLang][key]) {
        button.textContent = I18N[currentLang][key];
      }
    });
  }

  /* =========================================================
     COMMON
     ========================================================= */

  function initCommon() {

    $$("[data-lang]").forEach(button => {
      button.addEventListener("click", () => {
        setLanguage(button.dataset.lang);
      });
    });

    const page = document.body.dataset.page;

    $$("[data-nav]").forEach(link => {
      if (link.dataset.nav === page) {
        link.classList.add("active");
      }
    });

    setLanguage(currentLang);

    const revealItems = $$(
      ".reveal, .reveal-up, [data-reveal]"
    );

    if (
      "IntersectionObserver" in window &&
      revealItems.length
    ) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08
        }
      );

      revealItems.forEach(element => {
        observer.observe(element);
      });

    } else {
      revealItems.forEach(element => {
        element.classList.add("is-visible");
      });
    }
  }

  /* =========================================================
     COMPATIBILITY
     ========================================================= */

  window.setLanguage = setLanguage;

  window.showPage = function(page) {

    const sections = $$(
      "[data-page-section], .page-section"
    );

    if (!sections.length) return;

    sections.forEach(section => {

      const name =
        section.dataset.pageSection ||
        section.dataset.page ||
        section.id;

      section.style.display =
        name === page ? "" : "none";
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  window.openAI = function() {

    const input = $("#chatInput");

    if (input) {
      input.focus();
      return;
    }

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

  /* =========================================================
     AI CHAT
     ========================================================= */

  function initChat() {

    const form = $("#chatForm");
    const input = $("#chatInput");
    const list = $("#chatList");
    const send = $("#chatSend");

    if (!form || !input || !list) {
      return;
    }

    let busy = false;

    let history = [];

    function scrollBottom() {
      list.scrollTop = list.scrollHeight;
    }

    function addMessage(
      role,
      text,
      extraClass = ""
    ) {

      const message = document.createElement("div");

      message.className =
        `msg ${role} ${extraClass}`.trim();

      message.textContent = text;

      list.appendChild(message);

      scrollBottom();

      return message;
    }

    function addTyping() {

      const typing =
        document.createElement("div");

      typing.className =
        "msg ai typing";

      typing.innerHTML =
        "<i></i><i></i><i></i>";

      list.appendChild(typing);

      scrollBottom();

      return typing;
    }

    async function ask(rawText) {

      const text =
        String(rawText || "").trim();

      if (!text || busy) {
        return;
      }

      busy = true;

      if (send) {
        send.disabled = true;
      }

      input.disabled = true;

      addMessage("user", text);

      input.value = "";

      const typing = addTyping();

      try {

        /*
         * =====================================================
         * AI REQUEST
         * =====================================================
         */

        console.log(
          "🚀 BESTAS AI: отправляем запрос:",
          text
        );

        const payload = {
          message: text,
          history: history.slice(-10)
        };

        console.log(
          "📦 BESTAS AI payload:",
          payload
        );

        const response = await fetch(
          "/api/chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              "Accept":
                "application/json"
            },

            body: JSON.stringify(payload)
          }
        );

        console.log(
          "📡 BESTAS AI HTTP:",
          response.status
        );

        const raw =
          await response.text();

        console.log(
          "📨 BESTAS AI RESPONSE:",
          raw
        );

        let data = {};

        try {

          data = raw
            ? JSON.parse(raw)
            : {};

        } catch {

          throw new Error(
            "Сервер вернул неправильный ответ."
          );
        }

        typing.remove();

        if (!response.ok) {

          throw new Error(
            data.error ||
            `HTTP ${response.status}`
          );
        }

        if (!data.reply) {

          throw new Error(
            "Сервер не вернул ответ AI."
          );
        }

        addMessage(
          "ai",
          data.reply
        );

        history.push(
          {
            role: "user",
            text: text
          },

          {
            role: "model",
            text: data.reply
          }
        );

        history =
          history.slice(-10);

      } catch (error) {

        console.error(
          "❌ BESTAS AI ERROR:",
          error
        );

        typing.remove();

        addMessage(
          "ai",
          `${t("ai_err")}\n\n${error.message || ""}`,
          "err"
        );

      } finally {

        busy = false;

        if (send) {
          send.disabled = false;
        }

        input.disabled = false;

        input.focus();
      }
    }

    /*
     * Форма AI
     */

    form.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        event.stopPropagation();

        ask(input.value);
      }
    );

    /*
     * Быстрые вопросы
     */

    $$("[data-q]").forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();

          const key =
            button.dataset.q;

          const question =
            I18N[currentLang][key];

          if (question) {
            ask(question);
          }
        }
      );
    });

    /*
     * Enter
     */

    input.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" &&
          !event.shiftKey
        ) {

          event.preventDefault();

          form.requestSubmit();
        }
      }
    );

    updateQuickQuestions();
  }

  /* =========================================================
     BESTAS GAME
     ========================================================= */

  const GAME_KEY =
    "bestas_progress_v1";

  const GAME_LEVELS =
    Array.from(
      {
        length: 20
      },
      (_, index) => ({

        level: index + 1,

        flight:
          Math.max(
            1.25,
            3.2 - index * 0.1
          ),

        collectWindow:
          Math.max(
            0.7,
            1.8 - index * 0.045
          ),

        score:
          100 + index * 25
      })
    );

  function initGame() {

    const arena = $("#arena");

    const slots = $("#slots");

    if (!arena || !slots) {
      return;
    }

    const scoreEl = $("#score");
    const levelEl = $("#level");
    const attemptsEl = $("#att");
    const timeEl = $("#time");
    const statusEl = $("#status");
    const barEl = $("#bar");
    const catchBtn = $("#catchBtn");
    const restartBtn = $("#restartBtn");
    const levelsEl = $("#levels");

    let progress =
      loadGame();

    let level =
      Math.min(
        20,
        Math.max(
          1,
          progress.level || 1
        )
      );

    let score =
      progress.score || 0;

    let attempts = 3;

    let selected = null;
    let thrown = null;

    let collected = [];

    let phase = "select";

    let flightTimer = null;
    let countdownTimer = null;

    let flightStart = 0;

    function loadGame() {

      try {

        const saved =
          JSON.parse(
            localStorage.getItem(
              GAME_KEY
            ) || "{}"
          );

        return {

          level:
            Number(saved.level) || 1,

          score:
            Number(saved.score) || 0
        };

      } catch {

        return {
          level: 1,
          score: 0
        };
      }
    }

    function saveGame() {

      localStorage.setItem(
        GAME_KEY,

        JSON.stringify({
          level,
          score
        })
      );
    }

    function setText(
      element,
      value
    ) {

      if (element) {
        element.textContent =
          value;
      }
    }

    function updateHUD() {

      setText(
        scoreEl,
        score
      );

      setText(
        levelEl,
        level
      );

      setText(
        attemptsEl,
        attempts
      );

      const cfg =
        GAME_LEVELS[level - 1];

      if (cfg) {

        setText(
          timeEl,
          `${cfg.flight.toFixed(1)}s`
        );
      }

      if (barEl) {

        const percent =
          ((level - 1) / 19) * 100;

        barEl.style.width =
          `${percent}%`;
      }
    }

    function setStatus(text) {

      if (statusEl) {
        statusEl.textContent =
          text;
      }
    }

    function clearTimers() {

      clearTimeout(
        flightTimer
      );

      clearInterval(
        countdownTimer
      );

      flightTimer = null;
      countdownTimer = null;
    }

    function createStones() {

      slots.innerHTML = "";

      for (
        let i = 0;
        i < 5;
        i++
      ) {

        const stone =
          document.createElement(
            "button"
          );

        stone.type = "button";

        stone.className =
          "stone";

        stone.dataset.stone =
          String(i);

        stone.setAttribute(
          "aria-label",
          `Stone ${i + 1}`
        );

        stone.innerHTML =
          `<span class="stone-shape"></span>`;

        stone.addEventListener(
          "click",
          () => {
            stoneClick(i);
          }
        );

        slots.appendChild(
          stone
        );
      }

      updateStoneClasses();
    }

    function updateStoneClasses() {

      $$(".stone", slots)
        .forEach(stone => {

          const i =
            Number(
              stone.dataset.stone
            );

          stone.classList.toggle(
            "selected",
            selected === i
          );

          stone.classList.toggle(
            "thrown",
            thrown === i
          );

          stone.classList.toggle(
            "collected",
            collected.includes(i)
          );

          stone.disabled =
            phase === "done" ||
            phase === "lost" ||
            collected.includes(i) ||
            thrown === i;
        });
    }

    function stoneClick(index) {

      /*
       * Выбираем камень
       */

      if (phase === "select") {

        selected = index;

        phase = "ready";

        setStatus(
          t("game_throw")
        );

        updateStoneClasses();

        return;
      }

      /*
       * Второе нажатие —
       * бросаем выбранный камень
       */

      if (
        phase === "ready" &&
        selected === index
      ) {

        throwStone();

        return;
      }

      /*
       * Пока камень летит —
       * собираем остальные 4
       */

      if (phase === "collect") {

        if (
          index === thrown ||
          collected.includes(index)
        ) {
          return;
        }

        collected.push(index);

        updateStoneClasses();

        setStatus(
          `${t("game_collect_count")}: ${collected.length}/4`
        );

        if (
          collected.length === 4
        ) {

          phase = "catch";

          setStatus(
            t("game_catch")
          );

          if (catchBtn) {

            catchBtn.hidden =
              false;

            catchBtn.focus();
          }
        }
      }
    }

    function throwStone() {

      const cfg =
        GAME_LEVELS[level - 1];

      thrown = selected;

      selected = null;

      collected = [];

      phase = "collect";

      flightStart =
        performance.now();

      if (catchBtn) {
        catchBtn.hidden = true;
      }

      setStatus(
        `${t("game_collect_count")}: 0/4`
      );

      updateStoneClasses();

      clearTimers();

      countdownTimer =
        setInterval(() => {

          const elapsed =
            (performance.now() -
              flightStart) / 1000;

          const remaining =
            Math.max(
              0,
              cfg.flight - elapsed
            );

          setText(
            timeEl,
            `${remaining.toFixed(1)}s`
          );

          if (
            remaining <= 0
          ) {

            clearInterval(
              countdownTimer
            );
          }

        }, 50);

      flightTimer =
        setTimeout(() => {

          if (
            phase === "collect"
          ) {

            failAttempt();
          }

        }, cfg.flight * 1000);
    }

    function catchStone() {

      if (phase !== "catch") {
        return;
      }

      clearTimers();

      const cfg =
        GAME_LEVELS[level - 1];

      const elapsed =
        (performance.now() -
          flightStart) / 1000;

      const speedBonus =
        Math.max(
          0,
          Math.round(
            (cfg.flight - elapsed) *
              25
          )
        );

      score +=
        cfg.score +
        speedBonus;

      if (level >= 20) {

        level = 20;

        saveGame();

        phase = "done";

        setStatus(
          t("game_done")
        );

        showModal(true);

      } else {

        level++;

        attempts = 3;

        saveGame();

        phase = "select";

        selected = null;

        thrown = null;

        collected = [];

        setStatus(
          t("game_select")
        );

        if (catchBtn) {
          catchBtn.hidden = true;
        }

        createStones();

        updateHUD();

        renderLevels();
      }
    }

    function failAttempt() {

      clearTimers();

      attempts--;

      if (attempts <= 0) {

        phase = "lost";

        setStatus(
          t("game_lose")
        );

        showModal(false);

      } else {

        phase = "select";

        selected = null;

        thrown = null;

        collected = [];

        setStatus(
          `${t("game_attempt")}: ${attempts}`
        );

        if (catchBtn) {
          catchBtn.hidden = true;
        }

        createStones();

        updateHUD();
      }
    }

    function restart() {

      clearTimers();

      level = 1;

      score = 0;

      attempts = 3;

      selected = null;

      thrown = null;

      collected = [];

      phase = "select";

      localStorage.removeItem(
        GAME_KEY
      );

      hideModal();

      createStones();

      updateHUD();

      renderLevels();

      setStatus(
        t("game_select")
      );
    }

    function showModal(win) {

      const modal = $("#modal");

      if (!modal) {
        return;
      }

      const title = $("#mT");
      const desc = $("#mD");
      const icon = $("#mIc");
      const action = $("#mA");

      if (win) {

        if (icon) {
          icon.textContent = "✦";
        }

        if (title) {

          title.textContent =
            level >= 20
              ? t("game_done")
              : t("game_win");
        }

        if (desc) {

          desc.textContent =
            `${t("game_level")}: ${level}`;
        }

        if (action) {

          action.textContent =
            level >= 20
              ? t("game_restart")
              : t("game_next");
        }

      } else {

        if (icon) {
          icon.textContent = "↻";
        }

        if (title) {
          title.textContent =
            t("game_lose");
        }

        if (desc) {

          desc.textContent =
            `${t("game_level")}: ${level}`;
        }

        if (action) {

          action.textContent =
            t("game_restart");
        }
      }

      modal.classList.add("open");

      modal.hidden = false;
    }

    function hideModal() {

      const modal =
        $("#modal");

      if (!modal) {
        return;
      }

      modal.classList.remove(
        "open"
      );

      modal.hidden = true;
    }

    function renderLevels() {

      if (!levelsEl) {
        return;
      }

      levelsEl.innerHTML = "";

      for (
        let i = 1;
        i <= 20;
        i++
      ) {

        const button =
          document.createElement(
            "button"
          );

        button.type = "button";

        button.className =
          "level-dot";

        if (i < level) {
          button.classList.add(
            "done"
          );
        }

        if (i === level) {
          button.classList.add(
            "current"
          );
        }

        if (i > level) {
          button.classList.add(
            "locked"
          );
        }

        button.textContent =
          i;

        button.disabled =
          i > level;

        button.addEventListener(
          "click",
          () => {

            if (i <= level) {

              level = i;

              attempts = 3;

              selected = null;

              thrown = null;

              collected = [];

              phase = "select";

              hideModal();

              createStones();

              updateHUD();

              setStatus(
                t("game_select")
              );
            }
          }
        );

        levelsEl.appendChild(
          button
        );
      }
    }

    if (catchBtn) {

      catchBtn.addEventListener(
        "click",
        event => {

          event.preventDefault();

          catchStone();
        }
      );

      catchBtn.hidden = true;
    }

    if (restartBtn) {

      restartBtn.addEventListener(
        "click",
        event => {

          event.preventDefault();

          restart();
        }
      );
    }

    const modalAction =
      $("#mA");

    if (modalAction) {

      modalAction.addEventListener(
        "click",
        event => {

          event.preventDefault();

          if (
            level >= 20 &&
            phase === "done"
          ) {

            restart();

            return;
          }

          if (
            phase === "lost"
          ) {

            restart();

            return;
          }

          hideModal();
        }
      );
    }

    const modal =
      $("#modal");

    if (modal) {

      modal.addEventListener(
        "click",
        event => {

          if (
            event.target === modal
          ) {

            hideModal();
          }
        }
      );
    }

    createStones();

    updateHUD();

    renderLevels();

    setStatus(
      t("game_select")
    );

    window.__bestasGame = {

      restart,

      getState: () => ({
        level,
        score,
        attempts,
        phase
      })
    };
  }

  /* =========================================================
     START
     ========================================================= */

  document.addEventListener(
    "DOMContentLoaded",
    () => {

      initCommon();

      initChat();

      initGame();
    }
  );

})();