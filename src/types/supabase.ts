export interface SupabaseResponse<T> {
  data: T | null;
  error: any;
}
