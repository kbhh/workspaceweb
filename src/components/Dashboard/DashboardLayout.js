import React from 'react'
import { Container, Navbar, NavbarBrand, Hero, HeroBody, Icon } from 'bloomer';
import { NavbarItem } from 'bloomer/lib/components/Navbar/NavbarItem';
import styled from 'styled-components'

import logo from '../../assets/logo-with-moto.png'
// import landing from '../../assets/blueSpace-real.jpg'
import SideNav from './SideNav';

const StyledNavbarBrand = styled(NavbarBrand)`
    position: absolute;
    left: 0;

    flex-direction: row-reverse;

    width: 100%;
`

// const StyledColumns = styled(Columns)`
//     position: absolute;
//     left: 0;
//     top: 0;

//     z-index: 100;

//     padding: 10px;
//     background: #999;

//     height: 100vh;
//     width: 300px;

//     margin: 0;
// `
// const StyledNavbar

const DashboardLayout = (props) => (
    <Container style={{background: '#e6e6e6'}} isPaddingless isMarginless isFluid >
        <input type="checkbox" id="drawer-toggle" name="drawer-toggle"/>
        <label htmlFor="drawer-toggle" id="drawer-toggle-label"></label>
        <header>
            
        </header>
        <nav id="drawer">
            <SideNav />
        </nav>
        <div id="page-content">
        <Navbar style={{width: '100%', position: 'fixed'}}>
                <Container isFluid>
                    <StyledNavbarBrand>
                        <NavbarItem>
                            <Icon className='fa fa-qrcode' style={{color: '#999'}}/>
                        </NavbarItem>
                        <NavbarItem>
                            <Icon className='fa fa-bell' style={{ color: '#999' }} />
                        </NavbarItem>
                        {/* <NavbarItem style={{flex: 100}}>

                        </NavbarItem> */}
                        {/* <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} /> */}
                        <NavbarItem style={{flex: 100}}>
                            <img src={logo} alt="blueSpace" style={{margin: 'auto'}}/>
                        </NavbarItem>
                        {/* <span className="navbar-item" style={{borderLeft: "1px #ddd solid", margin: "10px auto", fontSize: '1em', fontWeight: 'lighter'}}>where work meets life</span> */}
                        {/* <NavbarItem>
                            <Icon className='fa fa-bars' style={{color: '#999'}} />
                        </NavbarItem> */}
                    </StyledNavbarBrand>
                </Container>
            </Navbar>
            { props.hasImage ?
            <Hero isSize="large" isColor="primary">
                <HeroBody style={{background: `url(${props.image}) no-repeat center center fixed`, backgroundSize: 'cover', height: '40vh'}}>
                    {/* <img src={landing} style={{width: '200%', maxHeight: '50vh'}}/> */}
                    <Container hasTextAlign="centered">
                        {/* <Title>{props.active}</Title> */}
                    </Container>
                </HeroBody>
                {/* <HeroFooter>
                    where work meets life
                </HeroFooter> */}
            </Hero> : null
        }
            <Container style={{marginTop: props.nomargin ? 0 : '100px'}} hasTextAlign="centered">
            {props.children}
            </Container>
        </div>        
    </Container>
)

export default DashboardLayout