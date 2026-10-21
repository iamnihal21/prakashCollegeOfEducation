import type { CollectionConfig } from 'payload'

export const Activities: CollectionConfig = {
  slug: 'activities',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'date', 'featured'],
    group: 'Campus Life',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Guest Lecture', value: 'Guest Lecture' },
        { label: 'Seminar', value: 'Seminar' },
        { label: 'Workshop', value: 'Workshop' },
        { label: 'Conference', value: 'Conference' },
        { label: 'Cultural Event', value: 'Cultural' },
        { label: 'Sports Event', value: 'Sports' },
        { label: 'Legal Aid Camp', value: 'Legal Aid' },
      ],
    },
    {
      name: 'speaker',
      type: 'text',
      admin: { description: 'Guest name — leave blank if not a talk' },
    },
    {
      name: 'speakerTitle',
      type: 'text',
      admin: { description: 'e.g. "Justice (Retd.) A.K. Sikri"' },
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      admin: { description: 'Free-form, e.g. "15 March 2025"' },
    },
    { name: 'venue', type: 'text' },
    { name: 'description', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: false },
    {
      name: 'images',
      type: 'array',
      maxRows: 4,
      admin: { description: 'Additional photos shown below the card (3–4 recommended)' },
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },

    {
      name: 'highlights',
      type: 'array',
      fields: [{ name: 'point', type: 'text' }],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'displayOrder', type: 'number', defaultValue: 0 },
  ],
}
