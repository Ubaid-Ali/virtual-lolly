import React, { useState } from "react";
import Header from "../components/Header";
import Lolly from "../components/Lolly";
import Footer from "../components/Footer";
import { graphql, Link } from "gatsby";


const Dynamic_Lolly = ( props) => {
  console.log('props', props)
  // console.log('pageContext', pageContext)
  // console.log(`props: `, location.state.lolly)

  const [flavour, setFlavour] = useState({
    top: "#4B0082",
    middle: "#8A2BE2",
    bottom: "#FF00FF",
  });


  // console.log(data?.lollies)
  return (
    <div className="container">
      <Header />
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
            <span>Micheal</span>
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


export const query = graphql`
  {
    AllLollies {
      lollies {
        fillLollyBottom
        fillLollyMiddle
        fillLollyTop
        message
        recipientName
        sender
        lollyPath
      }
    }
  }
`

export default Dynamic_Lolly;