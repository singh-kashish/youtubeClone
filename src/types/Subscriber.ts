export interface Subscriber {
  __typename: "Subscribers";
  id: string;
  subscribed_to_id: string;
  user_id: string;
}
