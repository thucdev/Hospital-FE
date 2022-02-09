import Dropdown from 'react-bootstrap/Dropdown'
import FlagIcon from '../../../styles/FlagIcon'
import { useState } from 'react'

import { Form } from 'react-bootstrap'

function ManageSchedule() {
    const [countries] = useState([
        { code: 'gr', title: 'Greece' },
        { code: 'gb', title: 'United Kingdom' },
        { code: 'us', title: 'United States' },
    ])
    const [toggleContents, setToggleContents] = useState('Select a country')
    const [selectedCountry, setSelectedCountry] = useState()

    console.log('select', selectedCountry)

    return (
        <div className='App'>
            <Form>
                <Dropdown
                    onSelect={(eventKey) => {
                        const { code, title } = countries.find(({ code }) => eventKey === code)

                        setSelectedCountry(eventKey)
                        setToggleContents(
                            <>
                                <FlagIcon code={code} /> {title}
                            </>
                        )
                    }}
                >
                    <Dropdown.Toggle
                        variant='secondary'
                        id='dropdown-flags'
                        className='text-left'
                        style={{ width: 300 }}
                    >
                        {toggleContents}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {countries.map(({ code, title }) => (
                            <Dropdown.Item key={code} eventKey={code}>
                                <FlagIcon code={code} /> {title}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Form>
        </div>
    )
}

export default ManageSchedule
