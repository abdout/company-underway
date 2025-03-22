import fs from 'fs'
import path from 'path'
import { activities } from '../src/components/platform/project/activities'
import chokidar from 'chokidar'

const contentDir = path.join(process.cwd(), 'content', 'mos')

function generateContent() {
  // Create content directory if it doesn't exist
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true })
  }

  // Clear existing content
  if (fs.existsSync(contentDir)) {
    fs.rmSync(contentDir, { recursive: true, force: true })
    fs.mkdirSync(contentDir, { recursive: true })
  }

  // Generate MDX files for each system type, subitem, and activity
  Object.entries(activities).forEach(([systemType, data]) => {
    const systemDir = path.join(contentDir, systemType.toLowerCase().replace(/\s+/g, '-'))
    
    // Create system type directory
    if (!fs.existsSync(systemDir)) {
      fs.mkdirSync(systemDir, { recursive: true })
    }

    Object.entries(data.items).forEach(([itemName, itemData]) => {
      const subitemDir = path.join(systemDir, itemName.toLowerCase().replace(/\s+/g, '-'))
      
      // Create subitem directory
      if (!fs.existsSync(subitemDir)) {
        fs.mkdirSync(subitemDir, { recursive: true })
      }

      // Create MDX files for each activity
      itemData.activities.forEach(activity => {
        const activityFile = path.join(subitemDir, `${activity.toLowerCase().replace(/\s+/g, '-')}.mdx`)
        const content = `---
title: "${activity}"
description: "Description for ${activity}"
systemType: "${systemType}"
subitem: "${itemName}"
---

# ${activity}

This is the content for ${activity} activity in ${itemName} under ${systemType}.

## Description

Add your detailed description here.

## Procedure

1. Step 1
2. Step 2
3. Step 3

## Requirements

- Requirement 1
- Requirement 2
- Requirement 3

## Notes

Add any important notes or considerations here.
`

        fs.writeFileSync(activityFile, content)
      })
    })
  })

  console.log('Content structure generated successfully in /content/mos!')
}

// Watch mode
if (process.argv.includes('--watch')) {
  console.log('Watching for changes in activities...')
  
  // Watch the activities.ts file
  chokidar.watch('../src/components/platform/project/activities.ts', {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  }).on('change', (filePath: string) => {
    console.log(`File ${filePath} has been changed. Regenerating content...`)
    generateContent()
  })
} else {
  // One-time generation
  generateContent()
} 