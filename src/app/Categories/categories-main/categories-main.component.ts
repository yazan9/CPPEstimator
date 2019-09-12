import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/Category';
import { BlogService } from 'src/app/services/blog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryDeleteComponent } from 'src/app/Modals/category-delete/category-delete.component';
import { Result } from 'src/app/Models/Result';
import { CategoryUpdateComponent } from 'src/app/Modals/category-update/category-update.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-categories-main',
  templateUrl: './categories-main.component.html',
  styleUrls: ['./categories-main.component.sass']
})
export class CategoriesMainComponent implements OnInit {

  AllCategories: Category[];
  NewCategory: Category;

  constructor(
    private blogService: BlogService, 
    private modalService: NgbModal,
    private location: Location
    ) { }

  ngOnInit() {
    this.NewCategory = new Category();
    this.blogService.getAllCategories().subscribe(categories => {
      this.AllCategories = categories;
    });
  }

  Done(){
    this.location.back();
  }

  onAdd(): void {
    this.blogService.addCategory(this.NewCategory).subscribe(category => {
      this.AllCategories.push(category);
      this.NewCategory = new Category();
    });
  }

  onDelete(category: Category): void {
    const modalRef = this.modalService.open(CategoryDeleteComponent);
    modalRef.componentInstance.DeletedCategory = category;

    modalRef.result.then((result) => {
      if (result === Result.Success) {
        const index: number = this.AllCategories.indexOf(category);
        if (index !== -1) {
          this.AllCategories.splice(index, 1);
        }
      }
    });
  }

  onUpdate(category: Category): void {
    const modalRef = this.modalService.open(CategoryUpdateComponent);
    modalRef.componentInstance.UpdatedCategory = category;

    modalRef.result.then((result) => {
      if (result === Result.Success) {
        const index: number = this.AllCategories.indexOf(category);
        if (index !== -1) {
          this.AllCategories[index] = category;
        }
      }
    });
  }
}