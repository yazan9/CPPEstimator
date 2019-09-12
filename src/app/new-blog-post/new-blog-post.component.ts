import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogService } from '../services/blog.service';
import {BlogPost} from '../Models/BlogPost';
import { Location } from '@angular/common';
import { Category } from '../Models/Category';
import { CRUDOperations } from '../Models/CRUDOperations';

@Component({
  selector: 'app-new-blog-post',
  templateUrl: './new-blog-post.component.html',
  styleUrls: ['./new-blog-post.component.sass']
})
export class NewBlogPostComponent implements OnInit {
  
  public Editor = ClassicEditor
  public AllCategories: Category[];
  public newBlogPost: BlogPost;
  SelectedCategory: Category
  Operation: CRUDOperations;

  constructor(
    private blogService: BlogService,
    private location: Location
    ) { }

  ngOnInit() {
    this.newBlogPost = this.blogService.updatedPost;
    this.blogService.updatedPost = undefined;

    if(this.newBlogPost != null)
    {
      this.Operation = CRUDOperations.Update
    }
    else
    {
      this.Operation = CRUDOperations.Add;
      this.newBlogPost = new BlogPost();
      this.newBlogPost.body = "";
    }
    this.blogService.getAllCategories().subscribe(categories => {
      this.AllCategories = categories;
      this.SelectedCategory = this.newBlogPost.category == null ? null : this.AllCategories.find(f => f.id == this.newBlogPost.category.id);
    });

  }

  onChange(category:Category)
  {
    console.log(category);
  }
  
  onSubmit()
  {
    this.newBlogPost.updated_at = new Date();
    this.newBlogPost.category = this.SelectedCategory;

    if(this.Operation === CRUDOperations.Add)
    {
      this.newBlogPost.created_at = new Date();   
      this.blogService.addBlogPost(this.newBlogPost).subscribe(()=>this.location.back());
    }
    else
      this.blogService.updateBlogPost(this.newBlogPost).subscribe(()=>this.location.back());
  }

}
