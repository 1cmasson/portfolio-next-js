import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emoji",
      title: "Emoji",
      type: "string",
      description: "Emoji icon for the project card",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "code",
          options: {
            language: "javascript",
            languageAlternatives: [
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
              { title: "HTML", value: "html" },
              { title: "CSS", value: "css" },
              { title: "Bash", value: "bash" },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "tech",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "launchDate",
      title: "Launch Date",
      type: "date",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "object",
      fields: [
        defineField({
          name: "demo",
          title: "Demo URL",
          type: "url",
        }),
        defineField({
          name: "source",
          title: "Source Code URL",
          type: "url",
        }),
        defineField({
          name: "caseStudy",
          title: "Case Study URL",
          type: "url",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      emoji: "emoji",
    },
    prepare({ title, emoji }) {
      return {
        title,
        subtitle: emoji,
      };
    },
  },
});
