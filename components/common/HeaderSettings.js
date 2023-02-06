import { Media } from "reactstrap";


export default function HeaderSettings() {

  return (
    <li className="onhover-div mobile-setting">
      <div>
        <Media src="/assets/images/icon/setting.png" className="img-fluid" alt="" />
        <i className="fa fa-cog"></i>
      </div>
      {/* <div>
        <Media src="/assets/svg/flags/vn.svg" width="32"
          className="img-fluid mr-2" alt="" /><span>VNĐ</span>
      </div> */}
      <div className="show-div setting" style={{backgroundColor: 'white',opacity:"none" }}>
        <h6 style={{color:"black"}}>Ngôn ngữ</h6>
        <ul>
          <li style={{color:"black"}}><a href="#">Tiếng Việt</a></li>
          <li style={{color:"black"}}><a href="#">English</a></li>
          <li style={{color:"black"}}><a href="#">简体中文</a></li>
          <li style={{color:"black"}}><a href="#">Japanese</a></li>
          <li style={{color:"black"}}><a href="#">Korean</a></li>
        </ul>
        <h6 style={{color:"black"}}>Tiền tệ</h6>
        <ul className="list-inline">
          <li className="active"><a href="#">VNĐ</a></li>
          <li style={{color:"black"}}><a href="#">USD</a></li>
          <li style={{color:"black"}}><a href="#">NDT (CN)</a></li>
          <li style={{color:"black"}}><a href="#">Yên (JP)</a></li>
          <li style={{color:"black"}}><a href="#">Won (KR)</a></li>
        </ul>
      </div>
    </li>
  )
}