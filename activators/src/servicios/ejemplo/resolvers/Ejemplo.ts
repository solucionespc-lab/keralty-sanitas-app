import * as functions from 'firebase-functions';

export const ejemploTrigger = functions.firestore
  .document('users/{userId}/{messageCollectionId}/{messageId}')
  .onWrite((change, context) => {
    // If we set `/users/marie/incoming_messages/134` to {body: "Hello"} then
    // context.params.userId == "marie";
    // context.params.messageCollectionId == "incoming_messages";
    // context.params.messageId == "134";
    // ... and ...
    // change.after.data() == {body: "Hello"}

    console.log(change, context);
  });
