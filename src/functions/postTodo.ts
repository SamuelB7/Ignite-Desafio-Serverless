import { document } from "../utils/dynamodbClient"

interface ICreateTodo {
    id: string
    userId: string
    title: string
    done: boolean
    deadline: Date
}

export const handle = async (event) => {
    // id, userId, title, done, deadline
    const {title, done, deadline, id} = JSON.parse(event.body) as ICreateTodo
    const {userid} = event.pathParameters

    //console.log(title, done, deadline, userid, id)

    const todo = await document.put({
        TableName: "users_todos",
        Item: {
            id, 
            userid,
            title,
            done, 
            deadline
        }
    }).promise()

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "Todo created!"
        }),
        headers: {
            "Content-type": "application/json"
        }
    }
}