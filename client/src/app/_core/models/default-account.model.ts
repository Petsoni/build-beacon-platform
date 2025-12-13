import { DeveloperProjectModel } from './developer-project.model';

export interface DefaultAccountModel {
  id: string;
  name: string;
  username: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  currentProject: DeveloperProjectModel;
}
