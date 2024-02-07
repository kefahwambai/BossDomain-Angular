import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Product {
  productId: number;
  productSku: string;
  productName: string;
  productImageUrl: string;
  productPrice: number;
  quantity?: number;
}


@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
}) 
export class ShopComponent implements OnInit {

  isSidePanelVisible: boolean = false;
  productObj: any = {
    "productId": 0,
    "productSku": "",
    "productName": "",
    "productPrice": 0,
    "productDescription": "",
    "categoryId": 0,
    "createdDate": new Date(),
    "productImageUrl": ""
  };
  categoryList: any[] = [];
  productsList: any[] = [];
  cart: any[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {} 

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.cartService.getCartItems().subscribe(items => { 
      this.cart = items;
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (res: any) => {
        this.productsList = res;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getCategories() {
    this.productService.getCategories().subscribe(
      (res: any) => {
        this.categoryList = res;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  onEdit(item: any) {
    this.productObj = item;
    this.openSidePanel();
  }

  openSidePanel() {
    this.isSidePanelVisible = true;
  }

  closeSidePanel() {
    this.isSidePanelVisible = false;
  }
}
