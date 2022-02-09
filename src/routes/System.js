import React from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { Row, Col, Stack } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./System.scss"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Dropdown } from "react-bootstrap"
import FlagIcon from "../styles/FlagIcon"

export const System = () => {
    const navigate = useNavigate()

    const isAuth = useSelector((state) => state.authReducer.login.isAuthenticated)

    useEffect(() => {
        if (!isAuth) {
            // navigate('/login')
        }
    }, [])

    const [toggleContents, setToggleContents] = useState(
        <>
            <FlagIcon code='vn' /> Việt Nam
        </>
    )
    const [selectedLanguage, setSelectedLanguage] = useState({ code: "vn", title: "Việt Nam" })
    const [languages] = useState([
        { code: "vn", title: "Việt Nam" },
        { code: "us", title: "English" },
    ])
    return (
        <div className='container-fluid'>
            <Stack>
                <Row>
                    <Col className='manage-navbar col-3 '>
                        <div className='manage-navbar-title'>DASHBOARD</div>
                        <Link className='manage-navbar-text' to='manage-doctor'>
                            Manage Doctor
                        </Link>
                        <Link className='manage-navbar-text' to='manage-specialty'>
                            Manage Specialty
                        </Link>
                        <Link className='manage-navbar-text' to='manage-schedule'>
                            Manage Schedule
                        </Link>
                    </Col>
                    <Col className='manage-header col-9'>
                        <div className='manage-menu '>
                            <Row>
                                <div className='manage-menu-logout'>
                                    <>
                                        <Dropdown
                                            onSelect={(eventKey) => {
                                                const { code, title } = languages.find(
                                                    ({ code }) => eventKey === code
                                                )

                                                setSelectedLanguage(eventKey)
                                                setToggleContents(
                                                    <>
                                                        <FlagIcon code={code} /> {title}
                                                    </>
                                                )
                                            }}
                                            className='dropdown-language'
                                        >
                                            <Dropdown.Toggle
                                                variant='outline-info'
                                                id='dropdown-flags'
                                                className='text-left '
                                                size='sm'
                                            >
                                                {toggleContents}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {languages.map(({ code, title }) => (
                                                    <Dropdown.Item key={code} eventKey={code}>
                                                        <FlagIcon code={code} /> {title}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </>
                                    <div className='manage-menu-logout-content'>
                                        <span>
                                            <FontAwesomeIcon icon='user-md' className='icon' />
                                        </span>
                                        <span className='manage-menu-logout-text'>Logout</span>
                                    </div>
                                </div>
                            </Row>
                            <Row>
                                <div className='manage-menu-body '>
                                    <div className='menu-manage-doctor'>
                                        <span>
                                            <Outlet />
                                        </span>
                                    </div>
                                </div>
                            </Row>
                        </div>
                    </Col>
                    {/* <Col></Col> */}
                </Row>
            </Stack>
        </div>
    )
}
