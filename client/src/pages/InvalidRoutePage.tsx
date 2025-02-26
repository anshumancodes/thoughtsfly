const InvalidRoutePage = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-lg mb-8 text-center max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-[#e14f20] text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  };

 export default InvalidRoutePage 