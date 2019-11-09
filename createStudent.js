import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableNameStudent,
    Item: {
      usedid: event.requestContext.identity.cognitoIdentityId,
      noteid: uuid.v1(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      city: data.city,
      state: data.state,
      country: data.country,
      pincode: data.pincode,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
