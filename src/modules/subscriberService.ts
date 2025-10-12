// src/modules/subscriber.ts

import { supabase } from "../components/utils/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { Subscriber } from "../types/Subscriber";

/**
 * Add subscriber row; returns inserted row
 */
export async function addSubscriber(payload: {
  user_id: string;
  subscribed_to_id: string;
}): Promise<Subscriber> {
  const { data, error } = await supabase
    .from("subscribers")
    .insert([payload])
    .select("*")
    .single();
  if (error) throw error;
  return data as Subscriber;
}

export const getTotalSubscriberCountByProfile = async (
  profileId: string
): Promise<number> => {
  const { data, error } = await supabase
    .from("subscribers")
    .select("id")
    .eq("subscribed_to_id", profileId);
  if (error) throw error;
  return data?.length ?? 0;
};

export const deleteSubscriber = async (id: string) => {
  const { error } = await supabase.from("subscribers").delete().eq("id", id);
  if (error) throw error;
};

/**
 * Check if current user is subscribed to profile; ignore "No rows found" error.
 */
export const currentUserSubscribedToProfile = async (
  userId: string,
  profileId: string
): Promise<{ isSubscribed: boolean; subscribedId: string | null; error: PostgrestError | null }> => {
  const { data: subscribers, error } = await supabase
    .from("subscribers")
    .select("id")
    .eq("user_id", userId)
    .eq("subscribed_to_id", profileId)
    .maybeSingle(); // use maybeSingle to avoid throwing on 0 rows

  if (error) {
    return { isSubscribed: false, subscribedId: null, error };
  }
  return { isSubscribed: !!subscribers, subscribedId: subscribers?.id ?? null, error: null };
};
