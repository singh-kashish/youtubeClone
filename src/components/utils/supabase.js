import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_***REMOVED***URL;
const supabaseKey = process.env.NEXT_PUBLIC_***REMOVED******REMOVED***;

export const supabase = createClient(supabaseUrl, supabaseKey);
