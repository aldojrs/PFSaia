import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const usersState = createFeatureSelector<fromUser.UsersState>(
    fromUser.usersFeatureKey
);

export const userState = createFeatureSelector<fromUser.UserState>(
    fromUser.usersFeatureKey
);

export const selectUsers = createSelector(
    usersState,
    (state) => state.users
);

export const createUser = createSelector(
    userState,
    (state) => state.user
);

export const updateUser = createSelector(
    userState,
    (state) => state.user
);

export const deleteUser = createSelector(
    userState,
    (state) => state.user
);