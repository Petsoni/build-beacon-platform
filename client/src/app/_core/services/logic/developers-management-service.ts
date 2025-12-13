import { inject, Injectable, signal } from '@angular/core';
import { DevelopersService } from '../entity/developers-service';
import { DefaultAccountModel } from '../../models/default-account.model';
import { UserManagementService } from './user-management-service';
import { SnackbarService } from '../util/snackbar-service';
import { DashboardDeveloperModel } from '../../models/dashboard-developer.model';
import { DeveloperProjectModel } from '../../models/developer-project.model';

@Injectable({
  providedIn: 'root',
})
export class DevelopersManagementService {
  private developersService = inject(DevelopersService);
  private userManagementService = inject(UserManagementService);
  private snackbarService = inject(SnackbarService);

  private _allDevelopers = signal<DashboardDeveloperModel[]>([]);

  public allDevelopers = this._allDevelopers.asReadonly();

  getDevelopersForExplorePage() {
    this.developersService.getAllDevelopers().then((developers) => {
      this._allDevelopers.set(developers);
    });
  }

  updateUsername(xUsername: string, userId: string) {
    this.developersService.updateXUsername(xUsername, userId).then((data) => {
      this.userManagementService.updateUsernameForUser(data);
      this.snackbarService.showSuccess('X username changed');
    });
  }

  updateProjectDetails(newProjectDetails: DeveloperProjectModel) {
    this.developersService.updateProjectDetailsAndStatus(newProjectDetails).then((data) => {
      this.userManagementService.updateCurrentUserProject(data);
      this.snackbarService.showSuccess('Project status changed');
    });
  }
}
