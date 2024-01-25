import React, { useState } from "react";
import { CreateTour } from "./CreateTour";
import { CreateSection } from "./CreateSection";
import "./CreateTour.scss";
export const FatherCreateTour = () => {
  const [showSections, setShowSections] = useState(false);
  const [showFormSection, setShowFormSection] = useState(false);
  const [sections, setSections] = useState([]);

  const [tour, setTour] = useState({});

  console.log("padreee", tour);
  console.log(sections);

  console.log(tour.cover);

  return (
    <>
      {!showSections && (
        <CreateTour
          setShowSections={setShowSections}
          tour={tour}
          setTour={setTour}
        />
      )}

      {showSections && (
        <>
          <div className="fatherCover">
            <h2> {tour?.tour_name} </h2>

            {tour?.cover && (
              <img
                src={`http://localhost:3000/images/tours/${tour.cover}`}
                alt=""
                style={{ width: "200px", height: "200" }}
              />
            )}
          </div>
          <div className=" d-flex flex-column">
            {sections.map((elem) => {
              return (
                <div className="fatherSectionAdded">
                  <p>{elem.section_name}</p>
                </div>
              );
            })}
          </div>
          <div>
            <button
              className="fatherButton"
              onClick={() => setShowFormSection(true)}
            >
              Añadir punto
            </button>
          </div>
          {showFormSection && (
            <CreateSection
              setShowFormSection={setShowFormSection}
              tour={tour}
              sections={sections}
              setSections={setSections}
            />
          )}
        </>
      )}
    </>
  );
};
