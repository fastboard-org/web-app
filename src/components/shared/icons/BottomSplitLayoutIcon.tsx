export default function BottomSplitLayoutIcon({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size || 30}
      height={size || 30}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M 11 19.9 L 11 4.1 C 11 2.6 10.36 2 8.77 2 L 4.73 2 C 3.14 2 2.5 2.6 2.5 4.1 L 2.5 19.9 C 2.5 21.4 3.14 22 4.73 22 L 8.77 22 C 10.36 22 11 21.4 11 19.9 Z"
        fill="currentColor"
        transform="matrix(0, 1, -1, 0, 24.000000953674, -9.53674e-7)"
      />
      <path
        d="M 21.5 8.64 L 21.5 4.36 C 21.5 3.06 20.5 2 19.27 2 L 15.23 2 C 14 2 13 3.06 13 4.36 L 13 8.64 C 13 9.94 14 11 15.23 11 L 19.27 11 C 20.5 11 21.5 9.94 21.5 8.64 Z"
        fill="currentColor"
        transform="matrix(0, 1, -1, 0, 24.000000953674, -9.53674e-7)"
      />
      <path
        d="M 21.5 19.64 L 21.5 15.36 C 21.5 14.06 20.5 13 19.27 13 L 15.23 13 C 14 13 13 14.06 13 15.36 L 13 19.64 C 13 20.94 14 22 15.23 22 L 19.27 22 C 20.5 22 21.5 20.94 21.5 19.64 Z"
        fill="currentColor"
        transform="matrix(0, 1, -1, 0, 24.000000953674, -9.53674e-7)"
      />
    </svg>
  );
}
