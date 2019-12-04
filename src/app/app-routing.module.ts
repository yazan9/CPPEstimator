import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainFormComponent } from './main-form/main-form.component';
import {BlogMainComponent} from './blog-main/blog-main.component';
import {BlogPostDetailsComponent} from './blog-post-details/blog-post-details.component';
import {NewBlogPostComponent} from './new-blog-post/new-blog-post.component';
import { CategoriesMainComponent } from './Categories/categories-main/categories-main.component';
import {AuthGuard} from './auth/auth.guard'
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LandingComponent } from './landing/landing/landing.component';
import { AdminComponent } from './components/admin/admin.component';
import { BenefitsGridComponent } from './components/benefits-grid/benefits-grid.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

const routes: Routes = [
  {path: 'main', component: MainFormComponent, canActivate: [AuthGuard]},
  {path: 'blog', component: BlogMainComponent},
  {path: '', redirectTo: '/landing', pathMatch: 'full' },
  {path: 'post/:id', component: BlogPostDetailsComponent},
  {path: 'new_post', component: NewBlogPostComponent},
  {path: 'categories', component: CategoriesMainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'landing', component: LandingComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'benefits_report', component: BenefitsGridComponent, canActivate: [AuthGuard]},
  {path: 'forgot_password', component: ForgotPasswordComponent},
  {path: 'reset_password/:hash', component: ResetPasswordComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
