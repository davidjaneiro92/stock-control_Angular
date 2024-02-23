import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/moduls/interfaces/products/response/GetAllProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {
 public productsDataEmitter$ = new BehaviorSubject<Array<GetAllProductsResponse> | null>(null);

  public productsDatas: Array<GetAllProductsResponse> = [];

  setProductsDatas(produts: Array<GetAllProductsResponse>): void {
    if(produts){
      this.productsDataEmitter$.next(produts);
      this.getProductsDatas();
    }
  }
  getProductsDatas() {
    this.productsDataEmitter$.pipe(
      take(1),
      map((data) => data?.filter((product) => product.amount > 0))
    )
    .subscribe({
      next: (response) => {
        if(response){
          this.productsDatas = response;
        }
      },
    });
return this.productsDatas;
  }
}
