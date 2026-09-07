// All project links remain available without JavaScript.
const filters = document.querySelector('.filters');
const projects = [...document.querySelectorAll('.project-row')];
const status = document.querySelector('.filter-status');

if (filters && projects.length && status) {
  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button || !filters.contains(button)) return;
    filters.querySelectorAll('button').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    let count = 0;
    projects.forEach((project) => {
      project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
      if (!project.hidden) count += 1;
    });
    status.textContent = `${count} projects shown. ${button.textContent.trim()} selected.`;
  });
}
