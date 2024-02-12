import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/moduls/interfaces/products/response/GetAllProductsResponse';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private API_URL = environments.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private httpOptins = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getAllProducts(): Observable<Array<GetAllProductsResponse>>{
    return this.http.get<Array<GetAllProductsResponse>>(
      `${this.API_URL}/products`,
      this.httpOptins
    )
    .pipe(map((product) => product.filter((data) => data?.amout > 0 )));
   }
}
