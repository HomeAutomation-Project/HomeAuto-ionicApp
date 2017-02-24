import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class LoginService{
    http:any;
    baseUrl: string;
    myUrl: string;
    constructor(http:Http)
    {
        this.http = http;
        this.myUrl=localStorage.getItem('url');
        this.baseUrl = localStorage.getItem('protocol') == '0' ? 'http://' : 'https://';
        this.baseUrl= this.baseUrl+this.myUrl;
        console.log(this.baseUrl);
    }

    login(username, password)
    {
        return this.http.post(this.baseUrl+'/authenticate',{'username':username, 'password':password})
        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    
    getToken()
    {
        return localStorage.getItem("token");
    }
    setToken(token : string)
    {
        localStorage.setItem("token",token);
    }
}