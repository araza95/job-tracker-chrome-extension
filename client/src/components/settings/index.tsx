export const Settings = () => {
  return (
    <div className="p-4">
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Google Sheet Connection</h3>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Enter Google Sheet URL"
          />
        </div>

        <div>
          <h3 className="font-medium mb-2">Notifications</h3>
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>Enable follow-up reminders</span>
          </label>
        </div>
      </div>
    </div>
  );
};
