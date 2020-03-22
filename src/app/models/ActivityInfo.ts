export interface ActivityInfo {
  id: string;
  counselor: string;
  feedbackList: object;
  ratingList: object;
  registerList: string[];
  bookmarkedList: string[];
  time: firebase.firestore.Timestamp;
  title: string;
  type: string;
  url: string;
}
