import { Component, computed, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { PageTitleComponent } from '../../../../shared/components/ui/page-title/page-title.component';
import { DiplomasService } from '../../services/diplomas/diplomas.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Question } from '../../services/diplomas/interfaces/qeustions.interface';
import { BackButtonComponent } from '../../../../shared/components/business/back-button/back-button.component';
import { SubmissionReq } from '../../services/diplomas/interfaces/submition.interface';
import { BreadcrumbService } from '../../../../shared/services/breadcrumb/breadcrumb.service';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-questions',
  imports: [ButtonComponent, PageTitleComponent, BackButtonComponent, ProgressBarComponent],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent implements OnInit, OnDestroy {
  private _diplomasService = inject(DiplomasService);
  private _breadcrumbService = inject(BreadcrumbService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  examId = signal<string>('');
  duration = signal<number>(0);
  seconds = signal<number>(0);
  startedAt = signal<string>('');
  remainingTime = signal<number>(0);
  timerId?: ReturnType<typeof setInterval>;
  title = signal<string>('');
  questions = signal<Question[]>([]);
  answers = signal<{ questionId: string; answerId: string }[]>([]);
  currentIndex = signal<number>(0);
  currentQuestion = computed(() => {
    return this.questions()[this.currentIndex()];
  });

  progress = computed(() => {
    return `${((this.currentIndex() + 1) / this.questions().length) * 100}%`;
  });

  timeProgress = computed(() => {
    const total = this.duration() * 60;
    return Math.min(100, ((total - this.remainingTime()) / total) * 100);
  });

  timer = computed(() => {
    const total = this.remainingTime();
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });

  setBreadcrumb(labelDiploma: string, labelExam: string, idExam: string, idDiploma: string) {
    this._breadcrumbService.setItems([
      { label: 'Diplomas', url: '/home/diplomas' },
      { label: labelDiploma, url: `/home/exams/${idDiploma}` },
      { label: `${labelExam} Questions`, url: `/home/questions/${idExam}` },
    ]);
  }

  getId() {
    this.examId.set(this.activatedRoute.snapshot.paramMap.get('id')!);
  }

  getQuestions() {
    this._diplomasService
      .getQuestion(this.examId())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.questions.set(res.payload.questions);
          this.start();
        },
      });
  }

  getExamById() {
    this._diplomasService
      .getExamById(this.examId())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.duration.set(res.payload.exam.duration);
          this.remainingTime.set(this.duration() * 60);
          this.title.set(res.payload.exam.title);
          this.startedAt.set(res.payload.exam.createdAt);
          this.setBreadcrumb(
            res.payload.exam.diploma.title,
            this.title(),
            this.examId(),
            res.payload.exam.diplomaId,
          );
        },
      });
  }

  nextQuestion() {
    if (this.currentIndex() < this.questions().length - 1) {
      this.currentIndex.update((i) => i + 1);
      return;
    }

    this.submitAnswers();
  }

  previousQuestion() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((i) => i - 1);
    }
  }

  selectedAnswer(questionId: string, answerId: string) {
    this.answers.update((answers) => {
      const index = this.answers().findIndex((answer) => answer.questionId == questionId);
      if (index !== -1) {
        this.answers()[index].answerId = answerId;
        return [...this.answers()];
      }
      return [...answers, { questionId, answerId }];
    });
  }

  submitAnswers() {
    const data: SubmissionReq = {
      examId: this.examId(),
      answers: this.answers(),
      startedAt: this.startedAt(),
    };
    this._diplomasService
      .submission(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.router.navigate(['/home/result', res.payload.submission.id]);
        },
      });
  }

  start() {
    this.timerId = setInterval(() => {
      if (this.remainingTime() === 0) {
        clearInterval(this.timerId);
        this.submitAnswers();
        return;
      }
      this.remainingTime.update((s) => s - 1);
    }, 1000);
  }

  ngOnInit(): void {
    this.getId();
    this.getQuestions();
    this.getExamById();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }
}
