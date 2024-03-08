import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent {
  supportTicketForm!:FormGroup;
  topics = ['1','2','3']
  constructor(private fb: FormBuilder) {
   this.supportTicketForm = this.fb.group({
     category: ['', Validators.required],
     message: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(255)]],
   })
  }
}
