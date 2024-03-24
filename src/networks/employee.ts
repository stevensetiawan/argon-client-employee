import type { EmployeeParams } from '@/types/employee';
import { objectToFormData } from '@/lib/object-to-form-data';

export async function fetchCreateEmployee(
  params: { data: EmployeeParams; token?: string | null },
  signal?: AbortSignal
) {
  const { data, token } = params;
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api_argon/v1/employee`);

  const payload = objectToFormData(data);

  const response = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: payload,
    signal,
  });

  const result = await response.json();

  return result;
}

export async function fetchUpdateEmployee(
  params: { data: EmployeeParams; token?: string | null },
  signal?: AbortSignal
) {
  const { data, token } = params;
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api_argon/v1/employee/${data.id}`);

  delete data.id;

  const payload = objectToFormData(data);

  const response = await fetch(`${url}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: payload,
    signal,
  });

  const result = await response.json();

  return result;
}

export async function fetchDetailEmployee(params: { data: number; token?: string | null }, signal?: AbortSignal) {
  const { data, token } = params;
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api_argon/v1/employee/${data}`);

  const payload = objectToFormData(data);

  const response = await fetch(`${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: payload,
    signal,
  });

  const result = await response.json();

  return result;
}

export async function fetchEmployees(params: { token?: string | null }, signal?: AbortSignal) {
  const { token } = params;
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api_argon/v1/employee`);

  const response = await fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    signal,
  });

  const result = await response.json();

  return result;
}
