import React, { useContext } from "react";
import { Col, Row, Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { KankooContext } from "../../../context/KankooContext";

const initialValueSection = {
  section_name: "",
  section_description: "",
  travel_distance: "",
};

export const CreateSection = ({
  tour,
  sections,
  setSections,
  setShowFormSection,
}) => {
  console.log("Tour prop:", tour);

  const [addSection, setAddSection] = useState(initialValueSection);
  const [images, setImages] = useState();
  const [audios, setAudios] = useState();
  const [videos, setVideos] = useState();
  const [msgError, setMsgError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddSection({ ...addSection, [name]: value });
  };

  console.log(images);
  const handleImages = (e) => {
    setImages(e.target.files);
  };

  const handleAudios = (e) => {
    setAudios(e.target.files);
  };

  const handleVideos = (e) => {
    setVideos(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !addSection.section_name ||
      !addSection.section_description ||
      !addSection.travel_distance
    ) {
      setMsgError("Rellena todos los campos");
    } else if (!/^\d{1,5}(\.\d{1,2})?$/.test(addSection.travel_distance)) {
      setMsgError(
        "El formato de travel_distance no es válido. Debe tener un máximo de 5 dígitos antes del punto y 2 dígitos después del punto."
      );
    } else {
      let temp = { ...addSection, tour_id: tour?.tour_id };

      const newFormData = new FormData();
      newFormData.append("addSection", JSON.stringify(temp));

      if (images) {
        for (const elem of images) {
          newFormData.append("images", elem);
        }
      }

      if (audios) {
        for (const elem of audios) {
          newFormData.append("audios", elem);
        }
      }

      if (videos) {
        for (const elem of videos) {
          newFormData.append("videos", elem);
        }
      }

      console.log(newFormData);
      axios
        .post(`http://localhost:3000/tours/addsection`, newFormData)
        .then((res) => {
          let tempSections = [
            ...sections,
            { ...addSection, section_id: res.data.section_id },
          ];
          setSections(tempSections);
          setShowFormSection(false);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Row className="createSectionGeneral">
        <h2>Crear puntos de guia</h2>
        <Col sm={2} md={2} lg={4}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre de punto </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del punto"
                name="section_name"
                onChange={handleChange}
                value={addSection.section_name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descripción </Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción del punto"
                name="section_description"
                onChange={handleChange}
                value={addSection.section_description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Distancia(km)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej. 2.5"
                name="travel_distance"
                onChange={handleChange}
                value={addSection.travel_distance}
              />
            </Form.Group>

            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Imagenes</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImages}
                required
                multiple
                accept="image/*"
                name="image"
              />
            </Form.Group>

            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Audios</Form.Label>
              <Form.Control
                type="file"
                onChange={handleAudios}
                multiple
                accept="audio/*"
                name="audio"
              />
            </Form.Group>

            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Videos</Form.Label>
              <Form.Control
                type="file"
                onChange={handleVideos}
                multiple
                accept="video/*"
                name="video"
              />
            </Form.Group>

            {msgError && <p> {msgError} </p>}
            <Button onClick={handleSubmit}>Crear punto</Button>
            <Button>Cancelar</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
