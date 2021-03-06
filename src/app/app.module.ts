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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LandingComponent } from './landing/landing/landing.component';
import { NavComponent } from './nav/nav.component';
import { ChildBenefitPeriodsComponent } from './components/child-benefit-periods/child-benefit-periods.component';
import { DisabilityPeriodsComponent } from './components/disability-periods/disability-periods.component';
import { NewChildBenefitComponent } from './Modals/new-child-benefit/new-child-benefit.component';
import { NewDisabilityPeriodComponent } from './Modals/new-disability-period/new-disability-period.component';
import { AdminComponent } from './components/admin/admin.component';
import { NgbdSortableHeader } from './directives/sortable.directive';
import { DecimalPipe } from '@angular/common';
import { UserActivateComponent } from './Modals/user-activate/user-activate.component';
import { UserPromoteComponent } from './Modals/user-promote/user-promote.component';
import { UserDeleteComponent } from './Modals/user-delete/user-delete.component';
import { UserDemoteComponent } from './Modals/user-demote/user-demote.component';
import { UserDeactivateComponent } from './Modals/user-deactivate/user-deactivate.component';
import { BenefitsGridComponent } from './components/benefits-grid/benefits-grid.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ProfileNameModalComponent } from './Modals/profile-name-modal/profile-name-modal.component';
import { LoadProfileModalComponent } from './Modals/load-profile-modal/load-profile-modal.component';
import { DeleteProfileComponent } from './Modals/delete-profile/delete-profile.component';
import { MonthDatePickerComponent } from './month-date-picker/month-date-picker.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordModalComponent } from './Modals/change-password-modal/change-password-modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { MonthDatePickerInlineComponent } from './month-date-picker-inline/month-date-picker-inline.component';

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
    CategoriesMainComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    NavComponent,
    ChildBenefitPeriodsComponent,
    DisabilityPeriodsComponent,
    NewChildBenefitComponent,
    NewDisabilityPeriodComponent,
    AdminComponent,
    NgbdSortableHeader,
    UserActivateComponent,
    UserPromoteComponent,
    UserDeleteComponent,
    UserDemoteComponent,
    UserDeactivateComponent,
    BenefitsGridComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileNameModalComponent,
    LoadProfileModalComponent,
    DeleteProfileComponent,
    MonthDatePickerComponent,
    EditProfileComponent,
    ChangePasswordModalComponent,
    ToastComponent,
    DateFormatPipe,
    MonthDatePickerInlineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    CKEditorModule,
    HttpClientModule
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent],
  
  entryComponents: [
    AddScenarioModalComponent,
    CategoriesManagerComponent,
    CategoryDeleteComponent,
    CategoryUpdateComponent,
    NewChildBenefitComponent,
    NewDisabilityPeriodComponent,
    UserDeleteComponent,
    UserActivateComponent,
    UserPromoteComponent,
    UserDeactivateComponent,
    UserDemoteComponent,
    ProfileNameModalComponent,
    LoadProfileModalComponent,
    DeleteProfileComponent,
    ChangePasswordModalComponent
  ]
})
export class AppModule { }
