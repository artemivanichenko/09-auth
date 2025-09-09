"use client";

import { getMe, userUpdate } from "@/lib/api/clientApi";
import css from "./EditProfilePage.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProfileUpdatePayload } from "@/types/user";
import { useState } from "react";

const EditProfile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getMe,
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (profileUpdPayload: ProfileUpdatePayload) =>
      userUpdate(profileUpdPayload),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["currentUser"], updatedUser);
      router.push("/profile");
    },
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const email = user?.email ?? "";
    const username = (formData.get("username") as string)?.trim();
    if (!username) {
      setFormError("Some error with username");
      return;
    }
    setFormError(null);
    mutate({ username, email });
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  if (isError || !user) {
    return <p>Unauthorized</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>

          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />

          <form action={handleSubmit} className={css.profileInfo}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">{`Username: ${user?.username}`}</label>
              <input
                id="username"
                name="username"
                type="text"
                className={css.input}
                defaultValue={user?.username}
              />
            </div>

            <p>{`Email: ${user?.email}`}</p>

            <div className={css.actions}>
              <button
                type="submit"
                className={css.saveButton}
                disabled={isPending}
              >
                {isPending ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className={css.cancelButton}
              >
                Cancel
              </button>
            </div>
            {formError && <p>{formError}</p>}
            {error && <p>Update failed</p>}
          </form>
        </div>
      </main>
    </>
  );
};

export default EditProfile;
