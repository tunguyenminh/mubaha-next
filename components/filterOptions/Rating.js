const Rating = ({hanldeRating}) => {
  const arrRating = [0,1,2,3,4]
  return (
    <>
      <div className="collection-collapse-block border-0 open">
        <h3 className="collapse-block-title">Đánh giá</h3>
        <div className="collection-collapse-block-content">
          <div className="wrapper mt-3">
            <div className="range-slider">
              <div className="rating-section">
              {[4,3,2,1,0].map((item,i) =>{
                return (
                  <div key={i}className="rating" role="button" value="5" onClick={() => hanldeRating(item+1)}>
                  {arrRating.map((value,index) =>{
                    if(item - value >= 0){
                      return  <i key={index} className="fa fa-star" />
                    }else{
                      return  <i key={index} className="fa fa-light fa-star" style={{color:"rgb(184, 184, 184)"}}></i>
                    }
                  })}
                  Từ {item + 1} sao
                </div>
                )
              })}
              </div>
            </div>
          </div>
        </div>

      </div>

    </>


  );
};

export default Rating;
