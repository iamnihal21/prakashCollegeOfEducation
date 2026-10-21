import { GlobalConfig } from 'payload'

export const PlacementsSettings: GlobalConfig = {
  slug: 'placements-settings',
  access: { read: () => true },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Launching Careers' },
        { name: 'highlight', type: 'text', defaultValue: 'UDISHA Placement Cell' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'iconType', type: 'select', options: ['graduation', 'building', 'award', 'users'] }
      ]
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'iconType', type: 'select', options: ['briefcase', 'award', 'shield', 'users'] },
      ]
    },
    {
      name: 'recruiters',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'type', type: 'text' }, // e.g., 'Primary School', 'High School'
      ]
    },
    {
      name: 'testimonials',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'quote', type: 'textarea', required: true },
      ]
    }
  ]
}