export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    account: '/dashboard/account',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
    attendance: '/dashboard/attendance',
    attendancesSummary: '/dashboard/attendances-summary',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
