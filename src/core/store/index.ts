import { usersFeatureKey as usersFeatureName, reducer as usersReducer } from "../../features/user/store/user.reducer";

export const appReducers = {
    [usersFeatureName]: usersReducer,
};