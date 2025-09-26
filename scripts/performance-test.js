const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const fs = require('fs')
const path = require('path')

async function runPerformanceTest() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] })

  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  }

  const runnerResult = await lighthouse('http://localhost:3000', options)

  // `.report` is the HTML report as a string
  const reportJson = runnerResult.report
  fs.writeFileSync('lighthouse-report.json', reportJson)

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl)
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100)
  console.log('Accessibility score was', runnerResult.lhr.categories.accessibility.score * 100)
  console.log('Best practices score was', runnerResult.lhr.categories['best-practices'].score * 100)
  console.log('SEO score was', runnerResult.lhr.categories.seo.score * 100)

  // Check thresholds
  const performanceScore = runnerResult.lhr.categories.performance.score * 100
  const accessibilityScore = runnerResult.lhr.categories.accessibility.score * 100

  if (performanceScore < 70) {
    console.error(`❌ Performance score too low: ${performanceScore}`)
    process.exit(1)
  }

  if (accessibilityScore < 80) {
    console.error(`❌ Accessibility score too low: ${accessibilityScore}`)
    process.exit(1)
  }

  console.log('✅ All performance thresholds met!')

  await chrome.kill()
}

async function runBundleAnalysis() {
  const fs = require('fs')
  const path = require('path')

  // Read build stats
  const distPath = path.join(__dirname, '..', 'dist')
  const files = fs.readdirSync(distPath)

  let totalSize = 0
  const fileSizes = {}

  files.forEach(file => {
    const filePath = path.join(distPath, file)
    const stats = fs.statSync(filePath)

    if (stats.isFile()) {
      const sizeKB = (stats.size / 1024).toFixed(2)
      fileSizes[file] = `${sizeKB} KB`
      totalSize += stats.size
    }
  })

  const totalSizeKB = (totalSize / 1024).toFixed(2)
  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2)

  console.log('\n📦 Bundle Analysis:')
  console.log('==================')
  Object.entries(fileSizes).forEach(([file, size]) => {
    console.log(`${file}: ${size}`)
  })
  console.log(`\nTotal bundle size: ${totalSizeKB} KB (${totalSizeMB} MB)`)

  // Check bundle size thresholds
  if (totalSize > 5 * 1024 * 1024) { // 5MB
    console.error('❌ Bundle size too large!')
    process.exit(1)
  }

  console.log('✅ Bundle size within acceptable limits')
}

async function main() {
  try {
    console.log('🚀 Running performance tests...\n')

    await runBundleAnalysis()
    console.log('')
    await runPerformanceTest()

    console.log('\n🎉 All tests passed!')
  } catch (error) {
    console.error('❌ Performance test failed:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

module.exports = { runPerformanceTest, runBundleAnalysis }