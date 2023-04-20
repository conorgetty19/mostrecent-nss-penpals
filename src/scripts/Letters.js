import { getLetters, getPenPals, getTopics } from "./dataAccess.js"

export const Letters = () => {
    const letters = getLetters()
    const penPals = getPenPals()
    const topics = getTopics()
    if (letters !== undefined) {
        let HTML = "<article class='finishedLetters'>"
        //loop through letters from database and do the following
        //find matching recipient, author, and topic objects
        //build html from letter object and recipient, author, and topic objects
        //add html to totalHTML
        for (const letter of letters) {
            HTML += `<section class="finishedLetter" id="letter-${letter.id}">`
            const matchingRecipient = findObjectWithMatchingId(letter.recipientId, penPals)
            const matchingAuthor = findObjectWithMatchingId(letter.authorId, penPals)
            const matchingTopic = findObjectWithMatchingId(letter.topicId, topics)
            const parsedDate = reformatDate(letter.dateSent)

            HTML += `<div class="letterGreeting">Dear ${matchingRecipient.name} (${matchingRecipient.email}),` + "<br></div>"
                            + `<div class="letterBody">${letter.contents}` + "<br></div>"
                            + `<div class="letterSendoffName">Sincerely, ${matchingAuthor.name} (${matchingAuthor.email})`+ "<br></div>"
                            + `<div class="letterSendoffDate">Sent on ${parsedDate}` + "<br></div>"
                            + `<div class="topicFromFinishedLetter">${matchingTopic.type}</div>`

            HTML += "</section>"
        }
        HTML += "</article>"
        return HTML
    }
}

export const findObjectWithMatchingId = (id, objectList) => {
    let match = objectList.find(object => 
        id === object.id
    )
    return match
}

const reformatDate = (dateNumber) => {
    //turns dateSent number into a new date object to be parsed
    const date = new Date (dateNumber)
    //parses out the month, day, and year from the date object
    let reformatedDate = (date.getMonth()+1)+ "/" + date.getDate() + "/" + date.getFullYear()
    return reformatedDate
}