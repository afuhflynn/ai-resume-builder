import { Session } from "better-auth";
import { prisma } from "./prisma";

/**
 * Checks if the current session belongs to an administrator.
 * Assumes the User model has an `isAdmin: Boolean` field.
 *
 * @param session The user session object.
 * @returns {boolean} True if the user is an admin, false otherwise.
 */
export async function isAdmin(
  session: Session | null | undefined
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: session?.userId!, isAdmin: true },
  });
  return user?.isAdmin!;
}
