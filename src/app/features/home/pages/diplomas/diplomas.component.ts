import {Diplomas} from './../../services/diplomas/interfaces/diplomas.interface';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PageTitleComponent } from "../../../../shared/components/ui/page-title/page-title.component";
import { DiplomasCardComponent } from "../../components/diplomas-card/diplomas-card.component";
import { DiplomasService } from '../../services/diplomas/diplomas.service';
import { RouterLink } from '@angular/router';
import { BreadcrumbService } from '../../../../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-diplomas',
  imports: [PageTitleComponent, DiplomasCardComponent, RouterLink],
  templateUrl: './diplomas.component.html',
  styleUrl: './diplomas.component.css',
})
export class DiplomasComponent implements OnInit{
  private _diplomasService = inject(DiplomasService);
  private _breadcrumbService = inject(BreadcrumbService);
  diplomas = signal<Diplomas[]>([]);
  visible = signal<number>(6);
  showedDiplomas = computed(()=>{
    return this.diplomas().slice(0,this.visible());
  });
  
  setBreadcrumb(){
    this._breadcrumbService.setItems([{label:'Diplomas', url:'/home/diplomas'}]);
  }

  showMore(){
    this.visible.set(this.diplomas().length);
  }

  getDiplomas(){
    this._diplomasService.getDiplomas().subscribe({
      next:(res)=>{
        this.diplomas.set(res.payload.data);
      }
    })
  }

  ngOnInit(): void {
    this.getDiplomas();
    this.setBreadcrumb();
  }

}
