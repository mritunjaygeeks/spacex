
import React, { useEffect } from 'react'
import closeIcon from '../images/cross.png'

function LaunchDataModal(props) {
    const handle = () => {
        props.handlePopUp(false);
    }

    useEffect(() => {
        console.log('dadha', props.data.flight_number);
    }, [])

    return (
        <div className="modal_outer">
            <div className="modal_1">
                <h1 style={{ textAlign: 'center' }}><strong></strong>Launch Details</h1>
                <img onClick={handle} hre="#" src={closeIcon} alt="close_icon" className="Modal_close" />
                <div style={{ padding: '30px 20px 20px' }}>
                    <span><strong>Flight-number :</strong> {props.data.flight_number}</span>
                    <span><strong>Details :</strong> {props.data.details ? props.data.details : "OOP'sThere is no details"}</span>
                    <span><strong>Launch-date :</strong> {props.data.launch_date}</span>
                    <span><strong>Launch-year :</strong> {props.data.launch_year}</span>
                    <span><strong>Misson-name :</strong> {props.data.mission_name}</span>
                    <span><strong>Rocket-id :</strong> {props.data.rocket.rocket_id}</span>
                    <span><strong>Rocket-name :</strong> {props.data.rocket.rocket_name}</span>
                    <span><strong>Rocket-type :</strong> {props.data.rocket.rocket_type}</span>
                    <span><strong>Read-more :</strong> {props.data.links.article_link}</span>
                </div>
            </div>
        </div>
    )
}

export default LaunchDataModal
