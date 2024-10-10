import { Switch } from "@headlessui/react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div className="hidden absolute top-[50%] translate-y-[-50%] right-3 items-center rotate-90">
      <Switch
        checked={isDarkMode}
        onChange={setIsDarkMode}
        className={`${
          isDarkMode ? "bg-gray-200" : "bg-gray-800"
        } relative inline-flex items-center h-6 rounded-full w-11`}
      >
        <span
          className={`${
            isDarkMode
              ? "translate-x-6 bg-gray-800"
              : "translate-x-1 bg-gray-200"
          } inline-block w-4 h-4 transform rounded-full transition-transform`}
        />
      </Switch>
    </div>
  );
};

export default ThemeToggle;
