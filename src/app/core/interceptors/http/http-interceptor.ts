import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'environments/environment.development';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
    const apiUrl = environment.apiUrl;
  console.log(apiUrl);
  const newReq = req.clone({
    url: `${apiUrl}/${req.url}`,
    withCredentials: true
  });
  return next(newReq);
};
