import React from 'react';
import Header from './Header';

interface ILayout {
  children: JSX.Element
}

const Layout = ({ children }: ILayout) => {
  return (
    <div>
      <Header/>
      {children}
    </div>
  );
};

export default Layout;
