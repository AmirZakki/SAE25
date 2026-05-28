const PAGES = [
  { id: 'home',        label: 'Accueil',      num: '01' },
  { id: 'apropos',     label: 'À propos',     num: '02' },
  { id: 'projets',     label: 'Projets',      num: '03' },
  { id: 'competences', label: 'Compétences',  num: '04' },
  { id: 'experiences', label: 'Expériences',  num: '05' },
];

let current = 'home';

function showPage(id) {
  if (id === current) return;

  const oldIdx = PAGES.findIndex(p => p.id === current);
  const newIdx = PAGES.findIndex(p => p.id === id);

  const oldEl = document.getElementById('p-' + current);
  const newEl = document.getElementById('p-' + id);

  // Animate out old
  oldEl.classList.remove('active');
  oldEl.classList.add(newIdx > oldIdx ? 'exit-up' : 'exit-down');
  setTimeout(() => oldEl.classList.remove('exit-up', 'exit-down'), 400);

  // Animate in new
  newEl.classList.add('active');

  current = id;
  updateNav();
}

function updateNav() {
  const idx = PAGES.findIndex(p => p.id === current);
  const info = PAGES[idx];

  // Nav buttons
  document.querySelectorAll('.nav-links button[data-page]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === current);
  });

  // Dots
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
  });

  // Footer label
  document.getElementById('cfPageNum').textContent  = info.num;
  document.getElementById('cfPageName').textContent = info.label;
}

function focusFooterEmail() {
  document.getElementById('cfEmail').focus();
}

function handleFooterSend() {
  const email = document.getElementById('cfEmail').value.trim();
  const msg   = document.getElementById('cfMsg').value.trim();
  if (!email || !msg) { alert('Veuillez remplir votre email et votre message.'); return; }
  // In a real site, post to backend here
  alert('Message envoyé ! Je vous répondrai dès que possible.');
  document.getElementById('cfEmail').value = '';
  document.getElementById('cfMsg').value   = '';
}

// Keyboard arrow navigation between pages
document.addEventListener('keydown', e => {
  const idx = PAGES.findIndex(p => p.id === current);
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    if (idx < PAGES.length - 1) showPage(PAGES[idx + 1].id);
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    if (idx > 0) showPage(PAGES[idx - 1].id);
  }
});