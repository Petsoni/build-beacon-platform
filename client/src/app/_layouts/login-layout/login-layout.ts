import { Component, inject } from '@angular/core';
import { SecurityService } from '../../_core/services/auth/security-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequestDto } from '../../_core/models/dto/login-request-dto.model';
import { SnackbarService } from '../../_core/services/util/snackbar-service';

@Component({
  selector: 'login-layout',
  standalone: false,
  templateUrl: './login-layout.html',
  styleUrl: './login-layout.css',
})
export class LoginLayout {
  private securityService = inject(SecurityService);
  private snackbarService = inject(SnackbarService);

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.min(8)]),
  });

  login() {
    this.securityService.loginWithEmail(this.loginForm.value as LoginRequestDto);
  }
}
