import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FormsModule } from '@angular/forms';
import { VansComponent } from './vans/vans.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './util/pipes/capitalize/capitalize.pipe';
import { RouterModule } from '@angular/router';
import { VanIDComponent } from './van-id/van-id.component';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { PasswordPipe } from './util/pipes/password/password.pipe';
import { DashboardComponent } from './profile/dashboard/dashboard/dashboard.component';
import { HostvansComponent } from './profile/hostvans/hostvans/hostvans.component';
import { AddvanComponent } from './profile/addvan/addvan/addvan.component';
import { SignupComponent } from './signup/signup.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    VansComponent,
    CapitalizePipe,
    VanIDComponent,
    SigninComponent,
    ProfileComponent,
    PasswordPipe,
    DashboardComponent,
    HostvansComponent,
    AddvanComponent,
    SignupComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
