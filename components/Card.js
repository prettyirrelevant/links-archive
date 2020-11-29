import axios from "axios";
import { mutate } from "swr";
import { useToasts } from "react-toast-notifications";
import { useClipboard } from "use-clipboard-copy";

export default function Card(props) {
  const { addToast } = useToasts();
  const clipboard = useClipboard({
    copiedTimeout: 1600,
  });
  const handleDelete = id => {
    axios
      .post("/api/delete_link", { id })
      .then(res => {
        addToast(res.data.message, {
          appearance: "success",
          autoDismiss: true,
        });
        mutate("/api/get_links");
      })
      .catch(err =>
        addToast(err.message, {
          appearance: "error",
          autoDismiss: true,
        })
      );
  };
  return (
    <div className="bg-white rounded overflow-hidden shadow-md hover:shadow-lg relative">
      <img src={props.imageUrl} className="w-full h-32 sm:h-48 object-cover" />
      <div className="mt-4 px-2">
        <span className="font-bold">{props.title}</span>
        <span class="block text-gray-700 text-sm">{props.description}</span>
        <div className="flex justify-between items-center my-2">
          <input
            ref={clipboard.target}
            value={props.url}
            readOnly
            className="w-4/5 rounded-xl text-gray-100 bg-gray-600 px-2 mt-2 py-1"
          />
          <div className="mt-2 flex justify-center">
            <svg
              onClick={clipboard.copy}
              className="w-6 cursor-pointer text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
            <svg
              onClick={() => handleDelete(props.id)}
              className="ml-2 w-6 cursor-pointer text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        className={`bg-gray-700 text-gray-100 text-xs uppercase font-bold rounded-xl p-2 ${
          clipboard.copied ? "absolute" : "hidden"
        } top-0 mr-2 mt-2 right-0`}
      >
        <span>Copied!</span>
      </div>
    </div>
  );
}
