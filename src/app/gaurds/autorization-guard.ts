import {CanActivateFn, Router} from '@angular/router';
import {Auth} from '../service/auth';
import {inject} from '@angular/core';

export const autorizationGuard: CanActivateFn = (route, state) => {

  const auth=inject(Auth);
  const router=inject(Router);
  if(auth.roles.includes("ADMIN")){
    return true;
  }else{
    router.navigateByUrl("/notAuthorized")
    return false;
  }
};
