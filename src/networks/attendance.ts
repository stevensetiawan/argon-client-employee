export async function fetchAttendances(params: { token?: string | null }, signal?: AbortSignal) {
  const { token } = params;
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api_argon/v1/attendance`);

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
