/**
 * apps/server/src/lib/supabase.ts
 * 
 * Creates the supabaseAdmin client using the environment variables gathered
 * in the env object.
 * 
 * @author Isaac Miles
 */

import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

export const supabaseAdmin = createClient(
    /* supabaseURL       -> */ env.supabaseURL,
    /* supabaseSecretKey -> */ env.supabaseSecretKey
);
