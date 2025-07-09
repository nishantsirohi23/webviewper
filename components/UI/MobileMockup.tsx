import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const MobileMockupAnimation = () => {
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!phoneRef.current) return; // Null check

      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);

      // Apply transformations
      phoneRef.current.style.transform = `
        rotate(${progress * 30}deg)
        scale(${1.3 + progress * 0.5})
      `;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    

      <div className="h-[150vh] flex items-center justify-center">
        <div 
          ref={phoneRef}
          className="relative border-8 border-black rounded-[40px] h-[500px] w-[250px] overflow-hidden transition-transform duration-100"
        >
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/0aeverioholi%2Fmainscreen.png?alt=media&token=50890b18-b29d-4d5f-9231-d698c5190976"
            alt="Mobile mockup"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
    </>
  );
};

export default MobileMockupAnimation;