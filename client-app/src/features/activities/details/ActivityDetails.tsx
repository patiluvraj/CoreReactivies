import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props{
    activity:Activity;
    cancelActivity:()=>void;
    formOpen:(id:string)=>void;
}

export default function ActivityDetails(prop:Props){
    
    return(
        <Card fluid>
            <Image src={`/assets/categoryImages/${prop.activity.category}.jpg`}/>
            <Card.Content>
                <Card.Header>{prop.activity.title}</Card.Header>
                <Card.Meta><span>{prop.activity.date}</span></Card.Meta>
                <Card.Description>{prop.activity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={()=>prop.formOpen(prop.activity.id)} basic color='blue' content='Edit'/>
                    <Button onClick={prop.cancelActivity} basic color='grey' content='Cancel'/> 
                </Button.Group>
            </Card.Content>
        </Card>
    )
}