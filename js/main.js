/* PLC IO Checker Site — main.js */

/* ========== i18n ========== */
const i18n = {
  ja: {
    /* Nav */
    "nav.overview":   "製品概要",
    "nav.features":   "機能",
    "nav.plc":        "対応機種",
    "nav.pricing":    "価格",
    "nav.download":   "ダウンロード",
    "nav.guide":      "使い方ガイド",
    /* Hero */
    "hero.badge":     "v0.2.0 リリース",
    "hero.title":     "設備立ち上げのIOチェックを、<br><span class='text-accent'>スマートフォン1台で完結</span>",
    "hero.sub":       "装置製造メーカーの立ち上げエンジニアへ。<br>PLC盤と設備を何度も往復する作業を、スマートフォン1台で解決します。",
    "hero.cta.appstore":  "App Store で購入",
    "hero.cta.googleplay":"Google Play で購入",
    "hero.cta.guide":     "使い方を見る →",
    "hero.makers.label":  "対応メーカー",
    /* Problem */
    "problem.title": "立ち上げ現場のこんな手間、ありませんか？",
    "problem.1.title": "PLC盤と設備を何度も往復",
    "problem.1.desc":  "配線・IOチェックのたびにPLC盤に戻って確認。設備規模が大きいほど移動の手間が増えます。",
    "problem.2.title": "ラップトップを持ち歩く不便",
    "problem.2.desc":  "IOチェックのためだけに重いPCを抱えて現場を歩き回っていませんか？",
    "problem.3.title": "監視設定の手入力が煩雑",
    "problem.3.desc":  "チェック対象のデバイスアドレスをアプリに一から手入力していませんか？",
    "solution.title": "PLC IO Checker が解決します",
    "solution.desc":  "PCで監視デバイスを設定してQRコードを生成。スマートフォンで読み取ってPLCに接続するだけ。<br>立ち上げエンジニアが設備のそばに立ったまま、すべてのIOをリアルタイムで確認・操作できます。",
    /* Overview */
    "overview.title": "3つのツールが連携する",
    "overview.sub":   "PCで設定を作り、QRで転送、スマートフォンで監視。シンプルなワークフロー。",
    "overview.pb.title":    "Project Builder",
    "overview.pb.platform": "Windows PC",
    "overview.pb.desc":     "PLC接続設定・監視デバイス・アラートルールをGUIで作成",
    "overview.pb.price":    "無料",
    "overview.arrow1.label":"QRコードで転送",
    "overview.app.title":   "PLC IO Checker",
    "overview.app.platform":"Android / iOS",
    "overview.app.desc":    "スマートフォンからPLCをリアルタイム監視・制御",
    "overview.app.price":   "¥10,000",
    "overview.arrow2.label":"Ethernet / Wi-Fi",
    "overview.plc.title":   "PLC",
    "overview.plc.platform":"MELSEC / KEYENCE",
    "overview.plc.desc":    "既存の制御システムにそのまま接続。設定変更は最小限",
    /* Features */
    "features.title":     "主要機能",
    "features.sub":       "現場のエンジニアが本当に必要とする機能を、すべて搭載しています。",
    "features.tab.app":   "Android / iOS アプリ",
    "features.tab.pb":    "Project Builder",
    "features.app.1.title": "デバイス一覧監視",
    "features.app.1.desc":  "登録デバイスの現在値をリアルタイム表示。グループ・フィルタ・検索対応。",
    "features.app.2.title": "フォーカスパネル",
    "features.app.2.desc":  "選択したデバイスの値を読み書き。ビット・ワード・Float32対応。",
    "features.app.3.title": "ブロック監視",
    "features.app.3.desc":  "連続アドレスをまとめて一覧表示。コンパクト／詳細モード切替。",
    "features.app.4.title": "タイムチャート",
    "features.app.4.desc":  "最大20chの信号波形をリアルタイム記録。CSVエクスポート対応（500ms記録・約500秒バッファ）。",
    "features.app.5.title": "トラップ / アラート",
    "features.app.5.desc":  "Rise / Fall / Change / 閾値比較でイベント検知。CSV履歴エクスポート。",
    "features.app.6.title": "デモモード",
    "features.app.6.desc":  "実機なしで全機能を評価できます。購入前のお試しに最適。",
    "features.pb.1.title": "PLC接続設定",
    "features.pb.1.desc":  "IPアドレス・ポート・プロトコル・MESLECルーティングを設定。",
    "features.pb.2.title": "デバイス一括登録",
    "features.pb.2.desc":  "Excelからのコピー&ペーストに対応。大量デバイスも素早く登録。",
    "features.pb.3.title": "タイムチャート設定",
    "features.pb.3.desc":  "最大20chの監視対象アドレス・データ型を設定。",
    "features.pb.4.title": "トラップルール設定",
    "features.pb.4.desc":  "Rise / Fall / Change / 比較演算子としきい値を直感的に設定。",
    "features.pb.5.title": "マルチページQRコード生成",
    "features.pb.5.desc":  "大規模プロジェクトも分割QRで転送。PNG出力・JSON出力に対応。",
    /* PLC Support */
    "plc.title": "対応PLC機種",
    "plc.sub":   "国内主要PLC2メーカーに対応。既存設備をそのまま活用できます。",
    "plc.melsec.title":    "Mitsubishi MELSEC",
    "plc.melsec.protocol": "SLMP / Ethernet",
    "plc.keyence.title":   "KEYENCE KV",
    "plc.keyence.protocol":"HostLink / Ethernet",
    /* Pricing */
    "pricing.title": "価格・ライセンス",
    "pricing.sub":   "買い切りライセンス。サブスクリプションなし。",
    "pricing.android.name":    "PLC IO Checker",
    "pricing.android.platform":"Android",
    "pricing.android.amount":  "¥10,000",
    "pricing.android.period":  "買い切り・永続ライセンス",
    "pricing.android.f1": "MELSEC + KEYENCE 両対応",
    "pricing.android.f2": "タイムチャート最大20ch",
    "pricing.android.f3": "トラップ/アラート機能",
    "pricing.android.f4": "デモモード搭載",
    "pricing.android.f5": "アップデート無料",
    "pricing.android.f6": "日本語 / English 対応",
    "pricing.ios.name":    "PLC IO Checker",
    "pricing.ios.platform":"iOS",
    "pricing.ios.amount":  "¥10,000",
    "pricing.ios.period":  "買い切り・永続ライセンス",
    "pricing.ios.note":    "Android版と同一機能",
    "pricing.pb.name":    "Project Builder",
    "pricing.pb.platform":"Windows PC",
    "pricing.pb.amount":  "無料",
    "pricing.pb.period":  "MITライセンス・制限なし",
    "pricing.pb.f1": "GUI でプロジェクト作成",
    "pricing.pb.f2": "QRコード生成・PNG出力",
    "pricing.pb.f3": "シングルEXE — インストール不要",
    "pricing.pb.f4": "日本語 / English 対応",
    "pricing.pb.btn": "無料でダウンロード",
    "pricing.featured.label": "最も選ばれています",
    "pricing.roi": "装置1台の立ち上げ工数を<strong>半日短縮</strong>できれば、<strong>1案件で十分な投資回収</strong>が見込めます。",
    /* Download */
    "download.title":    "ダウンロード",
    "download.sub":      "まずはデモモードで無料体験。実機なしで全機能を評価できます。",
    "download.app.h":    "PLC IO Checker",
    "download.app.note": "デモモード搭載 — 実機なしで評価可能",
    "download.pb.h":     "Project Builder",
    "download.pb.platform": "Windows 10/11 (x64) · .NET 8.0",
    "download.pb.note":  "無料 · MITライセンス · シングルEXE",
    "download.pb.btn":   "EXEをダウンロード（無料）",
    /* Footer */
    "footer.tagline": "現場エンジニアのための PLC 監視ツール",
    "footer.pb.note": "Project Builder は MIT ライセンスで公開",
    "footer.copy":    "© 2026 PLC IO Checker. All rights reserved.",
  },

  en: {
    /* Nav */
    "nav.overview":   "Overview",
    "nav.features":   "Features",
    "nav.plc":        "Supported PLCs",
    "nav.pricing":    "Pricing",
    "nav.download":   "Download",
    "nav.guide":      "User Guide",
    /* Hero */
    "hero.badge":     "v0.2.0 Released",
    "hero.title":     "PLC I/O Commissioning,<br><span class='text-accent'>Done from Your Smartphone</span>",
    "hero.sub":       "For machine builders and commissioning engineers.<br>Stop walking back to the PLC cabinet. Check every I/O from wherever you stand.",
    "hero.cta.appstore":  "Get on App Store",
    "hero.cta.googleplay":"Get on Google Play",
    "hero.cta.guide":     "View User Guide →",
    "hero.makers.label":  "Supported Manufacturers",
    /* Problem */
    "problem.title": "Does This Sound Familiar?",
    "problem.1.title": "Walking Back to the PLC Cabinet",
    "problem.1.desc":  "Checking I/O during commissioning means walking back to the cabinet every time. Larger machines mean more steps.",
    "problem.2.title": "Carrying a Laptop on the Floor",
    "problem.2.desc":  "Do you haul a heavy laptop around just to run an I/O check during startup?",
    "problem.3.title": "Typing in Device Addresses Manually",
    "problem.3.desc":  "Are you manually entering every device address into your monitoring tool one by one?",
    "solution.title": "PLC IO Checker Solves This",
    "solution.desc":  "Build your I/O list on PC, generate a QR code, scan it with your phone, and connect to the PLC.<br>Verify and force every I/O signal from right next to the machine — no laptop, no walking back.",
    /* Overview */
    "overview.title": "Three Tools, One Workflow",
    "overview.sub":   "Create on PC, transfer via QR, monitor on smartphone. Simple and efficient.",
    "overview.pb.title":    "Project Builder",
    "overview.pb.platform": "Windows PC",
    "overview.pb.desc":     "Create PLC connection settings, device list, and alert rules using a GUI",
    "overview.pb.price":    "Free",
    "overview.arrow1.label":"Transfer via QR",
    "overview.app.title":   "PLC IO Checker",
    "overview.app.platform":"Android / iOS",
    "overview.app.desc":    "Monitor and control your PLC in real time from your smartphone",
    "overview.app.price":   "¥10,000",
    "overview.arrow2.label":"Ethernet / Wi-Fi",
    "overview.plc.title":   "PLC",
    "overview.plc.platform":"MELSEC / KEYENCE",
    "overview.plc.desc":    "Connect to your existing control system with minimal configuration changes",
    /* Features */
    "features.title":     "Key Features",
    "features.sub":       "Everything a field engineer needs, built into one app.",
    "features.tab.app":   "Android / iOS App",
    "features.tab.pb":    "Project Builder",
    "features.app.1.title": "Device List Monitor",
    "features.app.1.desc":  "View current values of registered devices in real time. Supports grouping, filtering, and search.",
    "features.app.2.title": "Focus Panel",
    "features.app.2.desc":  "Read and write values for selected devices. Supports Bit, Word, and Float32 types.",
    "features.app.3.title": "Block Monitor",
    "features.app.3.desc":  "View consecutive address ranges in a compact or detailed layout.",
    "features.app.4.title": "Time Chart",
    "features.app.4.desc":  "Record up to 20 channels in real time. CSV export supported (500ms sampling, ~500s buffer).",
    "features.app.5.title": "Trap / Alert",
    "features.app.5.desc":  "Detect events by Rise / Fall / Change / threshold comparison. CSV history export.",
    "features.app.6.title": "Demo Mode",
    "features.app.6.desc":  "Try all features without a real PLC. Perfect for evaluation before purchase.",
    "features.pb.1.title": "PLC Connection Setup",
    "features.pb.1.desc":  "Configure IP address, port, protocol, and MELSEC routing settings.",
    "features.pb.2.title": "Bulk Device Registration",
    "features.pb.2.desc":  "Paste device lists directly from Excel for fast registration.",
    "features.pb.3.title": "Time Chart Configuration",
    "features.pb.3.desc":  "Set up to 20 monitoring channels with address and data type.",
    "features.pb.4.title": "Trap Rule Configuration",
    "features.pb.4.desc":  "Intuitively set Rise / Fall / Change / comparison rules with thresholds.",
    "features.pb.5.title": "Multi-Page QR Code Export",
    "features.pb.5.desc":  "Split large projects into multiple QR codes for transfer. PNG and JSON output.",
    /* PLC Support */
    "plc.title": "Supported PLC Models",
    "plc.sub":   "Compatible with Japan's two major PLC manufacturers. Use your existing equipment.",
    "plc.melsec.title":    "Mitsubishi MELSEC",
    "plc.melsec.protocol": "SLMP / Ethernet",
    "plc.keyence.title":   "KEYENCE KV",
    "plc.keyence.protocol":"HostLink / Ethernet",
    /* Pricing */
    "pricing.title": "Pricing & License",
    "pricing.sub":   "One-time purchase. No subscription.",
    "pricing.android.name":    "PLC IO Checker",
    "pricing.android.platform":"Android",
    "pricing.android.amount":  "¥10,000",
    "pricing.android.period":  "One-time · Perpetual License",
    "pricing.android.f1": "MELSEC + KEYENCE support",
    "pricing.android.f2": "Time chart up to 20 channels",
    "pricing.android.f3": "Trap / Alert feature",
    "pricing.android.f4": "Demo mode included",
    "pricing.android.f5": "Free updates",
    "pricing.android.f6": "Japanese / English support",
    "pricing.ios.name":    "PLC IO Checker",
    "pricing.ios.platform":"iOS",
    "pricing.ios.amount":  "¥10,000",
    "pricing.ios.period":  "One-time · Perpetual License",
    "pricing.ios.note":    "Same features as Android",
    "pricing.pb.name":    "Project Builder",
    "pricing.pb.platform":"Windows PC",
    "pricing.pb.amount":  "Free",
    "pricing.pb.period":  "MIT License · No Restrictions",
    "pricing.pb.f1": "GUI project creation",
    "pricing.pb.f2": "QR code generation · PNG export",
    "pricing.pb.f3": "Single EXE — no installation needed",
    "pricing.pb.f4": "Japanese / English support",
    "pricing.pb.btn": "Download Free",
    "pricing.featured.label": "Most Popular",
    "pricing.roi": "Save <strong>half a day per machine</strong> during commissioning, and the app pays for itself <strong>within the first project</strong>.",
    /* Download */
    "download.title":    "Download",
    "download.sub":      "Try Demo Mode for free — evaluate all features without a real PLC.",
    "download.app.h":    "PLC IO Checker",
    "download.app.note": "Demo Mode included — no PLC required for evaluation",
    "download.pb.h":     "Project Builder",
    "download.pb.platform": "Windows 10/11 (x64) · .NET 8.0",
    "download.pb.note":  "Free · MIT License · Single EXE",
    "download.pb.btn":   "Download EXE (Free)",
    /* Footer */
    "footer.tagline": "PLC Monitoring Tool for Field Engineers",
    "footer.pb.note": "Project Builder is open source under MIT License",
    "footer.copy":    "© 2026 PLC IO Checker. All rights reserved.",
  }
};

