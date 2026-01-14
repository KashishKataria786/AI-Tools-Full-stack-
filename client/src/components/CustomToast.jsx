import toast from "react-hot-toast";

const CustomToast = () => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Kashish Kataria
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Backend server is using a free hosting service and may take
                8–10 seconds to warm up initially. Sorry for the inconvenience.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      duration: 5000,
    }
  );

  return null; // IMPORTANT
};

export default CustomToast;
