import { Component, inject, OnInit, signal, DestroyRef, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiplomasService } from '../../services/diplomas/diplomas.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BackButtonComponent } from "../../../../shared/components/business/back-button/back-button.component";
import { PageTitleComponent } from "../../../../shared/components/ui/page-title/page-title.component";
import { ButtonComponent } from "../../../../shared/components/ui/button/button.component";
import { Location } from '@angular/common';
import { Analytic } from '../../services/diplomas/interfaces/result-by-id.interface';
import { ProgressBarComponent } from "../../components/progress-bar/progress-bar.component";

@Component({
  selector: 'app-result',
  imports: [BackButtonComponent, PageTitleComponent, ButtonComponent, ProgressBarComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent implements OnInit{
  private _diplomasService = inject(DiplomasService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private destroyRef = inject(DestroyRef);
  examTitle = signal<string>("");
  submissionId = signal<string>("");
  questionsNumber = signal<number>(0);
  wrongAnswers = signal<Analytic[]>([]);
  correct = signal<number>(0);
  inCorrect = signal<number>(0);
  progress = computed(()=>{
    return (this.correct()/ (this.questionsNumber())) * 100
  })
  getSubId(){
    this.submissionId.set(this.activatedRoute.snapshot.paramMap.get("id")!);
  }

  getSubmissionDetails(){
    this._diplomasService.submissionById(this.submissionId()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next:({payload})=>{
        this.examTitle.set(payload.submission.examTitle);
        this.questionsNumber.set(payload.submission.totalQuestions);
        this.wrongAnswers.set(payload.analytics.filter(a => a.isCorrect == false));
        this.correct.set(payload.submission.correctAnswers);
        this.inCorrect.set(payload.submission.wrongAnswers);
      }
    })
  }

  explore(){
    this.router.navigate(["/home/diplomas"]);
  }

  restart(){
    this.location.back();
  }

  ngOnInit(): void {
    this.getSubId();
    this.getSubmissionDetails();
  }
}
