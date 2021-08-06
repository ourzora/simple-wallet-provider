import { useCallback, useMemo, useState } from "react";
import { debounce } from "ts-debounce";
import {
  useSharedCursorsType,
  CursorDataType,
  CursorCoordinates,
  CursorHookType,
} from "./types";
import { useCookieBackedUserId } from "./useCookieBackedUserId";
import { useCursorEvents } from "./useCursorEvents";

export function useSharedCursors<T = void>(
  args: useSharedCursorsType<T>
): CursorHookType<T> {
  const [cursors, setCursors] = useState<Array<CursorDataType<T>>>([]);
  const [myCursor, setMyCursor] = useState<CursorCoordinates | undefined>(
    undefined
  );
  const { showMyCursor = false, store } = args;
  const uid = useCookieBackedUserId({ cookieName: "userId" });
  const debouncedUpdateCoordinates = useMemo(
    () => debounce(store.updateCoordinates),
    [store]
  );
  useCursorEvents(({ x, y }: CursorCoordinates) => {
    setMyCursor({ x, y });
    debouncedUpdateCoordinates(uid, x, y);
  });

  store.onUpdates((data: CursorDataType<T>[]) => {
    setCursors(data);
  });

  const setContext = useCallback(
    (context: T) => {
      store.updateContext(uid, context);
    },
    [store, uid]
  );

  let hasMyCursor = false;
  const filteredCursors = cursors.filter((cursor: CursorDataType<T>) => {
    const isMyCursor = cursor.uid !== uid;
    return showMyCursor ? true : !isMyCursor;
  });

  if (!hasMyCursor && showMyCursor && myCursor) {
    filteredCursors.push({ x: myCursor.x, y: myCursor.y, uid: uid });
  }

  return {
    cursors: filteredCursors.map((cursor: CursorDataType<T>) => {
      cursor.x *= window.innerWidth;
      return cursor;
    }),
    setContext,
  };
}
