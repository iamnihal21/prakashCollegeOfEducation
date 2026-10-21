import { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'course', 'email', 'createdAt'],
    group: 'Submissions',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', required: true },
        {
          name: 'course',
          type: 'select',
          required: true,
          options: [{ label: 'LLB (Law)', value: 'llb' }],
        },
      ],
    },
    {
      name: 'lastQualification',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
    },
  ],
  timestamps: true,
}