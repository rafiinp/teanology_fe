import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Journal = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Mood Sensing" prevLocation={prevLocation} />
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">Teanology</span>{" "}
          "The technology capable of detecting drinks based on facial expressions heralds a new revolution in consumer experience. By utilizing image analysis and pattern recognition, this system can identify someone's favorite drink just from their expression. This not only enriches consumer experiences with deeper personalization but also opens new avenues in marketing and market research, by better understanding individual preferences through their facial expressions. This technology not only changes how we view drinks but also how we understand and interpret human interaction with technology in this digital age."
        </h1>
        <a
  href="http://teanology.amanin.id/"
  className="w-52 h-10 bg-primeColor text-white flex items-center justify-center hover:bg-black duration-300"
>
  Let's Try It
</a>

      </div>
    </div>
  );
};

export default Journal;
