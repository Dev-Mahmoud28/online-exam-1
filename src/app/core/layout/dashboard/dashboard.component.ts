import { Component, inject, signal } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from "../../../shared/components/ui/breadcrumb/breadcrumb.component";
import { BreadcrumbService } from '../../../shared/services/breadcrumb/breadcrumb.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, RouterOutlet, BreadcrumbComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private _breadcrumbService = inject(BreadcrumbService);

  items = signal<MenuItem[]>(this._breadcrumbService.breadItems());
}
