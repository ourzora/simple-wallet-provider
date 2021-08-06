import { useMemo } from "react";
import firebase from "firebase";
import { Firestore, useSharedCursors, types } from "../src";

import firebaseConfig from "./firebaseConfig";
firebase.initializeApp(firebaseConfig);

const fireStore = new Firestore<{ emoji: string }>("my-cursors");

export const CursorExample = () => {
  const { cursors, setContext } = useSharedCursors<{ emoji: string }>({
    store: fireStore,
    showMyCursor: true,
  });

  return (
    <div onMouseDown={() => {
              setContext({ emoji: "ww" });
    }}>
      {cursors.map(
        ({ uid, x, y, context }: types.CursorDataType<{ emoji: string }>) => (
          <div
            key={uid}
            style={{
              transform: `translateX(${x}px) translateY(${y}px)`,
              width: "33px",
              height: "33px",
              backgroundColor: "red",
              position: "absolute",
              borderRadius: 300,
            }}
          >
            {context?.emoji || "?"}!!
          </div>
        )
      )}
    </div>
  );
};
