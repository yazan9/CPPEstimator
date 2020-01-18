import { Injectable } from '@angular/core';
import { BlogPost } from '../Models/BlogPost';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../Models/Category';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private BlogPostsUrl:string
  private CategoriesUrl:string
  env = environment;

  public updatedPost;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, public authService: AuthenticationService) {
    this.BlogPostsUrl = `${this.env.backendUri}/blog`;
    this.CategoriesUrl = `${this.env.backendUri}/category`;
   }

   private getHeaders()
   {
     return new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': `Bearer ${this.authService.getToken()}`
     })
   }
  
  getBlogPosts(): Observable<BlogPost[]>
  {
    return this.http.get<BlogPost[]>(this.BlogPostsUrl + '/all');
  }

  getBloPostsByCategory(category: number): Observable<BlogPost[]>
  {
    return this.http.get<BlogPost[]>(`${this.BlogPostsUrl}/category/${category}`)
  }
  
  getBlogPost(id:number): Observable<BlogPost>
  {
    return this.http.get<BlogPost>(`${this.BlogPostsUrl}/${id}`);
  }
  
  addBlogPost(blogPost: BlogPost): Observable<BlogPost>
  {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.post<BlogPost>(this.BlogPostsUrl+'/add', blogPost, httpOptions);
  }

  addCategory(category: Category): Observable<Category>
  {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.post<Category>(this.CategoriesUrl+'/add', category, httpOptions);
  }

  getAllCategories():Observable<Category[]>
  {
    return this.http.get<Category[]>(this.CategoriesUrl + '/all');
  }

  deleteBlogPost(id:number): Observable<BlogPost>
  {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.delete<BlogPost>(`${this.BlogPostsUrl}/${id}`, httpOptions);
  }

  deleteCategory(id:number): Observable<Category>
  {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.delete<Category>(`${this.CategoriesUrl}/${id}`, httpOptions);
  }

  updateBlogPost(blogPost: BlogPost):Observable<BlogPost>
  {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.put<BlogPost>(`${this.BlogPostsUrl}/${blogPost.id}`, blogPost, httpOptions);
  }

  updateCategory(category: Category):Observable<Category>
  {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.put<Category>(`${this.CategoriesUrl}/${category.id}`, category, httpOptions);
  }
}
