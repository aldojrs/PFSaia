import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: User[] }>(),
    'Load Users Failure': props<{ error: unknown }>(),

    'Create User': props<{ data: User }>(),
    'Create User Failure': props<{ error: unknown }>(),

    'Update User': props<{ data: User }>(),
    'Update User Failure': props<{ error: unknown }>(),

    'Delete User': props<{ id: string }>(),
    'Delete User Failure': props<{ error: unknown }>(),

    'User Success': props<{ data: User }>(),
  }
});
