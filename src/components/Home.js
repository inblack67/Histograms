import React, { Fragment, useState } from 'react'
import Posts from './Posts';
import Pages from './Pages';

const Home = () => {

    const [clicked, setClick] = useState(false);

    const onClick = e => {
      setClick(true);
    }

    return (
        <Fragment>

            { !clicked &&  <div className='btn-container'>
            <a href="#!" className='btn' onClick={onClick} data-testid='clicker'>
                Load Data
            </a>
        </div> }

            { clicked && <Fragment>
            <p className='text-center' data-testid='isloaded'>
                Data Loaded: true
            </p>
            <Posts />
            <hr/>
            <Pages />
            </Fragment> }
        </Fragment>
    )
}

export default Home
