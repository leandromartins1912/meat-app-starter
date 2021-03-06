
import { HttpErrorResponse } from "@angular/common/http"
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core"
import { Observable } from "rxjs/Observable"
import { LoginService } from "./security/login/login.service"

import { NotificationService } from './shared/messages/notifications.service'

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler{

    constructor(private ns: NotificationService, private injector: Injector, private zone: NgZone ){
        super()
    }

   handleError(erroResponse: HttpErrorResponse | any){
       if(erroResponse instanceof HttpErrorResponse){
        const message = erroResponse.error.message
        this.zone.run(()=>{
            switch(erroResponse.status){
                case 401:
                     this.injector.get(LoginService).handleLogin()
                break;
                case 403:
                    this.ns.notify(message || 'Não Autorizado')
                break;
                case 404:
                    this.ns.notify(message || 'Recurso não encontrado')
                break;            
            }
        })        
           
       }
       super.handleError(erroResponse)
   }
}