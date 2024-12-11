"use client";

import { useSession } from "next-auth/react";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";


import Profile from "@components/Profile";
const handleEdit=async(post)=>{
        router.push('/update-prompt?id=${post._id}')
}
const handleDelete=async(post)=>
{
    const hasConfirmed=Confirm("Are you sure you want to delete this prompt?");

    if(hasConfirmed){
        try{
            await  fetch(`/api/prompt/${post._id.toString()}`,{
                method:'DELETE',

            })

            const filteredPosts=osts.filter((p)=>p._id !==post._id);

            setPosts(filteredPosts);


        }catch(error){
            console.log(error);

        }
    }

}

const MyProfile = () => {
    const router=useRouter();

    const {data:session} =useSession();

    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        const fetchPosts=async()=>{
            const response=await fetch('/api/users/@{session?.user.id}/posts');
    
            const data=await response.json();
    
            if(session?.user.id) setPosts(data);

            
    
    
        }
        fetchPosts();
      },[]);


  return (
    <Profile name="My " desc="welcome to your personalised profile page"
    data={posts} handlEdit={handleEdit}
    handleDelete={handleDelete} />

)
}

export default MyProfile