import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from '@angular/router'
import { LoginService } from './login/login.service'

@Injectable()
export class LoggedInGuard  implements CanLoad, CanActivate {

    constructor(private loginService: LoginService){}

    checkAuthentications(path: string){
        const loggedIn = this.loginService.isLoggedIn()
        if(!loggedIn){
            this.loginService.handleLogin(`/${path}`)
        }
        return loggedIn
    }

    canLoad(route: Route): boolean{
        return this.checkAuthentications(route.path)
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean{
        return this.checkAuthentications(activatedRoute.routeConfig.path)
    }
}