import { Storage } from '@google-cloud/storage'
import { readdir } from 'fs'
import { join, dirname, resolve } from 'path'
import { argv } from 'process'
import { fileURLToPath } from 'url'
import { loadEnv } from 'vite'

let mode = 'development'
if (argv[2] === 'production') {
    mode = 'production'
}

process.env = {...process.env, ...loadEnv(mode, process.cwd())};

const __dirname = dirname(fileURLToPath(import.meta.url))
const basePath = join(__dirname, '..', 'dist')

const storage = new Storage ({
    keyFilename: 'key.json'
})
const bucketName = process.env.VITE_GCS_BUCKET




async function uploadFile(fileName) {
  await storage.bucket(bucketName).upload(join(basePath, fileName), {
    destination: fileName,
  })

  console.log(`${fileName} uploaded to ${bucketName}`)
}


readdir(basePath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err)
        return
    }

    files.forEach(file => {
        uploadFile(file).catch(console.error)
    })
})

