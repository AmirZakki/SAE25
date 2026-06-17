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

function openModal(project){

  const modal = document.getElementById('projectModal');
  const body = document.getElementById('modalBody');

  if(project === 'thales'){

    body.innerHTML = `
      <img src="thales.jpg" class="modal-img">

      <div class="modal-body">

        <h2>SAÉ – THALES ALENIA SPACE</h2>

        <div class="modal-section">
          <h3>Contexte</h3>
          <p>
            Projet réalisé dans le cadre du BUT Réseaux &
            Télécommunications en collaboration avec
            THALES ALENIA SPACE.
          </p>
        </div>

        <div class="modal-section">
          <h3>Technologies</h3>
          <p>
            Raspberry Pi • Linux • HTML/PHP/CSS • Réseaux • PhpMyAdmin
          </p>
        </div>

        <div class="modal-section">
          <h3>Documents</h3>

          <a href="rapport-thales.pdf" class="btn btn-terra">
            📄 Rapport
          </a>

          <a href="presentation-thales.pdf" class="btn btn-outline">
            📊 Présentation
          </a>
        </div>

      </div>
    `;
  }

  else if(project === 'mfi'){

    body.innerHTML = `
      <img src="smart-cane.jpg" class="modal-img">

      <div class="modal-body">

        <h2>Projet Final MFI</h2>

        <div class="modal-section">
          <h3>Description</h3>
          <p>
            Développement d'une canne intelligente
            destinée aux personnes malvoyantes.
          </p>
        </div>

        <div class="modal-section">
          <h3>Documents</h3>

          <a href="rapport-mfi.pdf" class="btn btn-terra">
            📄 Rapport
          </a>

          <a href="presentation-mfi.pdf" class="btn btn-outline">
            📊 Présentation
          </a>
        </div>

      </div>
    `;
  }

  else if(project === 'innovation'){

    body.innerHTML = `
      <div class="modal-body">

        <h2>Innovation Lycée</h2>

        <div class="modal-section">
          <h3>Description</h3>
          <p>
            Développement d'un sac intelligent de
            distanciation sociale intégrant des
            capteurs de proximité.
          </p>
        </div>

      </div>
    `;
  }

  modal.style.display = "block";
}

function closeModal(){
  document.getElementById('projectModal').style.display = "none";
}
