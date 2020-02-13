import React from "react";
import Map from "./components/Map";
import "./App.css";
import img2 from "./img/img2.jpg";

const App = () => {
  return (
    <React.Fragment>
      <section className="site-title">
        <div className="site-background">
          <h1 className="animated fadeIn delay-1.5s">Finland</h1>
          <h3 className="animated fadeIn delay-1s">Amazing Place on Earth</h3>
        </div>
      </section>
      <section>
        <section className="section-1" style={{ backgroundColor: "#65587F" }}>
          <div className="container text-center">
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="pray">
                  <img src={img2} alt="Pray" className="" />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="panel text-left">
                  <h1>Write Your Review</h1>
                  <p className="pt-4">
                    Share your travel experiences from Finland to visitor
                    hotels, restaurants and attractions.
                  </p>
                  <p>
                    <b>Instruction:</b>{" "}
                  </p>
                  <ul>
                    <li>
                      Choose the location from the map. You can zoom in and zoom
                      out the location.
                    </li>
                    <li>Double click the location you choose.</li>
                    <li>
                      <b>Write your name. It is mandatory.</b>
                    </li>
                    <li>
                      Give the title, your rating, comments and description.
                    </li>
                    <li>
                      <b>
                        Image and date field mandatory other wise your review
                        will not be submit.
                      </b>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <section style={{ backgroundColor: "#65587F" }}>
        <Map />
        <br></br>
        <br></br>
      </section>
    </React.Fragment>
  );
};

export default App;
