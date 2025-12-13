import { inject, Injectable } from '@angular/core';
import { LoginRequestDto } from '../../models/dto/login-request-dto.model';
import { SignUpRequestDto } from '../../models/dto/sign-up-request-dto.model';
import { SnackbarService } from '../util/snackbar-service';
import { authClient } from './auth-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private snackbarService = inject(SnackbarService);
  private router = inject(Router);

  async loginWithEmail(loginRequest: LoginRequestDto) {
    return await authClient.signIn.email({
      ...loginRequest,
      callbackURL: 'http://localhost:4200/explore',
      fetchOptions: {
        onError: () => {
          this.snackbarService.showError('Incorrect username or password');
        },
      },
    });
  }

  async signUpWithEmail(signUpRequest: SignUpRequestDto) {
    return await authClient.signUp.email({
      ...signUpRequest,
      callbackURL: 'http://localhost:4200/explore',
      fetchOptions: {
        onSuccess: () => {
          this.snackbarService.showInfo(
            `Verification email has been sent to ${signUpRequest.email}`
          );
          this.router.navigate(['/explore']);
        },
      },
    });
  }

  async loginWithGithub() {
    return await authClient.signIn.social({
      provider: 'github',
    });
  }

  async logout() {
    return await authClient.signOut();
  }
}
