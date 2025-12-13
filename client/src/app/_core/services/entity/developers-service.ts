import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment-development';
import { DefaultAccountModel } from '../../models/default-account.model';
import { DashboardDeveloperModel } from '../../models/dashboard-developer.model';
import { DeveloperProjectModel } from '../../models/developer-project.model';

@Injectable({
  providedIn: 'root',
})
export class DevelopersService {
  private DEVELOPER_API = `${environment.API_URL}/developers`;

  constructor(private http: HttpClient) {}

  getAllDevelopers() {
    return lastValueFrom(this.http.get<DashboardDeveloperModel[]>(`${this.DEVELOPER_API}`));
  }

  updateXUsername(xUsername: string, userId: string) {
    return lastValueFrom(
      this.http.post<any>(`${this.DEVELOPER_API}/update-username`, {
        username: xUsername,
        userId: userId,
      })
    );
  }

  updateProjectDetailsAndStatus(projectDetails: DeveloperProjectModel) {
    return lastValueFrom(
      this.http.post<any>(`${this.DEVELOPER_API}/update-project-details`, projectDetails)
    );
  }
}
