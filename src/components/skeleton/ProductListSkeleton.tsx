function ProductListSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h2 className="text-2xl font-bold mb-6 text-gray-800">
        <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
      </h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="aspect-w-1 aspect-h-1 w-full mb-4 h-32 flex items-center justify-center bg-gray-100">
              {/* <svg
                className="w-12 h-12 text-gray-300 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg> */}
            </div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
            <div className="mt-4 flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductListSkeleton
