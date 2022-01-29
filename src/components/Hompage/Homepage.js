import Header from '../Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Homepage.scss'
import { FormattedMessage } from 'react-intl'
import Services from './Section/Services'

function Homepage() {
    return (
        <>
            <Header />
            <div className='input-search-homepage'>
                <div className='input-search-border'>
                    <div className='input-search-content'>
                        <input
                            type='text'
                            placeholder='How can I help you?'
                            className='input-search'
                        />
                        <span className='input-search-icon'>
                            <FontAwesomeIcon icon='search' className='input-search-icon' />
                        </span>
                    </div>
                </div>
            </div>
            <Services />
        </>
    )
}

export default Homepage
