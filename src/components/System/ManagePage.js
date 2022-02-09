import { Row, Col, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ManageDoctor from "./Doctor/ManageDoctor"

function ManagePage() {
    return (
        <Row>
            <Col>
                <div className='manage-menu'>
                    <div className='manage-menu-header'>Dasboard</div>
                    <div className='manage-menu-body'>
                        <div className='menu-manage-doctor'>
                            <FontAwesomeIcon icon='user-md' />
                            <span>Manage Doctor</span>
                        </div>
                    </div>
                </div>
            </Col>
            {/* <Col>
                <ManageDoctor />
            </Col> */}
        </Row>
    )
}

export default ManagePage
