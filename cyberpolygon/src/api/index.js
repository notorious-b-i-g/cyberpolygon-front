// Импорты всех API клиентов
import * as AuthAPI from './auth';
import * as AvatarsAPI from './avatars';
import * as CategoriesAPI from './categories';
import * as CommentsAPI from './comments';
import * as CoursesAPI from './courses';
import * as EnvironmentsAPI from './environments';
import * as FilesAPI from './files';
import * as ForumsAPI from './forums';
import * as MarkdownAPI from './markdown';
import * as NotificationsAPI from './notifications';
import * as ResourcesAPI from './resources';
import * as TasksAPI from './tasks';
import * as TestsAPI from './tests';
import * as UserAPI from './user';
import * as VagrantAPI from './vagrant';
import apiClient from './apiClient';

// Объединенный API клиент
const API = {
  auth: AuthAPI,
  avatars: AvatarsAPI,
  categories: CategoriesAPI,
  comments: CommentsAPI,
  courses: CoursesAPI,
  environments: EnvironmentsAPI,
  files: FilesAPI,
  forums: ForumsAPI,
  markdown: MarkdownAPI,
  notifications: NotificationsAPI,
  resources: ResourcesAPI,
  tasks: TasksAPI,
  tests: TestsAPI,
  user: UserAPI,
  vagrant: VagrantAPI,
  client: apiClient
};

export default API; 