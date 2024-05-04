import { Router, useNavigate } from 'react-router-dom';

export function SearchBar()
{
  return (
    <>
      <section className="searchBar">
          <i className='fa fa-bars icon'/>
        {/* <button type ="button" id="search_options" className="options_button" /> */}
        <section className="search">
          <input className="inputSearch" type="text" placeholder="Search.."/>
          <i className='fa fa-search icon'/>
          {/* <button type ="button" id="search_options" className="options_button" /> */}
        </section>
      </section>
    </>
  )
}