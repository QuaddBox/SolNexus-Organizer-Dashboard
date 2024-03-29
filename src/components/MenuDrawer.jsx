import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Drawer, UnstyledButton } from '@mantine/core';
import Logo from './Logo';
import { CgMenuGridO } from "react-icons/cg";
import '../assets/styles/menuDrawer.scss'
import { NavLink } from 'react-router-dom';

const MenuDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
       <Drawer.Root opened={opened} onClose={close}>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <Logo />
            </Drawer.Title>
            
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>
            <ul className='menuLinks'>
              <li>
                <NavLink to={'/organizations/home'}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={'/organizations/events'}>
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink to={'/organizations/orders'}>
                  Orders
                </NavLink>
              </li>
            </ul>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      <UnstyledButton onClick={open} className='menuBtn'>
        <CgMenuGridO size={23}/>
      </UnstyledButton>
    </>
  );
}

export default MenuDrawer