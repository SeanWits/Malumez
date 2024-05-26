export const initializeApp = jest.fn();
export const getAuth = jest.fn(() => ({
  setPersistence: jest.fn(),
  signOut: jest.fn(),
}));
export const getStorage = jest.fn(() => ({}));
export const getFirestore = jest.fn(() => ({}));
export const doc = jest.fn();
export const getDoc = jest.fn();
export const getDocs = jest.fn();
export const collection = jest.fn();
export const query = jest.fn();
export const setDoc = jest.fn();
export const addDoc = jest.fn();
export const serverTimestamp = jest.fn().mockReturnValue('mock-timestamp');
