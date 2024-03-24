import attendance from './reducers/attendance';
import employee from './reducers/employee';
import user from './reducers/user';

const combinedReducers = {
  attendance,
  user,
  employee,
};

export default combinedReducers;
