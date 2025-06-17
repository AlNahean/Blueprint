import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter"; // 1. Import remark-frontmatter

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    image: {
      type: "string",
      required: true,
    },
    authors: {
      // Reference types are not embedded.
      // Until this is fixed, we can use a simple list.
      // type: "reference",
      // of: Author,
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
  },
}));
export const Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: `authors/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    avatar: {
      type: "string",
      required: true,
    },
    twitter: {
      type: "string",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/authors/${doc._raw.flattenedPath}`,
    },
  },
}));
export const Doc = defineDocumentType(() => ({
  name: "Doc",
  // 2. Update the pattern to include the `guides` directory
  filePathPattern: `(docs|guides)/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    published: {
      type: "boolean",
      default: true,
    },
    order: { type: "number", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      // Adjust the URL based on the source directory if needed
      resolve: (doc) => `/docs/${doc._raw.flattenedPath.split("/").pop()}`,
    },
  },
}));
export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
  },
}));

export const Changelog = defineDocumentType(() => ({
  name: "Changelog",
  filePathPattern: `changelog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("changelog/", ""),
    },
    url: {
      type: "string",
      resolve: (doc) =>
        `/changelog#${doc._raw.flattenedPath.replace("changelog/", "")}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "./src/content/",
  documentTypes: [Post, Author, Page, Doc, Changelog],
  mdx: {
    // 3. Add remarkFrontmatter to the plugins array
    remarkPlugins: [remarkFrontmatter, remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          // theme: {
          //   light: "github-light",
          //   dark: "github-dark",
          // },
          // onVisitLine(node) {
          //   // Prevent lines from collapsing in `display: grid` mode, and allow empty
          //   // lines to be copy/pasted
          //   if (node.children.length === 0) {
          //     node.children = [{ type: "text", value: " " }];
          //   }
          // },
          // onVisitHighlightedLine(node) {
          //   node.properties.className.push("line--highlighted");
          // },
          // onVisitHighlightedWord(node) {
          //   node.properties.className = ["word--highlighted"];
          // },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
