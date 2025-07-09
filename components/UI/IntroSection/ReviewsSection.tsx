'use client';

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { styled } from 'styled-components';
import {
    Wrapper,
    Inner,
    Header,
    HeaderMainText,
    CardsContainer,
    LeftImage,
    MiddleImage,
    RightImage,
  } from './styles';
  import { MaskText } from '@/components';
  
import { useIsMobile } from '../../../libs/useIsMobile';
interface Review {
  name: string;
  date: string;
  avatar: string;
  text: string;
}

interface ColumnScrollerProps {
  reverse?: boolean;
  reviews: Review[];
  isMobile: boolean;
  columnWidth: string;
}

interface ScreenSize {
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isLargeScreen: boolean;
}

const reviewsColumn1 = [
    {
      name: "Anjali Mehra",
      date: "2024-09-15",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
      text: "Booked bathroom cleaning and it was spotless! Totally worth it.",
    },
    {
      name: "Rohit Sharma",
      date: "2024-11-02",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit",
      text: "Excellent deep cleaning service. The bathroom looks brand new!",
    },
    {
      name: "Sakshi Verma",
      date: "2025-01-28",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sakshi",
      text: "Very professional and thorough work. Highly recommended!",
    },
    {
      name: "Vikas Patel",
      date: "2025-02-14",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikas",
      text: "Booked for parents' home. They were really happy with the results.",
    },
    {
      name: "Meena Joshi",
      date: "2025-03-21",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meena",
      text: "Prompt service and polite staff. Bathroom is sparkling!",
    },
    {
      name: "Nitesh Bansal",
      date: "2025-04-10",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nitesh",
      text: "Used their service for a rental flat. Very satisfied!",
    },
    {
      name: "Pooja Agarwal",
      date: "2025-06-12",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja",
      text: "Cleaned every corner. Feels hygienic now!",
    },
  ];
  const reviewsColumn2 = [
    {
      name: "Aman Kapoor",
      date: "2024-08-18",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aman",
      text: "Got our living room redesigned. The team did a great job!",
    },
    {
      name: "Shruti Nair",
      date: "2024-10-25",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shruti",
      text: "Beautiful interior work for our 2BHK. Very aesthetic.",
    },
    {
      name: "Ramesh Yadav",
      date: "2025-01-02",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh",
      text: "Affordable and timely renovation work. Looks fresh now!",
    },
    {
      name: "Neha Jain",
      date: "2025-02-20",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha",
      text: "Really happy with the color suggestions for wall painting.",
    },
    {
      name: "Kunal Dubey",
      date: "2025-04-01",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kunal",
      text: "Team was polite, punctual and creative. Loved the makeover!",
    },
    {
      name: "Priyanka Sinha",
      date: "2025-05-05",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priyanka",
      text: "Best design experience ever! My kitchen feels so premium now.",
    },
    {
      name: "Harshil Ghosh",
      date: "2025-06-20",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harshil",
      text: "They turned our small space into something elegant!",
    },
  ];
  const reviewsColumn3 = [
    {
      name: "Divya Rathi",
      date: "2024-07-10",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Divya",
      text: "Booked a tutor for my daughter’s 10th class. Very effective!",
    },
    {
      name: "Tarun Shetty",
      date: "2024-09-01",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tarun",
      text: "The moving team packed everything neatly and safely.",
    },
    {
      name: "Ishita Khanna",
      date: "2025-01-18",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ishita",
      text: "Home tuition was a blessing during board exams. Great teacher!",
    },
    {
      name: "Arjun Malhotra",
      date: "2025-02-05",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
      text: "Shifting from Delhi to Noida made easy with PerPenny.",
    },
    {
      name: "Sneha D’Souza",
      date: "2025-03-12",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
      text: "Found a wonderful tutor for spoken English. Very engaging.",
    },
    {
      name: "Ritik Raj",
      date: "2025-05-08",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ritik",
      text: "The movers were careful and quick. Would recommend.",
    },
    {
      name: "Mehul Shah",
      date: "2025-06-26",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mehul",
      text: "Used both tuition and movers service. Happy with both!",
    },
  ];

