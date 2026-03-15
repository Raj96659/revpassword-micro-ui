import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recover-password.html',
  styleUrls: ['./recover-password.css']
})
export class RecoverPasswordComponent {

  email = '';
  answer1 = '';
  answer2 = '';
  answer3 = '';
  newPassword = '';
  message = '';

  question1 = '';
  question2 = '';
  question3 = '';
  questionsLoaded = false;

  constructor(private auth: AuthService){}

  recover(){

    const data = {
      email: this.email,
      answer1: this.answer1,
      answer2: this.answer2,
      answer3: this.answer3,
      newPassword: this.newPassword
    };

    this.auth.recoverPassword(data).subscribe({

      next:(res:any)=>{
        this.message = res.message;
      },

      error:()=>{
        this.message = "Recovery failed";
      }

    });

  }

  loadQuestions(){

  if(!this.email) return;

  this.auth.getSecurityQuestions(this.email).subscribe({

    next:(res:any)=>{
      this.question1 = res.question1;
      this.question2 = res.question2;
      this.question3 = res.question3;

      this.questionsLoaded = true;
    },

    error:()=>{
      this.message = "User not found";
    }

  });

}

}