import { ExternalLink, Github } from 'lucide-react';
import { projects } from './desktop-data';

export function ExplorerWindow() {
  return (
    <div className="xp-explorer">
      <aside className="xp-explorer-sidebar" aria-label="Project folders">
        <h3>File and Folder Tasks</h3>
        <a href="#projects-list">View project files</a>
        <a href="https://github.com/suuslu" target="_blank" rel="noopener noreferrer">
          Open GitHub profile
        </a>
        <h3>Details</h3>
        <p>{projects.length} project items</p>
      </aside>

      <div className="xp-explorer-content" id="projects-list">
        {projects.map((project) => (
          <article className="xp-project-file" key={project.title}>
            <div className="xp-project-thumbnail" style={{ backgroundImage: `url(${project.asset})` }} aria-hidden="true">
              <span>📁</span>
            </div>
            <div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="xp-tech-list" aria-label={`${project.title} technologies`}>
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="xp-project-actions">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github size={16} aria-hidden="true" />
                  Code
                </a>
                {project.demo ? (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} aria-hidden="true" />
                    Demo
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
