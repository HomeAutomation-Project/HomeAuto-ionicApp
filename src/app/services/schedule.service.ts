import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import { LoginService } from '../services/login.service';
@Injectable()
export class ScheduleService{
    baseUrl: string;
    myUrl: string;
    constructor (private ls:LoginService, private http:Http)
    {
        this.myUrl = localStorage.getItem('url') || 'auto.amanvishnani.com/api';
        this.baseUrl = localStorage.getItem('protocol') =='0' ? 'http://' : 'https://';
        this.baseUrl= this.baseUrl+this.myUrl;
        console.log(this.baseUrl);
    }
    getScheduleDetails(){
        let token = this.ls.getToken();
        let headers = new Headers({'Content-Type':'application/json','x-access-token':token});
        let options = new RequestOptions({'headers':headers});
        return this.http.get(this.baseUrl+'/task',options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    addNewSchedule(body:any){
        let token = this.ls.getToken();
        let headers = new Headers({'Content-Type':'application/json','x-access-token':token});
        let options = new RequestOptions({'headers':headers});
        return this.http.post(this.baseUrl+'/task',JSON.stringify(body),options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    editSchedule(name:string,body:any){
        let token = this.ls.getToken();
        let headers = new Headers({'Content-Type':'application/json','x-access-token':token});
        let options = new RequestOptions({'headers':headers});
        return this.http.put(this.baseUrl+'/task/'+name,JSON.stringify(body),options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    deleteSchedule(name:string){
       // console.log(name);
        let token = this.ls.getToken();
        let headers = new Headers({'Content-Type':'application/json','x-access-token':token});
        let options = new RequestOptions({'headers':headers});
        return this.http.delete(this.baseUrl+'/task/'+name,options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}