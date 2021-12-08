export function CloseButton(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={12}
      height={12}
      fill="none"
      aria-label="Close button"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Close button</title>
      <path
        d="M11.7.3c-.4-.4-1-.4-1.4 0L6 4.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L4.6 6 .3 10.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L6 7.4l4.3 4.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L7.4 6l4.3-4.3c.4-.4.4-1 0-1.4z"
        fill="#000"
      />
    </svg>
  );
}
