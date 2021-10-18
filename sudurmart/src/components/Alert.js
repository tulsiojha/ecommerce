/** @format */

export default function Alert(params) {
  const { open, onClose, type } = params;

  const colors = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
    warning: "bg-yellow-400",
  };
  return (
    <div
      class={`inline-block rounded shadow-md w-96 bg-opacity-90 fixed top-16 z-2000 ${
        colors[type]
      } transform transition-all ${open ? "right-0" : "-right-96"}`}
    >
      <div class="flex p-2 items-center justify-between text-white">
        <div class="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="w-6 h-6 mx-2 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div className="flex flex-col text-white">
            {params.children.length
              ? params.children.map((child, index) => (
                  <label key={index}>{child}</label>
                ))
              : ""}
          </div>
        </div>
        <button className="btn btn-ghost btn-sm text-white" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
