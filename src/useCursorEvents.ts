import { useEffect } from "react";
import { CursorCoordinates } from "./types";

export const useCursorEvents = (
  updateCoordinates: (coordinates: CursorCoordinates) => void
) => {
  useEffect(() => {
    let scroll = {
      x: window.scrollX,
      y: window.scrollY,
    };

    let lastPosition: CursorCoordinates | null = null;

    function transformPosition(point: CursorCoordinates) {
      return {
        x: point.x / window.innerWidth,
        y: point.y,
      };
    }

    function onPointerMove(event: MouseEvent) {
      const position = {
        x: event.pageX,
        y: event.pageY,
      };
      lastPosition = position;
      updateCoordinates(transformPosition(position));
    }

    function onPointerLeave() {
      lastPosition = null;
      updateCoordinates({ x: null, y: null });
    }

    function onDocumentScroll() {
      if (lastPosition) {
        const offsetX = window.scrollX - scroll.x;
        const offsetY = window.scrollY - scroll.y;
        const position = {
          x: lastPosition.x + offsetX,
          y: lastPosition.y + offsetY,
        };
        lastPosition = position;
        updateCoordinates(transformPosition(position));
      }
      scroll.x = window.scrollX;
      scroll.y = window.scrollY;
    }

    document.addEventListener("scroll", onDocumentScroll);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      document.removeEventListener("scroll", onDocumentScroll);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [updateCoordinates]);
};
