import {getTopics} from "./dataAccess.js"

//build html for topic radio buttons
export const Topics = () => {
    const topics = getTopics()

    const topicList = topics.map((topic) => {
        return `<input type="radio" name="topic" value="${topic.id}"/>${topic.type}`
    })

    let html = "<div id='topicSelector'>"
    html += topicList.join("")
    html += "</div>"
    return html
}