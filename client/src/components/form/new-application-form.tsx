export const NewApplicationForm = () => {
  return (
    <div className="p-4">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Job Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Enter job title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Job Description
          </label>
          <textarea
            className="w-full p-2 border rounded-md h-24"
            placeholder="Enter job description"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Save Application
        </button>
      </form>
    </div>
  );
};
