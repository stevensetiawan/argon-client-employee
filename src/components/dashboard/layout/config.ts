import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  {
    key: 'attendance',
    title: 'Attendance',
    href: paths.dashboard.attendance,
    icon: 'timer',
  },
  { key: 'attendances-summary', title: 'Attendances Summary', href: paths.dashboard.attendancesSummary, icon: 'file' },
] satisfies NavItemConfig[];
