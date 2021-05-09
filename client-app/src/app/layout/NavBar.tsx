import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props{
    formOpen:()=>void;       
}

export default function NavBar(prop:Props){
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="Logo" style={{marginRight:'10px'}}/>
                    CoreReactivities    
                </Menu.Item>
                <Menu.Item name="Activities"/>
                <Menu.Item>
                    <Button onClick={prop.formOpen} positive content="Crate Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}