import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { VansComponent } from './vans/vans.component';
import { VanIDComponent } from './van-id/van-id.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
