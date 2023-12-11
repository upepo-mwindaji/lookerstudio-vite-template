
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
