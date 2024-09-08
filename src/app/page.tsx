import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const Home = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-72 min-h-40 bg-white rounded items-center justify-center p-4">
        <h1 className="text-blue-600">Welcome !</h1>
        <h1 className="text-blue-600">
          You are logged in as {session?.user.first_name}!
        </h1>
      </div>
    </div>
  );
};

export default Home;
