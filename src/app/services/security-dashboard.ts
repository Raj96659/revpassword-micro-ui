import { Component, OnInit } from '@angular/core';
import { SecurityService } from './security.service';
import { ChangeDetectorRef } from '@angular/core';

interface SecurityAuditResponse {
  weakPasswords: number;
  strongPasswords: number;
  reusedPasswords: number;
}

@Component({
  selector: 'app-security-dashboard',
  templateUrl: './security-dashboard.html',
  styleUrls: ['./security-dashboard.css']
})
export class SecurityDashboardComponent implements OnInit {

  score = 0;
  userId = 0;

  audit: SecurityAuditResponse = {
    weakPasswords: 0,
    strongPasswords: 0,
    reusedPasswords: 0
  };

  constructor(
  private securityService: SecurityService,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {

    const token = localStorage.getItem("token");
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    this.userId = payload.userId;

    this.loadAudit();
  }

  loadAudit(): void {

    this.securityService.getAudit(this.userId)
      .subscribe(res => {

        console.log("API RESPONSE:", res);

        this.audit = { ...res };
        this.cdr.detectChanges();

        const total =
          res.weakPasswords +
          res.strongPasswords +
          res.reusedPasswords;

        if (total > 0) {
          this.score = Math.round((res.strongPasswords / total) * 100);
        } else {
          this.score = 0;
        }

      });

  }

}