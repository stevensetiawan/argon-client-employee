'use client';

import * as React from 'react';
import { FetchState } from '@/enums/Fetch';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectEmployee, updateEmployee } from '@/redux/reducers/employee';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Avatar, FormHelperText, MenuItem, Select, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import type { Employee, EmployeeParams } from '@/types/employee';

const schema = zod.object({
  name: zod.string().min(1, { message: 'Name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  phone: zod.string().refine((value) => /^[0-9,+-]*[0-9][0-9,+-]*$/.test(value), {
    message: 'Invalid phone number format',
  }),
  position: zod.string().min(1, { message: 'Position is required' }),
  password: zod.string().min(1, { message: 'Password is required' }),
  image: zod.string(),
});

const positions = [
  { value: 'hrd', label: 'HRD' },
  { value: 'staff', label: 'Staff' },
  { value: 'lead', label: 'Lead' },
] as const;

export function EmployeeDetailsForm({ user }: { user: Employee }): React.JSX.Element {
  const defaultValues = {
    email: user.email,
    password: '',
    position: user.position,
    phone: user.phone,
    name: user.name,
    image: '',
  } satisfies EmployeeParams;
  const dispatch = useAppDispatch();
  const employeeState = useAppSelector(selectEmployee);
  const [image, setImage] = React.useState<string | null>(user.emp_photo !== 'undefined' ? user.emp_photo : null);
  const [showPassword, setShowPassword] = React.useState<boolean>();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EmployeeParams>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: EmployeeParams): Promise<void> => {
      try {
        const promise = await dispatch(updateEmployee({ ...values, image: values.image, id: user.id })).unwrap();

        if (promise.code !== 200) {
          setError('root', { type: 'server', message: promise.message });
        }
      } catch (error) {
        setError('root', { type: 'server', message: 'Something went wrong' });
      }
    },
    [dispatch, setError, user.id]
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}

        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <FormControl fullWidth error={Boolean(errors.name)}>
                    <InputLabel>Name</InputLabel>
                    <OutlinedInput {...field} label="Name" type="text" />
                    {errors.name ? <FormHelperText>{errors.name.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <FormControl fullWidth error={Boolean(errors.email)}>
                    <InputLabel>Email address</InputLabel>
                    <OutlinedInput {...field} label="Email address" type="email" />
                    {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <FormControl fullWidth error={Boolean(errors.password)}>
                    <InputLabel>Change Password</InputLabel>
                    <OutlinedInput
                      {...field}
                      endAdornment={
                        showPassword ? (
                          <EyeIcon
                            cursor="pointer"
                            fontSize="var(--icon-fontSize-md)"
                            onClick={(): void => {
                              setShowPassword(false);
                            }}
                          />
                        ) : (
                          <EyeSlashIcon
                            cursor="pointer"
                            fontSize="var(--icon-fontSize-md)"
                            onClick={(): void => {
                              setShowPassword(true);
                            }}
                          />
                        )
                      }
                      label="Change Password"
                      type={showPassword ? 'text' : 'password'}
                    />
                    {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="position"
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Position</InputLabel>
                    <Select {...field} defaultValue="New York" label="Position" variant="outlined">
                      {positions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormControl fullWidth error={Boolean(errors.phone)}>
                    <InputLabel>Phone Number</InputLabel>
                    <OutlinedInput {...field} label="Phone Number" type="text" />
                    {errors.phone ? <FormHelperText>{errors.phone.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={2} xs={12}>
              <FormControl fullWidth>
                <Stack gap={3} alignItems="center">
                  {image ? (
                    <div>
                      <Avatar src={image} sx={{ height: '80px', width: '80px' }} />
                    </div>
                  ) : null}
                  <Button component="label" fullWidth variant="outlined">
                    Upload picture
                    <Controller
                      control={control}
                      name="image"
                      render={({ field }) => (
                        <input
                          {...field}
                          type="file"
                          hidden
                          onChange={(e) => {
                            field.onChange(e);
                            handleImageChange(e);
                          }}
                        />
                      )}
                    />
                  </Button>
                </Stack>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button disabled={employeeState.status === FetchState.LOADING} type="submit" variant="contained">
            {employeeState.status === FetchState.LOADING ? 'Loading...' : 'Save'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
