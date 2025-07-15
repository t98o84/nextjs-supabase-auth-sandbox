"use client";

import Image from "next/image";
import { useUser } from "./UserProvider";
import GoogleAuth from "./GoogleAuth";
import { signOut } from "@/app/actions/auth";

type User = NonNullable<ReturnType<typeof useUser>["user"]>;

export default function UserProfile() {
  const { user, loading } = useUser();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <UserProfileContent user={user} />;
  }

  return <Login />;
}

function Loading() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>
    </div>
  );
}

function UserProfileContent({ user }: { user: User }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-center text-xl font-bold mb-4 text-gray-900 dark:text-white">
        ユーザー情報
      </h2>

      <div className="space-y-4 mb-6">
        {user.user_metadata?.avatar_url && (
          <div className="flex justify-center">
            <Image
              src={user.user_metadata.avatar_url}
              alt="プロフィール画像"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-600"
            />
          </div>
        )}

        {user.user_metadata?.full_name && (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {user.user_metadata.full_name}
            </p>
          </div>
        )}

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>

        <div className="text-center">
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
            {user.app_metadata?.provider || "Unknown"} でログイン
          </span>
        </div>
      </div>

      <form action={signOut} className="w-full">
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/40"
        >
          ログアウト
        </button>
      </form>
    </div>
  );
}

function Login() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">
        ログイン
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
        Googleアカウントでログインしてください
      </p>
      <GoogleAuth />
    </div>
  );
}
