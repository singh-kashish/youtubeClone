import { useEffect, useState } from "react";
import { getProfileById } from "../supabase/queries";

import { PostgrestError } from "@supabase/supabase-js";


const useProfileById = (userId)=>{
    // const [profile,setProfile] = useState();
    // const [error,setError] = useState();
    // const [loading, setLoading] = useState(false);
    async function fetchProfile(userId){
        try{
            console.log('user>',userId);
            const data = getProfileById(userId);
            console.log(data);
        } catch(e){
            setError(e);
        } finally{
            return {profile,error,loading};
        }
    }
    useEffect(()=>{
        const t = fetchProfile();

    },[])
}

export default useProfileById;