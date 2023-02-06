export default function Breadcrumb({currentValue,previousValue,previousLink}) {
  return(
  <div className="breadcrumb-section">
  <div className="container">
    <div className="row">
      <div className="col-sm-6">
        <div className="page-title">
          <h2>{currentValue}</h2>
        </div>
      </div>
      <div className="col-sm-6">
        <nav aria-label="breadcrumb" className="theme-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href={previousLink}>{previousValue}</a></li>
            <li className="breadcrumb-item active" aria-current="page">{currentValue}</li>
          </ol>
        </nav>
      </div>
    </div>
  </div>
</div>
)
}