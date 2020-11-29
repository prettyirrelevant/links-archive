import AccessDenied from "../components/AccessDenied";
import Info from "../components/Info";
import Card from "../components/Card";
import useSWR, { mutate } from "swr";
import { useToasts } from "react-toast-notifications";
import { signOut, useSession } from "next-auth/client";
import { useRef } from "react";
import axios from "axios";
import Head from "next/head";

const fetcher = url => axios.get(url).then(res => res.data);

export default function Profile() {
  let content;
  const { addToast } = useToasts();
  const { data, error } = useSWR("/api/get_links", fetcher);
  const [session, loading] = useSession();
  const inputText = useRef();

  function handleSubmit(e) {
    axios
      .post("/api/add_link", {
        url: inputText.current.value,
      })
      .then(res => {
        inputText.current.value = "";
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
  }

  if (typeof window !== "undefined" && loading) return null;

  if (error) {
    content = <Info text="Something went wrong!" />;
  }

  if (!data) {
    content = <Info text="Fetching links..." />;
  } else {
    if (data.length > 0) {
      content = data.map(el => <Card {...el} />);
    } else {
      content = <Info text="Nothing to display here. Add a link!" />;
    }
  }

  if (!session) return <AccessDenied />;

  return (
    <div className="bg-gradient-to-r from-gray-300 to-gray-100 font-nunito pb-10">
      <Head>
        <title>{session.name} | LinksArchive</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="container mx-auto px-2">
        <nav className="flex justify-center pt-4">
          <div>
            <img
              src={session.image}
              className="inline-block rounded-full w-12"
            />
            <span className="ml-2 inline-block font-extrabold text-lg uppercase">
              {session.name}
            </span>
          </div>
          <button
            className="font-bold uppercase ml-10 mr-2 text-base border-2 p-2 rounded-lg text-gray-100 bg-gray-800 border-gray-800"
            onClick={() => signOut("github")}
          >
            Sign Out
          </button>
        </nav>

        <div className="flex justify-center mt-10">
          <input
            ref={inputText}
            className=" border-2 border-gray-300 text-xl text-gray-800 rounded-xl px-4 py-2 w-4/5"
            type="search"
            placeholder="https://google.com.ng"
          />
          <button
            onClick={handleSubmit}
            className="px-2 ml-4 w-1/5 font-bold uppercase text-xl text-gray-900 bg-gray-100 rounded-xl outline-none focus:outline-none border-gray-800 border-2 hover:text-gray-200 hover:bg-gray-800"
          >
            Add
          </button>
        </div>
        <small className="px-2 font-bold text-sm text-gray-800 tracking-wider">
          Input isn't validated sha. Don't flex your hacking prowess here!
        </small>

        <div className="mt-16 grid md:grid-cols-2 gap-3">{content}</div>
      </div>
    </div>
  );
}
