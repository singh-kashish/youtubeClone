// src/components/AutoResizeTextarea.tsx
import React, { useEffect, useRef, forwardRef } from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  value?: string;
};

const AutoResizeTextarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ value, onInput, style, ...rest }, forwardedRef) => {
    const innerRef = useRef<HTMLTextAreaElement | null>(null);

    const setRefs = (el: HTMLTextAreaElement | null) => {
      innerRef.current = el;
      if (typeof forwardedRef === "function") {
        forwardedRef(el);
      } else if (forwardedRef && "current" in forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
      }
    };

    const fit = () => {
      const el = innerRef.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    };

    useEffect(() => {
      fit();
    }, [value]);

    return (
      <textarea
        ref={setRefs}
        value={value}
        onInput={(e) => {
          fit();
          onInput?.(e);
        }}
        style={{ overflow: "hidden", ...style }}
        {...rest}
      />
    );
  }
);

AutoResizeTextarea.displayName = "AutoResizeTextarea";
export default AutoResizeTextarea;
