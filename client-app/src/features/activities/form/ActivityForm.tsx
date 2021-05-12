import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';

export default observer(function ActivityForm(){
    
    const {activityStore}=useStore();

    const {selectedActivity}=activityStore;

    const initialState=selectedActivity ?? {
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
        activity.id? activityStore.updateActivity(activity) : activityStore.createActivity(activity);
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
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>                
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>   
                <Button loading={activityStore.loading} content='Submit' positive type='submit' floated='right' value={activity.title} name='title' onChange={handleInputChange}/>
                <Button content='Cancel' onClick={activityStore.closeForm} type='button' floated='right' value={activity.title} name='title' onChange={handleInputChange}/>             
            </Form>
        </Segment>
    )
})