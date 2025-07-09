'use client';
import Lenis from '@studio-freight/lenis';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Footer,
  FAQ,
  Featured,
  ImageScrollReveal,
  FinancialFuture,
  FinancilaFreedom,
  HeroSection,
  IntroSection,
  JoinSection,
  OffersSection,
  Ready,
  ReviewsSection,
  Whatwedo,
  Header,
  MobileMockupAnimation
} from '@/components';
import { useIsMobile } from '../../libs/useIsMobile';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 100);

    const timeout = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
    }, 3000);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
            style={{ 
              backgroundColor: '#070606'
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* Animated Background Particles - REMOVED */}

            {/* Glowing Orb Background */}
            <motion.div
              className="absolute w-96 h-96 rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
                filter: 'blur(60px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Main Logo Container */}
            <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Logo Text with Individual Letter Animation */}
              <div className="flex items-center mb-8">
                {'PERPENNY'.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-6xl md:text-8xl font-bold text-white"
                    style={{ 
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      textShadow: '0 0 30px rgba(255,255,255,0.5)',
                      letterSpacing: '0.05em'
                    }}
                    initial={{ 
                      y: 50, 
                      opacity: 0,
                      rotateY: 90,
                    }}
                    animate={{ 
                      y: 0, 
                      opacity: 1,
                      rotateY: 0,
                    }}
                    transition={{ 
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: 'easeOut'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      textShadow: '0 0 40px rgba(255,255,255,0.8)'
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>


              {/* Loading Progress Bar */}
              <div className="w-80 h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-white to-blue-200 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>

              {/* Loading Percentage */}
              <motion.p
                className="text-white/60 text-sm mt-4 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {Math.round(loadingProgress)}%
              </motion.p>
            </motion.div>

            {/* Animated Circles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute border-2 border-white/20 rounded-full"
                  style={{
                    width: `${300 + i * 100}px`,
                    height: `${300 + i * 100}px`,
                    left: '50%',
                    top: '50%',
                    marginLeft: `${-(150 + i * 50)}px`,
                    marginTop: `${-(150 + i * 50)}px`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 20 + i * 5,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                    scale: {
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                />
              ))}
            </div>

            {/* Pulse Effect */}
            <motion.div
              className="absolute inset-0 bg-white/5 rounded-full"
              style={{
                width: '200px',
                height: '200px',
                left: '50%',
                top: '50%',
                marginLeft: '-100px',
                marginTop: '-100px',
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Header />
          <HeroSection />
          {isMobile ? <MobileMockupAnimation /> : <ImageScrollReveal />}
          <Whatwedo />
          <Featured />
          <OffersSection />
          <FinancilaFreedom />
          <FinancialFuture />
          <IntroSection />
          <ReviewsSection />
          <FAQ />
          <Ready />
          <Footer />
        </>
      )}
    </>
  );
}