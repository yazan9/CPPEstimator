import { Injectable } from '@angular/core';
import { BlogPost } from '../Models/BlogPost';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../Models/Category';
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient) {
    this.BlogPostsUrl = `${this.env.backendUri}/blog`;
    this.CategoriesUrl = `${this.env.backendUri}/category`;
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
    return this.http.post<BlogPost>(this.BlogPostsUrl+'/add', blogPost, this.httpOptions);
  }

  addCategory(category: Category): Observable<Category>
  {
    return this.http.post<Category>(this.CategoriesUrl+'/add', category, this.httpOptions);
  }

  getAllCategories():Observable<Category[]>
  {
    return this.http.get<Category[]>(this.CategoriesUrl + '/all');
  }

  deleteBlogPost(id:number): Observable<BlogPost>
  {
    return this.http.delete<BlogPost>(`${this.BlogPostsUrl}/${id}`);
  }

  deleteCategory(id:number): Observable<Category>
  {
    return this.http.delete<Category>(`${this.CategoriesUrl}/${id}`);
  }

  updateBlogPost(blogPost: BlogPost):Observable<BlogPost>
  {
    return this.http.put<BlogPost>(`${this.BlogPostsUrl}/${blogPost.id}`, blogPost, this.httpOptions);
  }

  updateCategory(category: Category):Observable<Category>
  {
    return this.http.put<Category>(`${this.CategoriesUrl}/${category.id}`, category, this.httpOptions);
  }
}
