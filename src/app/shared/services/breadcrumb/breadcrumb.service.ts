import { Injectable, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private items = signal<MenuItem[]>([]) ;

  readonly breadItems = this.items.asReadonly();
  
  setItems(breadcrumbItems:MenuItem[]){
    this.items.set(breadcrumbItems);
  }
}