/* ========== i18n Engine ========== */
let currentLang = localStorage.getItem('plc-lang') || 'ja';

function applyLang(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = i18n[lang]?.[key];
    if (val !== undefined) el.innerHTML = val;
  });
  document.documentElement.lang = lang;
  document.body.dataset.lang = lang;
  const toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.textContent = lang === 'ja' ? 'EN' : 'JA';
  currentLang = lang;
  localStorage.setItem('plc-lang', lang);
}

/* ========== Header Scroll ========== */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ========== Hamburger ========== */
function initHamburger() {
  const btn = document.querySelector('.nav__hamburger');
  const links = document.querySelector('.nav__links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('is-open');
    links.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('is-open');
      links.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ========== Feature Tabs ========== */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab[role="tab"]');
  if (!tabBtns.length) return;
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      tabBtns.forEach(b => {
        b.classList.remove('tab--active');
        b.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.tab-panel').forEach(p => {
        p.classList.remove('tab-panel--active');
        p.hidden = true;
      });
      btn.classList.add('tab--active');
      btn.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(target);
      if (panel) {
        panel.classList.add('tab-panel--active');
        panel.hidden = false;
      }
    });
  });
}

/* ========== FAQ Accordion ========== */
function initFaq() {
  document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });
}

/* ========== Intersection Observer ========== */
function initAnimations() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-animate]').forEach(el => obs.observe(el));
}

/* ========== Smooth Scroll ========== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ========== Init ========== */
document.addEventListener('DOMContentLoaded', () => {
  applyLang(currentLang);

  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      applyLang(currentLang === 'ja' ? 'en' : 'ja');
    });
  }

  initHeader();
  initHamburger();
  initTabs();
  initFaq();
  initAnimations();
  initSmoothScroll();
});
