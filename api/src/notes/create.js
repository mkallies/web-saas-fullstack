import { v4 as uuidv4 } from 'uuid'
import { handler, dynamoDb } from '../utils'

export const main = handler(async (event) => {
  const data = JSON.parse(event.body)

  const params = {
    TableName: process.env.tableName,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'noteId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuidv4(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  }

  await dynamoDb.put(params)

  return params.Item
})
