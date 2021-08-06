import { useMemo } from "react";
import firebase from "firebase";
import { Firestore, useSharedCursors, types } from "../src";

import firebaseConfig from "./firebaseConfig";
firebase.initializeApp(firebaseConfig);

// const useCookieBackedUserId = ({cookieName}: {cookieName: string}) => {
//   return useMemo(() => {
//     const uidCookie = Cookies.get('uid')
//     let uid: number | undefined;
//     if (uidCookie) {
//       uid = parseInt(uidCookie, 10)
//     }
//     if (!uid) {
//       uid = Math.floor(Math.random() * 10000000)
//       Cookies.set('uid', uid.toString())
//     }
//     return uid;
//   }, [cookieName]);
// }

// const useCursorEvents = (updateCoordinates: (coordinates: CursorCoordinates) => void) => {
//   useEffect(() => {
//     let scroll = {
//       x: window.scrollX,
//       y: window.scrollY,
//     }

//     let lastPosition: CursorCoordinates | null = null

//     function transformPosition(point: CursorCoordinates) {
//       return {
//         x: point.x / window.innerWidth,
//         y: point.y,
//       }
//     }

//     function onPointerMove(event: MouseEvent) {
//       const position = {
//         x: event.pageX,
//         y: event.pageY,
//       }
//       lastPosition = position
//       updateCoordinates(transformPosition(position))
//     }

//     function onPointerLeave() {
//       lastPosition = null
//       updateCoordinates({x: null, y: null})
//     }

//     function onDocumentScroll() {
//       if (lastPosition) {
//         const offsetX = window.scrollX - scroll.x
//         const offsetY = window.scrollY - scroll.y
//         const position = {
//           x: lastPosition.x + offsetX,
//           y: lastPosition.y + offsetY,
//         }
//         lastPosition = position
//         updateCoordinates(transformPosition(position))
//       }
//       scroll.x = window.scrollX
//       scroll.y = window.scrollY
//     }

//     document.addEventListener('scroll', onDocumentScroll)
//     document.addEventListener('pointermove', onPointerMove)
//     document.addEventListener('pointerleave', onPointerLeave)

//     return () => {
//       document.removeEventListener('scroll', onDocumentScroll)
//       document.removeEventListener('pointermove', onPointerMove)
//       document.removeEventListener('pointerleave', onPointerLeave)
//     }
//   }, [updateCoordinates])
// }

// function useSharedCursors<T = void>(args: useSharedCursorsType<T>): CursorHookType<T> {
//   const [cursors, setCursors] = useState<Array<CursorDataType<T>>>([]);
//   const [myCursor, setMyCursor] = useState<CursorCoordinates>(undefined);
//   const {showMyCursor = false, store} = args;
//   const uid = useCookieBackedUserId({cookieName: 'userId'});
//   const debouncedUpdateCoordinates = useMemo(() => debounce(store.updateCoordinates), [store]);
//   useCursorEvents(({x, y}: CursorCoordinates) => {
//     setMyCursor({x, y})
//     debouncedUpdateCoordinates(uid, x, y);
//   })

//   store.onUpdates((data: CursorDataType<T>[]) => {
//     setCursors(data);
//   })

//   const setContext = useCallback((context: T) => {
//     store.updateContext(uid, context);
//   }, [store, uid])

//   let hasMyCursor = false;
//   const filteredCursors = cursors.filter((cursor: CursorDataType<T>) => {
//       const isMyCursor = cursor.uid !== uid;
//       return showMyCursor ? true : !isMyCursor;
//       hasMyCursor = true;
//   }
//     )

//     if (!hasMyCursor && showMyCursor && myCursor) {
//       filteredCursors.push({x: myCursor.x, y: myCursor.y, uid: uid})
//     }

//   return {
//     cursors: filteredCursors.map((cursor: CursorDataType<T>) => {
//       cursor.x *= window.innerWidth;
//       return cursor;
//     }),
//     setContext
//   };
// }

export const CursorExample = () => {
  const fireStore = useMemo(
    () => new Firestore<{ emoji: string }>("my-cursors"),
    []
  );
  const { cursors, setContext } = useSharedCursors<{ emoji: string }>({
    store: fireStore,
    showMyCursor: true,
  });

  return (
    <div>
      {cursors.map(
        ({ uid, x, y, context }: types.CursorDataType<{ emoji: string }>) => (
          <div
            key={uid}
            onKeyDown={() => {
              setContext({ emoji: "ww" });
            }}
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
