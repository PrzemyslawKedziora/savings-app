import { Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent{
  topics = ['teamt jedyneczka','jedziemy po ziolooo d-_b','jest poszukiwany przez mobbyn']
  defaultTopic = 'Select subject';
  supportTicketForm = this.fb.group({
    title: [this.defaultTopic, [Validators.required, Validators.minLength(12), Validators.maxLength(255)]],
    message: ['', Validators.required],
    sender: [sessionStorage.getItem('_user'),Validators.required]
  });

  constructor(private fb: FormBuilder,
              public userService: UserService ) {
  }
  changeColors(){
    const select = document.getElementById('select');
    select!.style.color = 'white';
  }

  onSubmit(){
    this.userService.sendMessageToSupport(this.supportTicketForm).subscribe(res=>{
      console.log(res);
    })
  }

}
