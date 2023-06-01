"use client";
import { type } from "os";
import * as React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  background-image: url("/gfn-card-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 600px;
  height: 400px;
  border-radius: 20px;
  .tag {
    border: 1px solid #888;
    box-shadow: inset 0px 0px 0px 1px #888;
    box-sizing: border-box;
  }
`;

type TCardProps = {
  title: string;
  duration: string;
  tag: string;
  isFounders: boolean;
  redemptionDate: string;
  expirationDate: string;
};

const Card = (props: TCardProps) => {
  const { title, duration, tag, isFounders, redemptionDate, expirationDate } =
    props;
  return (
    <StyledCard className="card relative">
      <div className="px-5 py-2">
        <div className="flex justify-between items-center">
          <span className="tag bg-gray-500 text-white text-xs font-medium mr-2 px-2.5 py-1 rounded-full  uppercase shadow-inner">
            {tag}
          </span>
          {isFounders && (
            <img
              src="/founders-badge.png"
              alt="founders"
              className="w-36 mt-2"
            />
          )}
        </div>
        <div>
          <img src="/gfn-card-logo.png" alt="logo" className="w-36 mt-20" />
        </div>
        <div className="mb-14">
          <h1 className="text-3xl text-gray-50 pt-3 font-semibold">{title}</h1>
          <h2 className="text-2xl text-gray-50 pt-1 font-semibold">
            {duration}
          </h2>
        </div>
        <div className="flex justify-between items-center w-2/3">
          <div>
            <div className="text-gray-50 text-lg">Redemption Date</div>
            <span className="text-gray-150 text-lg">{redemptionDate}</span>
          </div>
          <div>
            <div className="text-gray-50 text-lg">Expiration Date</div>
            <span className="text-gray-150 text-lg">{expirationDate}</span>
          </div>
        </div>
      </div>
    </StyledCard>
  );
};

export default function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://l7d20r-8080.csb.app/getReward");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("error", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="mx-auto p-20">
      <Card {...data} />
    </div>
  );
}
