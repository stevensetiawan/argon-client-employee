export function objectToFormData<T = unknown>(obj: T): FormData {
  const formData = new FormData();
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (key === 'image' && obj[key] === '') continue;
      formData.append(key, obj[key] as string | Blob);
    }
  }
  return formData;
}
