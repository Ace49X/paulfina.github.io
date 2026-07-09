const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderPortfolio() {
  $$('[data-text]').forEach((el) => {
    const key = el.getAttribute('data-text');
    el.textContent = portfolio[key] || '';
  });

  $$('[data-link="resume"]').forEach((el) => {
    el.href = portfolio.resumeFile || '#';
  });

  $('#emailLink').textContent = portfolio.email;
  $('#emailLink').href = `https://mail.google.com/mail/?view=cm&fs=1&to=${portfolio.email}`;
$('#emailLink').target = '_blank';
  $('#contactEmail').href = `https://mail.google.com/mail/?view=cm&fs=1&to=${portfolio.email}`;
$('#contactEmail').target = '_blank';
  $('#linkedinButton').href = portfolio.linkedinUrl || '#';

  $('#stats').innerHTML = portfolio.stats.map((item) => `
    <div><strong>${escapeHtml(item.big)}</strong><span>${escapeHtml(item.small)}</span></div>
  `).join('');

  $('#profileBullets').innerHTML = portfolio.profileBullets.map((item) => `
    <li>${escapeHtml(item)}</li>
  `).join('');

  $('#aboutParagraphs').innerHTML = portfolio.aboutParagraphs.map((paragraph) => `
    <p>${escapeHtml(paragraph)}</p>
  `).join('');

  $('#videoGrid').innerHTML = portfolio.videos.map((video, index) => {
    const delay = index === 0 ? '' : ` delay-${index}`;
    const media = video.embedUrl
      ? `<iframe 
    class="video-embed" 
    src="${escapeHtml(video.embedUrl)}" 
    title="${escapeHtml(video.title)}" 
    frameborder="0"
    referrerpolicy="strict-origin-when-cross-origin"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>`
      : `<div class="video-placeholder" data-label="${escapeHtml(video.label)}">▶</div>`;

    return `
      <article class="video-card reveal${delay}">
        ${media}
        <h3>${escapeHtml(video.title)}</h3>
        <p>${escapeHtml(video.description)}</p>
      </article>
    `;
  }).join('');

  $('#toolGrid').innerHTML = portfolio.crmTools.map((tool, index) => {
    const delay = index === 0 ? '' : ` delay-${index}`;
    return `
      <div class="tool-card reveal${delay}">
        <span>${escapeHtml(tool.number)}</span>
        <h3>${escapeHtml(tool.name)}</h3>
        <p>${escapeHtml(tool.description)}</p>
      </div>
    `;
  }).join('');

  $('#sampleGrid').innerHTML = portfolio.salesSamples.map((sample, index) => {
    const delay = index === 0 ? '' : ` delay-${index}`;
    let content = '';

    if (sample.type === 'list') {
      content = `<ul class="clean-list">${sample.content.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
    } else {
      content = `<p class="script">${escapeHtml(sample.content)}</p>`;
    }

    return `
      <article class="sample-card reveal${delay}">
        <h3>${escapeHtml(sample.title)}</h3>
        ${content}
      </article>
    `;
  }).join('');

  $('#whyHireBullets').innerHTML = portfolio.whyHireBullets.map((item) => `
    <li>${escapeHtml(item)}</li>
  `).join('');
}

function setUpThemeToggle() {
  const toggle = $('#themeToggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    document.body.classList.add('light');
    toggle.textContent = '☀';
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    toggle.textContent = isLight ? '☀' : '☾';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

function setUpScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  $$('.reveal').forEach((el) => observer.observe(el));
}

renderPortfolio();
setUpThemeToggle();
setUpScrollReveal();
$('#year').textContent = new Date().getFullYear();
