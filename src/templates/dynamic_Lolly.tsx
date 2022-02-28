import React from "react";
import Header from "../components/Header";
import Lolly from "../components/Lolly";
import Footer from "../components/Footer";
import { Link } from "gatsby";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";


export const query = gql`
  query myQuery($lollyPath: String!){
    getLollyUsingPath(lollyPath: $lollyPath){
      fillLollyTop
      fillLollyMiddle
      fillLollyBottom
      message
      sender
      recipientName
      lollyPath
    }
  }
`

const Dynamic_Lolly = ({ pageContext: { lollyPath } }) => {

  const { data, loading, error } = useQuery(query, {
    variables: { lollyPath: lollyPath },
  })

  const {
    fillLollyTop,
    fillLollyMiddle,
    fillLollyBottom,
    message,
    sender,
    recipientName
  } = data?.getLollyUsingPath || {};

  if (error) return <h3>{error}</h3>
  if (loading) return <h3>Please Wait..</h3>
  return (
    <div className="container">
      <Header />
      <div className="create-lolly-container">
        <Lolly
          className="create-lolly-lollipop"
          fillLollyTop={fillLollyTop}
          fillLollyMiddle={fillLollyMiddle}
          fillLollyBottom={fillLollyBottom}
        />
        {/*  */}
        <div className="lollyForm">
          <p className="created-top-text">
            Your lolly is freezing. Share it with this link:
          </p>
          <p className="created-link">https://virtual-lolly-fullstack.netlify.app/lollies/{lollyPath}</p>
          <div className="showLolly-created-details">
            <span className="name">{recipientName}</span>
            <span>{message}</span>
            <span className="name">--{sender}</span>
          </div>
          <p className="showLolly-created-last-text">
            <span>{`${sender} `}</span>
            made this virtual lollipop for you. You can
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



export default Dynamic_Lolly;