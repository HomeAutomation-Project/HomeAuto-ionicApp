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
        this.myUrl=localStorage.getItem('url') || 'auto.amanvishnani.com/api';
        this.baseUrl = localStorage.getItem('protocol') == '0' ? 'http://' : 'https://';
        this.baseUrl= this.baseUrl+this.myUrl;
        console.log(this.baseUrl);
    }
    /**
     * 
     * @param username Provide username
     * @param password provide password
     */
    login(username, password)
    {
        this.safeMode();
        return this.http.post(this.baseUrl+'/authenticate',{'username':username, 'password':password})
        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    logout()
    {
        localStorage.removeItem("token");
    }
    
    getToken()
    {
        return localStorage.getItem("token");
    }
    setToken(token : string)
    {
        localStorage.setItem("token",token);
    }
    safeMode()
    {
        if(localStorage.getItem('url') && this.myUrl!=localStorage.getItem('url'))
        {
            this.myUrl=localStorage.getItem('url');
            this.baseUrl = localStorage.getItem('protocol') == '0' ? 'http://' : 'https://';
            this.baseUrl= this.baseUrl+this.myUrl;
            console.log(this.baseUrl);
        }
    }
    public isLoggedIn()
    {
        var token = this.getToken();
        if(token)
        {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-','+').replace('_','/');
            var params = JSON.parse(atob(base64));
            return Math.round(new Date().getTime() / 1000) <= params.exp;
        }
        else{
            return false;
        }
    }

    $isLoggedIn = new Observable(observer => {
        setInterval(()=>{
            observer.next(this.isLoggedIn());
        },500)
    })
}