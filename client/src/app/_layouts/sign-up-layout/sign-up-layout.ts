import { Component } from '@angular/core';
import { SecurityService } from '../../_core/services/auth/security-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpRequestDto } from '../../_core/models/dto/sign-up-request-dto.model';

@Component({
  selector: 'sign-up-layout',
  standalone: false,
  templateUrl: './sign-up-layout.html',
  styleUrl: './sign-up-layout.css',
})
export class SignUpLayout {
  signUpForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.min(8)]),
  });
  constructor(private securityService: SecurityService) {}

  signIn() {
    this.securityService.signUpWithEmail(this.signUpForm.value as SignUpRequestDto);
  }
}
