import { Restaurant } from "./restaurant/restaurant.model";
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { MEAT_API } from "../app.api"
import { Injectable } from "@angular/core";

import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";



@Injectable()
export class RestaurantsService {

    constructor(private http: HttpClient) { }

    restaurants(search?: string): Observable<Restaurant[]> {
        let params: HttpParams = undefined;
        if(search){
            params = new HttpParams().set('q', search)
        }
        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params})
            
    }

    restaurantById(id: string): Observable<Restaurant>{
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
            
    }

    reviewsOfRestaurant(id: string): Observable<Restaurant> {
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}/reviews`)
        
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
       
    }
}   