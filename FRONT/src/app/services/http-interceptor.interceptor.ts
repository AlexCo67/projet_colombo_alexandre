import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  jwtToken: String = "";

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.jwtToken !== "") {
      request = request.clone({setHeaders: {Authorization: `Bearer ${this.jwtToken}` }});
      console.log('got JWT');
    }
    console.log("return somehting");
    return next.handle(request).pipe(tap(
      (evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            let tab : Array<String>;
            let headerAuthorization = evt.headers.get("Authorization");
            if (headerAuthorization != null ) {
              tab = headerAuthorization.split(/Bearer\s+(.*)$/i);
              if (tab.length > 1) this.jwtToken = tab[1];
            }
          }
        }
      )
    );
  }
}
