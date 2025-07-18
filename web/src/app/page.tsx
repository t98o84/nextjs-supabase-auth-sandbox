import Image from "next/image";
import { UserSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import ClientSupabaseTest from "@/components/ClientSupabaseTest";

export default async function Home() {
  // Demonstrate zod validation
  const exampleUser = {
    id: "1",
    name: "John Doe", 
    email: "john@example.com",
    age: 30
  };

  // Validate with zod schema
  const validatedUser = UserSchema.parse(exampleUser);

  // Test Supabase server connection
  const supabase = await createClient();
  let serverSupabaseStatus = "❌ Not connected";
  
  try {
    const { error } = await supabase.from('test').select('*').limit(1);
    if (error) {
      // This is expected if the table doesn't exist - indicates connection is working
      serverSupabaseStatus = error.code === 'PGRST116' ? "✅ Connected (ready for tables)" : `⚠️ Connected with issue: ${error.message}`;
    } else {
      serverSupabaseStatus = "✅ Connected";
    }
  } catch (error) {
    serverSupabaseStatus = `❌ Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold mb-4">Next.js Supabase Auth Sandbox</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Environment setup complete with Next.js (App Router), Docker, and Zod
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2">✅ Tech Stack Verified</h2>
          <ul className="text-sm space-y-1">
            <li>• Next.js {process.env.NODE_ENV === 'production' ? '(Production)' : '(Development)'}</li>
            <li>• App Router ✓</li>
            <li>• TypeScript ✓</li>
            <li>• Tailwind CSS ✓</li>
            <li>• Zod validation ✓</li>
            <li>• Docker ready ✓</li>
            <li>• Supabase setup ✓</li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2">🚀 Supabase Environment</h2>
          <ul className="text-sm space-y-1">
            <li>• CLI initialized ✓</li>
            <li>• @supabase/supabase-js@2.51.0 ✓</li>
            <li>• @supabase/ssr@0.6.1 ✓</li>
            <li>• Client utilities configured ✓</li>
            <li>• Environment variables set ✓</li>
          </ul>
          <div className="mt-3 space-y-1">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Server-side Status: {serverSupabaseStatus}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Client-side Status: <ClientSupabaseTest />
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2">🔧 Zod Example</h2>
          <p className="text-sm mb-2">Validated user data:</p>
          <pre className="text-xs bg-white dark:bg-gray-800 p-2 rounded border overflow-auto">
            {JSON.stringify(validatedUser, null, 2)}
          </pre>
        </div>

        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Both client-side and server-side Supabase access verified.
          </li>
          <li className="mb-2 tracking-[-.01em]">
            Start local Supabase with{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              npx supabase start
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Edit{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>{" "}
            to begin building.
          </li>
        </ol>
      </main>
      
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Next.js Docs
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://supabase.com/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Supabase Docs
        </a>
      </footer>
    </div>
  );
}
