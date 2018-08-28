import { firebase } from "../facades/FirebaseFacade"

/**
 * FieldPath is a utility that allows to get a path of a field,
 * which cannot be accessed with a normal dot-syntax, because
 * its key also contains dots (like email address)
 *
 * Used in the app to get the path of roles[email]
 *
 * @type {firebase.firestore.FieldPath}
 */
export const FieldPath = firebase.firestore.FieldPath

/**
 * FieldValue is a utility used in the app to mark certain fields for deletion
 * or to be filled with a timestamp by the server
 *
 */
export const FieldValue: $npm$firebase$firestore$FieldValue =
  firebase.firestore.FieldValue
