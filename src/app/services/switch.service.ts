import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import { LoginService } from '../services/login.service';
@Injectable()
export class SwitchService{
    baseUrl: string;
    myUrl: string;
    constructor (private ls:LoginService, private http:Http)
    {
        this.myUrl = localStorage.getItem('url') || 'auto.amanvishnani.com/api';
        this.baseUrl = localStorage.getItem('protocol') =='0' ? 'http://' : 'https://';
        this.baseUrl= this.baseUrl+this.myUrl;
        console.log(this.baseUrl);
    }
    getAllSwitches(loc:any,room:any){
        let token = this.ls.getToken();
        let headers = new Headers({'Content-Type':'application/json','x-access-token':token});
        let options = new RequestOptions({'headers':headers});
        return this.http.get(this.baseUrl+'/switch/'+loc+'/'+room,options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    setStatus(loc:any,room:any,sw:any,status:boolean)
    {
        let s=status?'ON':'OFF';
        let token = this.ls.getToken();
        let headers = new Headers({'Content-Type':'application/json','x-access-token':token});
        let options = new RequestOptions({'headers':headers});
        return this.http.get(this.baseUrl+'/switch/'+loc+'/'+room+'/'+sw+'/'+s,options)
                    .map((res:Response) => {res.json();})
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    editName(loc:any,room:string, sw:any,name:string)
    {
        let token = this.ls.getToken();
        let headers = new Headers({'Content-Type':'application/json','x-access-token':token});
        let options = new RequestOptions({'headers':headers});
        return this.http.put(this.baseUrl+'/switch/'+loc+'/'+room+'/'+sw, JSON.stringify({'name':name}),options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    deleteSwitch(loc:any,room:any,sw:any)
    {
        let token = this.ls.getToken();
        let headers = new Headers({'Content-Type':'application/json','x-access-token':token});
        let options = new RequestOptions({'headers':headers});
        return this.http.delete(this.baseUrl+'/switch/'+loc+'/'+room+'/'+sw,options)
                    .map((res:Response) => {res.json();})
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    addNew(loc:any,room:any,name:any,status:any,gpio:any)
    {
        let token = this.ls.getToken();
        let headers = new Headers({'Content-Type':'application/json','x-access-token':token});
        let options = new RequestOptions({'headers':headers});
        return this.http.post(this.baseUrl+'/switch/'+loc+'/'+room, JSON.stringify({'name':name,'status':status,'GPIO':gpio}),options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}