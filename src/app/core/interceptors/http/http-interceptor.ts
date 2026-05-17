import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'environments/environment.development';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = environment.apiUrl;
  const newReq = req.clone({
    // remove this property befrore production build
    setHeaders: {
      'ngrok-skip-browser-warning': 'true',
    },

    url: `${apiUrl}/api/${req.url}`,
    withCredentials: true,
  });
  return next(newReq);
};
