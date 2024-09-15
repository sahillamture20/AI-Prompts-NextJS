"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true); // Optional: Show loading state while fetching data
  const [error, setError] = useState(null); // Optional: Capture any errors during fetch

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (!response.ok) throw new Error('Failed to fetch prompt details');
        
        const data = await response.json();

        if (data.prompt && data.tag) {
          setPost({
            prompt: data.prompt,
            tag: data.tag,
          });
        } else {
          throw new Error('Invalid data received');
        }
      } catch (error) {
        setError(error.message); // Capture any errors that occur
      } finally {
        setLoading(false); // Stop loading after fetch is complete
      }
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) {
      alert("Missing PromptId!");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        throw new Error('Failed to update prompt');
      }
    } catch (error) {
      console.log(error);
      alert("Error updating prompt: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading prompt details...</p>; // Show a loading state
  if (error) return <p>Error: {error}</p>; // Show any fetch errors

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
