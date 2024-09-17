import React from "react";
import Link from "next/link";

interface UserListProps {
  users: any; // Update the type to include subscriptions
  totalUsers: number;
}

const UserList: React.FC<UserListProps> = ({ users, totalUsers }) => {
  return (
    <div className="max-w-3xl mx-auto p-4 text-red-400">
      <div className="text-white text-center py-4">
        Total records: {totalUsers ? totalUsers : "none"}
      </div>
      <ul className="space-y-4">
        {users &&
          users.map((user: any) => (
            <li
              key={user.u_id}
              className="p-4 border border-gray-200 rounded-md shadow-sm"
            >
              <div className="flex justify-between p-4 items-center">
                <div className="flex justify-between gap-8">
                  <div>
                    <h3 className="text-lg font-semibold">{user.user_name}</h3>
                    <h3 className="text-lg font-semibold">{user.role}</h3>
                  </div>
                  <p className="text-gray-400 text-pretty block">
                    {user.subscriptions &&
                      user.subscriptions.map((subscription: any) => (
                        <span key={subscription.p_id}>
                          {` Subscription: ${subscription.membership_plans.name}`}
                        </span>
                      ))}
                  </p>
                  <p className="text-gray-400 text-pretty block">
                    {user.subscriptions &&
                      user.subscriptions.map((subscription: any) => (
                        <span key={subscription.p_id}>
                          {`  Valid Days: ${subscription.validity_days}`}
                        </span>
                      ))}
                  </p>
                </div>

                <div className="flex flex-col gap-2 text-center">
                  <Link
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    href={`users/edit/${user.u_id}`}
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserList;
