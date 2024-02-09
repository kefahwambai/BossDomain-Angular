import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { AboutComponent } from './components/about/about.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: 'home',
    component: LandingpageComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'checkout',
    component: CartComponent

  },
  {
    path: 'profile',
    component: UserComponent

  },
  { 
    path: 'login',
   component: LoginComponent
  },
  { 
    path: 'logout',
   component: LogoutComponent
   },
  { 
  path: 'signup',
   component: SignupComponent
  },
  {
    path: '',
    redirectTo: '/home', 
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
