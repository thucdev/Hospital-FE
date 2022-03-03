import { Col, Row } from "react-bootstrap"
import { FormattedMessage } from "react-intl"
import addressIcon from "../../assets/footer/btm-address.png"
import playIcon from "../../assets/footer/btm-below-2.png"
import emailIcon from "../../assets/footer/btm-email.png"
import hotlineIcon from "../../assets/footer/btm-hotline.png"
import fbIcon from "../../assets/footer/btm-link-facebook.png"
import linkedinIcon from "../../assets/footer/btm-link-linkedin.png"
import ytIcon from "../../assets/footer/btm-link-youtube.png"
import "./Footer.scss"

const Footer = () => {
   return (
      <>
         <footer className='bg-footer'>
            <div className='container overflow-hidden'>
               {/* <Row className='px-5'> */}
               <Row className=''>
                  <Col className='col-lg-5 col-sm-6 pe-3'>
                     <ul>
                        <li className='mb-3'>
                           <FormattedMessage id='footer.hospital' />
                        </li>
                        <li className='mb-3'>
                           <img src={hotlineIcon} alt='' className='icon-footer ' />
                           <FormattedMessage id='footer.emergency-hotline' />
                           (84-24) 3574 1111
                        </li>
                        <li className='mb-3'>
                           <img src={hotlineIcon} alt='' className='icon-footer ' />
                           <FormattedMessage id='footer.phone' />
                           (84-24) 3577 1100
                        </li>
                        <li className='mb-3'>
                           <img src={emailIcon} alt='' className='icon-footer ' /> Email:
                           thucdo.developer@gmail.com
                        </li>
                        <li className='mb-3'>
                           <img src={addressIcon} alt='' className='icon-footer ' />
                           <FormattedMessage id='footer.address' />
                           01 Phương Mai, Đống Đa, Hà Nội
                        </li>
                     </ul>
                  </Col>
                  <Col className='col-lg-4 col-sm-6 pe-3'>
                     <ul>
                        <li className='mb-3 detail-footer '>
                           <img src={playIcon} alt='' className='icon-footer-play ' />
                           <FormattedMessage id='footer.facilities' />
                        </li>
                        <li className='mb-3 detail-footer '>
                           <img src={playIcon} alt='' className='icon-footer-play ' />
                           <FormattedMessage id='footer.packages' />
                        </li>
                        <li className='mb-3 detail-footer '>
                           <img src={playIcon} alt='' className='icon-footer-play ' />
                           <FormattedMessage id='footer.maternity' />
                        </li>
                     </ul>
                  </Col>
                  <Col className='col-lg-3 col-sm-6 pe-3'>
                     <ul>
                        <li className='mb-3 '>
                           <img src={fbIcon} alt='' className='icon-footer ms-1' />
                           /thucdo.developer
                        </li>
                        <li className='mb-3'>
                           <img src={ytIcon} alt='' className='icon-footer ' /> /thucdo.developer
                        </li>
                        <li className='mb-3'>
                           <img src={linkedinIcon} alt='' className='icon-footer ' />{" "}
                           /thucdo.developer
                        </li>
                     </ul>
                  </Col>
               </Row>
            </div>
         </footer>
         <div className='copywrite overflow-hidden'>
            <p className=''>&copy; 2022 Thức Đỗ</p>{" "}
         </div>
      </>
   )
}

export default Footer
