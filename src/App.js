import logo from "./assets/Malume'zLogoFullNoBackground.png";
import './App.css';

function Header() {
  return (
    <>
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    </head>
    <body>
      <header className="homeHeader">
        <img src={logo} alt="Malume'z Logo" height = "60" width="auto"/>
        <section>
          <i className='fa fa-question-circle icon'/>
          <i className='fa fa-shopping-basket icon'/>
          <i className='fa fa-user-circle icon'/>
        </section>
      </header>
    </body>
    </>
  );
}

export function SearchBar()
{
  return (
    <>
      <section className="searchBar">
        <button type ="button" id="search_options" className="options_button" />
        <section>
          <input type="text" placeholder="Search.."/>
          <button type ="button" id="search_options" className="options_button" />
        </section>
      </section>
    </>
  )
}

//Wassup

export default Header;
