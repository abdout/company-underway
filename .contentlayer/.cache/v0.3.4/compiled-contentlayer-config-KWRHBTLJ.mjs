// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
var Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string",
      required: true
    },
    published: {
      type: "boolean",
      default: true
    },
    publishedAt: {
      type: "date",
      required: true
    },
    updatedAt: {
      type: "date",
      required: false
    },
    item: {
      type: "string",
      required: true
    },
    subitem: {
      type: "string",
      required: true
    },
    activity: {
      type: "string",
      required: true
    },
    section: {
      // Section of the document (definition, purpose, description, equipment, circuit, criteria)
      type: "string",
      required: true
    },
    tags: {
      type: "list",
      of: { type: "string" },
      default: []
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => `/${doc.item}/${doc.subitem}/${doc.activity}`
    },
    slugAsParams: {
      type: "string",
      resolve: (doc) => `${doc.item}/${doc.subitem}/${doc.activity}`
    },
    url: {
      type: "string",
      resolve: (doc) => `/docs/${doc.item}/${doc.subitem}/${doc.activity}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Doc],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          }
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section"
          }
        }
      ]
    ]
  }
});
export {
  Doc,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-KWRHBTLJ.mjs.map
