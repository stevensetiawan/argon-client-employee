import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  {
    key: 'employees',
    title: 'Employees',
    href: paths.dashboard.employees,
    icon: 'users',
    matcher: {
      href: paths.dashboard.employees,
      type: 'startsWith',
    },
  },
  { key: 'attendances', title: 'Attendances', href: paths.dashboard.attendances, icon: 'timer' },
] satisfies NavItemConfig[];
