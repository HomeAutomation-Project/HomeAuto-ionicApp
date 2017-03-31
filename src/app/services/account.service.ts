import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import { LoginService } from '../services/login.service';
@Injectable()
export class AccountService {
    baseUrl: string;
    myUrl: string;
    constructor(private ls:LoginService, private http:Http)
    {
        this.myUrl=localStorage.getItem('url') || 'auto.amanvishnani.com/api';
        this.baseUrl = localStorage.getItem('protocol') == '0' ? 'http://' : 'https://';
        this.baseUrl= this.baseUrl+this.myUrl;
        console.log(this.baseUrl);
    }
    getAccountDetails(){
        let token = this.ls.getToken();
        let headers = new Headers({'Content-Type':'application/json','x-access-token':token});
        let options = new RequestOptions({'headers':headers});
        return this.http.get(this.baseUrl+'/user',options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    updateDetails(username:any,email:any,first:any,last:any){
        let token = this.ls.getToken();
        let headers = new Headers({'Content-Type':'application/json','x-access-token':token});
        let options = new RequestOptions({'headers':headers});
        return this.http.put(this.baseUrl+'/user',JSON.stringify({'username':username,'email':email,'first':first,'last':last}),options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}