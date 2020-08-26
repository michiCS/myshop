import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaderResponse, HttpProgressEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from './app-settings';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const idToken = localStorage.getItem(AppSettings.AUTH_TOKEN);
        console.log(idToken);
        if(idToken){
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + idToken)
            });
            //console.log(cloned);
            return next.handle(cloned);
        } else{
            return next.handle(req);
        }
    }
}

