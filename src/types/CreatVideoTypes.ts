// src/types/VideoCreateTypes.ts

import { PostgrestError } from "@supabase/supabase-js";

// Minimal shape the user can submit at Step 1 (create)
export interface VideoInsertInput {
  id:string;
  title: string;                   // required
  user_id: string;                 // required
  description?: string | null;
  videoUrl?: string | null;        // may be added later in edit step
  thumbnailUrl?: string | null;    // may be added later in edit step
  videoStatus: boolean;            // public/private
  likes?: number | null;           // default 0 if omitted
  dislikes?: number | null;        // default 0 if omitted
  viewCount?: number | null;       // default 0 if omitted
}

// Shape for update at Step 2 (edit)
// Only editable fields are optional; id is required to target the row
export interface VideoUpdateInput {
  id: string;                      // required
  title?: string;
  description?: string | null;
  videoUrl?: string | null;
  thumbnailUrl?: string | null;
  videoStatus?: boolean;
  likes?: number | null;
  dislikes?: number | null;
  viewCount?: number | null;
}

// Row returned by Supabase from "video" table
export interface VideoRow {
  id: string;
  created_at: string | null;
  description: string | null;
  dislikes: number | null;
  likes: number | null;
  thumbnailUrl: string | null;
  title: string | null;
  user_id: string | null;
  videoStatus: boolean | null;
  videoUrl: string | null;
  viewCount: number | null;
}

// Generic return for add/update
export interface SupabaseOpResult<T> {
  data: T | null;
  error: PostgrestError | null;
}

// Hook result shape (for React hooks)
export interface HookResult<T> {
  data: T | null;
  error: PostgrestError | null;
  loading: boolean;
}
