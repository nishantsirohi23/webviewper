'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import StyledComponentsRegistry from '../../libs/registry';
import { GlobalStyles } from './GlobalStyles';
import { Footer, Header, Preloader } from '..';
import { useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [complete, setComplete] = useState(false);
  return (
    <StyledComponentsRegistry>
     
        <GlobalStyles />
        <Preloader setComplete={setComplete} />
        <div className={complete ? 'complete' : 'not_complete'}>
          <Header />
          {children}
          <Footer />
        </div>
      
    </StyledComponentsRegistry>
  );
};

export default Layout;
