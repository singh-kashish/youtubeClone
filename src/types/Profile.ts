import {Subscriber} from './Subscriber';
export interface Profile {
  __typename: "Profiles";
  avatar_url: string;
  full_name: string;
  id: string;
  username: string;
  updated_at: string;
  subscribersUsingSubscribers_subscribed_to_id_fkey: Array<Subscriber>;
}
