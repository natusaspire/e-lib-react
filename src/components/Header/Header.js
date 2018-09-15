import React from 'react';

import Logo from '@/components/Logo';
import Navbar from '@/components/Navbar';

const Header = () => (
  <div className="header">
    <div className="header__container header__body">
      <Logo />
      <Navbar />
    </div>
  </div>
);

export default Header;
