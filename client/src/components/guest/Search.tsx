import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAppDispatch } from "@/app/hooks";
import { setShow } from "@/slice/SearchBarSlice";

const Search = ({setQuery}:{setQuery: React.Dispatch<SetStateAction<string>>}) => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<string>("");
  useEffect(() => {
    const handleSearch = () => setQuery(input);
    const idTimeOut = setTimeout(handleSearch, 500);
    return () => clearTimeout(idTimeOut);
  }, [input]);
  // debounce: only call api when user stop typing for 1s
  const handleSubmit = (e: React.FormEvent)=>{
    e.preventDefault();
    
  }
  return (
    <form action="" onSubmit={handleSubmit}>
      <StyledWrapper className="w-full flex justify-center items-center gap-2">
        <div className="searchBox py-2 md:w-2xl w-sm">
          <Input
            onChange={(e) => setInput(e.target.value)}
            className="searchInput focus-visible:border-none ring-0 focus-visible:ring-0 text-black"
            type="text"
            placeholder="Search something"
          />
          <button className="searchButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={29}
              height={29}
              viewBox="0 0 29 29"
              fill="none"
            >
              <g clipPath="url(#clip0_2_17)">
                <g filter="url(#filter0_d_2_17)">
                  <path
                    d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z"
                    stroke="white"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    shapeRendering="crispEdges"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d_2_17"
                  x="-0.418549"
                  y="3.70435"
                  width="29.7139"
                  height="29.7139"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy={4} />
                  <feGaussianBlur stdDeviation={2} />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_2_17"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_2_17"
                    result="shape"
                  />
                </filter>
                <clipPath id="clip0_2_17">
                  <rect
                    width="28.0702"
                    height="28.0702"
                    fill="white"
                    transform="translate(0.403503 0.526367)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <X
          className="text-gray-400 cursor-pointer w-14 h-auto"
          onClick={() => dispatch(setShow(false))}
        />
      </StyledWrapper>
    </form>
  );
};

const StyledWrapper = styled.div`
  .searchBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: white;
    border-radius: 50px;
    position: relative;
  }

  .searchButton {
    color: white;
    position: absolute;
    right: 8px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(
      --gradient-2,
      linear-gradient(90deg, #2af598 0%, #009efd 100%)
    );
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  /*hover effect*/
  button:hover {
    color: #fff;
    background-color: #1a1a1a;
    box-shadow: rgba(0, 0, 0, 0.5) 0 10px 20px;
    transform: translateY(-3px);
  }
  /*button pressing effect*/
  button:active {
    box-shadow: none;
    transform: translateY(0);
  }

  .searchInput {
    border: none;
    background: none;
    outline: none;
    color: black;
    font-size: 15px;
    padding: 24px 46px 24px 26px;
  }
`;

export default Search;
