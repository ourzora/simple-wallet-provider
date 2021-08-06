import { useCallback, useEffect, useMemo, useState } from "react";
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
  { showMyCursor = false, store }: useSharedCursorsType<T>
): CursorHookType<T> {
  const [cursors, setCursors] = useState<Array<CursorDataType<T>>>([]);
  const [myCursor, setMyCursor] = useState<CursorCoordinates | undefined>(
    undefined
  );
  const uid = useCookieBackedUserId({ cookieName: "userId" });
  const debouncedUpdateCoordinates = useMemo(
    () => debounce(store.updateCoordinates),
    [store]
  );
  useCursorEvents(({ x, y }: CursorCoordinates) => {
    setMyCursor({ x, y });
    debouncedUpdateCoordinates(uid, x, y);
  });

  useEffect(() => {
    store.onUpdates((data: CursorDataType<T>[]) => {
      setCursors(data);
    });
  }, [store])

  const setContext = useCallback(
    (context: T) => {
      store.updateContext(uid, context);
    },
    [store, uid]
  );

  const renderingCursors = useMemo(() => {
    let hasMyCursor = false;
    const filteredCursors = cursors.filter((cursor: CursorDataType<T>) => {
      const isMyCursor = cursor.uid === uid;
      if (isMyCursor) {
        hasMyCursor = true;
      }
      return showMyCursor ? true : !isMyCursor;
    });

    let myCursorList: CursorDataType<T>[] = [];
    if (!hasMyCursor && myCursor) {
      myCursorList = [{x: myCursor?.x, y: myCursor.y, uid}];
    }

    return [...filteredCursors, ...myCursorList].map((cursor: CursorDataType<T>) => {
      if (cursor.uid === uid && myCursor) {
        cursor.x = myCursor.x;
        cursor.y = myCursor.y;
      }
      return cursor;
    });
  }, [cursors, myCursor]);


  console.log(renderingCursors);

  return {
    cursors: renderingCursors.map((cursor) => ({...cursor, x: cursor.x * window.innerWidth})),
    setContext,
  };
}
