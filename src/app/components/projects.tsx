import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, Sparkles } from 'lucide-react';

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const projects = [
    {
      title: 'AI Task Manager',
      description: 'Smart productivity app with ML-powered task prioritization and intelligent scheduling based on user patterns.',
      tech: ['React', 'TensorFlow.js', 'Node.js', 'MongoDB'],
      github: 'https://github.com',
      demo: 'https://example.com',
      gradient: 'from-accent to-accent-2'
    },
    {
      title: 'Realtime Collab Platform',
      description: 'Team collaboration tool with live document editing, video chat, and seamless project management.',
      tech: ['Next.js', 'Socket.io', 'PostgreSQL', 'Redis'],
      github: 'https://github.com',
      demo: null,
      gradient: 'from-accent-2 to-accent-3'
    },
    {
      title: 'Analytics Dashboard',
      description: 'E-commerce analytics platform featuring sales tracking, customer insights, and predictive analytics.',
      tech: ['Vue.js', 'Python', 'FastAPI', 'Chart.js'],
      github: 'https://github.com',
      demo: 'https://example.com',
      gradient: 'from-accent-3 to-accent'
    },
    {
      title: 'Social Scheduler',
      description: 'Automated social media management tool with AI content suggestions across multiple platforms.',
      tech: ['TypeScript', 'Express', 'GraphQL', 'AWS'],
      github: 'https://github.com',
      demo: null,
      gradient: 'from-accent to-accent-3'
    },
    {
      title: 'Fitness Tracker',
      description: 'Mobile-first PWA for workout tracking, nutrition monitoring, and personalized fitness recommendations.',
      tech: ['React Native', 'Firebase', 'Redux'],
      github: 'https://github.com',
      demo: 'https://example.com',
      gradient: 'from-accent-2 to-accent'
    },
    {
      title: 'Code Snippet Manager',
      description: 'Developer tool for organizing and sharing code snippets with syntax highlighting and smart tagging.',
      tech: ['Svelte', 'Supabase', 'TypeScript'],
      github: 'https://github.com',
      demo: 'https://example.com',
      gradient: 'from-accent-3 to-accent-2'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="relative min-h-screen bg-black py-24 px-6 overflow-hidden">
      {/* Parallax purple gradient orb */}
      <motion.div
        className="absolute top-1/3 left-0 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #A78BFA 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-accent-2" size={28} />
            <h2 className="text-5xl md:text-7xl text-white" style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
              Featured Projects
            </h2>
            <Sparkles className="text-accent-3" size={28} />
          </div>
          <motion.div 
            className="w-32 h-1.5 bg-gradient-to-r from-accent via-accent-2 to-accent-3 mx-auto rounded-full"
            animate={{
              scaleX: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Projects Grid with staggered entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative rounded-2xl bg-black/50 backdrop-blur-sm border border-accent-2/20 overflow-hidden transition-all duration-500"
              whileHover={{ 
                y: -15,
                scale: 1.03,
                borderColor: 'rgba(167, 139, 250, 0.5)',
                transition: { duration: 0.3 }
              }}
            >
              {/* Gradient top bar */}
              <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />

              {/* Neon glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-2/0 via-accent-2/5 to-accent-3/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-accent-2/20" />
              
              <div className="relative p-7">
                {/* Title with icon */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl text-white pr-2" style={{ fontWeight: 700 }}>
                    {project.title}
                  </h3>
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  >
                    <Sparkles className="text-accent-3" size={20} fill="#A78BFA" />
                  </motion.div>
                </div>
                
                <p className="text-gray-400 mb-6 leading-relaxed min-h-24">
                  {project.description}
                </p>

                {/* Tech stack with glow */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1.5 text-sm rounded-lg bg-accent/10 text-accent-3 border border-accent-2/30 backdrop-blur-sm"
                      whileHover={{
                        scale: 1.05,
                        borderColor: 'rgba(167, 139, 250, 0.6)',
                        boxShadow: '0 0 20px rgba(167, 139, 250, 0.3)'
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Action buttons with neon bloom */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white overflow-hidden"
                    style={{ fontWeight: 600 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-2 to-accent-3 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <Github size={18} className="relative z-10" />
                    <span className="relative z-10">Code</span>
                    <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-xl bg-accent-3/60" />
                  </motion.a>
                  
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-accent-2 text-accent-3 transition-all duration-300 hover:bg-accent-2/10 hover:border-accent-3"
                      style={{ fontWeight: 600 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={18} />
                      <span>Live</span>
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-accent-3/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}