import React from "react";

const Rating = (props) => {
  const starIcons = [];
  for (let i = 0; i < 5; i++) {
    if (i < props.rating) {
      starIcons.push(<i className="fa-solid fa-star pr-1 text-sm text-gold-star" key={i}></i>);
    } else {
      starIcons.push(<i className="fa-solid fa-star pr-1 text-sm text-gray" key={i}></i>);
    }
  }
  return <div>{starIcons}</div>;
};

export default Rating;
