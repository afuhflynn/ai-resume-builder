import { prisma } from "./prisma";

/**
 * Create a new version snapshot of a resume
 */
export async function createVersion(resumeId: string, data: any) {
  // Get the latest version number
  const latestVersion = await prisma.resumeVersion.findFirst({
    where: { resumeId },
    orderBy: { version: "desc" },
  });

  const nextVersion = (latestVersion?.version || 0) + 1;

  // Create new version
  const version = await prisma.resumeVersion.create({
    data: {
      resumeId,
      version: nextVersion,
      data,
    },
  });

  return version;
}

/**
 * Get all versions for a resume
 */
export async function getVersions(
  resumeId: string,
  options: {
    limit?: number;
    offset?: number;
  } = {}
) {
  const { limit = 50, offset = 0 } = options;

  const versions = await prisma.resumeVersion.findMany({
    where: { resumeId },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: offset,
    select: {
      id: true,
      version: true,
      createdAt: true,
      data: true,
    },
  });

  const total = await prisma.resumeVersion.count({
    where: { resumeId },
  });

  return {
    versions,
    total,
    hasMore: offset + limit < total,
  };
}

/**
 * Get a specific version by ID
 */
export async function getVersion(versionId: string) {
  const version = await prisma.resumeVersion.findUnique({
    where: { id: versionId },
    include: {
      resume: {
        select: {
          id: true,
          title: true,
          userId: true,
        },
      },
    },
  });

  return version;
}

/**
 * Restore a previous version
 * Creates a new version from the old data and updates the main resume
 */
export async function restoreVersion(resumeId: string, versionId: string) {
  // Get the version to restore
  const versionToRestore = await prisma.resumeVersion.findUnique({
    where: { id: versionId },
  });

  if (!versionToRestore || versionToRestore.resumeId !== resumeId) {
    throw new Error("Version not found or does not belong to this resume");
  }

  // Update the main resume content
  const updatedResume = await prisma.resume.update({
    where: { id: resumeId },
    data: {
      content: JSON.stringify(versionToRestore.data),
      updatedAt: new Date(),
    },
  });

  // Create a new version from the restored data
  const newVersion = await createVersion(resumeId, versionToRestore.data);

  return {
    resume: updatedResume,
    version: newVersion,
  };
}

/**
 * Compare two versions and return differences
 */
export async function compareVersions(versionId1: string, versionId2: string) {
  const [version1, version2] = await Promise.all([
    prisma.resumeVersion.findUnique({ where: { id: versionId1 } }),
    prisma.resumeVersion.findUnique({ where: { id: versionId2 } }),
  ]);

  if (!version1 || !version2) {
    throw new Error("One or both versions not found");
  }

  if (version1.resumeId !== version2.resumeId) {
    throw new Error("Versions belong to different resumes");
  }

  return {
    version1: {
      id: version1.id,
      version: version1.version,
      createdAt: version1.createdAt,
      data: version1.data,
    },
    version2: {
      id: version2.id,
      version: version2.version,
      createdAt: version2.createdAt,
      data: version2.data,
    },
    // The frontend will handle the actual diff comparison
  };
}

/**
 * Delete a specific version
 */
export async function deleteVersion(versionId: string, userId: string) {
  // Verify the version belongs to the user's resume
  const version = await prisma.resumeVersion.findUnique({
    where: { id: versionId },
    include: {
      resume: {
        select: { userId: true },
      },
    },
  });

  if (!version) {
    throw new Error("Version not found");
  }

  if (version.resume.userId !== userId) {
    throw new Error("Unauthorized");
  }

  // Don't allow deleting the only version
  const versionCount = await prisma.resumeVersion.count({
    where: { resumeId: version.resumeId },
  });

  if (versionCount <= 1) {
    throw new Error("Cannot delete the only version");
  }

  await prisma.resumeVersion.delete({
    where: { id: versionId },
  });

  return { success: true };
}

/**
 * Auto-save a version if content has changed
 * Prevents duplicate versions by checking if content is different
 */
export async function autoSaveVersion(resumeId: string, data: any) {
  // Get the latest version
  const latestVersion = await prisma.resumeVersion.findFirst({
    where: { resumeId },
    orderBy: { version: "desc" },
  });

  // If no versions exist, create one
  if (!latestVersion) {
    return createVersion(resumeId, data);
  }

  // Compare content to prevent duplicate versions
  const latestData = JSON.stringify(latestVersion.data);
  const newData = JSON.stringify(data);

  if (latestData === newData) {
    return latestVersion; // No changes, return existing version
  }

  // Content has changed, create new version
  return createVersion(resumeId, data);
}

/**
 * Clean up old versions (keep only the last N versions)
 */
export async function cleanupOldVersions(
  resumeId: string,
  keepCount: number = 20
) {
  const versions = await prisma.resumeVersion.findMany({
    where: { resumeId },
    orderBy: { version: "desc" },
    select: { id: true },
  });

  if (versions.length <= keepCount) {
    return { deleted: 0 };
  }

  const versionsToDelete = versions.slice(keepCount);
  const deleteIds = versionsToDelete.map((v) => v.id);

  await prisma.resumeVersion.deleteMany({
    where: {
      id: { in: deleteIds },
    },
  });

  return { deleted: deleteIds.length };
}
