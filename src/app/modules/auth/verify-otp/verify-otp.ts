import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './verify-otp.html',
  styleUrls: ['./verify-otp.css']
})
export class VerifyOtp {

  otp = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  verify(){

    const data = {
      email: localStorage.getItem("email"),
      otp: this.otp
    };

    this.authService.verifyOtp(data).subscribe((res:any)=>{

      localStorage.setItem("token", res.token);

      alert("Login successful");

      this.router.navigate(['/vault']);

    });

  }

}