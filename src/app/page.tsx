import { authOptions } from "@/lib/auth";
import { updateValidityDays } from "jobs/updateValidity";

import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { seed } from "prisma/seed";
import React from "react";

const Home = async () => {
  const serverSession = await getServerSession(authOptions);

  // await seed().then(() => console.log("Seeded database"));
  // await updateValidityDays();

  if (!serverSession) {
    return <div>Unauthorized</div>;
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-72 min-h-40 bg-white rounded items-center justify-center p-4">
        <h1 className="text-blue-600">Welcome !</h1>
        <h1 className="text-blue-600">
          You are logged in as {serverSession?.user.first_name}!
        </h1>
      </div>
    </div>
  );
};

export default Home;
