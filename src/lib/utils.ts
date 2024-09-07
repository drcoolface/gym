import bcrypt from "bcryptjs";

export function saltAndHashPassword(password: any) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}
export const extractResourceAndAction = (pathname: string) => {
  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathSegments.length < 2) {
    return { resource: "", action: "" }; // Fallback if there are not enough segments
  }

  // Check if the last segment is a number (ID)
  const lastSegment = pathSegments[pathSegments.length - 1];
  const isID = !isNaN(Number(lastSegment));

  // Determine resource and action based on whether the last segment is an ID
  let resource = "";
  let action = "";

  if (isID) {
    // Format for resource/action/id
    resource = pathSegments[pathSegments.length - 3] || "";
    action = pathSegments[pathSegments.length - 2] || "";
  } else {
    // Format for resource/action
    resource = pathSegments[pathSegments.length - 2] || "";
    action = pathSegments[pathSegments.length - 1] || "";
  }

  // Return only resource if there's no action
  if (!action) {
    return { resource };
  }

  return { resource, action };
};
