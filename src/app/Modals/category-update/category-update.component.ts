import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/Models/Category';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from 'src/app/services/blog.service';
import { Result } from 'src/app/Models/Result';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.sass']
})
export class CategoryUpdateComponent implements OnInit {

  @Input() public UpdatedCategory: Category;

  constructor(public activeModal: NgbActiveModal, private blogService: BlogService){}

  ngOnInit() {
  }

  Save()
  {
    if(this.UpdatedCategory.name == null || this.UpdatedCategory.name.trim() == "")
    return;
    this.blogService.updateCategory(this.UpdatedCategory).subscribe(()=>{
      this.activeModal.close(Result.Success);
    });
  }

}
