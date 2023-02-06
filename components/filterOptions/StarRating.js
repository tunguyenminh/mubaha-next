export default function StarRating({ value }) {
  let arrRating = Array.from({ length: Math.floor(value) }, (v, i) => i * 0);
  if(arrRating.length != 5){
    for(let i = 0; i < 5 - arrRating.length; i){
      arrRating.push(1)
    }
  }
  return (
    <>
      {
        arrRating.map((value, index) => {
          if (value == 0) {
            return <i key={index} className="fa fa-star" />
          } else {
            return <i key={index} className="fa fa-light fa-star" style={{ color: "rgb(184, 184, 184)" }}></i>
          }
        })}
    </>
  )
}