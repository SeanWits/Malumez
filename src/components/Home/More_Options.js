import { useNavigate } from "react-router-dom";

export function MoreOptions() {
    //const navigate = useNavigate();
    return (
        <>
            <section className="moreOptions">
                <section className="contactSection">
                    <h3 className="contactUsHeading">Contact Us</h3>
                    <ul className="contactList">
                        <li>
                            <i className="fa fa-at icon"></i>
                            <a href="mailto:malumez@gmail.com">
                                malumez@gmail.com
                            </a>
                        </li>
                        <li>
                            <i className="fa fa-phone icon"></i>
                            <a href="tel:malumez@gmail.com">011 625 8639</a>
                        </li>
                        <li>
                            <i className="fa fa-instagram icon"></i>
                            <a href="https://www.instagram.com/malumez/">
                                @malumez
                            </a>
                        </li>
                        <li>
                            <i className="fa fa-facebook icon"></i>
                            <a href="https://www.facebook.com/malumez/">
                                @malumez
                            </a>
                        </li>
                        <li>
                            <i className="fa fa-twitter icon"></i>
                            <a href="https://www.twitter.com/malumez/">
                                @malumez
                            </a>
                        </li>
                    </ul>
                </section>
                <section className="storeSection">
                    <h3 className="storeHeading">Stores</h3>
                    <ul className="storeList">
                        <li>
                            <i className="fa fa-search icon"></i>
                            <a href="#">Find a store</a> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
                        </li>
                        <li>
                            <i className="fa fa-money icon"></i>
                            <a href="#">Become a seller</a> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
                        </li>
                        <li>
                            <i className="fa fa-phone icon"></i>
                            <a href="#">Contact a seller</a> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
                        </li>
                    </ul>
                </section>
                <section className="accountSection">
                    <h3 className="accountHeading">Account</h3>
                    <ul className="accountList">
                        <li>
                            <i className="fa fa-user icon"></i>
                            <a href="#">Manage my account</a> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
                        </li>
                    </ul>
                </section>
                <section className="helpSection">
                    <h3 className="helpHeading">Help and support</h3>
                    <ul className="helpList">
                        <li>
                            <i className="fa fa-question-circle icon"></i>
                            <a href="#">FAQ</a> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
                        </li>
                        <li>
                            <i className="fa fa-question-circle icon"></i>
                            <a href="#">Support</a> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
                        </li>
                        <li>
                            <i className="fa fa-flag icon"></i>
                            <a href="#">Report a seller</a> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
                        </li>
                    </ul>
                </section>
            </section>
        </>
    );
}
