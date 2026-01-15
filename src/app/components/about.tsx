import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Code2, Zap, Star, Sparkles } from 'lucide-react';

export function About() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  const features = [
    {
      icon: Code2,
      title: 'Clean Code',
      description: 'Crafting elegant, maintainable solutions',
      color: '#8F5BBD'
    },
    {
      icon: Zap,
      title: 'Fast Learner',
      description: 'Quick adaptation to new technologies',
      color: '#A78BFA'
    },
    {
      icon: Star,
      title: 'Problem Solver',
      description: 'Innovative approaches to challenges',
      color: '#4B0082'
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen bg-black py-24 px-6 overflow-hidden">
      {/* Parallax purple gradient orb */}
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #8F5BBD 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Section Title with sparkles */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="text-accent-3" size={28} />
              <h2 className="text-5xl md:text-7xl text-white" style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                About Me
              </h2>
              <Sparkles className="text-accent-2" size={28} />
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

          {/* Glassmorphism bio card */}
          <motion.div 
            variants={itemVariants} 
            className="mb-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-3/10 rounded-3xl blur-xl" />
            <div className="relative p-10 rounded-3xl bg-black/40 backdrop-blur-xl border border-accent-2/20 shadow-2xl shadow-accent/10">
              {/* Decorative corner sparkles */}
              <div className="absolute top-4 right-4">
                <motion.div
                  animate={{
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Star className="text-accent-3" size={20} fill="#A78BFA" />
                </motion.div>
              </div>

              <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  I'm a passionate <span className="text-accent-3 font-semibold">software engineering student</span> with 
                  a drive to build impactful digital experiences. My journey in computer science has equipped me with a 
                  strong foundation in <span className="text-accent-2 font-semibold">algorithms</span>, <span className="text-accent-2 font-semibold">data structures</span>, 
                  and <span className="text-accent-2 font-semibold">full-stack development</span>.
                </p>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  I thrive on turning complex problems into elegant solutions, whether it's crafting intuitive user 
                  interfaces or architecting robust backend systems. Always eager to learn and grow, I'm actively 
                  seeking opportunities to contribute to innovative projects and collaborative teams.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Feature cards with staggered animations */}
          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative p-8 rounded-2xl bg-black/50 backdrop-blur-sm border border-accent-2/20 transition-all duration-500 hover:border-accent-3/50"
                  whileHover={{ 
                    y: -12,
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{
                      background: `radial-gradient(circle at center, ${feature.color}40, transparent 70%)`
                    }}
                  />
                  
                  <div className="relative">
                    <motion.div 
                      className="mb-5 inline-flex p-4 rounded-xl transition-all duration-300"
                      style={{
                        background: `${feature.color}20`,
                        color: feature.color
                      }}
                      whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      <Icon size={36} strokeWidth={2} />
                    </motion.div>
                    
                    <h3 className="text-2xl mb-3 text-white" style={{ fontWeight: 700 }}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Decorative dot */}
                    <motion.div
                      className="absolute top-0 right-0 w-2 h-2 rounded-full"
                      style={{ backgroundColor: feature.color }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}