import { signIn } from "next-auth/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Head from "next/head";

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-r from-gray-300 to-gray-100 font-nunito pb-10">
      <Head>
        <title>LinksArchive</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content=" Store URLs of your favourite website, articles et al and retrieve 'em easily"
        />
      </Head>
      <nav className="flex justify-center">
        <div className="mt-2 text-gray-900 font-black text-4xl uppercase border-b-8 border-gray-800 rounded">
          Links Archive
        </div>
      </nav>
      <div className="pt-48 md:pt-64 mx-4 flex flex-col justify-center items-center ">
        <h1 className="text-xl text-center font-extrabold text-gray-900 md:text-4xl ">
          Store URLs of your favourite website, articles et al and retrieve 'em
          easily
        </h1>
        <h4 className="text-xl text-center text-gray-900 font-semibold md:text-3xl">
          Create an account and you're good to go!
        </h4>
        <button
          onClick={() => signIn("github")}
          className="p-2 mt-10 flex items-center text-gray-900 border-gray-400 border-2 rounded-lg hover:shadow-sm focus:shadow-sm focus:outline-none"
        >
          <FontAwesomeIcon icon={faGithub} size="2x" />
          <span className="text-lg ml-4 font-bold">Sign in with GitHub</span>
        </button>
      </div>
    </div>
  );
}
