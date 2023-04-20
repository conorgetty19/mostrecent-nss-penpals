import {getPenPals} from "./dataAccess.js"

//builds select options for recipient selector
export const Recipients = () => {
    const penPals = getPenPals()

            let html = `<select id="recipientsSelector" class="recipientName">`
            html+= `<option value="0">Select Recipient</option>`
            let recipientList = penPals.map((penPal) => {
                return `<option value="${penPal.id}">${penPal.name}</option>`
            }
            )
            html += recipientList.join("")
            html += "</select>"
            return html
}