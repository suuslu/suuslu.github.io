import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Sparkles, Code2, Heart, Lightbulb } from 'lucide-react';

export function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number }>>([]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

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

    // Generate floating particles
    const particleArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * 2 + 1
    }));
    setParticles(particleArray);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

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
      className="relative min-h-screen bg-black py-32 px-6 flex items-center overflow-hidden"
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
          animate={isVisible ? "visible" : "hidden"}
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
                I'm a <span className="text-accent-3 font-semibold">Software Engineering student</span> passionate 
                about building clean, efficient, and user-focused digital experiences. I enjoy learning modern 
                technologies, experimenting with new tools, and turning ideas into functional interfaces.
              </motion.p>

              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-300 leading-relaxed"
                style={{ lineHeight: '1.8' }}
              >
                I'm currently exploring <span className="text-accent-2 font-semibold">frontend development</span>, 
                backend APIs, and UI/UX design while continuously improving my problem-solving and technical 
                thinking skills.
              </motion.p>

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
