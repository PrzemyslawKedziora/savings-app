import { Component} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent{
  topics = ['Found bug','Need help with app','Other']
  defaultTopic = 'Select subject';
  supportTicketForm = this.fb.group({
    title: [this.defaultTopic, [Validators.required,this.isInArrayValidator(this.topics)]],
    message: ['', [Validators.required,Validators.minLength(12), Validators.maxLength(255)]],
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
    this.userService.sendMessageToSupport(this.supportTicketForm).subscribe();
  }
  isInArrayValidator(tab: string[]): ValidatorFn{
    return (control : AbstractControl) : ValidationErrors | null =>{
      if (!tab.includes(control.value)){
        return  {isInArray : true};
      }
      return null;
    }
  }
}
