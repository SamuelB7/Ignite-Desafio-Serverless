
import { document } from "../utils/dynamodbClient"

export const handle = async (event) => {
    
    const { userid } = event.pathParameters
    
    const { Items } = await document.query({
        TableName: "users_todos",
        IndexName: 'userId',
        KeyConditionExpression: "userid = :userid",
        ExpressionAttributeValues: {
            ":userid": userid
        }
    }).promise()


    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Todos found!",
            Items
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    }
}