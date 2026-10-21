import type { CollectionConfig } from 'payload'

export const Visits: CollectionConfig = {
  slug: 'visits',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'destination', 'date', 'featured'],
    group: 'Campus Life',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'destination',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Central Jail", "Vidhan Sabha"' },
    },
    { name: 'location', type: 'text', admin: { description: 'e.g. "Ahmedabad"' } },
    { name: 'date', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: false },
    {
      name: 'images',
      type: 'array',
      maxRows: 4,
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'learnings',
      type: 'array',
      fields: [{ name: 'point', type: 'text' }],
      admin: { description: 'Key takeaways from the visit' },
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'displayOrder', type: 'number', defaultValue: 0 },
  ],
}
