let projects = [];

const form = document.querySelector('#project-form');
const nameInput = document.querySelector('#name');
const statusInput = document.querySelector('#status');
const list = document.querySelector('#project-list');
const empty = document.querySelector('#empty-state');
const message = document.querySelector('#message');

function tell(text, error = false) {
  message.textContent = text;
  message.dataset.error = String(error);
}

function render() {
  list.replaceChildren();
  empty.hidden = projects.length > 0;
  for (const project of projects) {
    const item = document.createElement('li');
    item.className = 'project';

    const info = document.createElement('div');
    const title = document.createElement('h3');
    title.className = 'project-name';
    title.textContent = project.name;

    const status = document.createElement('p');
    status.className = 'project-status';
    status.textContent = project.status;

    info.append(title, status);
    item.append(info);
    list.append(item);
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const status = statusInput.value;

  if (!name) {
    tell('Enter a project name.', true);
    nameInput.focus();
    return;
  }

  projects.push({ name, status });
  form.reset();
  render();
  tell('Project added.');
});

render();
