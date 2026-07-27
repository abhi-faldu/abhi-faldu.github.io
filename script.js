/* ─────────────────────────────────────────────
   Abhi Faldu — Portfolio interactions
───────────────────────────────────────────── */
(function () {
  'use strict';

  const root = document.documentElement;

  /* ── Theme: respect stored choice, else system preference ── */
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', stored || (prefersDark ? 'dark' : 'light'));

  const toggle = document.getElementById('themeToggle');
  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ── i18n: English / German ── */
  const translations = {
    nav_about:      { en: 'About', de: 'Über mich' },
    nav_skills:     { en: 'Skills', de: 'Kompetenzen' },
    nav_projects:   { en: 'Projects', de: 'Projekte' },
    nav_experience: { en: 'Experience', de: 'Erfahrung' },
    nav_contact:    { en: 'Contact', de: 'Kontakt' },

    hero_eyebrow: { en: 'Applied AI Student · Rosenheim, Germany', de: 'KI-Student · Rosenheim, Deutschland' },
    hero_title:   { en: 'Hi, I\'m <span class="grad">Abhi Faldu</span>.<br />I build industrial AI systems.', de: 'Hallo, ich bin <span class="grad">Abhi Faldu</span>.<br />Ich entwickle industrielle KI-Systeme.' },
    hero_sub:     { en: 'From anomaly detection in machine sensor data through real-time IIoT monitoring to production-ready MLOps pipelines. I turn messy signals into models that ship — with Python, PyTorch, MLflow and Docker.', de: 'Von der Anomalieerkennung in Maschinensensordaten über IIoT-Echtzeit-Monitoring bis zu produktionsreifen MLOps-Pipelines. Ich mache aus verrauschten Signalen Modelle, die in Produktion laufen — mit Python, PyTorch, MLflow und Docker.' },
    hero_cta_projects: { en: 'View Projects', de: 'Projekte ansehen' },
    hero_cta_cv:       { en: 'Download CV', de: 'Lebenslauf herunterladen' },

    stat_1: { en: 'Production ML projects', de: 'Produktions-ML-Projekte' },
    stat_2: { en: 'Best F1-score (bearing PdM)', de: 'Bester F1-Score (Lager-PdM)' },
    stat_3: { en: 'Test coverage on MLOps pipeline', de: 'Testabdeckung der MLOps-Pipeline' },
    stat_4: { en: 'Semester, B.Sc. Applied AI', de: 'Semester, B.Sc. Angewandte KI' },

    about_kicker: { en: '01 — About', de: '01 — Über mich' },
    about_title:  { en: 'Turning sensor noise into decisions', de: 'Aus Sensorrauschen werden Entscheidungen' },
    about_p1: { en: 'I\'m an <strong>Applied Artificial Intelligence</strong> student at Technische Hochschule Rosenheim, currently in my 6th semester. My hands-on work spans the full lifecycle of industrial AI — from anomaly detection in machine sensor data, through real-time IIoT monitoring, to production-ready MLOps pipelines.', de: 'Ich studiere <strong>Angewandte Künstliche Intelligenz</strong> an der Technischen Hochschule Rosenheim, aktuell im 6. Semester. Meine praktische Arbeit umfasst den gesamten Lebenszyklus industrieller KI — von der Anomalieerkennung in Maschinensensordaten über IIoT-Echtzeit-Monitoring bis zu produktionsreifen MLOps-Pipelines.' },
    about_p2: { en: 'I like problems where the data is messy, the constraints are real, and the model has to actually run in production. I care about experiment tracking, drift monitoring, tests, and clean deployment — not just a notebook that scores well once.', de: 'Mich reizen Probleme, bei denen die Daten unsauber sind, die Rahmenbedingungen real und das Modell tatsächlich in Produktion laufen muss. Mir sind Experiment-Tracking, Drift-Überwachung, Tests und sauberes Deployment wichtig — nicht nur ein Notebook, das einmal gut abschneidet.' },
    about_p3: { en: 'Before Germany, I worked as a Junior Data Analyst in India, building Power BI dashboards and EDA pipelines. I\'m ready to contribute practical solutions in an AI or data science team from day one.', de: 'Vor Deutschland war ich als Junior Data Analyst in Indien tätig und habe Power BI-Dashboards und EDA-Pipelines entwickelt. Ich bin bereit, ab dem ersten Tag praxisnahe Lösungen in einem KI- oder Data-Science-Team einzubringen.' },

    fact_1a: { en: 'B.Sc. Applied AI', de: 'B.Sc. Angewandte KI' },
    fact_1b: { en: 'TH Rosenheim · 6th sem', de: 'TH Rosenheim · 6. Sem.' },
    fact_2a: { en: 'Rosenheim, Germany', de: 'Rosenheim, Deutschland' },
    fact_2b: { en: 'Open to relocation', de: 'Umzugsbereit' },
    fact_3a: { en: 'EN C1 · DE B1/B2', de: 'EN C1 · DE B1/B2' },
    fact_3b: { en: 'Hindi / Gujarati native', de: 'Hindi / Gujarati Muttersprache' },
    fact_4a: { en: 'Open to work', de: 'Offen für Angebote' },
    fact_4b: { en: 'Werkstudent · Praktikum · Entry-level', de: 'Werkstudent · Praktikum · Einstieg' },

    skills_kicker: { en: '02 — Skills', de: '02 — Kompetenzen' },
    skills_title:  { en: 'Tools I build with', de: 'Womit ich arbeite' },
    skill_c1: { en: 'ML & Modelling', de: 'ML & Modellierung' },
    skill_c2: { en: 'MLOps & Deployment', de: 'MLOps & Deployment' },
    skill_c3: { en: 'Data & Visualisation', de: 'Daten & Visualisierung' },
    skill_c4: { en: 'Programming & Tools', de: 'Programmierung & Tools' },

    projects_kicker: { en: '03 — Projects', de: '03 — Projekte' },
    projects_title:  { en: 'Selected work', de: 'Ausgewählte Projekte' },

    proj1_title: { en: 'MLOps Pipeline for Predictive Maintenance', de: 'MLOps-Pipeline für prädiktive Instandhaltung' },
    proj1_date:  { en: '06/2026 — Present', de: '06/2026 — Aktuell' },
    proj1_desc:  { en: 'Production-grade MLOps workflow for a machine-failure classifier (AI4I 2020, ~10,000 sensor records): training, experiment tracking and a model registry in MLflow, with automatic champion promotion.', de: 'Produktionsnaher MLOps-Workflow für einen Maschinenausfall-Klassifikator (AI4I 2020, ca. 10.000 Sensordatensätze): Training, Experiment-Tracking und Modellregistrierung mit MLflow, inkl. automatischer Champion-Promotion.' },
    proj1_p1:    { en: 'Raised PR-AUC with XGBoost from 0.38 baseline to <strong>0.83</strong>; CI enforces PR-AUC ≥ 0.75 before every promotion.', de: 'PR-AUC mit XGBoost von 0,38 (Baseline) auf <strong>0,83</strong> gesteigert; CI erzwingt PR-AUC ≥ 0,75 vor jeder Promotion.' },
    proj1_p2:    { en: 'Deployed via FastAPI, data-drift monitoring with Evidently, containerised with Docker Compose — <strong>38 tests, ~90% coverage</strong>.', de: 'Bereitstellung über FastAPI, Datendrift-Überwachung mit Evidently, containerisiert mit Docker Compose — <strong>38 Tests, ~90 % Coverage</strong>.' },

    proj2_title: { en: 'IIoT Simulator for Smart-Factory Monitoring', de: 'IIoT-Simulator für Smart-Factory-Überwachung' },
    proj2_desc:  { en: 'An Industry 4.0 simulation: 3 robot arms stream sensor data (temperature, vibration, motor current) over MQTT every second, with real-time anomaly detection via a sliding-window Z-score.', de: 'Eine Industrie-4.0-Simulation: 3 Roboterarme streamen sekündlich Sensordaten (Temperatur, Vibration, Motorstrom) über MQTT, mit Echtzeit-Anomalieerkennung per Sliding-Window-Z-Score.' },
    proj2_p1:    { en: 'Storage in InfluxDB, visualised through Grafana and a custom web dashboard.', de: 'Speicherung in InfluxDB, Visualisierung über Grafana und ein eigenes Web-Dashboard.' },
    proj2_p2:    { en: 'Orchestrated as <strong>6 services</strong> with Docker Compose.', de: 'Orchestriert als <strong>6 Services</strong> mit Docker Compose.' },

    proj3_title: { en: 'Predictive Maintenance for Robotic Bearings', de: 'Prädiktives Wartungssystem für industrielle Robotiklager' },
    proj3_desc:  { en: 'An LSTM autoencoder (PyTorch) for anomaly detection in bearing vibration data (NASA IMS Bearing dataset), catching failures early.', de: 'Ein LSTM-Autoencoder (PyTorch) zur Anomalieerkennung in Lagervibrationsdaten (NASA IMS Bearing-Datensatz), der Ausfälle früh erkennt.' },
    proj3_p1:    { en: '<strong>F1-score 0.94</strong> for early detection of bearing failures.', de: '<strong>F1-Score 0,94</strong> bei der Früherkennung von Lagerausfällen.' },
    proj3_p2:    { en: 'FastAPI backend + Streamlit dashboard for live anomaly scores and maintenance recommendations — 3 services via Docker Compose.', de: 'FastAPI-Backend + Streamlit-Dashboard für Live-Anomalie-Scores und Wartungsempfehlungen — 3 Services per Docker Compose.' },

    proj4_title: { en: 'ML-Based Crypto Trading System', de: 'ML-basiertes Krypto-Handelssystem' },
    proj4_desc:  { en: 'A modular end-to-end pipeline for algorithmic BTC/USDT trading: ~17,500 hourly data points, 16 engineered features (RSI, MACD, ATR).', de: 'Eine modulare End-to-End-Pipeline für algorithmischen BTC/USDT-Handel: ca. 17.500 stündliche Datenpunkte, 16 berechnete Features (RSI, MACD, ATR).' },
    proj4_p1:    { en: 'Walk-forward cross-validation to prevent leakage; ATR-based stop-loss and drawdown protection.', de: 'Walk-Forward-Kreuzvalidierung gegen Datenlecks; ATR-basierte Stop-Loss-Regeln und Drawdown-Sicherung.' },
    proj4_p2:    { en: 'Deployed on Binance Testnet — honestly documented <strong>50% out-of-sample accuracy</strong>: public market features carried no real predictive edge.', de: 'Auf Binance Testnet bereitgestellt — ehrlich dokumentierte <strong>50 % OOS-Genauigkeit</strong>: öffentliche Marktfeatures ohne echte Vorhersagekraft.' },

    proj_github:   { en: 'View on GitHub →', de: 'Auf GitHub ansehen →' },
    projects_more: { en: 'See all on GitHub →', de: 'Alle auf GitHub ansehen →' },

    exp_kicker: { en: '04 — Experience & Education', de: '04 — Erfahrung & Bildung' },
    exp_title:  { en: 'The path so far', de: 'Mein bisheriger Weg' },

    tl1_title: { en: 'Sales Associate — Lidl GmbH & Co. KG', de: 'Verkäufer — Lidl GmbH & Co. KG' },
    tl1_date:  { en: 'Present', de: 'Aktuell' },
    tl1_place: { en: 'Prien am Chiemsee, Germany', de: 'Prien am Chiemsee, Deutschland' },
    tl1_desc:  { en: 'Reliable work in a high-volume retail environment while studying full-time — strong time management and resilience — while building professional German and intercultural teamwork.', de: 'Zuverlässiges Arbeiten in einem umsatzstarken Einzelhandelsumfeld bei gleichzeitigem Vollzeitstudium — starkes Zeitmanagement und Belastbarkeit — bei gleichzeitigem Ausbau professioneller Deutschkenntnisse und interkultureller Teamkompetenz.' },

    tl2_title: { en: 'B.Sc. Applied Artificial Intelligence', de: 'B.Sc. Angewandte Künstliche Intelligenz' },
    tl2_date:  { en: '10/2023 — Present', de: '10/2023 — Aktuell' },
    tl2_place: { en: 'Technische Hochschule Rosenheim, Germany', de: 'Technische Hochschule Rosenheim, Deutschland' },
    tl2_desc:  { en: '6th semester. Focus: Machine Learning, Deep Learning, Neural Networks, Data Science, Database Systems, Software Engineering, IT Security.', de: '6. Semester. Schwerpunkte: Machine Learning, Deep Learning, Neuronale Netze, Data Science, Datenbanksysteme, Software Engineering, IT-Sicherheit.' },

    tl3_title: { en: 'Junior Data Analyst — MR Infoware', de: 'Junior Data Analyst — MR Infoware' },
    tl3_place: { en: 'Rajkot, India', de: 'Rajkot, Indien' },
    tl3_desc:  { en: 'End-to-end EDA and data-preprocessing pipelines, Power BI dashboards for KPIs, and support on ML model evaluation — translating business requirements into analytical insight.', de: 'End-to-End-EDA und Datenvorverarbeitungs-Pipelines, Power BI-Dashboards für KPIs und Mitwirkung bei der Bewertung von ML-Modellen — Überführung von Geschäftsanforderungen in analytische Erkenntnisse.' },

    tl4_title: { en: 'B.Tech Information Technology (partial)', de: 'B.Tech Informationstechnologie (Teilstudium)' },
    tl4_place: { en: 'Atmiya Institute of Technology & Science, Rajkot, India', de: 'Atmiya Institute of Technology & Science, Rajkot, Indien' },
    tl4_desc:  { en: 'Completed two semesters of foundational engineering studies.', de: 'Zwei Semester ingenieurwissenschaftliches Grundstudium absolviert.' },

    contact_kicker: { en: '05 — Contact', de: '05 — Kontakt' },
    contact_title:  { en: 'Let\'s build something', de: 'Bauen wir etwas gemeinsam' },
    contact_lead:   { en: 'I\'m open to <strong>Werkstudent, Praktikum and entry-level AI / Data</strong> roles. The fastest way to reach me is email.', de: 'Ich bin offen für <strong>Werkstudenten-, Praktikums- und Einstiegsstellen im Bereich KI / Data</strong>. Am schnellsten erreichen Sie mich per E-Mail.' },
    contact_cv:     { en: 'CV', de: 'Lebenslauf' },

    footer_loc: { en: 'Rosenheim, Germany', de: 'Rosenheim, Deutschland' },

    copy_done: { en: 'Copied to clipboard!', de: 'In Zwischenablage kopiert!' }
  };

  let currentLang = 'en';
  const applyLang = (lang) => {
    currentLang = translations.nav_about[lang] ? lang : 'en';
    root.setAttribute('lang', currentLang);
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const entry = translations[el.getAttribute('data-i18n')];
      if (entry && entry[currentLang]) el.innerHTML = entry[currentLang];
    });
    const code = document.getElementById('langCode');
    if (code) code.textContent = currentLang.toUpperCase();
    const cvFile = currentLang === 'de'
      ? 'assets/Lebenslauf_Abhi_Faldu.pdf'
      : 'assets/Resume_Abhi_Faldu.pdf';
    document.querySelectorAll('.js-cv').forEach((a) => a.setAttribute('href', cvFile));
    localStorage.setItem('lang', currentLang);
  };

  const storedLang = localStorage.getItem('lang');
  applyLang(storedLang || (navigator.language && navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en'));

  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => applyLang(currentLang === 'en' ? 'de' : 'en'));
  }

  /* ── Nav: shadow on scroll ── */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile menu ── */
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      links.classList.remove('open');
    })
  );

  /* ── Scroll-reveal ── */
  const revealEls = document.querySelectorAll(
    '.section__title, .about__grid, .skill-card, .project, .stat, .tl-item, .contact__lead, .contact .btn, .section__kicker'
  );
  revealEls.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            e.target.style.transitionDelay = Math.min(i * 40, 200) + 'ms';
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ── Count-up stats ── */
  const nums = document.querySelectorAll('.stat__num');
  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimals = (el.dataset.count.split('.')[1] || '').length;
    const dur = 1100;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = (target * eased).toFixed(decimals);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals) + suffix;
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { animate(e.target); so.unobserve(e.target); }
        });
      },
      { threshold: 0.6 }
    );
    nums.forEach((n) => so.observe(n));
  }

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a');
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('id');
          navAnchors.forEach((a) =>
            a.style.setProperty('color', a.getAttribute('href') === '#' + id ? 'var(--accent)' : '')
          );
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => spy.observe(s));

  /* ── Copy email to clipboard ── */
  const copyBtn = document.getElementById('copyEmail');
  if (copyBtn) {
    const label = copyBtn.querySelector('.copy-label');
    const original = label.textContent;
    let resetTimer;
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
      } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try { document.execCommand('copy'); } catch (_) {}
        ta.remove();
      }
      copyBtn.classList.add('copied');
      label.textContent = translations.copy_done[currentLang] || translations.copy_done.en;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        copyBtn.classList.remove('copied');
        label.textContent = original;
      }, 1900);
    });
  }

  /* ── Footer year ── */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
