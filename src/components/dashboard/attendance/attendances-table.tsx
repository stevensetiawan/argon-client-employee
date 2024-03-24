'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAttendances, selectAttendance } from '@/redux/reducers/attendance';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

import type { Attendance } from '@/types/attendance';

function noop(): void {
  // do nothing
}

export function AttendancesTable(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const attendanceState = useAppSelector(selectAttendance);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5;

  const paginatedAttendances = applyPagination(attendanceState.attendances ?? [], page, rowsPerPage);

  React.useEffect(() => {
    const promise = dispatch(getAttendances());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Start Work</TableCell>
              <TableCell>Finish Work</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAttendances.length > 0 ? (
              paginatedAttendances.map((row) => {
                return (
                  <TableRow hover key={row.id}>
                    <TableCell>
                      <RouterLink href={`/dashboard/employees/${row.employee_id}`}>
                        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                          <Avatar src={row.emp_photo} />
                          <Typography variant="subtitle2">{row.name}</Typography>
                        </Stack>
                      </RouterLink>
                    </TableCell>
                    <TableCell>{row.position}</TableCell>
                    <TableCell>{dayjs(row.created_at).format('MMM D, YYYY')}</TableCell>
                    <TableCell>{dayjs(row.time_in).format('hh:mm:ss')}</TableCell>
                    <TableCell>{dayjs(row.time_out).format('hh:mm:ss')}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography textAlign="center">Data not found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={paginatedAttendances.length}
        onPageChange={(e, p) => {
          setPage(p);
        }}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

function applyPagination(rows: Attendance[], page: number, rowsPerPage: number): Attendance[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
