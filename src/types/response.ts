export interface APIResponse<T = unknown> {
  success: boolean;
  message: string;
  code: number;
  data: T;
}
