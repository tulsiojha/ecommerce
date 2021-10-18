/** @format */

export default function Backdrop(params) {
  const { open } = params;
  if (open) {
    return (
      <div className="z-2000 fixed bg-gray-400 bg-opacity-80 w-full h-full inset-0 flex items-center justify-center">
        {params.children}
      </div>
    );
  } else {
    return "";
  }
}
