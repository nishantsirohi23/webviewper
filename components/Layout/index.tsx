'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import StyledComponentsRegistry from '../../libs/registry';
import { GlobalStyles } from './GlobalStyles';
import { useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [complete, setComplete] = useState(false);
  return (
    <StyledComponentsRegistry>
     
        <GlobalStyles />
       
        <div className={complete ? 'complete' : 'not_complete'}>
          
          {children}
          
        </div>
      
    </StyledComponentsRegistry>
  );
};

export default Layout;
