import { REGIONAL_PREFERENCES, INDUSTRY_SECTIONS } from "@/constants/resume";

/**
 * Get regional-specific formatting preferences
 */
export function getRegionalPreferences(regionalStandard: string | null) {
  if (!regionalStandard) {
    return REGIONAL_PREFERENCES.INTERNATIONAL;
  }

  return (
    REGIONAL_PREFERENCES[
      regionalStandard as keyof typeof REGIONAL_PREFERENCES
    ] || REGIONAL_PREFERENCES.INTERNATIONAL
  );
}

/**
 * Get industry-specific section recommendations
 */
export function getIndustrySections(industry: string | null) {
  if (!industry) {
    return INDUSTRY_SECTIONS.other;
  }

  return (
    INDUSTRY_SECTIONS[industry as keyof typeof INDUSTRY_SECTIONS] ||
    INDUSTRY_SECTIONS.other
  );
}

/**
 * Format date according to regional standard
 */
export function formatResumeDate(
  date: string,
  regionalStandard: string | null
): string {
  if (!date) return "";

  const preferences = getRegionalPreferences(regionalStandard);
  const dateFormat = preferences.dateFormat;

  try {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const day = String(d.getDate()).padStart(2, "0");

    if (dateFormat === "MM/YYYY") {
      return `${month}/${year}`;
    } else if (dateFormat === "DD/MM/YYYY") {
      return `${day}/${month}/${year}`;
    }

    return `${month}/${year}`;
  } catch {
    return date;
  }
}

/**
 * Format phone number according to regional standard
 */
export function formatPhoneNumber(
  phone: string,
  regionalStandard: string | null
): string {
  if (!phone) return "";

  const preferences = getRegionalPreferences(regionalStandard);
  // This is a simple placeholder - in production, use a library like libphonenumber-js
  return phone;
}

/**
 * Determine if photo should be included based on regional standard
 */
export function shouldIncludePhoto(regionalStandard: string | null): boolean {
  const preferences = getRegionalPreferences(regionalStandard);
  return preferences.includePhoto;
}

/**
 * Determine if age should be included based on regional standard
 */
export function shouldIncludeAge(regionalStandard: string | null): boolean {
  const preferences = getRegionalPreferences(regionalStandard);
  return preferences.includeAge;
}

/**
 * Determine if marital status should be included based on regional standard
 */
export function shouldIncludeMaritalStatus(
  regionalStandard: string | null
): boolean {
  const preferences = getRegionalPreferences(regionalStandard);
  return preferences.includeMaritalStatus;
}

/**
 * Get recommended sections order based on industry and region
 */
export function getRecommendedSectionsOrder(
  industry: string | null,
  regionalStandard: string | null
): string[] {
  const regionalPrefs = getRegionalPreferences(regionalStandard);
  const industryPrefs = getIndustrySections(industry);

  // Combine regional and industry preferences
  // Regional preferences take priority for order
  const sections = [...regionalPrefs.preferredSections];

  // Add industry-specific recommended sections that aren't already included
  industryPrefs.recommended.forEach((section) => {
    if (!sections.includes(section)) {
      sections.push(section);
    }
  });

  return sections;
}

/**
 * Get template style adjustments based on regional standard
 */
export function getTemplateStyleAdjustments(regionalStandard: string | null) {
  const preferences = getRegionalPreferences(regionalStandard);

  return {
    maxPages: preferences.maxPages,
    includePhoto: preferences.includePhoto,
    photoPosition: preferences.includePhoto ? "top-right" : null,
    headerStyle: regionalStandard === "EU" ? "detailed" : "compact",
    spacing:
      regionalStandard === "US" || regionalStandard === "CA"
        ? "normal"
        : "compact",
  };
}

/**
 * Get content guidelines based on industry
 */
export function getContentGuidelines(industry: string | null) {
  const industryPrefs = getIndustrySections(industry);

  return {
    emphasis: industryPrefs.emphasis,
    recommended: industryPrefs.recommended,
    optional: industryPrefs.optional,
  };
}

/**
 * Apply regional and industry formatting to resume data
 */
export function applyResumeFormatting(
  resumeData: any,
  industry: string | null,
  regionalStandard: string | null
) {
  const styleAdjustments = getTemplateStyleAdjustments(regionalStandard);
  const sectionsOrder = getRecommendedSectionsOrder(industry, regionalStandard);
  const contentGuidelines = getContentGuidelines(industry);

  return {
    ...resumeData,
    _formatting: {
      styleAdjustments,
      sectionsOrder,
      contentGuidelines,
      regionalStandard,
      industry,
    },
  };
}
