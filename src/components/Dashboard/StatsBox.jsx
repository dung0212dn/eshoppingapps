import React from "react";

const StatsBox = (props) => {
  return (
    <>
      <div className="stat-box-container  rounded-2xl shadow-2xl overflow-hidden border border-gray-light">
        <div className="stat-box-wrapper flex h-24">
          <div className="stat-icon bg-blue w-1/4 text-center text-4xl h-full flex items-center justify-center text-white">
            <i className={props.icon}></i>
          </div>
          <div className="stat-info w-3/4 py-4 px-2 h-full flex items-center">
            <div className="stat-info-wrapper">
              <div className="stat-title font-josefin capitalize text-xl">{props.title}</div>
              <div className="stat-content w-full">
                <span className="number text-3xl pr-1 font-josefin text-heavy-red">{props.number}</span>
                <span className="number text-xl pr-1 font-josefin">{props.unit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsBox;
