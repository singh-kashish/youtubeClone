import react from "react";
import Account from "../src/components/Account";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import styles from "./styles/Login.module.css";

const Login = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  return (
    <div
      id={styles.main}
      className="mx-36 my-12 rounded-3xl p-4"
    >
      {/* If not logged in, gives component to log in else edit/update/review Account component */}
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      ) : (
        <Account session={session} />
      )}
    </div>
  );
};
export default Login;
