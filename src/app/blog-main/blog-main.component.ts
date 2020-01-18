import { Component, OnInit } from '@angular/core';
import { BlogPost} from '../Models/BlogPost';
import {Category} from '../Models/Category';
import { Month } from '../Models/Months';
import { BlogService } from '../services/blog.service';
import { BlogHelper } from '../Helpers/BlogHelper';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-blog-main',
  templateUrl: './blog-main.component.html',
  styleUrls: ['./blog-main.component.sass']
})
export class BlogMainComponent implements OnInit {
  
  AllPosts: BlogPost[];
  AllMonths=Month;
  AllCategories:Category[];
  SelectedCategory: Category
  public Helper = BlogHelper;
  FilterCategory: string;
  
  constructor(
    private blogService: BlogService, 
    private route: ActivatedRoute,
    public auth: AuthenticationService
    ) { }

  ngOnInit() {
    this.getBlogPosts();
    this.blogService.getAllCategories().subscribe(categories => 
      {
        this.AllCategories = categories;
        this.AllCategories.push(new Category);
      });
  }
  
  onSelect(category: Category): void 
  {
    this.SelectedCategory = category;
    this.blogService.getBloPostsByCategory(+this.SelectedCategory.id).subscribe(blogPosts => this.AllPosts = blogPosts);
  }

  onSelectAll(): void 
  {
    this.SelectedCategory = null;
    this.getBlogPosts();
  }
  
  getBlogPosts():void
  {
    this.route.queryParams.subscribe(params => {
      this.FilterCategory = params['category'];
    });

    if(this.FilterCategory === undefined || this.FilterCategory == "All")
      this.blogService.getBlogPosts().subscribe(blogPosts => this.AllPosts = blogPosts);
    else
      this.blogService.getBloPostsByCategory(+this.FilterCategory).subscribe(blogPosts => this.AllPosts = blogPosts);
  }
}
