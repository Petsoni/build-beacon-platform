import { DefaultAccountModel } from './default-account.model';
import { DeveloperProjectModel } from './developer-project.model';

export interface DashboardDeveloperModel {
  developerProject: DeveloperProjectModel;
  user: DefaultAccountModel;
}