// Styled components
const TickerContainer = styled.section`
  background: #070606;
  min-height: 80vh;
  height: 160vh;
  display: flex;
  flex-direction: column;
  padding-top: 7.5rem;

  @media (max-width: 768px) {
    height: 100vh;
  }
`;


const HeaderContent = styled.div`
  text-align: center;
  padding: 40px 20px 20px;
  color: white;
`;

const Headline = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 15px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TickerWrapperVertical = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  overflow: hidden;
  flex: 1;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 15px;
    gap: 15px;
  }
`;

const ScrollingColumn = styled.div<{ $isMobile: boolean; $columnWidth: string }>`
  overflow: hidden;
  height: 100vh;
  width: ${props => props.$columnWidth};
  position: relative;
  min-width: 0;
  mask-image: linear-gradient(
    to bottom, 
    transparent 0%, 
    black 10%, 
    black 90%, 
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom, 
    transparent 0%, 
    black 10%, 
    black 90%, 
    transparent 100%
  );

  ${props => props.$isMobile && `
    height: 60vh;
    width: 100%;
    mask-image: none;
    -webkit-mask-image: none;
  `}

  @media (max-width: 1024px) {
    height: 300px;
  }

  box-shadow: 
    0 -15px 15px rgba(0, 0, 0, 0.8), /* Top shadow */
    0 15px 15px rgba(0, 0, 0, 0.8);  /* Bottom shadow */
`;

const ScrollingTrack = styled.div`
  display: flex;
  flex-direction: column;
  height: max-content;
  will-change: transform;
  box-shadow: 
    0 0 15px rgba(0,0,0,0.8),
    0 0 30px rgba(0,0,0,0.5);
  position: relative;
`;

const ReviewCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: #111;
  color: #fff;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 16px;
  min-height: 180px;
  width: 100%;
  border: 1px solid #333;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.00);
    &::before {
      content: '';
      position: absolute;
      bottom: -80px;
      right: 0px;
      width: 200px;
      height: 200px;
      background: radial-gradient(
        circle at bottom right,
        #ff00aa 0%,
        #ffee00 50%,
        #00ff88 100%
      );
      filter: blur(30px);
      z-index: 0;
      border-radius: 50%;
      opacity: 0.7;
    }
  }

  /* Content stays above */
  & > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 1024px) {
    padding: 15px;
    margin-bottom: 20px;
  }
`;




const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
`;

const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewName = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
`;

const ReviewDate = styled.div`
  font-size: 0.8rem;
  color: #aaa;
  margin-bottom: 10px;
`;

const ReviewText = styled.div`
  font-size: 1rem;
  line-height: 1.4;
`;

const MobileControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
`;

const NavButton = styled.button`
  background: #333;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #555;
  }
`;

const Indicators = styled.div`
  display: flex;
  gap: 10px;
`;

const Indicator = styled.div<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$active ? '#fff' : '#333'};
  cursor: pointer;
  transition: background 0.3s;
`;

