import { Link } from "react-router-dom";
import classes from "./Card.module.css";

const Card = (props) => {
  props = props.props;
  return (
    <Link to={`detailsPage/${props.questionId}`} state={{ from: props }}>
      <div className={classes.card}>
        <div className={classes.image}>
          <img
            src={
              props.coverImageSrc ??
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqeZ5mVbarupP8UWVic7UtumtbIyE0GY-ucQ&usqp=CAU"
            }
            alt={props.title}
          />
        </div>
        <div className={classes.title}>{props.title}</div>
        <div className={classes.extras}>👍 ❤️</div>
      </div>
    </Link>
  );
};

export default Card;
