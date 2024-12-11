'use client';
import {useEffect, useState} from 'react';

import { useRouter,useSearchParams } from 'next/navigation';
import Form from '@components/Form';


const EditPrompt = () => {
    const router=useRouter();
    const searchParams=useSearchParams();
    const promptId=searchParams.get('id');

    
    const [submitting, setsubmitting] = useState(false);
    const [post, setpost] = useState({
        prompt:'',
        tag:'',
    })


    useEffect(()=>{
        const getPromptDetails=async()=>{
            const response=await fetch(`/api/prompt/${promptId}`);


            const data=await response.json();

            setpost({
                prompt:data.prompt,
                tag:data.tag,
            })
        }

        if(promptId) getPromptDetails()

    },[promptId])

    const updatePrompt=async(e)=>{
        e.preventDefault();   //prevent the default behaviour of the browser re-loading 

        setsubmitting(true);

        if(!promptId) return alert('prompt id not found');




        try{
            if (!session?.user.id) {
                alert("You must be signed in to create a prompt");
                return;
            }
            
const response=await fetch('/api/prompt/${promptId}',{
    method:'PATCH',
    body:JSON.stringify({
        prompt:post.prompt,
        
        tag:post.tag
    })
})

if(response.ok){
    router.push('/');
}
        }catch(error){
            console.log(error);
        }
        finally{
            setsubmitting(false);
        }
    }


  return (
    <Form type="Edit"
    post={post}
    setpost={setpost}
    submitting={submitting}
    handleSubmit={updatePrompt}
    
    ></Form>
  )
}

export default EditPrompt