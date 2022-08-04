import {createSelector} from 'reselect';

const selectUser=state=>state.user;

export const selectCurrentUser= createSelector(
[selectUser] // we can have multiple imput selectors in this array
,(user=> user.currentUser)
);

