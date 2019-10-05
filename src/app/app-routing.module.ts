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

const routes: Routes = [
  {path: 'main', component: MainFormComponent, canActivate: [AuthGuard]},
  {path: 'blog', component: BlogMainComponent},
  {path: '', redirectTo: '/landing', pathMatch: 'full' },
  {path: 'post/:id', component: BlogPostDetailsComponent},
  {path: 'new_post', component: NewBlogPostComponent},
  {path: 'categories', component: CategoriesMainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'landing', component: LandingComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
