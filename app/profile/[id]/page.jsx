"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);
  const [userId, setUserId] = useState(null); // State to manage the unwrapped `params.id`

  useEffect(() => {
    // Unwrap `params.id` safely
    const unwrapParams = async () => {
      const id = await params?.id; // Await the `params` object
      setUserId(id);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/users/${userId}/posts`);
        const data = await response.json();
        setUserPosts(data);
      } catch (error) {
        console.error("Failed to fetch user posts:", error);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination.`}
      data={userPosts}
    />
  );
};

export default UserProfile;
