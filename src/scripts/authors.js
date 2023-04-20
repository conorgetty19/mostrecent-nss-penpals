import { getPenPals } from "./dataAccess.js"

//builds html for author selector
export const Authors = () => {
    //list of potential authors
    const penPals = getPenPals()

    let html = `<select id="authorsSelector" class="authorName">`
    html += `<option value="0">Select Author</option>`
    let authorList = penPals.map((penPal) => {
        return `<option value="${penPal.id}">${penPal.name}</option>`
    }
    )
    html += authorList.join("")
    html += "</select>"
    return html
}
