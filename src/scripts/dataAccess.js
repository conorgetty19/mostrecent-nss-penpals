const transientState = {
    penPals: [],
    topics: [],
    letters: [],
    letterBuilder: {},
    currentAuthor: {},
    currentRecipient: {},
    currentTopic: {}
}

const API = "http://localhost:8088"

//fetchTopics (obtains a list of topics from database)
export const fetchTopics = () => {
    return fetch(`${API}/topics`)
        .then(res => res.json())
        .then(
            (topics) => {
                transientState.topics = topics
            }
        )
}
//getTopics (places topics in transient state)
export const getTopics = () => {
    return transientState.topics.map(topic => ({ ...topic }))
}

//fetchPenPals (obtains pen pals from database)
export const fetchPenPals = () => {
    return fetch(`${API}/penPals`)
        .then(res => res.json())
        .then(
            (penPals) => {
                transientState.penPals = penPals
            }
        )
}
//getPenPals (places pen pals in transient state)
export const getPenPals = () => {
    return transientState.penPals.map(penPal => ({ ...penPal }))
}

//fetchLetters (obtains previously written letters from database)
export const fetchLetters = () => {
    return fetch(`${API}/letters`)
        .then(res => res.json())
        .then(
            (letters) => {
                transientState.letters = letters
            }
        )
}
//getLetters (puts previously written letters into transientState)
export const getLetters = () => {
    return transientState.letters.map(letter => ({ ...letter }))
}

// getLetter (returns current contents of letterBuilder)
export const getLetter = () => {
    return transientState.letterBuilder
}

// getAuthor (returns user selected author)
export const getAuthor = () => {
    return transientState.currentAuthor
}
// getRecipient (returns user selected recipient)
export const getRecipient = () => {
    return transientState.currentRecipient
}
// getTopic (returns user selected topic)
export const getTopic = () => {
    return transientState.currentTopic
}

// setSelectedAuthor (intakes author and sets current author in transientState) (gets invoked on change event for author selector)
export const setSelectedAuthor = (author) => {
    transientState.currentAuthor = author
}
// setSelectedRecipient (intakes recipient and sets current recipient in transientState) (gets invoked on change event for recipient selector)
export const setSelectedRecipient = (recipient) => {
    transientState.currentRecipient = recipient
}
// setSelectedTopic (intakes topic and sets current topic in transientState) (gets invoked on change event for topic radio button)
export const setSelectedTopic = (topic) => {
    transientState.currentTopic = topic
}

//setContents (takes in contents of a letter and adds it to the letterBuilder)
export const setContents = (letterContents) => {
    transientState.letterBuilder.contents = letterContents
}
// setDate (no parameter. sets letterBuilder date to current date)
export const setDate = () => {
    transientState.letterBuilder.dateSent = Date.now()
}
// setAuthorId (sets in letterBuilder)
export const setAuthorId = (authorObject) => {
    transientState.letterBuilder.authorId = authorObject.id
}
// setRecipientId (sets in letterBuilder)
export const setRecipientId = (recipientObject) => {
    transientState.letterBuilder.recipientId = recipientObject.id
}
// setTopicId (sets in letterBuilder)
export const setTopicId = (topicObject) => {
    transientState.letterBuilder.topicId = topicObject.id
}

//(intakes letterBuilder object, adds unique id, sends object to database and resets contents of builder)
export const sendLetter = (letter) => {
    const selectedAuthor = getAuthor()
    const selectedRecipient = getRecipient()
    const selectedTopic = getTopic()
    const previousLetters = getLetters()

    if (selectedAuthor.id !== null && selectedRecipient.id !== null && selectedTopic.id !== null) {

        //send object to database and rerenders
        saveLetter(letter)

        //resets transientState
        transientState.letterBuilder = {}
        transientState.currentAuthor = {}
        transientState.currentRecipient = {}
        transientState.currentTopic = {}
    }
}

//performs POST fetch w/letter (invoked in sendLetter)
const saveLetter = (letter) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(letter)
    }

    return fetch(`${API}/letters`, fetchOptions)
        .then(res => res.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
