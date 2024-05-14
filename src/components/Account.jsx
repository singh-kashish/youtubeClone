import { useState, useEffect, useRef } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import styles from "./styles/Account.module.css";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import Avatar from "./Avatar";
import Link from "next/link";
import { brokenImage } from "../utils/constants";
import { useGetProfileQuery } from "../gql/graphql";
import { UPDATE_PROFILE } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [username, setUsername] = useState(null);
  const [full_name, setFull_name] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(brokenImage);
  const [updateUserNameEnabled, setUpdateUserNameEnabled] = useState(false);
  const [updateFullNameEnabled, setUpdateFullNameEnabled] = useState(false);
  const [primaryButtonState, setPrimaryButtonState] = useState(null);
  const [updateProfiles] = useMutation(UPDATE_PROFILE);
  console.log(updateProfiles);
  const { data, loading, error } = useGetProfileQuery({
    variables: {
      id: user?.id,
    },
  });
  console.log(data?.profiles);
  let buttonText = () => {
    if (loading) {
      return "Loading";
    } else if (updateUserNameEnabled || updateFullNameEnabled) {
      return "Update User";
    } else {
      return "Click on Pen Icons Above to enable update for your UserName or FullName";
    }
  };
  useEffect(() => {
    if (session !== null && !loading) {
      setUsername(data?.profiles?.username);
      setFull_name(data?.profiles?.fullname);
      setAvatarUrl(data?.profiles?.avatarUrl);
    }
  }, [session]);

  // async function getProfile() {
  //   try {
  //     setLoading(true);

  //     let { data, error, status } = await supabase
  //       .from("profiles")
  //       .select(`username, full_name, avatar_url`)
  //       .eq("id", user?.id)
  //       .single();
  //     const originalAvatarOnInitialRender = useRef(avatar_url);
  //     if (error && status !== 406) {
  //       throw error;
  //     }

  //     if (data) {
  //       setUsername(data.username);
  //       setFull_name(data.full_name);
  //       setAvatarUrl(data.avatar_url);
  //     }
  //   } catch (error) {
  //     alert("Error loading user data!", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function updateProfile({ username, full_name, avatar_url }) {
    try {
      setLoading(true);
      const updates = {
        id: user.id,
        username,
        full_name,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;

      alert(
        "Sorry,we found an exceptional erro while uploading!, you could try again BUT if the picture changes on your profile."
      );
    } catch (error) {
      alert("Error updating the user data!", error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id={styles.main} className="py-2">
      <h1 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-gray-300 mb-1 pb-1">
        Edit Account Details
      </h1>
      <Avatar
        uid={user.id}
        url={avatar_url}
        size={150}
        where="login"
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ username, full_name, avatar_url });
        }}
      />
      <div className="my-2">
        <label htmlFor="email" className="mr-2">
          E-mail
        </label>
        <input id="email" type="text" value={session.user.email} disabled />
        <EditOffIcon fontSize="small" color="error" />
      </div>
      <div className="my-2">
        <label htmlFor="username" className="mr-2">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
          disabled={!updateUserNameEnabled}
        />
        {!loading && (
          <EditIcon
            fontSize="small"
            color="primary"
            onClick={(e) => {
              setUpdateUserNameEnabled(!updateUserNameEnabled);
            }}
            className="cursor-pointer hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none"
          />
        )}
      </div>
      <div className="my-2">
        <label htmlFor="full_name" className="mr-2">
          Full Name
        </label>
        <input
          id="full_name"
          type="full_name"
          value={full_name || ""}
          onChange={(e) => setFull_name(e.target.value)}
          disabled={!updateFullNameEnabled}
        />
        {!loading && (
          <EditIcon
            fontSize="small"
            color="primary"
            onClick={(e) => {
              setUpdateFullNameEnabled(!updateFullNameEnabled);
            }}
            className="cursor-pointer hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none"
          />
        )}
      </div>

      <div className="my-2">
        <Link href="/">
          <button
            className="py-2 px-4 shadow-md no-underline rounded-full bg-blue text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
            id={styles.updateButton}
            onClick={() => updateProfile({ username, full_name, avatar_url })}
            disabled={loading}
          >
            {buttonText()}
          </button>
        </Link>
      </div>

      <div className="my-2">
        <Link href="/">
          <button
            className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
            onClick={() => supabase.auth.signOut()}
            id={styles.signOutButton}
          >
            Sign Out
          </button>
        </Link>
      </div>
    </div>
  );
}
