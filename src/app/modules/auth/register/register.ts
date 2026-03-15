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
  password = '';
  twoFactorEnabled = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  register(){

    const data = {
      email: this.email,
      masterPassword: this.password,
      twoFactorEnabled: this.twoFactorEnabled
    };

    this.authService.register(data).subscribe(()=>{

      alert("Registration successful");

      this.router.navigate(['/login']);

    });

  }

}