import { Component, input } from '@angular/core';

@Component({
  selector: 'app-diplomas-card',
  imports: [],
  templateUrl: './diplomas-card.component.html',
  styleUrl: './diplomas-card.component.css',
})
export class DiplomasCardComponent {

  imgSrc = input.required<string>();
  title = input.required<string>();
  describtion = input.required<string>();
}
