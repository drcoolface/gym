// import cron from "node-cron";
import { subscriptions, PrismaClient } from "@prisma/client";

import dayjs from "dayjs";

const prisma = new PrismaClient();

// Function to update validity_days based on start_date
export const updateValidityDays = async (): Promise<void> => {
  try {
    console.log("Updating subscription validity...");
    // Get the current date
    const currentDate = dayjs().startOf("day");
    // Fetch all subscriptions
    const subscriptions: subscriptions[] = await prisma.subscriptions.findMany({
      where: {
        start_date: {
          lte: currentDate.toDate(), // Only consider subscriptions with start_date on or before today
        },
        end_date: {
          gte: currentDate.toDate(), // Ensure the end_date is on or after today
        },
      },
    });

    for (const subscription of subscriptions) {
      console.log(
        "Subscription:",
        subscription.sub_id,
        subscription.start_date
      );
      console.log("Subscription:", subscription.sub_id, subscription.end_date);

      // Calculate validity_days based on end_date
      const endDate = dayjs(subscription.end_date);
      const daysLeft = Math.max(0, endDate.diff(currentDate, "day")); // Calculate days remaining until the end_date
      console.log("Days left:", daysLeft, "\n");
      // Only update validity_days if it is not already correct
      if (subscription.validity_days !== daysLeft) {
        await prisma.subscriptions.update({
          where: { sub_id: subscription.sub_id },
          data: {
            validity_days: daysLeft,
          },
        });
      }
    }

    console.log("Subscription validity updated successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error updating subscription validity:", error);
    process.exit(0);
  }
};

updateValidityDays();

// Schedule the cron job to run daily at midnight (00:00)
// cron.schedule("0 0 * * *", () => {
//   console.log("Running daily subscription validity update...");
//   updateValidityDays();
// });

// NODE_OPTIONS='--loader ts-node/esm' npx ts-node jobs/updateValidity.ts
