import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from "../models/activity"
import {v4 as uuid} from 'uuid';

export default class ActivityStore{
    activityRegistry=new Map<string,Activity>();    
    loading:boolean=false;
    loadingInitial:boolean=true;
    selectedActivity:Activity|undefined=undefined;
    editMode:boolean=false;

    constructor(){
        makeAutoObservable(this);
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b)=> Date.parse(a.date)-Date.parse(b.date));
    }

    loadActivities= async ()=>{        
        try{
            const activities= await agent.activities.list();                    
            runInAction(()=>{
                activities.forEach(activity=>{
                    activity.date=activity.date.split('T')[0];
                    this.activityRegistry.set(activity.id,activity);
                });
                this.loadingInitial=false;
            });        
        } catch(error){
            console.log(error);
            runInAction(()=>{
                this.loadingInitial=false;
            })
        }
    }


    setActivity=(id:string)=>{
        this.selectedActivity=this.activityRegistry.get(id);
    }

    unsetActivity=()=>{
        this.selectedActivity=undefined;
    }

    openForm=(id?:string)=>{
        id ? this.setActivity(id):this.unsetActivity();
        this.editMode=true;
    }

    closeForm=()=>{
        this.editMode=false;    
    }

    createActivity= async (activity:Activity)=>{
        this.loading=true;
        activity.id=uuid();
        try{
            await agent.activities.create(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id,activity);
                this.setActivity(activity.id);
                this.editMode=false;
                this.loading=false;         
            })               
        }catch(error){
            console.log(error);    
            runInAction(()=>{
                this.loading=false;
            })        
        }
    }

    updateActivity=async (activity:Activity)=>{
        this.loading=true;
        try{
            await agent.activities.update(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id,activity);
                this.setActivity(activity.id);
                this.editMode=false;
                this.loading=false;         
            })               
        }catch(error){
            console.log(error);    
            runInAction(()=>{
                this.loading=false;
            })        
        }
    }

    deleteActivity=async (id:string)=>{
        this.loading=true;
        try{
            await agent.activities.delete(id);
            runInAction(()=>{
                this.activityRegistry.delete(id);
                if(this.selectedActivity?.id===id){this.unsetActivity()}                
                this.loading=false;         
            })               
        }catch(error){
            console.log(error);    
            runInAction(()=>{
                this.loading=false;
            })        
        }
    }
}