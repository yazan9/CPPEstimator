import { Component, OnInit } from '@angular/core';
import { AllBlogPosts } from '../Mocks/MockBlogPosts';
import { BlogPost} from '../Models/BlogPost';
import { Categories } from '../Mocks/MockCategories';
import {Category} from '../Models/Category';
import { Month } from '../Models/Months';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-main',
  templateUrl: './blog-main.component.html',
  styleUrls: ['./blog-main.component.sass']
})
export class BlogMainComponent implements OnInit {
  
  AllPosts: BlogPost[];
  AllMonths=Month;
  AllCategories = Categories
  SelectedCategory: Category
  
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.getBlogPosts();
    this.SelectedCategory=this.AllCategories[0];
  }
  
  onSelect(category: Category): void 
  {
    this.SelectedCategory = category;
  }
  
  getBlogPosts():void
  {
    this.blogService.getBlogPosts().subscribe(blogPosts => this.AllPosts = blogPosts);
  }
}
