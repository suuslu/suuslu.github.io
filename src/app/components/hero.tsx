import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { User } from 'lucide-react';

export function Hero() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number }>>([]);
  const [matrixChars, setMatrixChars] = useState<Array<{ id: number; x: number; char: string; delay: number }>>([]);

  useEffect(() => {
    // Floating particles
    const particleArray = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * 3 + 1
    }));
    setParticles(particleArray);

    // Matrix code characters
    const chars = '01アイウエオカキクケコ</>{}[]';
    const matrixArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (i * 5) % 100,
      char: chars[Math.floor(Math.random() * chars.length)],
      delay: Math.random() * 2
    }));
    setMatrixChars(matrixArray);
  }, []);

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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Nebula purple glow background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(75, 0, 130, 0.4) 0%, rgba(143, 91, 189, 0.2) 30%, transparent 70%)',
            filter: 'blur(80px)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.3) 0%, rgba(143, 91, 189, 0.15) 40%, transparent 70%)',
            filter: 'blur(70px)'
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Matrix code rain effect */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        {matrixChars.map((item) => (
          <motion.div
            key={item.id}
            className="absolute text-accent-2 font-mono"
            style={{
              left: `${item.x}%`,
              top: -20,
              fontSize: '14px'
            }}
            animate={{
              y: ['0vh', '110vh'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: item.delay,
              ease: "linear"
            }}
          >
            {item.char}
          </motion.div>
        ))}
      </div>

      {/* Floating geometric particles and sparkles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: particle.id % 3 === 0 
              ? '#A78BFA' 
              : particle.id % 3 === 1 
              ? '#8F5BBD' 
              : '#4B0082',
            boxShadow: `0 0 ${particle.size * 3}px ${particle.id % 3 === 0 ? '#A78BFA' : '#8F5BBD'}`
          }}
          animate={{
            y: [0, -40 - particle.size * 5, 0],
            x: [0, Math.sin(particle.id) * 20, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Circular photo section with animated halo */}
        <motion.div
          className="relative mb-12 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Dynamic pulsing glow layers */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(75, 0, 130, 0.6) 0%, rgba(143, 91, 189, 0.3) 50%, transparent 70%)',
              filter: 'blur(30px)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(167, 139, 250, 0.5) 0%, rgba(143, 91, 189, 0.2) 60%, transparent 80%)',
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />

          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(75, 0, 130, 0.7) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          {/* Photo container */}
          <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-accent-2/50 shadow-2xl">
            <div className="w-full h-full bg-gradient-to-br from-accent-2/30 to-accent-3/30 backdrop-blur-sm flex items-center justify-center">
              <User size={80} className="text-accent-3" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>

        <motion.h1 
          className="text-6xl md:text-8xl mb-4 text-white"
          style={{ fontWeight: 800, letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          Ayşe Su Uslu
        </motion.h1>
        
        <motion.div
          className="inline-block mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="px-6 py-2 rounded-full bg-accent/10 border border-accent-2/30 backdrop-blur-sm">
            <p className="text-xl md:text-2xl text-accent-3" style={{ fontWeight: 600 }}>
              Software Engineering Student
            </p>
          </div>
        </motion.div>

        <motion.p 
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        >
          Building the future one line of code at a time
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        >
          <a
            href="#about"
            className="group relative px-8 py-4 bg-accent text-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
            style={{ fontWeight: 600 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-2 to-accent-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              About Me
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-accent-2/50" />
          </a>

          <a
            href="#contact"
            className="px-8 py-4 border-2 border-accent-2 text-accent-3 rounded-xl transition-all duration-300 hover:bg-accent-2/10 hover:border-accent-3 hover:scale-105"
            style={{ fontWeight: 600 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-12 border-2 border-accent-3 rounded-full flex items-start justify-center p-2">
          <motion.div 
            className="w-1.5 h-1.5 bg-accent-3 rounded-full shadow-lg shadow-accent-3/50"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
