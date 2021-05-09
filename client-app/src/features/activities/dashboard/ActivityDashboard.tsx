import React from 'react';
import { Grid} from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props{
    activities:Activity[];
    selectedActivity: Activity | undefined;
    selectActivity:(id:string)=>void;
    cancelActivity:()=>void;
    formOpen:(id:string)=>void;
    formClose:()=>void;
    editMode:Boolean;
    crateOrEdit:(activity:Activity)=>void;
    deleteActivity:(id:string)=>void;
}

export default function ActivityDashboard(prop:Props){
    return(
        <Grid>
            <Grid.Column width="10">
                <ActivityList 
                activities={prop.activities} 
                selectActivity={prop.selectActivity} 
                deleteActivity={prop.deleteActivity}
                /> 
            </Grid.Column>
            <Grid.Column width='6'>
                {prop.selectedActivity && !prop.editMode &&
                <ActivityDetails 
                activity={prop.selectedActivity} 
                cancelActivity={prop.cancelActivity}
                formOpen={prop.formOpen}
                />}
                { prop.editMode && 
                <ActivityForm 
                 formClose={prop.formClose} 
                 activity={prop.selectedActivity} 
                 crateOrEdit={prop.crateOrEdit}
                />}
            </Grid.Column>
        </Grid>
    )
}