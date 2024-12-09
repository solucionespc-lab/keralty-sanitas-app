import { getFirestore } from 'firebase-admin/firestore';
import { getDatabase } from 'firebase-admin/database';

const db = getFirestore();
const realtimeDb = getDatabase();

export { db, realtimeDb };
