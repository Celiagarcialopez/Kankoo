import React from "react";

export const ImagesSection = ({ sectionResources }) => {
  return (
    <>
      <img
        className="OneSectionResourceImg"
        src={`http://localhost:3000/resources/images/${sectionResources.text}`}
        alt={`Image `}
      />
    </>
  );
};
