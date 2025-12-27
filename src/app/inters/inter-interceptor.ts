import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {Auth} from "../service/auth";

export const interInterceptor: HttpInterceptorFn = (req, next) => {

    const authService = inject(Auth)

    if(!req.url.includes("auth/login")){
        let newreq= req.clone({
            headers:req.headers.set(
                'Authorization','Bearer ' + authService.accessToken
            )
        })
        return next(newreq)
    }

    return next(req);
};
