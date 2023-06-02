import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <img
        src="./marvel_display_img4.jpg"
        className="hero-image mh-full gradient-overlay"
        alt="Marvel Comic Characters"
      />
      <div className="title-wrapper">
        <h1 className="display-1 title centered" data-aos="fade-up">
          Comic Craze
        </h1>
      </div>
    </>
  );
}

export default Home;
