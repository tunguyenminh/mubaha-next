import format from "date-fns/format";

export default function Steps({ data }) {
  return (
    <div className="w-100">
      <div className="steps-card ml-3 myp-0" style={{ boxShadow: "none", paddingLeft: "0x" }}>
        <div className="step-list">
          {data.map((step, index) => {
            let style = "step";
            if (index === 0) {
              style = "step step-completed";
            } else {
              style = "step step-incomplete";
            }
            return (
              <div key={step._id} className={style}>
                <h1 className={`step-heading ${index == 0 && "step-done"}`}> {step.title} </h1>
                <h3 className="step-title"> {step.note} </h3>
                <p className="step-description"> {format(new Date(step.createdAt), "HH:mm MM/dd/yyyy")} </p>

              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}