import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { VansComponent } from './vans/vans.component';
import { VanIDComponent } from './van-id/van-id.component';
import { SigninComponent } from './signin/signin.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './profile/dashboard/dashboard/dashboard.component';
import { HostvansComponent } from './profile/hostvans/hostvans/hostvans.component';
import { AddvanComponent } from './profile/addvan/addvan/addvan.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Welcome to #VanLife',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About #VanLife',
  },
  {
    path: 'vans',
    component: VansComponent,
    title: 'Vans',
  },
  {
    path: 'vans/:id',
    component: VanIDComponent,
    title: 'Van Details',
  },
  {
    path: 'signin',
    component: SigninComponent,
    title: 'Sign in to #VanLife',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Your Profile',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Host Dashboard',
      },
      {
        path: 'add-van',
        component: AddvanComponent,
        title: 'Add a Van',
      },

      {
        path: 'vans',
        component: HostvansComponent,
        title: 'Host Vans',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
