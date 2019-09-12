import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainFormComponent } from './main-form/main-form.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { BenefitScenariosComponent } from './benefit-scenarios/benefit-scenarios.component';
import { EarningsComponent } from './earnings/earnings.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddScenarioModalComponent } from './add-scenario-modal/add-scenario-modal.component';
import { BlogMainComponent } from './blog-main/blog-main.component';
import { BlogThumbnailComponent } from './blog-thumbnail/blog-thumbnail.component';
import { BlogPostDetailsComponent } from './blog-post-details/blog-post-details.component';
import { NewBlogPostComponent } from './new-blog-post/new-blog-post.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CategoriesManagerComponent } from './Modals/categories-manager/categories-manager.component';
import { CategoryUpdateComponent } from './Modals/category-update/category-update.component';
import { CategoryDeleteComponent } from './Modals/category-delete/category-delete.component';
import { CategoriesMainComponent } from './Categories/categories-main/categories-main.component';

@NgModule({
  declarations: [
    AppComponent,
    MainFormComponent,
    PersonalDetailsComponent,
    BenefitScenariosComponent,
    EarningsComponent,
    AddScenarioModalComponent,
    BlogMainComponent,
    BlogThumbnailComponent,
    BlogPostDetailsComponent,
    NewBlogPostComponent,
    CategoriesManagerComponent,
    CategoryUpdateComponent,
    CategoryDeleteComponent,
    CategoriesMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    CKEditorModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
  entryComponents: [
    AddScenarioModalComponent,
    CategoriesManagerComponent,
    CategoryDeleteComponent,
    CategoryUpdateComponent
  ]
})
export class AppModule { }
