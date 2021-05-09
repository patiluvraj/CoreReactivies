import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props{
    activities:Activity[];
    selectActivity:(id:string)=>void;
    deleteActivity:(id:string)=>void;
    submitting:boolean;
}

export default function ActivityList(prop:Props){

    const [target,setTarget]=useState('');

    function handleDeleteActivity(e:SyntheticEvent<HTMLButtonElement>,id:string){
        setTarget(e.currentTarget.name);
        prop.deleteActivity(id);
    }

    return(
        <Segment>
            <Item.Group divided>
                {prop.activities.map(activity=>(
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city},{activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={()=>prop.selectActivity(activity.id)} content='View' floated='right' color='blue'/>
                                <Button
                                name={activity.id} 
                                loading={prop.submitting && target===activity.id} 
                                onClick={(e)=>handleDeleteActivity(e,activity.id)}
                                content='Delete' 
                                floated='right' 
                                color='red'/>
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}