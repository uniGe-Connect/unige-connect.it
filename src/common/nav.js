import React, { useState } from 'react';
import { MenuItem, Menu } from 'semantic-ui-react';

const Nav = () => {
  const [activeItem, setActiveItem] = useState('home');

  return (
    <Menu fluid widths={3} style={{ margin: '40px' }}>
      <MenuItem name='home' active={activeItem === 'home'} onClick={() => setActiveItem('home')}>
        Home
      </MenuItem>

      <MenuItem name='your_groups' active={activeItem === 'your_groups'} onClick={() => setActiveItem('your_groups')}>
        Your groups
      </MenuItem>

      <MenuItem name='IDK' active={activeItem === 'IDK'} onClick={() => setActiveItem('IDK')}>
        IDK
      </MenuItem>
    </Menu>
  );
};

export default Nav;