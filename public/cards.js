
/* BESTAS.KZ — unified expandable and flip cards */
(() => {
  "use strict";

  const content = {
    ru: {
      about: [
        {
          title: "Что это",
          summary: "Бестас — традиционная казахская игра с пятью небольшими камнями.",
          detail: "Игрок подбрасывает один камень и собирает остальные, пока первый находится в воздухе. Важны точность движений, координация и чувство момента."
        },
        {
          title: "Почему важна",
          summary: "Игра знакомит с культурой и традициями казахского народа.",
          detail: "Бестас передавался из поколения в поколение. Для игры не нужны сложные приспособления — достаточно пяти камней, внимания и желания тренироваться."
        },
        {
          title: "Что даёт",
          summary: "Это увлекательный способ тренировать ловкость и концентрацию.",
          detail: "Практика помогает развивать координацию рук и глаз, скорость реакции, терпение и умение действовать последовательно."
        }
      ],
      rules: [
        {
          title: "Подготовь пять камней",
          summary: "Положи пять камней на ровную поверхность.",
          detail: "Выбери небольшие камни, которые удобно держать в руке. Освободи место перед собой, чтобы камни было легко подхватывать."
        },
        {
          title: "Подбрось один камень",
          summary: "Подними один камень в воздух.",
          detail: "Подбрасывай камень достаточно высоко, чтобы успеть выполнить следующее движение, но не терять его из виду."
        },
        {
          title: "Собери остальные",
          summary: "Пока камень летит, подбери камни с поверхности.",
          detail: "Начинай с простых заданий и увеличивай сложность постепенно. Двигайся быстро, но старайся сохранять контроль над рукой."
        },
        {
          title: "Поймай камень",
          summary: "Успей поймать подброшенный камень той же рукой.",
          detail: "После подбора камней верни внимание к летящему камню и поймай его. Затем повтори раунд по правилам выбранного варианта игры."
        }
      ],
      skills: [
        {
          title: "Ловкость рук",
          summary: "Точные и быстрые движения пальцев и кисти.",
          detail: "Повторяющиеся броски и подбор камней помогают тренировать мелкую моторику и контролировать движения рук."
        },
        {
          title: "Быстрая реакция",
          summary: "Умение быстро реагировать на движение камня.",
          detail: "Игроку нужно вовремя переключаться между подбросом, подбором и ловлей. Это тренирует скорость реакции в рамках самой игры."
        },
        {
          title: "Координация",
          summary: "Согласованная работа зрения и движений рук.",
          detail: "Нужно следить за камнем в воздухе и одновременно выполнять другое действие. Постепенно движения становятся более согласованными."
        },
        {
          title: "Концентрация",
          summary: "Умение удерживать внимание на задаче.",
          detail: "Чтобы выполнить раунд, приходится наблюдать за камнем, замечать расположение остальных и не отвлекаться на следующий шаг."
        },
        {
          title: "Точность",
          summary: "Контроль силы, направления и момента движения.",
          detail: "Слишком сильный или слабый бросок меняет сложность ловли. Практика помогает лучше оценивать движение и выбирать подходящий момент."
        },
        {
          title: "Терпение и стратегия",
          summary: "Практика, планирование и постепенное улучшение результата.",
          detail: "Сложные движения не всегда получаются с первого раза. Полезно разбирать ошибки, начинать с простого и усложнять задачу постепенно."
        }
      ]
    },

    kz: {
      about: [
        {
          title: "Бұл не?",
          summary: "Бестас — бес ұсақ таспен ойналатын дәстүрлі қазақ ойыны.",
          detail: "Ойыншы бір тасты жоғары лақтырып, ол ауада болған кезде қалған тастарды жинайды. Қимыл дәлдігі, үйлесім және уақытты сезіну маңызды."
        },
        {
          title: "Неліктен маңызды?",
          summary: "Ойын қазақ халқының мәдениеті мен дәстүрімен таныстырады.",
          detail: "Бестас ұрпақтан ұрпаққа беріліп келген. Ойынға күрделі құралдар қажет емес — бес тас, зейін және жаттығуға деген ықылас жеткілікті."
        },
        {
          title: "Не береді?",
          summary: "Ептілік пен зейінді жаттықтырудың қызықты жолы.",
          detail: "Жаттығу қол мен көз үйлесімін, реакция жылдамдығын, шыдамдылықты және әрекеттерді ретімен орындауды дамытуға көмектеседі."
        }
      ],
      rules: [
        {
          title: "Бес тасты дайында",
          summary: "Бес тасты тегіс жерге қой.",
          detail: "Қолға ыңғайлы ұсақ тастарды таңда. Тастарды оңай көтеріп алатындай алдыңдағы орынды босат."
        },
        {
          title: "Бір тасты лақтыр",
          summary: "Бір тасты ауаға лақтыр.",
          detail: "Келесі әрекетті орындауға үлгеретіндей лақтыр, бірақ тасты көзіңнен жоғалтпа."
        },
        {
          title: "Қалғандарын жина",
          summary: "Тас ауада тұрғанда жердегі тастарды жина.",
          detail: "Алдымен жеңіл тапсырмадан баста да, күрделілігін біртіндеп арттыр. Жылдам қимылда, бірақ қолыңды бақылауда ұста."
        },
        {
          title: "Тасты қағып ал",
          summary: "Лақтырылған тасты сол қолмен қағып алуға тырыс.",
          detail: "Қалған тастарды алғаннан кейін ауадағы тасқа назар аударып, оны қағып ал. Содан кейін ойын ережесіне сай келесі айналымды орында."
        }
      ],
      skills: [
        {
          title: "Қол ептілігі",
          summary: "Саусақ пен қолдың дәл әрі жылдам қимылы.",
          detail: "Тасты қайта-қайта лақтыру және жинау ұсақ моториканы және қол қимылын басқаруды жаттықтырады."
        },
        {
          title: "Жылдам реакция",
          summary: "Қозғалып жатқан тасқа тез жауап беру.",
          detail: "Ойыншы лақтыру, жинау және қағып алу әрекеттерінің арасында дер кезінде ауысуы керек. Бұл ойын кезіндегі реакцияны жаттықтырады."
        },
        {
          title: "Үйлесім",
          summary: "Көру мен қол қимылының үйлесімді жұмысы.",
          detail: "Ауадағы тасты бақылап, бір мезгілде басқа әрекетті орындау қажет. Жаттығу қимылдардың үйлесуіне көмектеседі."
        },
        {
          title: "Зейін",
          summary: "Назарды тапсырмада ұстай білу.",
          detail: "Раундты орындау үшін тасты бақылап, қалғандарының орнын байқап, келесі қадамға назар аудару керек."
        },
        {
          title: "Дәлдік",
          summary: "Қимылдың күшін, бағытын және уақытын бақылау.",
          detail: "Лақтырудың күші қағып алуды жеңілдетуі де, қиындатуы да мүмкін. Жаттығу қимылды дұрыс бағалауға көмектеседі."
        },
        {
          title: "Шыдамдылық пен жоспарлау",
          summary: "Жаттығу, жоспар құру және нәтижені біртіндеп жақсарту.",
          detail: "Күрделі қимылдар бірден орындала бермейді. Қателерді байқап, қарапайым тапсырмадан бастап, қиындықты біртіндеп арттырған пайдалы."
        }
      ]
    },

    en: {
      about: [
        {
          title: "What it is",
          summary: "Bestas is a traditional Kazakh game played with five small stones.",
          detail: "A player tosses one stone and collects the others while it is in the air. Accurate movements, coordination and timing are important."
        },
        {
          title: "Why it matters",
          summary: "The game introduces players to Kazakh culture and traditions.",
          detail: "Bestas has been passed from generation to generation. It requires no complex equipment—just five stones, attention and practice."
        },
        {
          title: "What it offers",
          summary: "A fun way to practise dexterity and concentration.",
          detail: "Practising can help develop hand-eye coordination, reaction speed, patience and the ability to follow a sequence of actions."
        }
      ],
      rules: [
        {
          title: "Prepare five stones",
          summary: "Place five stones on a flat surface.",
          detail: "Choose small stones that are comfortable to hold. Clear some space in front of you so the stones are easy to pick up."
        },
        {
          title: "Toss one stone",
          summary: "Throw one stone into the air.",
          detail: "Toss it high enough to complete the next movement, while keeping your eyes on the stone."
        },
        {
          title: "Collect the others",
          summary: "Pick up stones from the surface while one is in the air.",
          detail: "Start with simple tasks and increase the difficulty gradually. Move quickly while keeping control of your hand."
        },
        {
          title: "Catch the stone",
          summary: "Catch the tossed stone with the same hand.",
          detail: "After collecting the stones, focus on the airborne stone and catch it. Then repeat the round according to your chosen version of the game."
        }
      ],
      skills: [
        {
          title: "Hand dexterity",
          summary: "Accurate, quick finger and wrist movements.",
          detail: "Repeated tossing and picking up stones practises fine motor control and deliberate hand movements."
        },
        {
          title: "Quick reaction",
          summary: "Responding quickly to a moving stone.",
          detail: "Players must switch at the right time between tossing, collecting and catching. This practises reaction speed within the game."
        },
        {
          title: "Coordination",
          summary: "Working smoothly with vision and hand movements.",
          detail: "You follow the airborne stone while performing another action. Practice can help these movements work together."
        },
        {
          title: "Concentration",
          summary: "Keeping attention on the task at hand.",
          detail: "Completing a round requires watching the stone, noticing where the others are and staying focused on the next step."
        },
        {
          title: "Accuracy",
          summary: "Controlling movement strength, direction and timing.",
          detail: "A toss that is too strong or too weak can change how difficult the catch is. Practice helps players judge the movement and timing."
        },
        {
          title: "Patience and strategy",
          summary: "Practising, planning and improving step by step.",
          detail: "Difficult moves may take practice. It helps to learn from mistakes, start simply and gradually make the task harder."
        }
      ]
    }
  };

  function getLang() {
    const lang = (
      document.documentElement.lang ||
      localStorage.getItem("bestas_lang") ||
      "ru"
    ).toLowerCase();

    if (lang === "kk" || lang === "kz") return "kz";
    if (lang === "en") return "en";
    return "ru";
  }

  function initCards() {
    const sections = [
      {
        selector: "#about .grid .card",
        key: "about",
        titleSelector: "h3",
        summarySelector: "p"
      },
      {
        selector: "#rules .grid .card",
        key: "rules",
        titleSelector: "h3",
        summarySelector: "p"
      },
      {
        selector: "#skills .grid .card",
        key: "skills",
        titleSelector: "b",
        summarySelector: null
      }
    ];

    const entries = [];

    sections.forEach(section => {
      document.querySelectorAll(section.selector).forEach((card, index) => {
        const item = { card, section, index };
        entries.push(item);

        card.classList.add("bestas-expandable");
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-expanded", "false");

        let title = card.querySelector(section.titleSelector);

        if (!title) {
          title = document.createElement("h3");
          card.appendChild(title);
        }

        item.title = title;

        let summary;

        if (section.summarySelector) {
          summary = card.querySelector(section.summarySelector);

          if (!summary) {
            summary = document.createElement("p");
            card.appendChild(summary);
          }
        } else {
          summary = card.querySelector(".bestas-summary");

          if (!summary) {
            summary = document.createElement("p");
            summary.className = "bestas-summary";
            card.appendChild(summary);
          }
        }

        item.summary = summary;

        const detail = document.createElement("p");
        detail.className = "bestas-detail";
        item.detail = detail;

        // Only rule cards have a front and a back.
        if (section.key === "rules") {
          const inner = document.createElement("div");
          inner.className = "bestas-flip-inner";

          const front = document.createElement("div");
          front.className = "bestas-flip-front";

          const back = document.createElement("div");
          back.className = "bestas-flip-back";

          const backTitle = document.createElement("h3");
          backTitle.className = "bestas-flip-back-title";

          const oldChildren = Array.from(card.childNodes);

          oldChildren.forEach(node => front.appendChild(node));

          back.append(backTitle, detail);
          inner.append(front, back);
          card.appendChild(inner);

          item.backTitle = backTitle;
        } else {
          card.appendChild(detail);
        }

        // One click handler per card: no duplicate listeners.
        const toggle = () => {
          const willOpen =
            card.getAttribute("aria-expanded") !== "true";

          card.setAttribute("aria-expanded", String(willOpen));
          card.classList.toggle("is-expanded", willOpen);

          if (section.key === "rules") {
            card.classList.toggle("is-flipped", willOpen);
          }
        };

        card.addEventListener("click", event => {
          if (event.target.closest("a, button, input, select, textarea")) {
            return;
          }

          toggle();
        });

        card.addEventListener("keydown", event => {
          if (event.target !== card) return;

          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggle();
          }
        });
      });
    });

    function updateText() {
      const langData = content[getLang()];

      entries.forEach(
        ({ card, section, index, title, summary, detail, backTitle }) => {
          const data = langData[section.key][index];

          if (!data) return;

          title.textContent = data.title;
          summary.textContent = data.summary;
          detail.textContent = data.detail;

          if (backTitle) {
            backTitle.textContent = data.title;
          }

          card.setAttribute("aria-label", data.title);
        }
      );
    }

    updateText();

    const languageObserver = new MutationObserver(updateText);

    languageObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"]
    });
  }

  const style = document.createElement("style");

  style.textContent = `
    .bestas-expandable {
      position: relative;
      cursor: pointer;
      outline: none;
      transition:
        transform .25s ease,
        border-color .25s ease,
        box-shadow .25s ease;
    }

    .bestas-expandable:hover {
      transform: translateY(-3px);
    }

    .bestas-expandable:focus-visible {
      outline: 2px solid var(--gold2, #f1cc7a);
      outline-offset: 4px;
    }

    /* About and skills: smooth open and close */
    #about .bestas-expandable .bestas-detail,
    #skills .bestas-expandable .bestas-detail {
      display: block !important;
      max-height: 0 !important;
      overflow: hidden !important;
      opacity: 0 !important;
      visibility: hidden !important;
      transform: translateY(-7px) !important;
      margin-top: 0 !important;
      padding-top: 0 !important;
      border-top: 0 solid transparent !important;
      transition:
        max-height .45s ease,
        opacity .3s ease,
        transform .3s ease,
        margin-top .3s ease,
        padding-top .3s ease !important;
    }

    #about .bestas-expandable.is-expanded .bestas-detail,
    #skills .bestas-expandable.is-expanded .bestas-detail {
      max-height: 500px !important;
      opacity: 1 !important;
      visibility: visible !important;
      transform: translateY(0) !important;
      margin-top: 12px !important;
      padding-top: 12px !important;
      border-top: 1px solid rgba(255,255,255,.1) !important;
    }

    #skills .bestas-expandable .bestas-summary {
      margin-top: 10px;
      color: var(--muted, #87918a);
      font-size: 13px;
      line-height: 1.65;
    }

    #about .bestas-expandable.is-expanded,
    #skills .bestas-expandable.is-expanded {
      border-color: rgba(214,168,79,.48);
      box-shadow: 0 14px 36px rgba(0,0,0,.18);
    }

    /* Rules: genuine 3D flip cards */
    #rules .bestas-expandable {
      padding: 0 !important;
      min-height: 250px;
      perspective: 1200px;
      background: transparent !important;
      border-color: transparent !important;
      box-shadow: none;
      overflow: visible !important;
    }

    #rules .bestas-flip-inner {
      position: relative;
      min-height: 250px;
      height: 100%;
      transform-style: preserve-3d;
      transition: transform .7s cubic-bezier(.2,.75,.25,1);
      border-radius: 18px;
    }

    #rules .bestas-flip-front,
    #rules .bestas-flip-back {
      box-sizing: border-box;
      min-height: 250px;
      padding: 24px;
      border-radius: 18px;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      background: var(--card, #0d1310);
      border: 1px solid rgba(214,168,79,.25);
    }

    #rules .bestas-flip-front {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    #rules .bestas-flip-back {
      position: absolute;
      inset: 0;
      transform: rotateY(180deg);
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow-y: auto;
    }

    #rules .bestas-flip-back-title {
      color: var(--gold2, #f1cc7a);
      margin-bottom: 14px;
    }

    #rules .bestas-expandable.is-flipped .bestas-flip-inner {
      transform: rotateY(180deg);
    }

    #rules .bestas-expandable.is-flipped .bestas-flip-front,
    #rules .bestas-expandable.is-flipped .bestas-flip-back {
      border-color: rgba(241,204,122,.6);
    }

    #rules .bestas-expandable .bestas-flip-back .bestas-detail {
      display: block !important;
      max-height: none !important;
      overflow: visible !important;
      opacity: 1 !important;
      visibility: visible !important;
      transform: none !important;
      margin: 0 !important;
      padding-top: 12px !important;
      border-top: 1px solid rgba(255,255,255,.12) !important;
      color: var(--text2, #d8ddd9);
      line-height: 1.75;
    }

    @media (prefers-reduced-motion: reduce) {
      .bestas-expandable,
      #rules .bestas-flip-inner,
      .bestas-expandable .bestas-detail {
        transition: none !important;
      }
    }
  `;

  document.head.appendChild(style);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCards, { once: true });
  } else {
    initCards();
  }
})();