import React, { Fragment } from "react";
import Countdown from "react-countdown";

const CountdownComponent = () => {
  const Completionist = () => <span>You are good to go!</span>;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="timer-box">
            <div className="timer">
              <div className="timer-p" id="demo">
                <span>
                  {days}
                  <span className="padding-l">:</span>
                  <span className="timer-cal">Ngày</span>
                </span>
                <span>
                  {hours}
                  <span className="padding-l">:</span>
                  <span className="timer-cal">Giờ</span>
                </span>
                <span>
                  {minutes}
                  <span className="padding-l">:</span>
                  <span className="timer-cal">Phút</span>
                </span>
                <span>
                  {seconds}
                  <span className="timer-cal">Giây</span>
                </span>
              </div>
            </div>
        </div>
      );
    }
  };

  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  var coundown = new Date(year, month, day + 10).getTime();

  return (
    <Fragment>
      <Countdown date={coundown} renderer={renderer} />
    </Fragment>
  );
};

export default CountdownComponent;