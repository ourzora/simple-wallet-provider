import {CursorDataType, Store} from './types';
import firebase from 'firebase';
      
      export class Firestore<T> implements Store<T> {
	tableName: string;
	constructor(tableName: string) {
	  this.tableName = tableName;
	}
	getDatabase = (uid: number) => (
	  firebase.database().ref(`/${this.tableName}/${uid}`)
	)
	updateContext = (uid: number, context: T) => {
	  this.getDatabase(uid).set({context});
	}
	updateCoordinates = (uid: number, x: number, y: number) => {
	  this.getDatabase(uid).set({uid, x, y});
	}
	onUpdates = (updateCallback: (cursors: CursorDataType<T>[]) => void) => {
	  firebase.database().ref(`/${this.tableName}`).on('value', (snapshot) => {
	    const val = snapshot.val();
	    if (val) {
	      updateCallback(Object.keys(val) as CursorDataType<T>[]);
	    }
	  });
	}
      }