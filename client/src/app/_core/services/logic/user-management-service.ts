import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../auth/auth-service';
import { DefaultAccountModel } from '../../models/default-account.model';
import { DevelopersManagementService } from './developers-management-service';
import { DashboardDeveloperModel } from '../../models/dashboard-developer.model';
import { DeveloperProjectModel } from '../../models/developer-project.model';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private authService = inject(AuthService);

  private _currentUser = signal<DefaultAccountModel>(null);

  public currentUser = this._currentUser.asReadonly();

  constructor() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    this._currentUser.set(this.authService.getSessionQueryState().data.user);
  }

  updateUsernameForUser(newUsername: string) {
    this._currentUser.update((user) => ({
      ...user,
      username: newUsername,
    }));
  }

  updateCurrentUserProject(newProjectDetails: DeveloperProjectModel) {
    this._currentUser.update((user) => ({
      ...user,
      currentProject: newProjectDetails,
    }));
  }
}
