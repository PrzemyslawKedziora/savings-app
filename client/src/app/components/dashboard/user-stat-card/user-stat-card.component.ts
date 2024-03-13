import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user-stat-card',
  standalone: true,
  imports: [],
  templateUrl: './user-stat-card.component.html',
  styleUrl: './user-stat-card.component.scss'
})
export class UserStatCardComponent {
  @Input() title!:string;
  @Input() data!:string;

}
