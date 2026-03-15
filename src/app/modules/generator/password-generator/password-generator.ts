import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-generator.html',
  styleUrls: ['./password-generator.css']
})
export class Generator {

  password = '';
  length = 12;

  useUppercase = true;
  useNumbers = true;
  useSymbols = true;

  generate(){

    let chars = "abcdefghijklmnopqrstuvwxyz";

    if(this.useUppercase){
      chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if(this.useNumbers){
      chars += "0123456789";
    }

    if(this.useSymbols){
      chars += "!@#$%^&*";
    }

    let pass = '';

    for(let i=0;i<this.length;i++){
      pass += chars.charAt(Math.floor(Math.random()*chars.length));
    }

    this.password = pass;
  }

  copy(){

    if(!this.password) return;

    navigator.clipboard.writeText(this.password);
    alert("Password copied!");

  }

  getStrength(){

  if(!this.password) return "";

  let score = 0;

  if(this.password.length >= 12) score++;
  if(/[A-Z]/.test(this.password)) score++;
  if(/[0-9]/.test(this.password)) score++;
  if(/[!@#$%^&*]/.test(this.password)) score++;

  if(score <= 1) return "Weak";
  if(score === 2) return "Medium";
  if(score === 3) return "Strong";

  return "Very Strong";
}


}
