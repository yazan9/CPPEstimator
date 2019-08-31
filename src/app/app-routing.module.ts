import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainFormComponent } from './main-form/main-form.component';
import {BlogMainComponent} from './blog-main/blog-main.component';
import {BlogPostDetailsComponent} from './blog-post-details/blog-post-details.component';
import {NewBlogPostComponent} from './new-blog-post/new-blog-post.component';


const routes: Routes = [
  {path: 'main', component: MainFormComponent},
  {path: 'blog', component: BlogMainComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full' },
  {path: 'post/:id', component: BlogPostDetailsComponent},
  {path: 'new_post', component: NewBlogPostComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
