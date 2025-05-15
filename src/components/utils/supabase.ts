import { createClient } from "@supabase/supabase-js";
import {Database} from "../../../lib/database.types";

const supabaseUrl  = process.env.NEXT_PUBLIC_***REMOVED***URL;
const supabaseKey = process.env.NEXT_PUBLIC_***REMOVED******REMOVED***;
if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL and key must be provided");
  }
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
