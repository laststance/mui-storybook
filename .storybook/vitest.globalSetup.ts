import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Global setup for Vitest that runs before all tests.
 * Patches fs.writeFile to auto-create parent directories before writing.
 *
 * This is a workaround for a race condition in @storybook/addon-vitest
 * where the coverage provider tries to write files before creating the directory.
 * See: https://github.com/storybookjs/storybook/issues (upstream bug)
 */
export default function globalSetup() {
  const coverageTmpDir = path.join(
    dirname,
    '../node_modules/.cache/storybook/default/coverage/.tmp'
  )

  // Create the directory synchronously to ensure it exists before any tests run
  if (!fs.existsSync(coverageTmpDir)) {
    fs.mkdirSync(coverageTmpDir, { recursive: true })
  }

  // Patch fs.promises.writeFile to auto-create parent directories
  // This prevents ENOENT errors when coverage provider writes temp files
  const originalWriteFile = fs.promises.writeFile
  fs.promises.writeFile = async function patchedWriteFile(
    filePath: fs.PathLike,
    data: string | Uint8Array,
    options?: fs.WriteFileOptions
  ): Promise<void> {
    const filePathStr = filePath.toString()

    // Only patch coverage temp files to avoid unintended side effects
    if (filePathStr.includes('coverage/.tmp/')) {
      const dirPath = path.dirname(filePathStr)
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
      }
    }

    return originalWriteFile.call(fs.promises, filePath, data, options)
  }

  // Return teardown function to restore original writeFile
  return () => {
    fs.promises.writeFile = originalWriteFile
  }
}
