// contentlayer.config.ts
import {
  defineDocumentType,
  makeSource
} from "contentlayer/source-files";
var computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/")
  },
  url: {
    type: "string",
    resolve: (doc) => {
      const docPath = doc._raw.flattenedPath;
      return `/docs/${docPath}`;
    }
  },
  // Extract category, subCategory, and activity from the path
  category: {
    type: "string",
    resolve: (doc) => {
      const parts = doc._raw.flattenedPath.split("/");
      return parts[0] || "";
    }
  },
  subCategory: {
    type: "string",
    resolve: (doc) => {
      const parts = doc._raw.flattenedPath.split("/");
      return parts.length > 1 ? parts[1] : "";
    }
  },
  activityName: {
    type: "string",
    resolve: (doc) => {
      const parts = doc._raw.flattenedPath.split("/");
      return parts.length > 2 ? parts[2] : "";
    }
  }
};
var Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: "docs/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string",
      required: true
    }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Doc]
});
export {
  Doc,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-HKX4GFTH.mjs.map
