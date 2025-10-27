import React from "react";
import { MdDesignServices } from "react-icons/md";
import { FiCodesandbox } from "react-icons/fi";
import { CgWebsite } from "react-icons/cg";
import styled from "styled-components";
import Card from "./Card";
import { Slide } from "react-awesome-reveal";
import { LuCookingPot } from "react-icons/lu";
const skills = () => {
  return (
    <Container id="skills">
      <Slide direction="down">
        <h4>
          My <span className="green">skills</span>
        </h4>
        <h1>What I Do</h1>
      </Slide>
      <Cards>
        <Slide direction="left">
          <Card
            Icon={MdDesignServices}
            title={"Front-End developer"}
            disc={`I love being a front-end developer because it allows me to bring ideas to life through design and code. Seeing a static concept turn into an interactive and user-friendly website gives me a sense of accomplishment.`}
          />
        </Slide>
        <Slide direction="up">
          <Card
            Icon={FiCodesandbox}
            title={"Cooking"}
            disc={`Cooking is my way of showing care and love. It brings people together and creates memories. from choosing ingredients to plating the final dish and it gives me a sense of accomplishment to turn simple ingredients into something special.`}
          />
        </Slide>
        <Slide direction="right">
          <Card
            Icon={CgWebsite}
            title={"Web designer"}
            disc={` I love being a web designer because it allows me to combine creativity and technology. I enjoy turning ideas into visually appealing and functional websites that people can actually use and appreciate.`}
          />
        </Slide>
      </Cards>
    </Container>
  );
};

export default skills;

const Container = styled.div`
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 0;
  @media (max-width: 840px) {
    width: 90%;
  }

  h1 {
    padding-top: 1rem;
  }
`;
const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-top: 4rem;
  gap: 1rem;
`;
