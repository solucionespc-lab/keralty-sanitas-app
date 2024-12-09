import * as functions from 'firebase-functions';

export const ejemplo = functions.https.onCall((data, context) => {
  console.log(data, context);
  // Resto del código
  return 'Se ejecutó la función onCall';
});
