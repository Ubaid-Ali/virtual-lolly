import React from "react";
import Header from "../components/Header";
import Lolly from "../components/Lolly";
import Footer from "../components/Footer";
import { Link } from "gatsby";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { navigate } from "gatsby";

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

interface DynamicLollyProps {
  // coming from gatsby-node.js Build time page
  pageContext?: {
    lollyPath?: string;
  };
  // client side page
  lollyPath?: string;
}

const DynamicLolly = (props: DynamicLollyProps) => {

  if (props.pageContext?.lollyPath) {
    console.log('Getting Build time Page, Static Page')
  } else if (props.lollyPath) {
    console.log('Creating Client side Dynamic Page')
  }

  const _lollyPath = props?.pageContext?.lollyPath || props?.lollyPath;
  const { data, loading, error } = useQuery(query, {
    variables: { lollyPath: _lollyPath },
  })

  console.log('_lollyPath', _lollyPath)

  if (loading) return <h3 className="loading" >Loading Please Wait..</h3>
  if (error) {
    console.log('error.message', error.message)
    navigate("/404")
    return <h3>{error.message}</h3>
  }
  if (data) {
    const {
      fillLollyTop,
      fillLollyMiddle,
      fillLollyBottom,
      message,
      sender,
      recipientName
    } = data?.getLollyUsingPath;
    // console.log('data', data)
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
            <p className="created-link">https://virtual-lolly-fullstack.netlify.app/lollies/{_lollyPath}</p>
            <div className="showLolly-created-details">
              <span className="name">{recipientName}</span>
              <span>{message}</span>
              <span className="name">--{sender}</span>
            </div>
            <p className="showLolly-created-last-text">
              <span>{`${sender} `}</span>
              made this virtual lollipop for you. You can
              <Link to="/createNew" className="showLolly-created-last-text-link">
                {" make your own "}
              </Link>
              to send to a friend who deserve some sugary treat which won't rot
              their teeth...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};



export default DynamicLolly;