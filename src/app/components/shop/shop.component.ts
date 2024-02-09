import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  sortBy: string = '';
  searchTerm: string = '';


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
    
    const updatedCart = this.cartService.getCartItems();
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  searchProducts(): void {
    console.log('Search term:', this.searchTerm);
  
    if (this.searchTerm.trim() === '') {
      console.log('Resetting products list');
      this.getProducts();
    } else {
      console.log('Filtering products');
      this.productsList = this.productsList.filter(product =>
        product.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.productCategory.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  
    console.log('Updated products list:', this.productsList);
  }
  

  toggleDescription(product: any): void {
    product.showDescription = true;
  }
  
  resetDescription(product: any): void {
    product.showDescription = false;
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
