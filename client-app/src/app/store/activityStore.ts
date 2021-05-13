import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from "../models/activity"


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
        this.loadingInitial=true;
        try{
            const activities= await agent.activities.list();                    
            runInAction(()=>{
                activities.forEach(activity=>{
                    this.addActivityToRegistry(activity);
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

    setInitialLoading=(state:boolean)=>{
        this.loadingInitial=state;
    }

    private addActivityToRegistry=(activity:Activity)=>{
        activity.date=activity.date.split('T')[0];
        this.activityRegistry.set(activity.id,activity);
    }

    loadActivity= async (id:string)=>{
        let activity=this.getActivity(id);
        if(activity){
            this.selectedActivity=activity;
            return activity;
        }else{
            this.setInitialLoading(true);
            try{
                activity=await agent.activities.details(id);
                runInAction(()=>{
                    this.selectedActivity=activity;
                })                
                this.addActivityToRegistry(activity);
                this.setInitialLoading(false);
                return activity;
            } catch(err){
                console.log(err);
                this.setInitialLoading(false);
            }            
        }
    }

    private getActivity=(id:string)=>{
        return this.activityRegistry.get(id);
    }

    createActivity= async (activity:Activity)=>{
        this.loading=true;        
        try{
            await agent.activities.create(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity=activity;
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
                this.selectedActivity=activity;
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