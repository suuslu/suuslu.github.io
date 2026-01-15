import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, Sparkles, ArrowUp } from 'lucide-react';

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:aysesu.uslu@gmail.com',
      label: 'aysesu.uslu@gmail.com',
      color: '#8F5BBD'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/suuslu',
      label: 'github.com/suuslu',
      color: '#A78BFA'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/ayse-su-uslu/',
      label: 'linkedin.com/in/ayse-su-uslu',
      color: '#4B0082'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
        duration: 0.5, 
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative min-h-screen bg-black py-24 px-6 flex items-center overflow-hidden">
      {/* Animated gradient waves */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '400px',
            background: 'linear-gradient(180deg, transparent, rgba(75, 0, 130, 0.3))'
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '300px',
            background: 'linear-gradient(180deg, transparent, rgba(143, 91, 189, 0.2))'
          }}
          animate={{
            y: [0, 30, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '200px',
            background: 'linear-gradient(180deg, transparent, rgba(167, 139, 250, 0.15))'
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="text-accent-3" size={32} />
              <h2 className="text-5xl md:text-7xl text-white" style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                Let's Connect
              </h2>
              <Sparkles className="text-accent-2" size={32} />
            </div>
            <motion.div 
              className="w-32 h-1.5 bg-gradient-to-r from-accent via-accent-2 to-accent-3 mx-auto rounded-full mb-6"
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
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              I'm currently seeking <span className="text-accent-3 font-semibold">internship opportunities</span> and 
              open to collaborating on exciting projects. Feel free to reach out!
            </motion.p>
          </motion.div>

          {/* Contact Links with glowing hover */}
          <motion.div variants={containerVariants} className="space-y-5">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  href={link.href}
                  target={link.name !== 'Email' ? '_blank' : undefined}
                  rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="group relative flex items-center gap-6 p-7 rounded-2xl bg-black/50 backdrop-blur-sm border border-accent-2/20 transition-all duration-500 overflow-hidden"
                  whileHover={{ 
                    x: 15,
                    scale: 1.02,
                    borderColor: 'rgba(167, 139, 250, 0.5)',
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                    style={{
                      background: `radial-gradient(circle at left, ${link.color}30, transparent 70%)`
                    }}
                  />

                  {/* Icon with animated glow */}
                  <motion.div 
                    className="relative flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300"
                    style={{
                      background: `${link.color}20`,
                      color: link.color
                    }}
                    whileHover={{
                      rotate: [0, -5, 5, -5, 0],
                      scale: 1.15,
                      boxShadow: `0 0 30px ${link.color}60`,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <Icon size={32} strokeWidth={2} />
                    
                    {/* Pulsing ring */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{ border: `2px solid ${link.color}` }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                  </motion.div>
                  
                  <div className="flex-1 relative">
                    <h3 className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>
                      {link.name}
                    </h3>
                    <p className="text-gray-400 group-hover:text-accent-3 transition-colors duration-300">
                      {link.label}
                    </p>
                  </div>

                  {/* Animated arrow */}
                  <motion.div 
                    className="text-accent-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    animate={{
                      x: [0, 8, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>

                  {/* Decorative shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-3/10 to-transparent"
                    animate={{
                      x: ['-100%', '200%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.5
                    }}
                  />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="mt-20 text-center relative"
          >
            {/* Back to Top Button */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group relative inline-flex items-center gap-3 px-10 py-5 mb-8 rounded-2xl bg-gradient-to-r from-accent to-accent-2 text-white overflow-hidden"
              style={{ fontWeight: 700, fontSize: '18px' }}
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Neon glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-2 to-accent-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-accent-3/60" />
              
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <ArrowUp size={24} strokeWidth={3} />
              </motion.div>
              <span className="relative z-10">Başa Dön</span>
              
              {/* Animated ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-accent-3"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.button>

            <div className="inline-block px-8 py-3 rounded-full bg-accent/5 border border-accent-2/20 backdrop-blur-sm">
              <p className="text-gray-500">
                © 2026 Portfolio. Designed & Built with <span className="text-accent-3">passion</span> ✨
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
