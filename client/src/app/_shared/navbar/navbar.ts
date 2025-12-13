import { Component, inject } from '@angular/core';
import { UserManagementService } from '../../_core/services/logic/user-management-service';
import { SecurityService } from '../../_core/services/auth/security-service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  public userManagementService = inject(UserManagementService);
  private securityService = inject(SecurityService);
  private router = inject(Router);

  logout() {
    this.securityService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
