import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
      router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          if (this.keepAfterNavigationChange) {
            this.keepAfterNavigationChange = false;
          } else {
            this.subject.next();
          }
        }
      });
   }

   sucess(message: string, keepAfterNavigationChange = false){
      this.keepAfterNavigationChange = keepAfterNavigationChange;
      this.subject.next({type: 'sucess', text: message});
   }

   error(error, keepAfterNavigationChange = false){
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    let msg: string;
    msg = "";
    for(var err in error.error.errors) {
      msg+= err + " " + error.error.errors[err];
      msg+= "\n";
    }
    console.log(msg);
    this.subject.next({type: 'error', text: msg});
  }

   getMessage(): Observable<any> {
      return this.subject.asObservable();
   }


}
