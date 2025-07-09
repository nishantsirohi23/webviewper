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
import { useIsMobile } from '../../libs/useIsMobile'; // adjust path if needed

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile(); // using your existing hook

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const timeout = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
    }, 2000); // matches loader duration

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backgroundColor: '#000' }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          >
            <motion.h1
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: 200, opacity: 0 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="text-white text-5xl font-semibold"
            >
              Perpenny
            </motion.h1>
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
