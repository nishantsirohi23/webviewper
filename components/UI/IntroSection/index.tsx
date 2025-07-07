'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Edge, Edges, Title } from '../FinancialFreedom/styles';
import lola_card from '../../../public/whatwedoImg1.png';
import orange_card from '../../../public/images/orange_card.png';
import terry_card from '../../../public/images/terry_card.png';
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
import {
  desktopHeaderPhrase,
  desktopParagraphPhrase,
  edges,
  mobileHeaderPhrase,
  mobileParagraphPhrase,
} from './constants';

const IntroSection = () => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <Wrapper>
      <Inner>
        <Header>
          <h3>Introducing</h3>
          <HeaderMainText>
            {isMobile ? (
              <>
                <MaskText phrases={mobileHeaderPhrase} tag="h1" />
                <MaskText phrases={mobileParagraphPhrase} tag="p" />
              </>
            ) : (
              <>
                <MaskText phrases={desktopHeaderPhrase} tag="h1" />
                <MaskText phrases={desktopParagraphPhrase} tag="p" />
              </>
            )}
          </HeaderMainText>
        </Header>
        <CardsContainer>
         
          <MiddleImage
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            src={lola_card}
            alt="blue card"
          />
          
        </CardsContainer>
        <Edges>
          {edges.map((edge, i) => (
            <Edge key={i}>
              <Title>
                <Image src={edge.icon} alt="icon" />
                <MaskText phrases={new Array(edge.point)} tag="h3" />
              </Title>
              <MaskText phrases={new Array(edge.details)} tag="p" />
            </Edge>
          ))}
        </Edges>
      </Inner>
    </Wrapper>
  );
};

export default IntroSection;
