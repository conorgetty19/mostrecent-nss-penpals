import { Authors } from "./authors.js"
import { Recipients } from "./recipients.js"
import { Topics } from "./topics.js"
import { getAuthor, getLetter, getRecipient, getTopic, setAuthorId, setRecipientId, setTopicId, setContents, setDate, sendLetter} from "./dataAccess.js"

export const Form = () => {
    let html = `
    <div class="orderForm">
        <div class="field">
            <label class="label" for="authorsSelector">Author</label><br>
            ${Authors()}
        </div>
        <div class="field">
            <label class="label" for="letterContents">Letter</label><br>
            <textarea rows="10" cols="47" name="letterContents" id="letterContentBox"></textarea>
        </div>
        <div class="field">
            <label class="label" for="topicSelector">Topics</label>
            ${Topics()}
        </div>
        <div class="field">
            <label class="label" for="recipientsSelector">Recipient</label><br>
            ${Recipients()}
        </div>
    </div>
        <button class="button" id="sendLetter">Send Letter</button>`

        return html
}

const mainContainer = document.querySelector("#container")
//click event that adds letter content to letterBuilder, adds a date value, and sends to database
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "sendLetter"){
        const letterContents = document.querySelector("#letterContentBox").value
        const author = getAuthor()
        const recipient = getRecipient()
        const topic = getTopic()

        //adds properties to letterBuilder, except ID
        //adds contents
        setContents(letterContents)
        //adds dateSent
        setDate()
        //adds authorId 
        setAuthorId(author)
        //adds recipientId
        setRecipientId(recipient)
        //adds topicId
        setTopicId(topic)
        
        const letter = getLetter()

        //now letter will be given a unique id and then sent to database
        sendLetter(letter)
    }
})