import { Injectable } from '@angular/core';
import { createAuthClient } from 'better-auth/client';
import { environment } from '../../../../environments/environment-development';

interface SessionState {
  data: any | null;
  error: any | null;
  isPending: boolean;
  isRefetching: boolean;
}

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000',
});

export const { signIn, signUp, useSession } = authClient;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getSessionQueryState(): SessionState {
    return authClient.useSession.get() as SessionState;
  }

  sendVerificationEmail(email: string) {
    return authClient.sendVerificationEmail({
      email: email,
      callbackURL: `${environment.CLIENT_URL}/profile`,
    });
  }
}
