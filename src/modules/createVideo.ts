import { createClient } from '@supabase/supabase-js';
import { Video } from '../types/VideoLoadTypes'; // Assuming Video interface is defined in this path

// Initialize Supabase client
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Adds a video to the 'videos' table in Supabase.
 * @param video - The video object adhering to the Video interface.
 * @returns A promise resolving to the inserted video or an error.
 */
export async function addVideo(video: Video): Promise<{ data: any; error: any }> {
    const { data, error } = await supabase.from('videos').insert([video]);
    return { data, error };
}