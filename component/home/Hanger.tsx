import { SVGProps } from "react";
const Hanger = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>{"Combined Shape"}</title>
    <path
      fill="#f1f2f6"
      fillRule="evenodd"
      d="M239.634.634c33.137 0 60 26.863 60 60s-26.863 60-60 60H0v-120h239.634Zm0 18.775c-22.768 0-41.225 18.457-41.225 41.225 0 22.767 18.457 41.224 41.225 41.224 22.767 0 41.224-18.457 41.224-41.224 0-22.768-18.457-41.225-41.224-41.225Z"
    />
  </svg>
);
export default Hanger;
