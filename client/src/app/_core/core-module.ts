import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './services/auth/auth-service';
import { DevelopersManagementService } from './services/logic/developers-management-service';
import { SecurityService } from './services/auth/security-service';
import { SnackbarService } from './services/util/snackbar-service';

@NgModule({
  declarations: [],
  providers: [SecurityService, AuthService, DevelopersManagementService, SnackbarService],
  imports: [CommonModule],
})
export class CoreModule {}
