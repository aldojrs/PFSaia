import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from '../models';

export const usersFeatureKey = 'users';

export interface UsersState {
    users: User[];
    error: unknown;
}

export interface UserState {
    user: User;
    error: unknown;
}

export const initialState: UsersState = {
    users: [],
    error: null,
};

export const reducer = createReducer(
    initialState,
    on(UserActions.loadUsers, (state) => ({ ...state })),
    on(UserActions.loadUsersSuccess, (state, action) => ({ ...state, users: action.data })),
    on(UserActions.loadUsersFailure, (state, action) => ({ ...state, error: action.error })),

    on(UserActions.createUser, (state, action) => ({ ...state, user: action.data })), 
    on(UserActions.updateUser, (state, action) => ({ ...state, user: action.data })),
    on(UserActions.deleteUser, (state, action) => ({ ...state, user: action.id })),
);

export const usersFeature = createFeature({
    name: usersFeatureKey,
    reducer,
});
