import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800 flex flex-col items-center px-6 py-12">
      {/* Logo */}
      <div className="mb-4">
        <Image
          src="/images/logo.png"
          alt="TroupeChat Logo"
          width={180}
          height={180}
          priority
        />
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-blue-700 mb-2 text-center">
        Welcome to Troupe Chat
      </h1>
      <p className="text-center text-gray-600 max-w-xl mb-6">
        Connect with like-minded learners and creators through vibrant,
        interest-based communities.
      </p>

      {/* CTA Buttons */}
      <div className="flex space-x-4 mb-12">
        <Link
          href="/auth/register"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
        <Link
          href="/auth/login"
          className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
        >
          Sign In
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Join Troupes */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <Image
            src="/images/Troupes.svg"
            alt="Join Troupes"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            Join Troupes
          </h3>
          <p className="text-gray-600">
            Discover and join communities around your interests – from anime to
            programming to fitness.
          </p>
        </div>

        {/* Real-time Messaging */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <Image
            src="/images/Chat.svg"
            alt="Real-time Messaging"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            Real-time Messaging
          </h3>
          <p className="text-gray-600">
            Chat instantly with group members or start private conversations
            with other users.
          </p>
        </div>

        {/* Create Communities */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <Image
            src="/images/CreateTroupes.svg"
            alt="Create Communities"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            Create Communities
          </h3>
          <p className="text-gray-600">
            Start your own troupe and build a community around your passion or
            project.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-400 text-center">
        &copy; {new Date().getFullYear()} TroupeChat. All rights reserved.
      </footer>
    </main>
  );
}
