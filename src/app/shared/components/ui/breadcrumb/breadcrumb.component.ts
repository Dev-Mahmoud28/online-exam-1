import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BreadcrumbService } from '../../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  imports: [BreadcrumbModule ,RouterLink, RouterLinkActive],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
})
export class BreadcrumbComponent {
   private _breadcrumbService = inject(BreadcrumbService);

   items = computed(()=>{
    return this._breadcrumbService.breadItems();
   })
}
