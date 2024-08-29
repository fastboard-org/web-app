export default function AlignIcon({
  align,
  size,
  selected,
}: {
  align: string;
  size?: number;
  selected?: boolean;
}) {
  switch (align) {
    case "Left":
      return (
        <svg
          width={size || 30}
          height={size || 30}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            stroke: selected ? "Highlight" : "currentColor",
            strokeWidth: selected ? 2.5 : 1.5,
          }}
        >
          <path
            d="M3 4.5h18M3 9.5h9.47M3 14.5h18M3 19.5h9.47"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      );
    case "Center":
      return (
        <svg
          width={size || 30}
          height={size || 30}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            stroke: selected ? "Highlight" : "currentColor",
            strokeWidth: selected ? 2.5 : 1.5,
          }}
        >
          <path
            d="M3 4.5h18M3 9.5h18M3 14.5h18M3 19.5h18"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      );
    case "Right":
      return (
        <svg
          width={size || 30}
          height={size || 30}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            stroke: selected ? "Highlight" : "currentColor",
            strokeWidth: selected ? 2.5 : 1.5,
          }}
        >
          <path
            d="M3 4.5h18M11.53 9.5H21M3 14.5h18M11.53 19.5H21"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      );
    default:
      return null;
  }
}
