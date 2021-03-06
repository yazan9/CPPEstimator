import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BlogHelper } from '../Helpers/BlogHelper';
import { BlogService }  from '../services//blog.service';
import {BlogPost} from '../Models/BlogPost';

@Component({
  selector: 'app-blog-post-details',
  templateUrl: './blog-post-details.component.html',
  styleUrls: ['./blog-post-details.component.sass']
})
export class BlogPostDetailsComponent implements OnInit {
  
  public blogPost: BlogPost;
  public Helper = BlogHelper;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private location: Location
    ) { }

  ngOnInit() {
    this.getBlogPost();
  }
  
  getBlogPost(): void
  {
    const id = +this.route.snapshot.paramMap.get('id');
    this.blogService.getBlogPost(id).subscribe(blogPost => this.blogPost = blogPost);
  }

  onDelete(): void
  {
    this.blogService.deleteBlogPost(this.blogPost.id).subscribe(()=>this.location.back());
  }

  onUpdate():void{
    this.blogService.updatedPost = this.blogPost;
    this.router.navigate(['/new_post']);
  }
}
