import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()
    return (
        <div className="header">
            <div className="title">
                <h1 className="linkStyle" onClick={()=> {navigate("/")}}>limes</h1>
            </div>
            <div className="menu">
                <ul>
                    <li onClick={()=> {navigate("/cinemate")}} className="linkStyle cinemate">CineMate</li>
                    <div />
                    <li className="linkStyle">Drinks</li>
                    <div />
                    <li className="linkStyle">Photodump</li>
                    <div />
                    <li onClick={()=> {navigate("/quotes")}} className="linkStyle">Quotes</li>
                    <div />
                    <li className="linkStyle">Misc</li>
                </ul>
            </div>
        </div>
    )
}
export default Header;