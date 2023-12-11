import pkg from  '../package.json' assert { type: 'json' }
import { writeFileSync } from 'fs'


export default () => {
const bucketName = process.env.VITE_GCS_BUCKET //|| 'lookerstudio-vite-starter-dev'
const manifest = {}
manifest.name = pkg.name || ''
manifest.logoUrl = `https://storage.googleapis.com/${bucketName}/logo.png`
manifest.organization = pkg.organization  || ''
manifest.organizationUrl = pkg.homepage  || ''
manifest.termsOfServiceUrl = pkg.tcsUrl  || ''
manifest.supportUrl = pkg.bugs  || ''
manifest.packageUrl = pkg.repository  || ''
manifest.privacyPolicyUrl = pkg.privacyUrl  || ''
manifest.description = pkg.description  || ''
manifest.devMode = process.env.DEV  || true
const component = {}
component.id = pkg.config.componentId  || ''
component.name = pkg.name  || ''
component.iconUrl = `https://storage.googleapis.com/${bucketName}/logo-small.png`
component.description = pkg.description  || ''
component.resource = {}
component.resource.js = `gs://${bucketName}/main.js`
component.resource.config = `gs://${bucketName}/config.json`
component.resource.css = `gs://${bucketName}/style.css`
manifest.components = [component]

writeFileSync('./public/manifest.json', JSON.stringify(manifest, null, 2))

}