import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';


function App() {

  const [activities,setActivities]=useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity]=useState<Activity | undefined>(undefined);
  const [editMode,setEditMode]=useState(false);
  const [loading,setLoading]=useState(true);
  const [submitting,setSubmitting]=useState(false);

  useEffect(()=>{
    agent.activities.list().then(response=>{      
      let activities:Activity[]=[];

      response.forEach(activity=>{
        activity.date=activity.date.split('T')[0];
        activities.push(activity);
      })

      setActivities(activities);
      setLoading(false);
    });
  },[]);

  function handleSelectActivity(id:string){
    setSelectedActivity(activities.find(x=>x.id===id));
  }

  function handleCancelActivity(){
    setSelectedActivity(undefined);
  }

  function handleOpenForm(id?:string){
    id?handleSelectActivity(id):handleCancelActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity:Activity){
    setSubmitting(true);
    if(activity.id){
      agent.activities.update(activity).then(()=>{
        setActivities([...activities.filter(x=> x.id!==activity.id),activity])
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      })
    } else {
      activity.id=uuid();
      agent.activities.create(activity).then(()=>{
        setActivities([...activities,activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      })
    }
  }   

  function handleDeleteActivity(id:string){
    setSubmitting(true);
    agent.activities.delete(id).then(()=>{
      setActivities([...activities.filter(x=> x.id!==id)]);
      if(selectedActivity){
        if(selectedActivity.id===id){
          setSelectedActivity(undefined);
        }
      }
      setSubmitting(false);
    })    
  }

  if(loading) return <LoadingComponent content="Loading app"/>

  return (
    <>            
      <NavBar 
        formOpen={handleOpenForm}        
      />
      <Container style={{marginTop:'7em'}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelActivity={handleCancelActivity}
          formOpen={handleOpenForm}
          formClose={handleFormClose}
          editMode={editMode}
          crateOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />  
      </Container>  
    </>
  );
}

export default App;
