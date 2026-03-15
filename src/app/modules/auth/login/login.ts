import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService){}

  login(){

    const data = {
      email: this.email,
      password: this.password
    };

    this.authService.login(data).subscribe({

      next: (res:any) => {

        // OTP flow
        if(res.message){

          this.message = res.message;

          localStorage.setItem("email", this.email);

          // ⚠ IMPORTANT: store userId if backend sends it
          if(res.userId){
            localStorage.setItem("userId", res.userId);
          }

          window.location.href = "/verify-otp";
        }

        // Direct login
        if(res.token){

          localStorage.setItem("token", res.token);
          localStorage.setItem("userId", res.userId);

          this.message = "Login successful";

          window.location.href = "/vault";
        }

      },

      error: (err) => {
        console.error(err);
        this.message = "Login failed. Check credentials.";
      }

    });

  }
}