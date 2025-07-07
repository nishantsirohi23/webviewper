'use client';


import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

// Type definitions
type ImageConfig = {
  url: string;
  size: string | { width: string; height: string };
  position?: {
    angle: number;
    radius: string;
  };
  delay?: number;
};

type WindowSize = {
  width: number;
  height: number;
};

// Styled components
const MainContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const InitialView = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
  background-color: #070606;
  padding-left: 10%;

  @media (max-width: 768px) {
    padding-left: 5%;
  }
`;

const TextContent = styled.div`
  width: 50%;
  text-align: left;
  margin-bottom: 2rem;
  max-width: 600px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  opacity: 0;
  text-align: left;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: #aaaaaa;
  line-height: 1.5;
  margin-top: 1rem;
  text-align: left;
`;

const PhoneImage = styled.img`
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  width: 20vw;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
  opacity: 0;
  z-index: 15;
  margin-right: 5%;

  @media (max-width: 768px) {
    width: 30vw;
    right: 5%;
    margin-right: 2%;
  }
`;

const ScrollPrompt = styled.p`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: #aaaaaa;
  opacity: 0;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
`;

const SplitScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(223, 17, 17, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RotatedImage = styled.img`
  height: 70vh;
  max-width: 90%;
  object-fit: cover;
  border-radius: 15px;
  position: absolute;
  left: 0%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  z-index: 20;
  will-change: transform, opacity;

  @media (max-width: 768px) {
    height: 50vh;
  }
`;

const Description = styled.div`
  width: clamp(300px, 40%, 600px);
  padding: 2rem;
  opacity: 0;
  transform: translateX(25%);
  z-index: 10;
  will-change: transform, opacity;
  background-color: rgba(30,30,30,0.7);
  border-radius: 15px;
  backdrop-filter: blur(5px);
  margin: 0 20px 0 10vh;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DescriptionTitle = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const DescriptionText = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.6;
  color: #dddddd;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(18,18,18,0.9);
`;

const SmallImage = styled.img`
  position: absolute;
  object-fit: cover;
  border-radius: 14px;
  opacity: 0;
  z-index: 15;
  will-change: transform, opacity;
  box-shadow: 0 5px 15px rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.1);
`;

const PhaseImage = styled.img`
  position: absolute;
  object-fit: cover;
  border-radius: 8px;
  z-index: 15;
  will-change: transform, opacity;
  filter: brightness(1);
  transition: all 0.3s ease-out;
