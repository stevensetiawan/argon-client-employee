'use client';

import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { detailEmployee, selectEmployee } from '@/redux/reducers/employee';
import Grid from '@mui/material/Unstable_Grid2';

import { EmployeeDetailsForm } from '@/components/dashboard/employee/employee-details-form';
import { EmployeeInfo } from '@/components/dashboard/employee/employee-info';

export function EmployeeDetail({ employeeId }: { employeeId: number }): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const employeeState = useAppSelector(selectEmployee);

  React.useEffect(() => {
    const promise = dispatch(detailEmployee(employeeId));

    return () => {
      promise.abort();
    };
  }, [dispatch, employeeId]);

  if (!employeeState.employee) return null;

  return (
    <Grid container spacing={3}>
      <Grid lg={4} md={6} xs={12}>
        <EmployeeInfo user={employeeState.employee} />
      </Grid>
      <Grid lg={8} md={6} xs={12}>
        <EmployeeDetailsForm user={employeeState.employee} />
      </Grid>
    </Grid>
  );
}
