import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props{
    formClose:()=>void;
    activity:Activity | undefined;
    crateOrEdit:(activity:Activity)=>void;
}

export default function ActivityForm(prop:Props){
    
    const initialState=prop.activity ?? {
        id:'',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:''
    }

    const [activity,setActivity] = useState(initialState);

    function handleSubmit(){
        prop.crateOrEdit(activity);
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name,value}=event.target;
        setActivity({...activity,[name]:value});
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>                
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>   
                <Button content='Submit' positive type='submit' floated='right' value={activity.title} name='title' onChange={handleInputChange}/>
                <Button content='Cancel' onClick={prop.formClose} type='button' floated='right' value={activity.title} name='title' onChange={handleInputChange}/>             
            </Form>
        </Segment>
    )
}