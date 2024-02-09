import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CartService } from '../../service/cart.service';

interface Product {
  productId: number;
  productSku: string;
  productName: string;
  productImageUrl: string;
  productPrice: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule],
})
export class CartComponent implements OnChanges, OnDestroy {
  @Input() set cart(newCart: Product[]) {
    this._cart = newCart;
    this.calculateTotalPrice();
  }
  public _cart: Product[] = [];
  productPrice: number = 0;
  cartSubscription: Subscription;

  constructor(private cartService: CartService) {
    this.cartSubscription = this.cartService.getCartItems().subscribe(items => {
      this.cart = items;
    });
  }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCartItems().subscribe(items => {
      this.cart = items;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  trackByFn(index: number, item: any): number {
    return item.productId;
  }

  handleChange(item: Product, changeAmount: number): void {
    item.quantity = Math.max(item.quantity + changeAmount, 0);
    this.cartService.updateItemQuantity(item.productId, item.quantity);
    this.calculateTotalPrice();
  }

  handleRemove(productId: number): void {
    this.cartService.removeItem(productId);
  }

  private calculateTotalPrice(): void {
    this.productPrice = this._cart.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  }

  roundPrice(price: number): string {
    const roundedPrice = Math.round(price * 100) / 100;
    return `Kshs. ${roundedPrice.toFixed(2)}`;
  }

  placeOrder(): void {
    alert('Order placed successfully!');
    this.cartService.clearCart();
  }
}