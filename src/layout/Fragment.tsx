import * as React from "react";

export default function Fragment({
  children,
}: {
  children: React.ReactNode[];
}) {
  console.log(children);
  return (
    <>
      {children?.filter(
        (c: any) =>
          c &&
          ((typeof c === "object" &&
            (typeof c["type"] !== "string" || c["type"] === "hr")) ||
            c === "\n")
      )}
    </>
  );
}

export const FragmentDef = function Fragment({ children }: any) {
  return <>{children}</>;
};
