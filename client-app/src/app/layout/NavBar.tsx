import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar(){

    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="Logo" style={{marginRight:'10px'}}/>
                    CoreReactivities    
                </Menu.Item>
                <Menu.Item name="Activities" exact as={NavLink} to='/activities' />
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content="Crate Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}