import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Auth} from '../service/auth';

export const authentificationGuard: CanActivateFn = (route, state) => {

 const auth=inject(Auth);
const router=inject(Router);

if (auth.isAUthenticated){
  return true;
}
else {
  router.navigateByUrl("/login");
  return false;
}

  return true;
};
