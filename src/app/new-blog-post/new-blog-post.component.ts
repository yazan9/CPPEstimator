import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Categories } from '../Mocks/MockCategories';
import { BlogService } from '../services/blog.service';
import {BlogPost} from '../Models/BlogPost';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-blog-post',
  templateUrl: './new-blog-post.component.html',
  styleUrls: ['./new-blog-post.component.sass']
})
export class NewBlogPostComponent implements OnInit {
  
  public Editor = ClassicEditor
  public AllCategories = Categories
  public newBlogPost: BlogPost;

  constructor(
    private blogService: BlogService,
    private location: Location
    ) { }

  ngOnInit() {
    this.newBlogPost = new BlogPost();
  }
  
  onSubmit()
  {
    this.newBlogPost.Created = new Date();
    this.newBlogPost.Modified = new Date();
    this.newBlogPost.id = Math.random();
    
    this.blogService.addBlogPost(this.newBlogPost);
    
    this.location.back();
  }

}