const ColumnScroller: React.FC<ColumnScrollerProps> = ({ reverse = false, reviews, isMobile, columnWidth }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    if (isMobile || !trackRef.current) return;

    const track = trackRef.current;
    const cards = track.querySelectorAll<HTMLDivElement>('[data-review-card]');
    const cardHeight = cards[0]?.offsetHeight + 30 || 0;
    
    if (reverse) {
      gsap.set(track, { y: -cardHeight * reviews.length });
    }

    const tween = gsap.to(track, {
      y: reverse ? 0 : -cardHeight * reviews.length,
      ease: "none",
      duration: 40,
      repeat: -1,
    });

    const pause = () => gsap.to(tween, { timeScale: 0 });
    const resume = () => gsap.to(tween, { timeScale: 1 });

    cards.forEach((card) => {
      card.addEventListener("mouseenter", pause);
      card.addEventListener("mouseleave", resume);
    });

    return () => {
      tween.kill();
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", pause);
        card.removeEventListener("mouseleave", resume);
      });
    };
  }, [reverse, isMobile, reviews.length]);

  return (
    <ScrollingColumn $isMobile={isMobile} $columnWidth={columnWidth}>
      <ScrollingTrack ref={trackRef}>
        {isMobile ? (
          reviews.map((review, index) => (
            <ReviewCard key={`m-${index}`} data-review-card>
              <Avatar src={review.avatar} alt={review.name} />
              <ReviewContent>
                <ReviewName>{review.name}</ReviewName>
                <ReviewDate>{review.date}</ReviewDate>
                <ReviewText>{review.text}</ReviewText>
              </ReviewContent>
            </ReviewCard>
          ))
        ) : (
          [...reviews, ...reviews].map((review, index) => (
            <ReviewCard key={`${reverse ? "r" : ""}-${index}`} data-review-card>
              <Avatar src={review.avatar} alt={review.name} />
              <ReviewContent>
                <ReviewName>{review.name}</ReviewName>
                <ReviewDate>{review.date}</ReviewDate>
                <ReviewText>{review.text}</ReviewText>
              </ReviewContent>
            </ReviewCard>
          ))
        )}
      </ScrollingTrack>
    </ScrollingColumn>
  );
};

const ReviewsSection: React.FC = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isLargeScreen: true
  });
   const desktopHeaderPhrase = ["Not lies,", 'Just real experiences'];
    const mobileHeaderPhrase = ["Not lies,", 'Just real experiences'];


  const [activeIndex, setActiveIndex] = useState<number>(0);


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isLaptop: width >= 1024 && width < 1440,
        isLargeScreen: width >= 1440
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getColumnCount = (): number => {
    if (screenSize.isMobile) return 1;
    if (screenSize.isTablet) return 3;
    if (screenSize.isLaptop) return 4;
    return 5;
  };

  const getColumnWidth = (): string => {
    const count = getColumnCount();
    return `${100 / count}%`;
  };

  const handlePrev = (): void => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : reviewsColumn1.length - 1));
  };

  const handleNext = (): void => {
    setActiveIndex((prev) => (prev < reviewsColumn1.length - 1 ? prev + 1 : 0));
  };

  const renderColumns = (): JSX.Element[] => {
    const columnCount = getColumnCount();
    const allReviews: Review[][] = [
      reviewsColumn1,
      reviewsColumn2,
      reviewsColumn3,
      [...reviewsColumn1].reverse(),
      [...reviewsColumn2].reverse()
    ];

    return Array.from({ length: columnCount }).map((_, i) => (
      <ColumnScroller
        key={`col-${i}`}
        reverse={i % 2 === 0}
        reviews={allReviews[i % allReviews.length]}
        isMobile={false}
        columnWidth={getColumnWidth()}
      />
    ));
  };

  return (
    <TickerContainer>
      <Header>
          <h3>Reviews</h3>
          <HeaderMainText>
            {screenSize.isMobile ? (
              <>
                <MaskText phrases={mobileHeaderPhrase} tag="h1" />
               
              </>
            ) : (
              <>
                <MaskText phrases={desktopHeaderPhrase} tag="h1" />
               
              </>
            )}
          </HeaderMainText>
        </Header>

      <TickerWrapperVertical>
        {screenSize.isMobile ? (
          <>
            <ColumnScroller 
              reviews={[reviewsColumn1[activeIndex]]} 
              isMobile={true} 
              columnWidth="100%"
            />
            <MobileControls>
              <NavButton onClick={handlePrev}>←</NavButton>
              <Indicators>
                {reviewsColumn1.map((_, index) => (
                  <Indicator 
                    key={`indicator-${index}`}
                    $active={index === activeIndex}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </Indicators>
              <NavButton onClick={handleNext}>→</NavButton>
            </MobileControls>
          </>
        ) : (
          renderColumns()
        )}
      </TickerWrapperVertical>
    </TickerContainer>
  );
};

export default ReviewsSection;