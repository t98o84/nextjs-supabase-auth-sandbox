import { UserProvider } from "@/components/UserProvider";
import UserProfile from "@/components/UserProfile";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Google認証デモ
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Googleアカウントでログインしてください
          </p>
        </div>
        
        <UserProvider>
          <UserProfile />
        </UserProvider>
      </div>
    </div>
  );
}
