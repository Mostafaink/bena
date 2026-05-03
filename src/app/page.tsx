import { getSupabaseClient } from '@/lib/supabaseClient';

// Example: fetch all rows from a "posts" table.
// Replace "posts" with your own table name once you've created it in Supabase.
async function getPosts(): Promise<{ configured: boolean; data: unknown[] }> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      console.error('Supabase error:', error.message);
      return { configured: true, data: [] };
    }
    return { configured: true, data: data ?? [] };
  } catch {
    return { configured: false, data: [] };
  }
}

export default async function Home() {
  const { configured, data: posts } = await getPosts();

  return (
    <main className="min-h-screen p-12 font-sans">
      <h1 className="text-3xl font-bold mb-4">Bena MVP</h1>

      {!configured ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-yellow-800">
          <p className="font-semibold mb-1">Supabase not configured</p>
          <p className="text-sm">
            Copy <code className="bg-yellow-100 px-1 rounded">.env.local.example</code> to{' '}
            <code className="bg-yellow-100 px-1 rounded">.env.local</code> and add your Supabase
            project URL and anon key.
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-500 mb-8">
            Connected to Supabase. Below are rows from the{' '}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">posts</code> table.
          </p>

          {posts.length === 0 ? (
            <p className="text-gray-400 italic">
              No data yet — add rows to the <strong>posts</strong> table in your Supabase project.
            </p>
          ) : (
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(posts, null, 2)}
            </pre>
          )}
        </>
      )}
    </main>
  );
}
