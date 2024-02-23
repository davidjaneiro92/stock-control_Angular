import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GetAllProductsResponse } from 'src/app/moduls/interfaces/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from './../../../../shared/Components/toolbar-navigation/services/products/products-data-transfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: []
})
export class DashboardHomeComponent implements OnInit {

  public productsList: Array<GetAllProductsResponse> = [];

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private productsDataTransferService: ProductsDataTransferService){}

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData(): void{
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.productsList = response;
          this.productsDataTransferService.setProductsDatas(this.productsList);
        }
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'erroddd',
          summary: 'Erroggg',
          detail: 'Erro ao Buscar o Produtos!',
          life: 2500,
        });
      },
    });
  }
}
