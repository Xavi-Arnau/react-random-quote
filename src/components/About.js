import { useNavigate } from "react-router-dom";
import Button from "./Button";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="about">
      <p>This was made with react for learning purposes.</p>
      <p>Used The One Api for the data.</p>
      <Button text="Go Back" onClick={() => navigate(-1)} />
    </div>
  );
};

export default About;
