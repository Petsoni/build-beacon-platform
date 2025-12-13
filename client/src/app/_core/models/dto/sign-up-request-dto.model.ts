export interface SignUpRequestDto {
  name: string;
  email: string;
  password: string;
  callbackURL?: string | undefined;
  rememberMe?: boolean | undefined;
}
