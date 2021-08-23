import React, { useState } from "react";
import Header from "../components/Header";
import Lolly from "../components/Lolly";
import { useQuery, useMutation, gql } from "@apollo/client";
import Footer from "../components/Footer";
import { Link } from "gatsby";

// Apollo Query
const APOLLO_QUERY = gql`
  {
    hello
  }
`;

// Apollo Mutaion
const APOLLO_MUTATION = gql`
  mutation makeLolly(
    $fillLollyTop: String!
    $fillLollyMiddle: String!
    $fillLollyBottom: String!
    $recipientName: String!
    $message: String!
    $sender: String!
  ) {
    makeLolly(
      fillLollyTop: $fillLollyTop
      fillLollyMiddle: $fillLollyMiddle
      fillLollyBottom: $fillLollyBottom
      recipientName: $recipientName
      message: $message
      sender: $sender
    ) {
      fillLollyTop
      fillLollyMiddle
      fillLollyBottom
      recipientName
      message
      sender
      lollyPath
    }
  }
`;

// M a i n   C o m p o n e n t
const createNewLolly = () => {
  const [flavour, setFlavour] = useState({
    top: "#4B0082",
    middle: "#8A2BE2",
    bottom: "#FF00FF",
  });

  const { data, loading, error } = useQuery(APOLLO_QUERY);

  return (
    <div className="container">
      <Header />
      {/* {data && <h2>Its Ok {data.hello} </h2>}
      {loading && <h1>Loading...</h1>}
      {error && <h2>{error.message}</h2>} */}
      <div className="create-lolly-container">
        <Lolly
          className="create-lolly-lollipop"
          fillLollyTop={flavour.top}
          fillLollyMiddle={flavour.middle}
          fillLollyBottom={flavour.bottom}
        />
        {/*  */}
        <div className="lollyForm">
          <p className="created-top-text">
            Your lolly is freezing. Share it with this link:
          </p>
          <p className="created-link">http://localhost:8888/showLolly/</p>
          <div className="showLolly-created-details">
            <span className="name">Carter</span>
            <span>Hey this is for you!</span>
            <span className="name">—Micheal</span>
          </div>
          <p className="showLolly-created-last-text">
            <span>Micheal</span> made this virtual lollipop for you. You can
            <Link to="/createNew" className="showLolly-created-last-text-link">
                {" "}make your own{" "}
            </Link>
            to send to a friend who deserve some sugary treat which won't rot
            their teeth...
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default createNewLolly;
