import { createLoader, parseAsString, SingleParserBuilder, Values } from "nuqs";

export const searchParamsSchema = {
  callbackUrl: parseAsString,
  build_tab: parseAsString.withDefault("content"),
  build_active_tab: parseAsString.withDefault("editor"),
  build_ai_tab: parseAsString.withDefault("cover_letter"),
  page: parseAsString.withDefault("1"),
  limit: parseAsString.withDefault("10"),
};

type ParamsTypes = Values<{
  callbackUrl: SingleParserBuilder<string>;
  build_tab: SingleParserBuilder<string>;
  build_active_tab: SingleParserBuilder<string>;
  build_ai_tab: SingleParserBuilder<string>;
}>;

// Helper function to build URLs with current params
export const buildUrl = (
  href: string,
  overrides: Partial<typeof searchParamsSchema> = {},
  params: ParamsTypes
) => {
  const newParams = new URLSearchParams();
  const merged = { ...params, ...overrides };

  Object.entries(merged).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      newParams.set(key, value as string);
    }
  });

  return `${href}?${newParams.toString()}`;
};
