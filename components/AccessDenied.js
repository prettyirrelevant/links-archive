import Head from "next/head";
import Link from "next/link";
export default function AccessDenied() {
  return (
    <div className="h-screen bg-gradient-to-r from-gray-300 to-gray-100 font-nunito pb-10">
      <Head>
        <title>403(Access Denied) | LinksArchive</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="font-black text-gray-900 text-6xl">403</h1>
        <p className="text-gray-700 font-bold text-4xl">Access Denied</p>
        <p className="text-gray-500 font-bold text-3xl">
          Please
          <Link href="/">
            <a className="text-gray-700 hover:underline"> login </a>
          </Link>
          to continue!
        </p>
      </div>
    </div>
  );
}
