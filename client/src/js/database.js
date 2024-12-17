import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  export const putDb = async (data) => {
    console.log('Putting data in database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put(data);
    const result = await request;
    result
      ? console.log('Data put in database')
      : console.log('Data not put in database');
  };
  

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Getting database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('Database retrieved')
    : console.log('Database not retrieved');

    return result?.value;
};

initdb();
