import React from "react";

const Logo = ({ classname }: { classname?: string }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 231 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
    >
      <g filter="url(#filter0_d_3_5)">
        <rect
          x="121.139"
          width="105.861"
          height="114.761"
          rx="10"
          fill="currentColor"
        />
      </g>
      <rect
        x="121"
        y="125"
        width="105.861"
        height="114.761"
        rx="10"
        fill="currentColor"
      />
      <rect width="106" height="240" rx="10" fill="currentColor" />
      <defs>
        <filter
          id="filter0_d_3_5"
          x="117.139"
          y="0"
          width="113.861"
          height="122.761"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3_5"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3_5"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Logo;
