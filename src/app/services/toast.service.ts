import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  // show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
  //   this.toasts.push({ textOrTpl, ...options });
  // }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  showStandard(textOrTpl: string | TemplateRef<any>){
    this.toasts.push({ textOrTpl, delay: 2000});
  }

  showSuccess(textOrTpl: string | TemplateRef<any>,){
    this.toasts.push({ textOrTpl, classname: 'bg-success text-light', delay: 2000 });
  }

  showDanger(textOrTpl: string | TemplateRef<any>,){
    this.toasts.push({ textOrTpl, classname: 'bg-danger text-light', delay: 2000 });
  }
}