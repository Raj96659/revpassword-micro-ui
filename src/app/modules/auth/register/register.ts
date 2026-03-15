import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})

export class Register {

  email = '';
  username = '';
  password = '';
  twoFactorEnabled = false;

  securityQuestion1 = '';
  securityAnswer1 = '';

  securityQuestion2 = '';
  securityAnswer2 = '';

  securityQuestion3 = '';
  securityAnswer3 = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  register(){

    const data = {
      email: this.email,
      username: this.username,
      masterPassword: this.password,
      twoFactorEnabled: this.twoFactorEnabled,

      securityQuestion1: this.securityQuestion1,
      securityAnswer1: this.securityAnswer1,

      securityQuestion2: this.securityQuestion2,
      securityAnswer2: this.securityAnswer2,

      securityQuestion3: this.securityQuestion3,
      securityAnswer3: this.securityAnswer3
    };

    this.authService.register(data).subscribe(()=>{

      alert("Registration successful");

      this.router.navigate(['/login']);

    });

  }

}