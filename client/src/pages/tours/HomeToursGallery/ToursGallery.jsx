import React, { useContext, useState } from "react";
import { Form, FormControl, Container, Col, Row } from "react-bootstrap";
import "./ToursGallery.scss";
import { KankooContext } from "../../../context/KankooContext";
import { CardOneTour } from "../../../components/CardOneTour/CardOneTour";
import { textSensitive } from "../../../../helpers/utils";
export const ToursGallery = () => {
  const { allTours } = useContext(KankooContext);
  const [showAllTours, setShowAllTours] = useState(true);
  const [foundTours, setFoundTours] = useState();
  const [filter, setFilter] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const handleClick = (e) => {
    if (filter === "") {
      setFoundTours(allTours);
      console.log(allTours);
    } else {
      const tempArray = allTours.filter((e) => {
        return (
          textSensitive(e.tour_name, filter) ||
          textSensitive(e.tour_description, filter) ||
          textSensitive(e.tour_city, filter)
        );
      });
      setFoundTours(tempArray);
      setShowAllTours(false);
    }
  };

  return (
    <Container>
      <Row className="s-flex justify-content-center">
        <Col className="d-flex justify-content-center" md={8}>
          <div className="HomeWelcome">
            <p className="HomeText">
              Entra y viaja sin ataduras con nuestras guías turísticas
              digitales. Vídeos y audios en tu smartphone para descubrir
              destinos a tu propio ritmo 📍
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Form className="gallerySearchbar d-flex mx-auto">
          <FormControl
            type="search"
            placeholder="🔍 ¿Qué te apetece visitar?"
            className="mr-2"
            aria-label="Buscar"
            onChange={onChange}
            value={filter}
          />
          <button type="button" className="galleryButton" onClick={handleClick}>
            Buscar
          </button>
        </Form>
      </Row>

      <Row className="s-flex justify-content-center">
        <Col md={8}>
          <div className="divHome">
            <p className="pHome">
              Te damos la bienvenida a KanKoo, la mejor app para tener
              experiencias de viaje sin restricciones con nuestras guías
              turísticas digitales. Accede al contenido que sube nuestra
              comunidad de viajeros/as y disfruta de imágenes espectaculares,
              vídeos y audio-guías directamente desde tu smartphone.
            </p>
          </div>
        </Col>
      </Row>

      <Row
        className="d-flex justify-content-around align-items-center flex-wrap p-3"
        md={4}
      >
        {showAllTours && (
          <>
            {allTours?.map((elem) => {
              return <CardOneTour key={elem.tour_id} elem={elem} />;
            })}
          </>
        )}

        {foundTours?.map((elem) => {
          return <CardOneTour key={elem.tour_id} elem={elem} />;
        })}
      </Row>
    </Container>
  );
};
