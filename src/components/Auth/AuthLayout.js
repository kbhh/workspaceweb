import React from 'react'
import { Columns, Column, Hero, Container, HeroBody, Subtitle, Title } from 'bloomer';
// import logo from '../../assets/logo-with-moto.png'

const AuthLayout = (props) => (
    <Hero isFullHeight isColor="primary">
        <HeroBody>
            <Container hasTextAlign="centered">
                {/* <img src={logo} alt='blueSpace - logo'/> */}
                {/* <Box className='box'> */}
                
                <Columns isCentered>
                    <Column isSize={{mobile: 12, tablet: 6, desktop: 6}}>
                    <Title hasTextColor="white">
                        blueSpace
                    </Title>
                    <Subtitle hasTextColor="white">
                        where work meets life
                    </Subtitle>
                        {props.children}   
                    </Column>
                </Columns>
                <Columns style={{height: '300px'}}>
                    <Column></Column>
                </Columns>
                {/* </Box> */}
            </Container>
        </HeroBody>
    </Hero>
)

export default AuthLayout
