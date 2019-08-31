import { Injectable } from '@angular/core';
import { BlogPost } from '../Models/BlogPost';
import { AllBlogPosts } from '../Mocks/MockBlogPosts';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() { }
  
  getBlogPosts(): Observable<BlogPost[]>
  {
    return of(AllBlogPosts);
  }
  
  getBlogPost(id:number): Observable<BlogPost>
  {
    return of(AllBlogPosts.find(blogPost => blogPost.id === id));
  }
  
  addBlogPost(blogPost: BlogPost)
  {
    AllBlogPosts.push(blogPost);
  }
}
