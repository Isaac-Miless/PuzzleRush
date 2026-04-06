/**
 * server/src/lib/env.ts
 * 
 * This file serves to expose the env as an object, to allow for easy
 * accesses in the remainder of the backend (instead of using process.env)
 * 
 * It also verifies that important environment variables exist, notably
 * anything relating to the supabase db
 * 
 * @author Isaac Miles
 */

import dotenv from "dotenv";

dotenv.config();

function requireEnv(name: string): string
{
    // Grab the ENV value of the given identifier
    const value = process.env[name];

    // If the given identifier does not exist, return an err
    if (!value)
    {
        throw new Error(`Missing environment variable: ${name}`);
    }

    // If it does exist, simply return
    return value;
}

// Export the env as an object
export const env = {
    nodeEnv: process.env.NODE_ENV ?? "development", // Dev by default
    port: Number(process.env.PORT ?? 3001), // 3001 by default
    supabaseURL: requireEnv("SUPABASE_URL"), // Must have this, as otherwise
                                             // there would be no auth, or 
                                             // db communication
    supabasePublishableKey: requireEnv("SUPABASE_PUBLISHABLE_KEY"),
    supabaseSecretKey: requireEnv("SUPABASE_SECRET_KEY"),
};
