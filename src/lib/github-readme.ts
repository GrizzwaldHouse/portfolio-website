/**
 * Parses a GitHub README to extract structured content.
 * Used at build time to enrich project cards with README data.
 */

export interface ParsedReadme {
  description: string | null;
  features: string[];
  techStack: string[];
}

export function parseReadme(markdown: string | null): ParsedReadme {
  if (!markdown) {
    return { description: null, features: [], techStack: [] };
  }

  return {
    description: extractFirstParagraph(markdown),
    features: extractSection(markdown, 'Features'),
    techStack: extractSection(markdown, 'Tech Stack'),
  };
}

/**
 * Extracts the first prose paragraph from a markdown string.
 *
 * Skips headings (`#`), badge images (`![...`), and admonitions (`[!...`)
 * at the top of the file, then collects consecutive non-empty, non-heading
 * lines into a single paragraph string.
 *
 * @param md - Raw markdown content.
 * @returns The first paragraph as a single string, or null if none found.
 */
function extractFirstParagraph(md: string): string | null {
  const lines = md.split('\n');
  const paragraphLines: string[] = [];
  let foundContent = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip headings, badges, and empty lines at the start
    if (!foundContent) {
      if (trimmed === '' || trimmed.startsWith('#') || trimmed.startsWith('![') || trimmed.startsWith('[!')) {
        continue;
      }
      foundContent = true;
    }

    if (foundContent) {
      if (trimmed === '' || trimmed.startsWith('#')) break;
      paragraphLines.push(trimmed);
    }
  }

  const result = paragraphLines.join(' ').trim();
  return result || null;
}

/**
 * Extracts bullet-point items from a named `## Section` in markdown.
 *
 * Searches for a level-2 heading matching `sectionName` (case-insensitive),
 * then collects all `- ` or `* ` list items until the next heading or EOF.
 *
 * @param md          - Raw markdown content.
 * @param sectionName - The heading text to search for (e.g., "Features", "Tech Stack").
 * @returns Array of trimmed list-item strings, or empty array if the section is missing.
 */
function extractSection(md: string, sectionName: string): string[] {
  const regex = new RegExp(`^##\\s+${sectionName}`, 'im');
  const match = md.match(regex);
  if (!match || match.index === undefined) return [];

  const afterHeader = md.slice(match.index + match[0].length);
  const lines = afterHeader.split('\n');
  const items: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#')) break; // Next section
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      items.push(trimmed.replace(/^[-*]\s+/, '').trim());
    }
  }

  return items;
}
