import { useNavigate } from "react-router-dom";

export function MoreOptions() {
    const navigate = useNavigate();
    return (
        <>
            <section className="moreOptions">
                <section className="contactSection">
                    <h3 className="contactUsHeading">Contact Us</h3>
                    <ul className="contactList">
                        <li href="mailto:malumez@gmail.com">
                            <i className="fa fa-at icon"></i>
                            <a >
                                malumez@gmail.com
                            </a>
                        </li>
                        <li href="tel:malumez@gmail.com">
                            <i className="fa fa-phone icon"></i>
                            <a >011 625 8639</a>
                        </li>
                        <li href="https://www.instagram.com/malumez/" rel="noopener noreferrer" target="_blank">
                            <i className="fa fa-instagram icon"></i>
                            <a>
                                @malumez
                            </a>
                        </li>
                        <li href="https://www.facebook.com/malumez/" rel="noopener noreferrer" target="_blank">
                            <i className="fa fa-facebook icon"></i>
                            <a >
                                @malumez
                            </a>
                        </li>
                        <li href="https://www.twitter.com/malumez/" rel="noopener noreferrer" target="_blank">
                            <i className="fa fa-twitter icon"></i>
                            <a >
                                @malumez
                            </a>
                        </li>
                    </ul>
                </section>
                <section className="storeSection">
                    <h3 className="storeHeading">Stores</h3>
                    <ul className="storeList">
                        <li  onClick={() => navigate("/seller")}>
                            <i className="fa fa-user-circle icon"></i>
                            <a>My store</a>
                        </li>
                    </ul>
                </section>
                <section className="accountSection">
                    <h3 className="accountHeading">Account</h3>
                    <ul className="accountList">
                        <li onClick={()=>navigate(("/dashboard"))}>
                            <i className="fa fa-user icon"></i>
                            <a >My account</a>
                        </li>
                        <li onClick={() => navigate("/orderStatus")}>
                            <i className="fa fa-truck icon"></i>
                            <a>
                                Track my order
                            </a>{/* eslint-disable-line jsx-a11y/anchor-is-valid */}
                        </li>
                    </ul>
                </section>
            </section>
        </>
    );
}
