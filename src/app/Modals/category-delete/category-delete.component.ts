import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from 'src/app/services/blog.service';
import { Category } from 'src/app/Models/Category';
import { Result } from 'src/app/Models/Result';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.sass']
})
export class CategoryDeleteComponent implements OnInit {
  
  @Input() public DeletedCategory: Category;

  constructor(public activeModal: NgbActiveModal, private blogService: BlogService){}

  ngOnInit() {
  }

  Save()
  {
    this.blogService.deleteCategory(this.DeletedCategory.id).subscribe(()=>{
      this.activeModal.close(Result.Success);
    });
  }
}
