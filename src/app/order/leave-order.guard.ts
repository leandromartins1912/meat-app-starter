import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { OrderComponent } from "./order.component";

export class LeaveOrderGuard implements CanDeactivate<OrderComponent>{
    canDeactivate(orderComponent: OrderComponent, 
                  activatedRoute: ActivatedRouteSnapshot,
                  RouterState: RouterStateSnapshot): boolean{
            if(!orderComponent.isOrderCompleted()){
                return  window.confirm('Deseja sair da página?')
            }else{
                return true
            }           
    }

}