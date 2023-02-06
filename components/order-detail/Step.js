import format from "date-fns/format";
export default function Steps({ data }) {
  return (
    <div className="w-100">
      <div className="steps-card ml-3" style={{ boxShadow: "none", paddingLeft: "0x" }}>
        <div className="step-list">
          <div className="step step-completed">
            <h1 className={`step-heading step-done`}> {data.title} </h1>
            <h3 className="step-title"> {data.note} </h3>
            <p className="step-description"> {format(new Date(data.createdAt), "HH:mm MM/dd/yyyy")} </p>
          </div>
        </div>
      </div>
    </div>
  )
}