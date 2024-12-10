'use client';
import {useState} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';


const CreatePrompt = () => {
    const router=useRouter();
    const {data:session}=useSession();
    const [submitting, setsubmitting] = useState(false);
    const [post, setpost] = useState({
        prompt:'',
        tag:'',
    })

    const createPrompt=async(e)=>{
        e.preventDefault();   //prevent the default behaviour of the browser re-loading 

        setsubmitting(true);


        try{
            if (!session?.user.id) {
                alert("You must be signed in to create a prompt");
                return;
            }
            
const response=await fetch('/api/prompt/new',{
    method:'POST',
    body:JSON.stringify({
        prompt:post.prompt,
        userId:session?.user.id,
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
    <Form type="Create"
    post={post}
    setpost={setpost}
    submitting={submitting}
    handleSubmit={createPrompt}
    
    ></Form>
  )
}

export default CreatePrompt