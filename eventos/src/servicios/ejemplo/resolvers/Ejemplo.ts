import * as functions from 'firebase-functions';

export const eventoCron = functions.pubsub
  .schedule('5 11 * * *')
  .timeZone('America/New_York') // Users can choose timezone - default is America/Los_Angeles
  .onRun((context) => {
    console.log('This will be run every day at 11:05 AM Eastern!', context);
    return null;
  });
