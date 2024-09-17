import { db as prisma } from "@/lib/db";
import { saltAndHashPassword } from "./../src/lib/utils";

export async function seed() {
  const basicPlan = await prisma.membership_plans.create({
    data: {
      name: "Basic Plan",
      description: "A basic subscription plan",
      rate: 12, // Example rate
    },
  });

  const premiumPlan = await prisma.membership_plans.create({
    data: {
      name: "Premium Plan",
      description: "A premium subscription plan",
      rate: 22, // Example rate
    },
  });

  // Create some initial users
  const user1 = await prisma.users.create({
    data: {
      first_name: "John",
      last_name: "Doe",
      phone_number: "1234567890",
      role: "USER",
      password: saltAndHashPassword("password123"), // Note: In a real application, ensure passwords are hashed
      user_name: "johndoe",
    },
  });

  const user2 = await prisma.users.create({
    data: {
      first_name: "Jane",
      last_name: "Smith",
      phone_number: "0987654321",
      role: "ADMIN",
      password: saltAndHashPassword("password123"), // Note: In a real application, ensure passwords are hashed
      user_name: "janesmith",
    },
  });

  // Create some initial subscriptions
  await prisma.subscriptions.create({
    data: {
      u_id: user1.u_id,
      p_id: basicPlan.p_id,
      start_date: new Date(),
      validity_days: 30,
      end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
    },
  });

  await prisma.subscriptions.create({
    data: {
      u_id: user2.u_id,
      p_id: premiumPlan.p_id,
      start_date: new Date(),
      validity_days: 30,
      end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
    },
  });

  console.log("Database seeded successfully.");
}
