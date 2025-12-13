import { ProjectStatusEnum } from './enums/project-status.enum';

export interface DeveloperProjectModel {
  id: string;
  link: string;
  status: ProjectStatusEnum;
  title: string;
  userId: string;
}
