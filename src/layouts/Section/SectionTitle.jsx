import React from "react";

const SectionTitle = (props) => {
  return (
    <div class="section-title py-4 px-5">
      <div class="section-title-content">
        <span class="content font-josefin text-4xl py-3 text-heavy-red">
          {props.sectionTitle.name}
          
        </span>
        <i className={`mx-3 text-2xl ${props.sectionTitle.icon !== '' ? props.sectionTitle.icon : ''}`}></i>
      </div>
    </div>
  );
};

export default SectionTitle;
