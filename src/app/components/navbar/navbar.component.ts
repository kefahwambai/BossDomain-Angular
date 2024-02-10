import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service'; 
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isScrolled = false;
  cartItemCount = 0;  
  user: any;

  constructor(private authService: AuthService, private router: Router, public cartService: CartService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.length;
    });
  }

  isUserLoggedIn(): boolean {
    return !!sessionStorage.getItem('userData') !== null;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
  logout() {
    this.authService.logout();
  }
}
