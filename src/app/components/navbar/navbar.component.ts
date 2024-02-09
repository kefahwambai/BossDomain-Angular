import { Component, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service'; 
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  isScrolled = false;
  cartItemCount = 0;  
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    public cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.length;
    });

    this.authService.user$.subscribe(user => {
      this.user = user;
      this.cdr.detectChanges();
    });
  }

  isUserLoggedIn(): boolean {
    return sessionStorage.getItem('jwt') !== null;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout();
  }
}
