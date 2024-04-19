import "./Footer.css"
import instagram_icon from "../../assets/instagram_icon.png";
import pintester_icon from "../../assets/pintester_icon.png";
import whatsapp_icon from "../../assets/whatsapp_icon.png";
import footer_logo from "../../assets/logo.jpg";
export default function Footer() {
  return (
    <div className="footer">
        <hr/>
      <div className="footer-logo">
        <img src={footer_logo} />
        <p>BLOGGER</p>
      </div>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <a className="nav-link" href="#">
            Company
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Products
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Offices
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            About
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Contact
          </a>
        </li>
      </ul>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <a className="nav-link" href="#">
            <img src={instagram_icon} />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <img src={pintester_icon} />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <img src={whatsapp_icon} />
          </a>
        </li>
      </ul>
      <div className="copyright">
        <h5>Copyright @ 2024-2025 All Rights Reserved</h5>
      </div>
    </div>
  );
}
