import fs from 'fs'
import path from 'path'
import { systemActivities } from '../src/components/platform/project/constant'
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
  Object.entries(systemActivities).forEach(([systemType, items]) => {
    const systemDir = path.join(contentDir, systemType.toLowerCase().replace(/\s+/g, '-'))
    
    // Create system type directory
    if (!fs.existsSync(systemDir)) {
      fs.mkdirSync(systemDir, { recursive: true })
    }

    items.forEach(item => {
      item.subitems.forEach(subitem => {
        const subitemDir = path.join(systemDir, subitem.name.toLowerCase().replace(/\s+/g, '-'))
        
        // Create subitem directory
        if (!fs.existsSync(subitemDir)) {
          fs.mkdirSync(subitemDir, { recursive: true })
        }

        // Create MDX files for each activity
        subitem.activities.forEach(activity => {
          const activityFile = path.join(subitemDir, `${activity.toLowerCase().replace(/\s+/g, '-')}.mdx`)
          const content = `---
title: "${activity}"
description: "Description for ${activity}"
systemType: "${systemType}"
subitem: "${subitem.name}"
---

# ${activity}

This is the content for ${activity} activity in ${subitem.name} under ${systemType}.

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
  })

  console.log('Content structure generated successfully in /content/mos!')
}

// Watch mode
if (process.argv.includes('--watch')) {
  console.log('Watching for changes in systemActivities...')
  
  // Watch the constant.ts file
  chokidar.watch('../src/components/platform/project/constant.ts', {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  }).on('change', (path) => {
    console.log(`File ${path} has been changed. Regenerating content...`)
    generateContent()
  })
} else {
  // One-time generation
  generateContent()
} 