import React from 'react'
import { Menu, MenuLabel, MenuList, MenuLink } from 'bloomer';

const SideNav = (props) => (
    <Menu>
        <MenuLabel>General</MenuLabel>
        <MenuList>
            <li><MenuLink href="/dashboard">Dashboard</MenuLink></li>
            <li><MenuLink>My Account</MenuLink></li>
        </MenuList>
        <MenuLabel>Workspace Subscriptions</MenuLabel>
        <MenuList>
            <li><MenuLink href='/dashboard/workspace/add'>Book New Workspace</MenuLink></li>
            <li><MenuLink href='/dashboard/workspace/list'>Workspace Bookings</MenuLink></li>
        </MenuList>
        <MenuLabel>Events</MenuLabel>
        <MenuList>
            <li><MenuLink> Book Event Space</MenuLink></li>
            <li><MenuLink>Event Bookings</MenuLink></li>
        </MenuList>

        <MenuList style={{position: 'absolute', bottom: '50px', width: '100%'}}>
            <li><MenuLink href="/auth/logout">Logout </MenuLink></li>
        </MenuList>
    </Menu>
)

export default SideNav