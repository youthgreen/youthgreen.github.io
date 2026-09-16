// No third-party requests, libraries, analytics, or participant inputs on this page.
const tabs = [...document.querySelectorAll('[role="tab"]')];
const progressText = document.getElementById('step-progress');
const progressBar = document.querySelector('.progress-track span');
function selectTab(tab, options = {}) {
  const selectedIndex = tabs.indexOf(tab);
  for (const item of tabs) {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(item.getAttribute('aria-controls'));
    panel.hidden = !selected;
    panel.classList.remove('panel-enter');
    if (selected && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(() => panel.classList.add('panel-enter'));
  }
  progressText.innerHTML = `<strong>${selectedIndex + 1}</strong> / ${tabs.length} 단계`;
  progressBar.style.width = `${((selectedIndex + 1) / tabs.length) * 100}%`;
  if (options.focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectTab(tabs[next], { focus: true }); }
  });
});
document.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
  const current = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
  const direction = button.dataset.step === 'next' ? 1 : -1;
  selectTab(tabs[(current + direction + tabs.length) % tabs.length], { focus: true });
}));
const dialog = document.getElementById('image-viewer');
const viewerImage = document.getElementById('viewer-image');
const caption = document.getElementById('viewer-caption');
let opener;
document.querySelectorAll('[data-lightbox]').forEach(link => {
  link.addEventListener('click', event => {
    if (!dialog.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); opener = link;
    viewerImage.src = link.href;
    viewerImage.alt = link.dataset.caption || link.querySelector('img')?.alt || '실제 앱 화면';
    caption.textContent = viewerImage.alt;
    dialog.showModal(); document.body.classList.add('viewer-open');
    document.getElementById('viewer-close').focus();
  });
});
document.getElementById('viewer-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('viewer-open'); opener?.focus({ preventScroll: true }); });
