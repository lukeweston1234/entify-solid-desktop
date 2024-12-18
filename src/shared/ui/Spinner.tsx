export default function Spinner() {
  return (
    <div class="flex h-full w-full items-center justify-center">
      <svg
        class="h-full max-h-[128px] w-full max-w-[128px] animate-spin"
        width="96"
        height="96"
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="48"
          cy="48"
          r="47"
          stroke="white"
          stroke-opacity="0.33"
          stroke-width="2"
        />
        <path
          d="M96 48C96 41.6965 94.7584 35.4548 92.3462 29.6312C89.934 23.8076 86.3983 18.5161 81.9411 14.0589C77.4839 9.60166 72.1924 6.06601 66.3688 3.65378C60.5452 1.24156 54.3034 -2.75533e-07 48 0V1.81481C54.0651 1.81481 60.0709 3.00943 65.6743 5.33045C71.2777 7.65147 76.3692 11.0534 80.6579 15.3421C84.9465 19.6308 88.3485 24.7222 90.6695 30.3257C92.9906 35.9291 94.1852 41.9349 94.1852 48H96Z"
          fill="white"
          fill-opacity="0.8"
        />
      </svg>
    </div>
  );
}
