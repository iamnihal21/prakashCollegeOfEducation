import type { GlobalConfig } from 'payload'

export const MootCourt: GlobalConfig = {
  slug: 'moot-court',
  access: { read: () => true },
  fields: [
    // ---------- HERO ----------
    {
      name: 'heroBadge',
      type: 'text',
      defaultValue: 'Moot Court Society',
    },
    {
      name: 'heroTitle',
      type: 'text',
      defaultValue: 'Master the Art of',
    },
    {
      name: 'heroHighlight',
      type: 'text',
      defaultValue: 'Advocacy.',
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      defaultValue:
        'Moot court is where legal theory meets courtroom practice. Our students argue, rebut, and persuade — preparing to lead in real courtrooms across the nation.',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },

    {
      name: 'galleryImages',
      type: 'array',
      maxRows: 12,
      admin: { description: 'Photos shown as a grid below the hero section' },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          admin: { description: 'Optional caption, e.g. "Semi-final round"' },
        },
      ],
    },

    // ---------- ABOUT ----------
    {
      name: 'aboutTitle',
      type: 'text',
      defaultValue: 'More Than a Competition',
    },
    {
      name: 'aboutDescription',
      type: 'textarea',
      defaultValue:
        'Moot court at Prakash COllege Of educationis a rigorous simulation of appellate advocacy. Students research, draft memorials, and present oral arguments before panels of judges — honing skills that no classroom alone can teach.',
    },
    {
      name: 'aboutPoints',
      type: 'array',
      fields: [{ name: 'point', type: 'text', required: true }],
    },

    // ---------- STATS ----------
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        {
          name: 'iconType',
          type: 'select',
          options: [
            { label: 'Trophy', value: 'trophy' },
            { label: 'Award', value: 'award' },
            { label: 'Scale', value: 'scale' },
            { label: 'Gavel', value: 'gavel' },
            { label: 'Users', value: 'users' },
            { label: 'Target', value: 'target' },
          ],
        },
      ],
    },

    // ---------- UPCOMING COMPETITIONS ----------
    {
      name: 'upcomingCompetitions',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'date', type: 'text', required: true },
        { name: 'venue', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'prize', type: 'text' },
        { name: 'teamSize', type: 'text' },
        { name: 'deadline', type: 'text' },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'National', value: 'National' },
            { label: 'International', value: 'International' },
            { label: 'State', value: 'State' },
            { label: 'Intra-College', value: 'Intra-College' },
          ],
        },
        {
          name: 'color',
          type: 'select',
          options: [
            { label: 'Blue', value: 'from-blue-500 to-cyan-500' },
            { label: 'Purple', value: 'from-purple-500 to-pink-500' },
            { label: 'Amber', value: 'from-amber-500 to-orange-500' },
            { label: 'Green', value: 'from-green-500 to-emerald-500' },
            { label: 'Red', value: 'from-red-500 to-rose-500' },
          ],
        },
      ],
    },

    // ---------- ACHIEVEMENTS ----------
    {
      name: 'achievements',
      type: 'array',
      fields: [
        { name: 'year', type: 'text', required: true },
        { name: 'competition', type: 'text', required: true },
        { name: 'position', type: 'text', required: true },
        { name: 'participants', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },

    // ---------- FACILITIES ----------
    {
      name: 'facilities',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        {
          name: 'iconType',
          type: 'select',
          options: [
            { label: 'Gavel', value: 'gavel' },
            { label: 'Book', value: 'book' },
            { label: 'Scale', value: 'scale' },
            { label: 'Mic', value: 'mic' },
            { label: 'Briefcase', value: 'briefcase' },
            { label: 'Star', value: 'star' },
            { label: 'Check', value: 'check' },
          ],
        },
        {
          name: 'features',
          type: 'array',
          fields: [{ name: 'feature', type: 'text' }],
        },
      ],
    },
  ],
}
