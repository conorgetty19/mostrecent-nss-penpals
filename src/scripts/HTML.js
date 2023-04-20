import { Form } from "./Form.js"
import {Letters} from "./Letters.js"

export const HTML = () => {
    return `<h1>Pen Pal Society</h1>
    <section class="letterForm">
        ${Form()}
    </section>
    <section class="letterList">
        <h2>Letters</h2>
        ${Letters()}
    </section>`
}