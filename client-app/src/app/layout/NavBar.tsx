import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar(){
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="Logo" style={{marginRight:'10px'}}/>
                    CoreReactivities    
                </Menu.Item>
                <Menu.Item name="Activities"/>
                <Menu.Item>
                    <Button positive content="Crate Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}