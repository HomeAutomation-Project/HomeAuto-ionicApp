import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import { LoginService } from '../services/login.service';
@Injectable()
export class LocationService{
    baseUrl: string;
    myUrl: string;
    constructor (private ls:LoginService, private http:Http)
    {
        this.myUrl = localStorage.getItem('url') || 'auto.amanvishnani.com/api';
        this.baseUrl = localStorage.getItem('protocol') =='0' ? 'http://' : 'https://';
        this.baseUrl= this.baseUrl+this.myUrl;
        console.log(this.baseUrl);
    }
    getLocationDetails(){
        let token = this.ls.getToken();
        let headers = new Headers({'Content-Type':'application/json','x-access-token':token});
        let options = new RequestOptions({'headers':headers});
        return this.http.get(this.baseUrl+'/place',options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    editName(location:string,name:string)
    {
        let token = this.ls.getToken();
        let headers = new Headers({'Content-Type':'application/json','x-access-token':token});
        let options = new RequestOptions({'headers':headers});
        return this.http.put(this.baseUrl+'/place/'+location, JSON.stringify({'name':name}),options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    deletePlace(loc:any)
    {
        let token = this.ls.getToken();
        let headers = new Headers({'Content-Type':'application/json','x-access-token':token});
        let options = new RequestOptions({'headers':headers});
        return this.http.delete(this.baseUrl+'/place/'+loc,options)
                    .map((res:Response) => {res.json();})
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    addNew(name:any)
    {
        let token = this.ls.getToken();
        let headers = new Headers({'Content-Type':'application/json','x-access-token':token});
        let options = new RequestOptions({'headers':headers});
        return this.http.post(this.baseUrl+'/place', JSON.stringify({'name':name}),options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}