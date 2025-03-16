const fs = require('fs');
const path = require('path');
const { sidebarData } = require('../src/components/template/sidebar/constant');

// Base directory for content
const CONTENT_DIR = path.join(process.cwd(), 'content/docs');

// Helper function to convert strings to URL-friendly format
const toUrlPath = (str) => {
  if (!str) return '';
  return str.toLowerCase().replace(/\s+/g, '-');
};

// Create a basic MDX template for a specific activity
const createMdxTemplate = (item, subitem, activity) => {
  return `---
title: ${activity}
description: Documentation for ${activity} under ${subitem.name} in ${item.item} category
---

# ${activity}

This is the documentation page for **${activity}** which is part of the **${subitem.name}** subcategory in the **${item.item}** section.

## Overview

Add a brief overview of ${activity} here.

## Procedure

1. Step one of the ${activity} procedure
2. Step two of the ${activity} procedure
3. Step three of the ${activity} procedure

## Parameters

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| Parameter 1 | Description of parameter 1 | Default value |
| Parameter 2 | Description of parameter 2 | Default value |

## Notes

Additional notes about ${activity} can be added here.

## Related Activities

- Other related activities from ${subitem.name}
- Cross-references to related topics
`;
};

// Ensure directory exists, creating it if it doesn't
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
};

// Generate the MDX file for an activity if it doesn't exist
const generateActivityMdx = (item, subitem, activity) => {
  const itemPath = toUrlPath(item.item);
  const subitemPath = toUrlPath(subitem.name);
  const activityPath = toUrlPath(activity);
  
  const dirPath = path.join(CONTENT_DIR, itemPath, subitemPath);
  const filePath = path.join(dirPath, `${activityPath}.mdx`);
  
  ensureDirectoryExists(dirPath);
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, createMdxTemplate(item, subitem, activity));
    console.log(`Created MDX file: ${filePath}`);
  }
};

// Create index files for better navigation
const createIndexFile = (dirPath, title, items) => {
  const indexPath = path.join(dirPath, 'index.mdx');
  
  if (!fs.existsSync(indexPath)) {
    const content = `---
title: ${title}
description: Index page for ${title}
---

# ${title}

${items.map(item => `- [${item}](${toUrlPath(item)})`).join('\n')}
`;
    
    fs.writeFileSync(indexPath, content);
    console.log(`Created index file: ${indexPath}`);
  }
};

// Main function to generate all docs
const generateAllDocs = () => {
  // Ensure content directory exists
  ensureDirectoryExists(CONTENT_DIR);
  
  // Create main index file
  const categories = sidebarData.map(item => item.item);
  createIndexFile(CONTENT_DIR, 'Documentation', categories);
  
  // Process each item in the sidebar data
  sidebarData.forEach(item => {
    const itemPath = path.join(CONTENT_DIR, toUrlPath(item.item));
    ensureDirectoryExists(itemPath);
    
    // Create index file for the item
    const subitems = item.subitems.map(subitem => subitem.name);
    createIndexFile(itemPath, item.item, subitems);
    
    // Process each subitem
    item.subitems.forEach(subitem => {
      const subitemPath = path.join(itemPath, toUrlPath(subitem.name));
      ensureDirectoryExists(subitemPath);
      
      // Create index file for the subitem
      createIndexFile(subitemPath, subitem.name, subitem.activities);
      
      // Generate MDX files for each activity
      subitem.activities.forEach(activity => {
        generateActivityMdx(item, subitem, activity);
      });
    });
  });
  
  console.log('Documentation generation complete!');
};

// Run the generator
generateAllDocs(); 