# Intro 
This is a starter for lookerstudio visualization using vite.

Includes:
* local dev environment
* publish dev and prod
* typescript


Prerequisite:
* Node
* npm / yarn / pnpm
* google cloud storage project
* a dev and prod cloud storage bucket
* a service account with write access to storage buckets

## Getting Started Quickly

1. Clone this repo
2. Create dev and prod Google Cloud Storage buckets (see details)
3. Create `.env.development` and `.env.production` files with respective bucket names. Use .example.env.
4. Update package.json fields:
  * name
  * description
  * homepage
  * bugs
  * repository
  * organization
  * tcsUrl
  * privacyUrl
  * config.componentId
5. add service account key.json file (see key.example.json)




## Step-by-step from scratch

## 1. Vite starter

```
yarn create vite lookerstudio-vite-starter --template vanilla-ts
```

2. Add dscc as dependancy

```
yarn add @google/dscc
```

3. create ./src/viz.ts


```ts
import type { ObjectFormat } from "@google/dscc";

export default (message: ObjectFormat, width: number, height: number) => {
    console.log('hello from viz')
    console.log(Object.keys(message))
    console.log('tables', message.tables)
    console.log('width:', width)
    console.log('height:', height)
    const body = window.document.querySelector('body')
    if (body) {
        body.innerHTML = '<div>hello</div>'
    }
};
```

4. update ./src/main.ts

```ts
import {
  subscribeToData,
  getHeight,
  getWidth,
  objectTransform
} from '@google/dscc'

import drawViz from './viz.js'

const main = () => {
  subscribeToData((message) => {
    const width = getWidth();
    const height = getHeight();
    drawViz(message, width, height)
  }, {transform: objectTransform})
}

main()
```

5. update public/config.json file

```json
{
    "data": [
        {
            "id": "concepts",
            "label": "Concepts",
            "elements": [
                {
                    "id": "tableDimension",
                    "label": "Dimension",
                    "type": "DIMENSION",
                    "options": {
                        "min": 1,
                        "max": 1
                    }
                },
                {
                    "id": "tableMetric",
                    "label": "Metric",
                    "type": "METRIC",
                    "options": {
                        "min": 1,
                        "max": 1
                    }
                }
            ]
        }
    ],
    "style": [
        {
            "id": "header",
            "label": "Table Header",
            "elements": [
                {
                    "type": "FILL_COLOR",
                    "id": "headerBg",
                    "label": "Header Background Color",
                    "defaultValue": "#e0e0e0"
                }
            ]
        }
    ]
}
```

6. Enable public access to cloud storage buckets

* create dev and prod bucket if they don't exist
* go to permissions
* disable "prevent public access" if enabled
* grant access to "allUsers" with role: Storage Legacy Object Reader (allows object read but not object list)


6. add public/manifest.json (replace with your own name, description, urls)


```json
{
    "name": "Vite starter Community Visualization",
    "logoUrl": "https://storage.googleapis.com/<bucket name>/logo.png",
    "organization": "Org Name",
    "organizationUrl": "https://url",
    "termsOfServiceUrl": "https://url",
    "supportUrl": "https://url",
    "packageUrl": "https://url",
    "privacyPolicyUrl": "https://url",
    "description": "Vite Starter Example",
    "devMode": true,
    "components": [
        {
            "id": "someComponentId",
            "name": "Component Name",
            "iconUrl": "https://storage.googleapis.com/<bucket name>/logo-small.png",
            "description": "Amazing Looker Studio Component",
            "resource": {
                "js": "gs://<bucket name>/<file name>.js",
                "config": "gs://<bucket name>/<file name>.json",
                "css": "gs://<bucket name>/<file name>.css"
            }
        }
    ]
}
```

7. update public/style.css

8. try the viz on local

9. to deploy, use gsutil commands or use javascript cloud storage client

