import React, { useContext, useEffect } from "react";
import "./CardOneSection.scss";
import { useNavigate, Link, useParams } from "react-router-dom";
import { KankooContext } from "../../context/KankooContext";
import axios from "axios";

export const CardOneSection = ({ elem, oneTour, user }) => {
  const { setOneSection } = useContext(KankooContext);
  useEffect(() => {
    setOneSection(elem);
  }, [elem]);
  const delSection = () => {
    axios
      .put(
        `http://localhost:3000/tours/delsection/${elem?.tour_id}/${elem?.section_id}`
      )
      .then((res) => {
        console.log("eliminacion", res);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();
  return (
    <div className="CardOneSection d-flex flex-column align-items-center">
      <img
        onClick={() =>
          navigate(`/tours/onesection/${elem?.tour_id}/${elem?.section_id}`)
        }
        className="OneTourSectionImg"
        src={`http://localhost:3000/resources/images/${elem?.section_cover}`}
        alt="portada de seccion"
      />
      <h5>{elem.section_name}</h5>
      {oneTour[0]?.user_id === user?.user_id && (
        <div>
          {oneTour.length > 1 && (
            <button
              type="button"
              className="CardOneSectionButton"
              onClick={() => delSection(elem.section_id)}
            >
              X
            </button>
          )}
          {oneTour[0]?.user_id === user?.user_id && oneTour.length === 1 && (
            <p>
              Es requirido que cada guia tenga almenos una section, si quieres
              borrarlas todas, debes borrar la guia.
            </p>
          )}

          <button
            type="button"
            className="CardOneSectionButton"
            onClick={() =>
              navigate(
                `/tours/editsection/${elem?.tour_id}/${elem?.section_id}`
              )
            }
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
};
