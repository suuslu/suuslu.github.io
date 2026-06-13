import { useState } from 'react';
import { ChevronLeft, ChevronRight, Github, Linkedin, Mail } from 'lucide-react';
import {
  aboutCopy,
  education,
  experiences,
  galleryImages,
  interests,
  profile,
  skills
} from './desktop-data';

export function PortfolioHome() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <div className="xp-home">
      <div className="xp-home-photo">
        {!photoFailed ? (
          <img src={profile.profilePhoto} alt={`${profile.name} profile`} onError={() => setPhotoFailed(true)} />
        ) : (
          <img src={profile.fallbackPhoto} alt={`${profile.name} portrait`} />
        )}
      </div>
      <div className="xp-home-copy">
        <p className="xp-kicker">Welcome to my desktop</p>
        <h1>{profile.name}</h1>
        <p className="xp-role">{profile.role}</p>
        <p>{profile.tagline}</p>
        <div className="xp-home-actions">
          <a href={`mailto:${profile.email}`}>
            <Mail size={16} aria-hidden="true" />
            Email
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <Github size={16} aria-hidden="true" />
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={16} aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

export function AboutWindow() {
  return (
    <div className="xp-about">
      <div className="xp-system-header">
        <div className="xp-system-icon" aria-hidden="true">
          💻
        </div>
        <div>
          <h2>System Properties</h2>
          <p>{profile.name} / {profile.role}</p>
        </div>
      </div>

      <div className="xp-tab-strip" role="tablist" aria-label="About categories">
        <button type="button" className="is-active">General</button>
        <button type="button">Education</button>
        <button type="button">Experience</button>
      </div>

      <div className="xp-property-panel">
        {aboutCopy.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <h3>Education</h3>
        {education.map((item) => (
          <div className="xp-definition-row" key={item.school}>
            <strong>{item.school}</strong>
            <span>{item.program}. {item.detail}</span>
          </div>
        ))}

        <h3>Interests</h3>
        <div className="xp-chip-row">
          {interests.map((interest) => (
            <span key={interest}>{interest}</span>
          ))}
        </div>

        <h3>Experience</h3>
        <div className="xp-experience-list">
          {experiences.map((item) => (
            <article key={item.title}>
              <div>
                <h4>{item.title}</h4>
                <span>{item.period}</span>
              </div>
              <ul>
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}

export function GalleryWindow() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const activeImage = galleryImages[galleryIndex];

  return (
    <div className="xp-gallery-app">
      <aside className="xp-gallery-strip" aria-label="Photo thumbnails">
        {galleryImages.map((image, index) => (
          <button
            type="button"
            key={image.src}
            className={index === galleryIndex ? 'is-active' : ''}
            onClick={() => setGalleryIndex(index)}
            aria-label={`Show photo ${index + 1}`}
          >
            <img src={image.src} alt="" style={{ objectPosition: image.objectPosition }} />
          </button>
        ))}
      </aside>
      <div className="xp-gallery-viewer">
        <div className="xp-gallery-title">
          <h3>Photo Gallery</h3>
          <div>
            <button
              type="button"
              onClick={() => setGalleryIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length)}
              aria-label="Previous photo"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setGalleryIndex((current) => (current + 1) % galleryImages.length)}
              aria-label="Next photo"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
        <img className="xp-gallery-main-image" src={activeImage.src} alt={activeImage.alt} style={{ objectPosition: activeImage.objectPosition }} />
      </div>
    </div>
  );
}

export function SkillsWindow() {
  return (
    <div className="xp-control-panel">
      <p className="xp-panel-intro">Installed programs and tools grouped by everyday use.</p>
      <div className="xp-skills-grid">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <article key={`${skill.group}-${skill.name}`} className="xp-skill-item">
              <span className="xp-skill-icon" aria-hidden="true">
                <Icon size={24} />
              </span>
              <div>
                <h3>{skill.name}</h3>
                <p>{skill.group}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function ContactWindow() {
  return (
    <div className="xp-mail">
      <aside className="xp-mail-folders" aria-label="Mail folders">
        <button type="button" className="is-active">Inbox</button>
        <a href={profile.portfolioDrive} target="_blank" rel="noopener noreferrer">
          Portfolio
        </a>
      </aside>
      <div className="xp-mail-message">
        <div className="xp-mail-meta">
          <p><strong>From:</strong> {profile.name}</p>
          <p><strong>Subject:</strong> Let&apos;s Connect</p>
        </div>
        <p>
          I&apos;m currently seeking internship opportunities and open to collaborating on exciting projects.
          Feel free to reach out through any of the links below.
        </p>
        <div className="xp-contact-links">
          <a href={`mailto:${profile.email}`}>
            <Mail size={18} aria-hidden="true" />
            {profile.email}
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <Github size={18} aria-hidden="true" />
            {profile.githubLabel}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={18} aria-hidden="true" />
            {profile.linkedinLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
