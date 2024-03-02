import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: User[] }>(),

    'Create User': props<{ data: User }>(),
    'Update User': props<{ data: User }>(),
    'Delete User': props<{ id: string }>(),

    'User Success': props<{ data: String }>(),
    'User Failure': props<{ error: Error }>(),
  }
});
