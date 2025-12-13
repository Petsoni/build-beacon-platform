export interface LoginRequestDto {
  email: string;
  password: string;
  callbackURL?: string;
  rememberMe?: boolean;
}
