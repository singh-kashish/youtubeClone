// // src/modules/subscriber.ts
// import { supabase } from "../components/utils/supabase";

// export async function addSubscriber(subscriber: { user_id: string; subscribed_to_id: string }) {
//   const { data, error } = await supabase
//     .from("subscribers")
//     .insert([subscriber])
//     .select()
//     .single();
//   if (error) throw error;
//   return data;
// }

// export async function deleteSubscriber(id: string) {
//   const { data, error } = await supabase
//     .from("subscribers")
//     .delete()
//     .eq("id", id)
//     .select()
//     .single();
//   if (error) throw error;
//   return data;
// }

// export async function getTotalSubscriberCountByProfile(creatorProfileId: string) {
//   const { count, error } = await supabase
//     .from('subscribers')
//     .select('id', { count: 'exact', head: true })
//     .eq('subscribed_to_id', creatorProfileId);
//   if (error) throw error;
//   return count ?? 0;
// }

// export async function currentUserSubscribedToProfile(userId: string, creatorProfileId: string) {
//   const { data } = await supabase
//     .from('subscribers')
//     .select('id')
//     .eq('subscribed_to_id', creatorProfileId)
//     .eq('user_id', userId)
//     .single();
//   return { isSubscribed: !!data, subscribedId: data?.id };
// }
// Chatgpt code below:-
// src/services/subscribersService.ts
// import { supabase } from "../components/utils/supabase";
// import { LoadSubscribersResponse } from "../types/VideoLoadTypes";

// export const subscribersService = {
//   async fetchSubscribersByUserId(userId: string): Promise<LoadSubscribersResponse> {
//     const { data, error } = await supabase
//       .from("subscribers")
//       .select("*")
//       .eq("subscribed_to_id", userId);

//     return {
//       subscribers: data ?? null,
//       error,
//       loading: false,
//     };
//   },

//   async subscribe(userId: string, subscribedToId: string): Promise<{ subscriber: any | null; error: any }> {
//     const { data, error } = await supabase.from("subscribers").insert({
//       user_id: userId,
//       subscribed_to_id: subscribedToId,
//     });

//     return {
//       subscriber: data?.[0] ?? null,
//       error,
//     };
//   },

//   async unsubscribe(userId: string, subscribedToId: string): Promise<{ error: any }> {
//     const { error } = await supabase
//       .from("subscribers")
//       .delete()
//       .eq("user_id", userId)
//       .eq("subscribed_to_id", subscribedToId);

//     return { error };
//   },
// };
import { supabase } from "../components/utils/supabase";
import { PostgrestError } from "@supabase/supabase-js";

export const getTotalSubscriberCountByProfile = async (profileId: string): Promise<number> => {
  const { data, error } = await supabase.from("subscribers").select("*").eq("subscribed_to_id", profileId);
  if (error) throw error;
  return data?.length ?? 0;
};

export const addSubscriber = async (dto: { user_id: string; subscribed_to_id: string }) => {
  const { data, error } = await supabase.from("subscribers").insert([dto]).single();
  if (error) throw error;
  return data;
};

export const deleteSubscriber = async (id: string) => {
  const { error } = await supabase.from("subscribers").delete().eq("id", id);
  if (error) throw error;
};

export const currentUserSubscribedToProfile = async(userId: string, profileId: string): Promise<{ isSubscribed: boolean; subscribedId: string | null; error: PostgrestError | null }> => {
  const { data:subscribers , error } = await supabase
    .from("subscribers")
    .select("id")
    .eq("user_id", userId)
    .eq("subscribed_to_id", profileId)
    .single();
  if (error && error.code !== 'PGRST116') { // Ignore "No rows found" error
    return { isSubscribed: false, subscribedId: null, error };
  }
  return { isSubscribed: !!subscribers, subscribedId: subscribers?.id ?? null, error: null };
} 

