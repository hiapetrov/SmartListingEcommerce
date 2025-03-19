export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">
        AI Listing Optimizer API
      </h1>
      <p className="text-xl mb-4">
        Welcome to the AI Listing Optimizer API
      </p>
      <p>
        This is the backend server for optimizing product listings
      </p>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          API documentation available at <a href="/api" className="text-blue-500 hover:underline">/api</a>
        </p>
        <p className="text-sm text-gray-500">
          Health check endpoint at <a href="/api/health" className="text-blue-500 hover:underline">/api/health</a>
        </p>
      </div>
    </main>
  );
}