`;

const ImageScrollReveal: React.FC = () => {
  // Refs for all elements
  const containerRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const bigImageRef = useRef<HTMLImageElement>(null);
  const smallImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptiontextRef = useRef<HTMLParagraphElement>(null);
  const scrollPromptRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const phoneImageRef = useRef<HTMLImageElement>(null);
  const phase1TopImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const phase1BottomImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const phase2TopImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const phase2BottomImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  
  // State
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Helper function to parse values
  const parseValue = (value: string | number, vw: number, vh: number): number => {
    if (typeof value === 'number') return value;
    if (value.endsWith('vw')) return parseFloat(value) * vw / 100;
    if (value.endsWith('vh')) return parseFloat(value) * vh / 100;
    if (value.endsWith('px')) return parseFloat(value);
    return parseFloat(value);
  };

  // Image configurations
  const phaseImagesTopConfig: ImageConfig[] = [];

  const phaseImagesBottomConfig: ImageConfig[] = [];

  const smallImagesConfig: ImageConfig[] = [
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FTutions%20Instagram%20Post%20in%20Light%20Pink%20Blue%20Bold%20Style%20.png?alt=media&token=27bc5075-782a-4a97-94c3-d22f8ae976b2',
      size: { 
        width: 'clamp(10px, 15vw, 400px)', 
        height: 'clamp(10px, 27vh, 400px)' 
      },
      position: { 
        angle: 0, 
        radius: 'clamp(150px, 19vw, 360px)' 
      },
      delay: 0.0
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FSimulator%20Screenshot%20-%20iPhone%2016e%20-%202025-07-01%20at%2015.36.58.png?alt=media&token=bf630cb9-cf58-4e6e-bafb-44b14207c1b6',
      size: { 
        width: 'clamp(20px, 29vw, 400px)', 
        height: 'clamp(20px,8vw, 400px)' 
      },
      position: { 
        angle: 30, 
        radius: 'clamp(20px, 22vw, 450px)' 
      },
      delay: 0.03
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FUntitled%20(700%20x%20200%20px).png?alt=media&token=3e9c4d6d-d0f8-4d2e-a2e8-4adc0c9e5bf8',
      size: { 
        width: 'clamp(40px, 30vw, 400px)', 
        height: 'clamp(40px, 20vh, 200px)' 
      },
      position: { 
        angle: 40, 
        radius: 'clamp(150px, 35vw, 350px)' 
      },
      delay: 0.07
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FSimulator%20Screenshot%20-%20iPhone%2016e%20-%202025-07-01%20at%2012.47.18.png?alt=media&token=5b6b81b6-6179-4e19-a4a7-b0a730f3ad8f',
      size: { 
        width: 'clamp(180px, 22vw, 260px)', 
        height: 'clamp(120px, 12vh, 200px)' 
      },
      position: { 
        angle: 90, 
        radius: 'clamp(140px, 22vw, 320px)' 
      },
      delay: 0.14
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FScreenshot%202025-07-01%20at%201.51.37%E2%80%AFPM.png?alt=media&token=860256ad-2340-46b2-86e1-8fb4f32493ce',
      size: { 
        width: 'clamp(40px, 23vw, 400px)', 
        height: 'clamp(40px, 25vh, 200px)' 
      },
      position: { 
        angle: 142, 
        radius: 'clamp(180px, 33vw, 420px)' 
      },
      delay: 0.21
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FSimulator%20Screenshot%20-%20iphone%2016%20pro%20max%20-%202025-07-08%20at%2002.20.53.png?alt=media&token=a44f8417-3ab3-4a80-af4f-814e5263075a',
      size: { 
        width: 'clamp(40px, 23vw, 400px)', 
        height: 'clamp(40px, 25vh, 200px)' 
      },
      position: { 
        angle: 170, 
        radius: 'clamp(120px, 31vw, 280px)' 
      },
      delay: 0.28
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FKids%20Yoga%20SEL%20Ice%20Breaker%20Presentation.png?alt=media&token=bfb3a1c8-514a-4bee-8704-24f9040ad19d',
      size: { 
        width: 'clamp(180px, 22vw, 260px)', 
        height: 'clamp(120px, 18vh, 200px)' 
      },
      position: { 
        angle: 210, 
        radius: 'clamp(120px, 22vw, 280px)' 
      },
      delay: 0.28
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FSimulator%20Screenshot%20-%20iPhone%2016e%20-%202025-07-01%20at%2013.34.51.png?alt=media&token=7fc0afc0-78dd-431f-96d3-30739c1465f6',
      size: { 
        width: 'clamp(40px, 28vw, 400px)', 
        height: 'clamp(40px, 19vh, 200px)' 
      },
      position: { 
        angle: 220, 
        radius: 'clamp(180px, 33vw, 420px)' 
      },
      delay: 0.21
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FScreenshot%202025-07-01%20at%203.57.05%E2%80%AFPM.png?alt=media&token=481c147c-7e1b-4084-9921-5aa5b2ebe07e',
      size: { 
        width: 'clamp(140px, 21vw, 400px)', 
        height: 'clamp(150px, 20vh, 240px)' 
      },
      position: { 
        angle: 270, 
        radius: 'clamp(160px, 20vw, 380px)' 
      },
      delay: 0.42
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FSimulator%20Screenshot%20-%20iPhone%2016e%20-%202025-07-01%20at%2012.47.06.png?alt=media&token=14a6c477-46b9-4aec-9dd6-0e04f5f3f367',
      size: { 
        width: 'clamp(10px, 25vw, 400px)', 
        height: 'clamp(10px, 15vh, 400px)' 
      },
      position: { 
        angle: 330, 
        radius: 'clamp(150px, 34vw, 360px)' 
      },
      delay: 0.49
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FSimulator%20Screenshot%20-%20iPhone%2016e%20-%202025-07-01%20at%2015.44.42.png?alt=media&token=c82f7da5-ca7f-4fe4-aa70-89db2d4160f8',
      size: { 
        width: 'clamp(200px, 25vw, 300px)', 
        height: 'clamp(200px, 25vw, 300px)' 
      },
      position: { 
        angle: 360, 
        radius: 'clamp(20px, 40vw, 450px)' 
      },
      delay: 0.49
    },
  ];

  // Effect for mobile detection
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Effect for window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate radius with proper typing
  const calculateRadius = (radiusValue: string | number): number => {
    return parseValue(
      typeof radiusValue === 'string' ? 
        radiusValue.replace(/clamp\(([^,]+),\s*([^,]+),\s*([^)]+)\)/, '$2') : 
        radiusValue.toString(),
      windowSize.width,
      windowSize.height
    );
  };

  // Main animation effect
  useEffect(() => {
    if (!smallImagesRef.current.length) return;

    // Initial setup
    if (titleRef.current) gsap.set(titleRef.current, { opacity: 1, y: 0 });
    if (descriptiontextRef.current) gsap.set(descriptiontextRef.current, { opacity: 1, y: 0 });
    if (scrollPromptRef.current) gsap.set(scrollPromptRef.current, { opacity: 1, y: 0 });
    if (phoneImageRef.current) gsap.set(phoneImageRef.current, { opacity: 1, scale: 1, rotate: 0 });
    if (bigImageRef.current) gsap.set(bigImageRef.current, { 
      opacity: 0, rotation: 90, scale: 0.8, xPercent: -50, yPercent: -50 
    });
    if (descriptionRef.current) gsap.set(descriptionRef.current, { opacity: 0, x: 100 });
    
    smallImagesRef.current.forEach(img => img && gsap.set(img, { opacity: 0, scale: 0.3 }));
    
    // Set initial state for phase images
    [...phase1TopImagesRef.current, ...phase1BottomImagesRef.current, 
     ...phase2TopImagesRef.current, ...phase2BottomImagesRef.current]
      .forEach(img => img && gsap.set(img, { opacity: 0, scale: 0.5 }));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainerRef.current,
        start: "top top",
        end: "+=800%",
        scrub: 1,
        pin: true,
        onUpdate: self => {
            setScrollProgress(self.progress);
            // Hide phone after it fades out (when progress > 0.5)
            if (phoneImageRef.current) {
              if (self.progress > 0.5) {
                gsap.set(phoneImageRef.current, { visibility: 'hidden' });
              } else {
                gsap.set(phoneImageRef.current, { visibility: 'visible' });
              }
            }
          },
        markers: false
      }
    });

    // PHASE 0: Phone image animation
    if (phoneImageRef.current) {
      tl.to(phoneImageRef.current, {
        opacity: 1,
        scale: 1.2,
        rotate: 10,
        duration: 0.5
      }, 0)
      
      tl.to(phoneImageRef.current, {
        opacity: 0,
        duration: 1
      }, 0.5);
    }

    if (titleRef.current) {
      tl.to(titleRef.current, { opacity: 0, y: -50, duration: 0.5 }, 0.5);
    }

    if (scrollPromptRef.current) {
      tl.to(scrollPromptRef.current, { opacity: 0, y: 50, duration: 0.5 }, 0.5);
    }

    if (descriptiontextRef.current) {
      tl.to(descriptiontextRef.current, { opacity: 0, y: -50, duration: 0.5 }, 0.5);
    }

    // PHASE 1: Title section with images
  

    // PHASE 2: Split screen with description
    if (bigImageRef.current) {
      tl.to(bigImageRef.current, { 
        opacity: 1,
        left: '25%',
        duration: 1 
      }, 0.0);
    }

    if (descriptionRef.current) {
      tl.to(descriptionRef.current, { 
        opacity: 1,
        x: '25%',
        duration: 1 
      }, 0.0);
    }

    // Show phase 2 top images
    phase2TopImagesRef.current.forEach((img, index) => {
      if (img) {
        tl.to(img, {
          opacity: 0.7,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        }, 0.2 + (0.1 * index));
      }
    });

    // Show phase 2 bottom images
    phase2BottomImagesRef.current.forEach((img, index) => {
      if (img) {
        tl.to(img, {
          opacity: 0.7,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        }, 0.35 + (0.1 * index));
      }
    });

    // Transition out of phase 2
    if (descriptionRef.current) {
      tl.to(descriptionRef.current, {
        opacity: 0,
        x: '100%',
        duration: 0.8
      }, 1.0);
    }

    if (bigImageRef.current) {
      tl.to(bigImageRef.current, {
        left: '50%',
        duration: 1.2,
        ease: "power2.inOut"
      }, 1.2)
      .to(bigImageRef.current, {
        rotation: 0,
        duration: 1,
        ease: "power2.inOut"
      }, 2.4);
    }

    // Hide phase 2 images
    [...phase2TopImagesRef.current, ...phase2BottomImagesRef.current].forEach((img, index) => {
      if (img) {
        tl.to(img, {
          opacity: 0,
          scale: 0.5,
          duration: 0.3
        }, 1.0 + (0.05 * index));
      }
    });

    // PHASE 3: Final small images animation
    smallImagesRef.current.forEach((img, index) => {
      const config = smallImagesConfig[index];
      if (!config || !img || !config.position) return;
      
      const angle = config.position.angle * (Math.PI / 180);
      const radius = calculateRadius(config.position.radius);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      tl.to(img, {
        opacity: 1,
        scale: 0.8,
        x: x,
        y: y,
        duration: 3,
      }, 3.5 + (config.delay || 0));
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, [windowSize]);

  return (
    <MainContainer ref={mainContainerRef}>
      {/* Initial View */}
      <InitialView>
       

      </InitialView>

      {/* Split Screen View */}
      <SplitScreen>
        <RotatedImage
          ref={bigImageRef}
          src="https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/0aeverioholi%2Fmainscreen.png?alt=media&token=50890b18-b29d-4d5f-9231-d698c5190976"
          alt="Main"
        />
        
        {phaseImagesTopConfig.map((imgConfig, index) => {
          const totalImages = phaseImagesTopConfig.length;
          const edgePadding = 5;
          
          // Different bottom values for each image
          const bottomValues = ['15%', '10%', '5%', '12%', '10%'];
          const bottomPercentage = bottomValues[index] || '10%';
          
          const leftPosition = totalImages > 1
            ? `${edgePadding + ((100 - edgePadding * 2) / (totalImages - 1)) * index}%`
            : '50%';

          return (
            <PhaseImage
              key={`phase2-top-${index}`}
              ref={el => { phase2TopImagesRef.current[index] = el; }}
              src={imgConfig.url}
              alt={`Service ${index + 4}`}
              style={{
                width: imgConfig.size as string,
                height: imgConfig.size as string,
                top: bottomPercentage,
                left: leftPosition,
                transform: 'translateX(-50%)',
                opacity: 0,
              }}
            />
          );
        })}

        {/* Bottom Images */}
        {phaseImagesBottomConfig.map((imgConfig, index) => {
          const totalImages = phaseImagesBottomConfig.length;
          const edgePadding = 5;
          
          // Different bottom values for each image
          const bottomValues = ['10%', '2%', '3%', '0%', '17%'];
          const bottomPercentage = bottomValues[index] || '10%';
          
          const leftPosition = totalImages > 1
            ? `${edgePadding + ((100 - edgePadding * 2) / (totalImages - 1)) * index}%`
            : '50%';

          return (
            <PhaseImage
              key={`phase2-bottom-${index}`}
              ref={el => { phase2BottomImagesRef.current[index] = el; }}
              src={imgConfig.url}
              alt={`Service ${index + 4}`}
              style={{
                width: imgConfig.size as string,
                height: imgConfig.size as string,
                bottom: bottomPercentage,
                left: leftPosition,
                transform: 'translateX(-50%)',
                opacity: 0,
              }}
            />
          );
        })}
        
        <Description
          ref={descriptionRef}
        >
          <DescriptionTitle>Our Services</DescriptionTitle>
          <DescriptionText>
            Discover a wide range of services designed to meet all your needs in one place.
            From professional consultations to hands-on solutions, we've got you covered.
          </DescriptionText>
        </Description>
      </SplitScreen>

      {/* Final Image View */}
      <ImageContainer ref={containerRef}>
        {smallImagesConfig.map((imgConfig, index) => (
          <SmallImage
            key={index}
            ref={el => { smallImagesRef.current[index] = el; }}
            src={imgConfig.url}
            alt={`Service ${index + 1}`}
            style={{
              width: typeof imgConfig.size === 'object' ? imgConfig.size.width : '',
              height: typeof imgConfig.size === 'object' ? imgConfig.size.height : '',
            }}
          />
        ))}
      </ImageContainer>
    </MainContainer>
  );
};

export default ImageScrollReveal;