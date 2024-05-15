import React from 'react';

export function MoreOptions() {
  return (
    <>
      <section className="moreOptions">
        <section className="contactSection">
          <h3 className="contactUsHeading">Contact Us</h3>
          <ul className="contactList">
            <li>
              <i className="fa fa-at icon"></i>
              <a href="mailto:malumez@gmail.com">malumez@gmail.com</a>
            </li>
            <li>
              <i className="fa fa-phone icon"></i>
              <a href="tel:0116258639">011 625 8639</a>
            </li>
            <li>
              <i className="fa fa-instagram icon"></i>
              <a href="https://www.instagram.com/malumez/">@malumez</a>
            </li>
            <li>
              <i className="fa fa-facebook icon"></i>
              <a href="https://www.facebook.com/malumez/">@malumez</a>
            </li>
            <li>
              <i className="fa fa-twitter icon"></i>
              <a href="https://www.twitter.com/malumez/">@malumez</a>
            </li>
          </ul>
        </section>
        <section className="storeSection">
          <h3 className="storeHeading">Stores</h3>
          <ul className="storeList">
            <li>
              <i className="fa fa-search icon"></i>
              <button>Find a store</button> {/* Change to a button if not functional */}
            </li>
            <li>
              <i className="fa fa-money icon"></i>
              <button>Become a seller</button> {/* Change to a button if not functional */}
            </li>
            <li>
              <i className="fa fa-phone icon"></i>
              <button>Contact a seller</button> {/* Change to a button if not functional */}
            </li>
          </ul>
        </section>
        <section className="accountSection">
          <h3 className="accountHeading">Account</h3>
          <ul className="accountList">
            <li>
              <i className="fa fa-user icon"></i>
              <button>Manage my account</button> {/* Change to a button if not functional */}
            </li>
            <li>
              <i className="fa fa-truck icon"></i>
              <button>Track my order</button> {/* Change to a button if not functional */}
            </li>
          </ul>
        </section>
        <section className="helpSection">
          <h3 className="helpHeading">Help and support</h3>
          <ul className="helpList">
            <li>
              <i className="fa fa-question-circle icon"></i>
              <button>FAQ</button> {/* Change to a button if not functional */}
            </li>
            <li>
              <i className="fa fa-question-circle icon"></i>
              <button>Support</button> {/* Change to a button if not functional */}
            </li>
            <li>
              <i className="fa fa-flag icon"></i>
              <button>Report a seller</button> {/* Change to a button if not functional */}
            </li>
          </ul>
        </section>
      </section>
    </>
  );
}

export default MoreOptions;
