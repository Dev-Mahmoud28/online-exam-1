import { Component, input } from '@angular/core';
import { ButtonComponent } from "../../../../shared/components/ui/button/button.component";

@Component({
  selector: 'app-exams-card',
  imports: [ButtonComponent],
  templateUrl: './exams-card.component.html',
  styleUrl: './exams-card.component.css',
})
export class ExamsCardComponent {

  imgSrc = input.required<string>();
  title = input.required<string>();
  questionsCount = input.required<number>();
  duration = input.required<number>();
  description = input.required<string>();

}
