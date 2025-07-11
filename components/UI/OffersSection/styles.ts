'use client';
import { styled } from 'styled-components';
import grid_background from '../../../public/images/offer_card_grid_1.png';

export const Wrapper = styled.section``;

export const Inner = styled.div`
  max-width: 1440px;
  width: 90%;
  margin: 12.38rem auto 0;

  @media (max-width: 768px) {
    margin-top: 6.44rem;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  max-width: 56rem;
  margin: 0 auto 6.75rem;

  h1 {
    font-size: 4.75rem;
    font-weight: 400;
  }

  p {
    max-width: 41.75rem;
    color: #989898;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.75rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.25rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
`;

export const ImageCtn = styled.div`
  margin: 3rem auto 0;
  position: relative;
  display: flex;
  width: 100%;
  height: 300px;
  overflow: hidden;

  &::after {
    position: absolute;
    content: '';
    height: 13.4375rem;
    width: 100%;
    left: 0;
    top: 50px;
  }

  img {
    object-fit: contain;
  }

  @media (max-width: 768px) {
    height: 200px;
    margin-top: 1.5rem;
  }
`;

export const TextCtn = styled.div`
  padding: 2.5rem;
  padding-top: 3.25rem;
  max-width: 32.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: auto;

  h2 {
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.75rem;
  }

  p {
    color: var(--link-color);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    h2 {
      font-size: 1.5rem;
    }
    p {
      font-size: 0.95rem;
    }
  }
`;

export const Offers = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  &:last-child {
    margin-top: 2rem;

    div:first-child {
      flex: 1;

      ${ImageCtn} {
        margin-top: 5.7rem;
        flex: 2;
      }

      ${TextCtn} {
        height: 1em;
        flex: 1;
      }
    }

    div:last-child {
      flex: 2;

      ${ImageCtn} {
        margin-top: 5.7rem;
        flex: 2;
        margin-left: auto;
      }

      ${TextCtn} {
        height: 1em;
        flex: 1;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;

    &:last-child {
      margin-top: 2rem;

      div:first-child,
      div:last-child {
        flex: unset;
        width: 100%;
        
        ${ImageCtn} {
          height: 200px;
          margin-top: 1.5rem;
          width: 100%;
          margin-left: 0;
          flex: none;
        }

        ${TextCtn} {
          margin-top: 1rem;
          height: auto;
          padding: 1.5rem;
        }
      }
    }
  }
`;

export const OfferCard = styled.div`
  overflow: hidden;
  height: 31.25rem;
  border-radius: 0.75rem;
  border: 1px solid var(--stroke, rgba(255, 255, 255, 0.04));
  display: flex;
  flex-direction: column;
  background: url(${grid_background.src}) #131313 no-repeat;

  &:first-child {
    flex: 2;
  }

  &:nth-child(2) {
    flex: 1;

    ${ImageCtn} {
      margin-left: 2.5rem;
      width: calc(100% - 2.5rem);
    }
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 420px;

    &:first-child,
    &:nth-child(2) {
      flex: unset;
      width: 100%;
    }

    &:nth-child(2) ${ImageCtn} {
      margin-left: 0;
      width: 100%;
    }
  }
`;

