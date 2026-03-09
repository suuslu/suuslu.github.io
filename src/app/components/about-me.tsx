import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Sparkles, Code2, Heart, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';

export function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number }>>([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const galleryImages = [
    { src: '/image0.png', alt: 'Portfolio photo 1' },
    { src: '/image1.png', alt: 'Portfolio photo 2' },
    { src: '/image2.jpg', alt: 'Portfolio photo 3' },
    { src: '/image3.png', alt: 'Portfolio photo 4' },
    { src: '/image4.JPG', alt: 'Portfolio photo 5' },
    { src: '/kucuksucuk.jpg', alt: 'Portfolio photo 6' }
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    // Generate floating particles
    const particleArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * 2 + 1
    }));
    setParticles(particleArray);

  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="relative min-h-screen bg-black py-32 px-6 overflow-hidden"
    >
      {/* Drifting background glow */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(75, 0, 130, 0.3) 0%, rgba(143, 91, 189, 0.15) 40%, transparent 70%)',
          filter: 'blur(90px)',
          y
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.25) 0%, rgba(143, 91, 189, 0.1) 50%, transparent 70%)',
          filter: 'blur(80px)',
          y: useTransform(scrollYProgress, [0, 1], [-30, 30])
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: particle.id % 2 === 0 ? '#A78BFA' : '#8F5BBD',
            boxShadow: `0 0 ${particle.size * 4}px ${particle.id % 2 === 0 ? '#A78BFA' : '#8F5BBD'}`
          }}
          animate={{
            y: [0, -30 - particle.size * 3, 0],
            x: [0, Math.sin(particle.id) * 15, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header with sparkles */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="text-accent-2" size={36} />
              </motion.div>
              
              <h2 
                className="text-6xl md:text-7xl text-white"
                style={{ fontWeight: 800, letterSpacing: '-0.02em' }}
              >
                About Me
              </h2>
              
              <motion.div
                animate={{ rotate: [0, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Sparkles className="text-accent-3" size={36} />
              </motion.div>
            </div>

            {/* Animated divider */}
            <motion.div 
              className="w-40 h-1.5 bg-gradient-to-r from-accent via-accent-2 to-accent-3 mx-auto rounded-full"
              animate={{
                scaleX: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Main content card */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            {/* Glowing card background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/5 via-accent-2/10 to-accent-3/5 backdrop-blur-xl border border-accent-2/20" />
            
            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-50"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(143, 91, 189, 0.2), transparent 70%)',
                filter: 'blur(40px)'
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="relative p-12 md:p-16">
              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8"
                style={{ lineHeight: '1.8' }}
              >
                I am a <span className="text-accent-3 font-semibold">3rd-year Software Engineering student</span> at 
                Maltepe University with a current GPA of <span className="text-accent-3 font-semibold">3.17</span>, 
                expected to graduate in <span className="text-accent-3 font-semibold">June 2027</span>. I am an 
                aspiring data analyst who enjoys working with data and building clean, structured systems.
              </motion.p>

              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-300 leading-relaxed"
                style={{ lineHeight: '1.8' }}
              >
                My interests focus on <span className="text-accent-2 font-semibold">data modeling</span>, 
                <span className="text-accent-2 font-semibold"> analytics</span>, and reliable database design. 
                I work with <span className="text-accent-2 font-semibold">PostgreSQL</span> and have hands-on 
                experience using <span className="text-accent-2 font-semibold">XAMPP</span>, 
                <span className="text-accent-2 font-semibold"> phpMyAdmin</span>, and 
                <span className="text-accent-2 font-semibold"> pgAdmin 4</span> in previous projects.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-10"
              >
                <h3 className="text-3xl md:text-4xl text-white mb-6" style={{ fontWeight: 700 }}>
                  Experience
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      title: 'Information Technologies Intern — Social Office',
                      period: 'Aug 2025 – Sep 2025',
                      details: [
                        'Built data-oriented tasks with Python and Excel.',
                        'Designed an interactive Excel dashboard and a Python CLI tool.',
                        'Prepared technical design outputs using AutoCAD and Photoshop.'
                      ]
                    },
                    {
                      title: 'Vice President — GDG on Campus Maltepe',
                      period: '2025 – Present',
                      details: [
                        'Managed community events end-to-end and post-event evaluation.',
                        'Led social media, organization, and education teams.'
                      ]
                    },
                    {
                      title: 'Core Team Member — Anka Software Club',
                      period: '2024 – 2025',
                      details: [
                        'Designed social media visuals and supported the club’s Instagram.',
                        'Helped coordinate the AI & Technology Summit.'
                      ]
                    },
                    {
                      title: 'Architectural & Engineering Intern — Arch Of Sigma',
                      period: 'Nov 2025 – Dec 2025',
                      details: [
                        'Produced room models in SketchUp and 2D/3D designs in Rhinoceros 3D.',
                        'Supported project management and product development tasks.'
                      ]
                    },
                    {
                      title: 'Student Assistant — Maltepe University',
                      period: 'Jan 2026 – Present',
                      details: [
                        'Assist with course preparation, documentation, and coordination.'
                      ]
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="rounded-2xl border border-accent-2/20 bg-black/40 backdrop-blur-sm p-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                        <h4 className="text-xl md:text-2xl text-white" style={{ fontWeight: 600 }}>
                          {item.title}
                        </h4>
                        <span className="text-sm md:text-base text-gray-400">
                          {item.period}
                        </span>
                      </div>
                      <ul className="text-gray-300 space-y-2">
                        {item.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="leading-relaxed">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
              >
                <a
                  href="https://drive.google.com/drive/folders/1KAa9J34nTpt-0PbesXKkqW1ryC1auri7"
                  className="px-7 py-3 rounded-xl border-2 border-accent-2 text-accent-3 transition-all duration-300 hover:bg-accent-2/10 hover:border-accent-3 hover:scale-105"
                  style={{ fontWeight: 600 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  My Portfolio
                </a>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-12"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl md:text-4xl text-white" style={{ fontWeight: 700 }}>
                    Photo Gallery
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="h-10 w-10 rounded-full border border-accent-2/40 text-accent-3 transition-all hover:bg-accent-2/10 hover:border-accent-3"
                      onClick={() =>
                        setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
                      }
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="mx-auto" size={20} />
                    </button>
                    <button
                      type="button"
                      className="h-10 w-10 rounded-full border border-accent-2/40 text-accent-3 transition-all hover:bg-accent-2/10 hover:border-accent-3"
                      onClick={() =>
                        setGalleryIndex((prev) => (prev + 1) % galleryImages.length)
                      }
                      aria-label="Next photo"
                    >
                      <ChevronRight className="mx-auto" size={20} />
                    </button>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-3xl border border-accent-2/20 bg-black/40 backdrop-blur-sm">
                  <motion.img
                    key={galleryImages[galleryIndex].src}
                    src={galleryImages[galleryIndex].src}
                    alt={galleryImages[galleryIndex].alt}
                    className="h-[380px] w-full object-cover"
                      style={{
                        objectPosition:
                          galleryImages[galleryIndex].src === '/image4.JPG'
                            ? '50% 20%'
                            : galleryImages[galleryIndex].src === '/kucuksucuk.jpg'
                              ? '50% 35%'
                              : '50% 50%'
                      }}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Icon badges */}
              <motion.div 
                variants={containerVariants}
                className="flex flex-wrap gap-4 mt-12 justify-center"
              >
                {[
                  { icon: Code2, label: 'Clean Code', color: '#A78BFA' },
                  { icon: Lightbulb, label: 'Creative Solutions', color: '#8F5BBD' },
                  { icon: Heart, label: 'User-Focused', color: '#4B0082' }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-center gap-3 px-6 py-3 rounded-2xl backdrop-blur-sm border border-accent-2/30"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}10, ${item.color}05)`
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -5,
                        boxShadow: `0 10px 30px ${item.color}40`
                      }}
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon size={24} style={{ color: item.color }} strokeWidth={2} />
                      </motion.div>
                      <span className="text-gray-300 font-medium">{item.label}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Decorative shimmer */}
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-accent-3/10 to-transparent"
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 2
              }}
            />
          </motion.div>

          {/* Bottom sparkle dividers */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mt-12"
          >
            <motion.div 
              className="h-px w-24 bg-gradient-to-r from-transparent to-accent-2"
              animate={{ scaleX: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <Sparkles className="text-accent-3" size={20} />
            <motion.div 
              className="h-px w-24 bg-gradient-to-l from-transparent to-accent-2"
              animate={{ scaleX: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
