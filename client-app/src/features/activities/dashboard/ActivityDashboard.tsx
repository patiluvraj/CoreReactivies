import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid} from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
import ActivityList from './ActivityList';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default observer(function ActivityDashboard(){

    const {activityStore}=useStore();
    const {loadActivities,activityRegistry}=activityStore;

    useEffect(()=>{
        if(activityRegistry.size<=1) loadActivities();    
    },[loadActivities,activityRegistry.size]);

    
    if(activityStore.loadingInitial) return <LoadingComponent content="Loading app"/>

    return(
        <Grid>
            <Grid.Column width="10">
                <ActivityList /> 
            </Grid.Column>
            <Grid.Column width='6'>
             <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    )
})