/**
 * Site-wide announcement banner configuration.
 *
 * Set `enabled: false` (or remove/comment the export) to hide the banner.
 * The banner is also dismissible per-session by the visitor.
 */
export const announcement = {
  enabled: true,
  text: "International Tabletop Day is coming up on June 6th and 7th!",
  ctaText: "View Schedule",
  ctaHref:
    "https://forum.reroll.in/t/international-tabletop-day-weekend-june-6-7-underline-center/2811",
} as const;
