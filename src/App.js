import logo from './logo.svg';
import './App.css';

function Header() {
  return (
    <>
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    </head>
    <body>
      <header className="homeHeader">
        <img src={require("./assets/Malume'zLogoFull.png")} alt="Malume'z Logo" height = "60" width="auto"/>
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

//Wassup

export default Header;
