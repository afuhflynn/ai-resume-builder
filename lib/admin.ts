import { Session } from "better-auth";

/**
 * Checks if the current session belongs to an administrator.
 * Assumes the User model has an `isAdmin: Boolean` field.
 *
 * @param session The user session object.
 * @returns {boolean} True if the user is an admin, false otherwise.
 */
export function isAdmin(session: Session | null | undefined): boolean {
  return !!session?.user?.isAdmin;
}
