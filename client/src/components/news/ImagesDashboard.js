import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";

export default function ImagesDashboard() {
  const [imageIds, setImageIds] = useState();

  const loadImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      setImageIds(data);
    } catch (error) {
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div>
      {imageIds &&
        imageIds.map((imageId, index) => (
          <Image
            key={index}
            cloudName="trvStorage"
            publicId={imageId}
            width="300"
            crop="scale"
          />
        ))}
    </div>
  );
}
