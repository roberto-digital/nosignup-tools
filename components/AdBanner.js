import React, { useEffect } from "react";

const AdBanner = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle adbanner-customize"
      style={{
        display: "block",
      }}
      data-ad-client="ca-pub-8386642151048084"
      data-ad-slot="5631895541"
    />
  );
};

export default AdBanner;
