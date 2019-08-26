import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/images/logo.svg';

export class NavMenu extends Component {
    render() {
        return(
            <Navbar bg='dark'>
                <NavbarBrand to='/'>
                    <img src={logo} width='50' height='50' className='d-inline-block align-top App-logo' alt='React'/>
                </NavbarBrand>
                <LinkContainer to='/'>
                    <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/anovaResults'>
                    <Nav.Link>Anova Results</Nav.Link>
                </LinkContainer>
            </Navbar>
        );
    }
}