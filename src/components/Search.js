import React from 'react';

const Search = ({searchfield, searchChange}) => {
    return (
        <div className='pa2'>
            <input
            className="bg-light-green pa2"
            type="search"
            placeholder="search robots"
            onChange={searchChange}/>
        </div>
    );
}

export default Search;