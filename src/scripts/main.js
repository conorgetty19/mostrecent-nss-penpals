import { fetchLetters, fetchPenPals, fetchTopics, getPenPals, getTopics, setSelectedAuthor, setSelectedRecipient, setSelectedTopic } from "./dataAccess.js"
import { HTML } from "./HTML.js"
import { findObjectWithMatchingId } from "./Letters.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchLetters()
        .then(() => fetchPenPals())
        .then(() => fetchTopics())
        .then(() => {
            mainContainer.innerHTML = HTML()
        })
}

//registers user selection for author of the letter
document.addEventListener("change", (changeEvent) => {
    const authors = getPenPals()
    if (changeEvent.target.id === "authorsSelector"){
        const selectedAuthorId = parseInt(changeEvent.target.value)
        const matchingAuthor = findObjectWithMatchingId(selectedAuthorId, authors)
        setSelectedAuthor(matchingAuthor)
    }

})

//registers user selection for recipient of the letter
document.addEventListener("change", (changeEvent) => {
    const recipients = getPenPals()
    if (changeEvent.target.id === "recipientsSelector"){
        const selectedRecipientId = parseInt(changeEvent.target.value)
        const matchingRecipient = findObjectWithMatchingId(selectedRecipientId, recipients)
        setSelectedRecipient(matchingRecipient)
    }

})

//registers user selection for the topic of the letter
document.addEventListener("change", (changeEvent) => {
    const topics = getTopics()
    if (changeEvent.target.name === "topic"){
        const selectedTopicId = parseInt(changeEvent.target.value)
        const matchingTopic = findObjectWithMatchingId(selectedTopicId, topics)
        setSelectedTopic(matchingTopic)
    }
    
})

render()

document.addEventListener("stateChanged", event => {
    console.log("State has changed")
    render()
})