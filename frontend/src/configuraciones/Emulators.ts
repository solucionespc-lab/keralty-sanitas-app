import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { Auth, connectAuthEmulator } from 'firebase/auth';
import { getApp } from 'firebase/app';

export const runEmulators = ({ auth }: { auth: Auth }) => {
  const fire = getFirestore();
  const db = getDatabase();
  const functions = getFunctions(getApp());
  const storage = getStorage();

  connectAuthEmulator(auth, import.meta.env.VITE_AUTH_PORT, {
    disableWarnings: true,
  });

  connectFunctionsEmulator(
    functions,
    'localhost',
    import.meta.env.VITE_FUNCTIONS_PORT
  );

  connectDatabaseEmulator(db, 'localhost', import.meta.env.VITE_DATABASE_PORT);

  connectFirestoreEmulator(
    fire,
    'localhost',
    import.meta.env.VITE_FIRESTORE_PORT
  );

  connectStorageEmulator(
    storage,
    'localhost',
    import.meta.env.VITE_STORAGE_PORT
  );
};
