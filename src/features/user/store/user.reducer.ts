import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from '../models';

export const usersFeatureKey = 'users';

export interface State {
    users: User[];
    loading: boolean;
    error: unknown;
}

export const initialState: State = {
    users: [],
    loading: false,
    error: null,
};

export const reducer = createReducer(
    initialState,
    on(UserActions.loadUsers, (state) => ({ ...state, loading: true })),
);

export const usersFeature = createFeature({
    name: usersFeatureKey,
    reducer,
});
