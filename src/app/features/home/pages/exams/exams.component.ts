import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PageTitleComponent } from "../../../../shared/components/ui/page-title/page-title.component";
import { DiplomasService } from '../../services/diplomas/diplomas.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Data } from '../../services/diplomas/interfaces/exams.interface';
import { ExamsCardComponent } from '../../components/exams-card/exams-card.component';
import { BackButtonComponent } from "../../../../shared/components/business/back-button/back-button.component";
import { BreadcrumbService } from '../../../../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-exams',
  imports: [PageTitleComponent, ExamsCardComponent, RouterLink, BackButtonComponent],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.css',
})
export class ExamsComponent implements OnInit{
  private _diplomasService = inject(DiplomasService);
  private _breadcrumbService = inject(BreadcrumbService)
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef); 
  diplomaId = signal<string>("");
  diplomaTitle = signal<string>("");
  examsList = signal<Data[]>([]);
  visible = signal<number>(6);
  
  showedExams = computed(()=>{
    return this.examsList().slice(0, this.visible());
  });

  setBreadcrumb(label:string, id:string){
    this._breadcrumbService.setItems([{label:"Diplomas", url:"/home/diplomas"},{label:label, url:`/home/exams/${id}`}]);
  }

  showMore(){
    this.visible.set(this.examsList().length);
  }

  getId(){
    this.diplomaId.set(this.activatedRoute.snapshot.paramMap.get("id")!);
  }

  getExams(){
    this._diplomasService.getExams(this.diplomaId()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next:(res)=>{
        this.examsList.set(res.payload.data);
      }
    })
  }

  getDiplomaById(){
    this._diplomasService.getDiplomaById(this.diplomaId()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next:(res)=>{
        this.diplomaTitle.set(res.payload.diploma.title);
        this.setBreadcrumb(this.diplomaTitle(),res.payload.diploma.id);
      }
    })
  }
  
  ngOnInit(): void {
    this.getId();
    this.getExams();
    this.getDiplomaById()
  }
}
