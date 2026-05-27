const API = 'http://localhost:5000/api/projects';

async function loadProjects() {
  try {
    const res = await fetch(API);
    const projects = await res.json();
    const grid = document.getElementById('projects-grid');
    if (projects.length === 0) {
      grid.innerHTML = '<p style="color:#999">No projects yet.</p>';
      return;
    }
    grid.innerHTML = projects.map(p => `
      <div class="project-card">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="tech-tags">
          ${p.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="project-links">
          ${p.githubLink ? `<a href="${p.githubLink}" target="_blank">GitHub</a>` : ''}
          ${p.liveLink ? `<a href="${p.liveLink}" target="_blank">Live</a>` : ''}
        </div>
      </div>
    `).join('');
  } catch (err) {
    document.getElementById('projects-grid').innerHTML =
      '<p style="color:#999">Start the backend server to load projects.</p>';
  }
}

loadProjects();
