import { HttpInterceptorFn } from '@angular/common/http';
import { toast } from 'ngx-sonner';
import { catchError, of } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = toast
  return next(req).pipe(catchError((err)=>{
    toaster.error(err.error.message);
    return of(err)
  }));
};
