
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Logout } from './container/Auth';
import ROUTES from '../routes/Static';
import logo from '../images/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import FETCHLAUNCHES from '../redux/action/index';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { actionType } from '../redux/action/index';
import dayjs from 'dayjs'
import LaunchDataModal from '../modal/LaunchDataModal'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

function DashBoard(props) {
    const history = useHistory()
    const dispatch = useDispatch()
    const data = useSelector((state) => {
        const { launchData, filterDates, filterUpcomingPast } = state
        if (filterDates) {
            const start = dayjs(filterDates.startDate, 'YYYY-MM-DD')
            const end = dayjs(filterDates.endDate, 'YYYY-MM-DD')
            if (start.isValid() && end.isValid()) {
                return launchData.filter((value) => {
                    const launchDate = dayjs(value.launch_date_local)
                    return launchDate.isBefore(end) && launchDate.isAfter(start) // default milliseconds
                })
            }
        } else if (filterUpcomingPast === true) {
            return launchData.filter((value) => {
                return value.upcoming === true
            })
        } else if (filterUpcomingPast === false) {
            return launchData.filter((value) => {
                return value.upcoming === false
            })
        }
        return launchData
    })

    const [date, setDates] = useState({
        startDate: '',
        endDate: ''
    })

    const [filterLaunches, setFilterLaunches] = useState({
        check: ''
    });

    const [upcoming, setUpcoming] = useState("")

    const [launchPopUpData, setLaunchPopData] = useState({})

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        dispatch(FETCHLAUNCHES())
    }, [])


    // clearing storage and logout
    const clear = () => {
        Logout(history);
    }

    const classes = useStyles();


    const onChangeStartDate = (e = {}) => {
        const startDate = e?.target?.value || ""
        setDates({ ...date, startDate });
        dispatch({
            type: actionType.UPDATE_FILTER_DATES,
            payload: { ...date, startDate }
        });
    }
    const onChangeEndDate = (e = {}) => {
        const endDate = e?.target?.value || ""
        setDates({ ...date, endDate });
        dispatch({
            type: actionType.UPDATE_FILTER_DATES,
            payload: { ...date, endDate }
        });
    }




    const handleChange = (e) => {
        const { value, name } = e.target
        setUpcoming(value)
        const check = value === 'upcoming' ? true : value === 'past' ? false : ''
        setFilterLaunches({ ...filterLaunches, check })
        dispatch({
            type: actionType.FILTER_LAUCHES_DATA,
            payload: { ...filterLaunches, check }
        })
        setDates({ ...date, startDate: '', endDate: '' })
    }

    const viewLaunchData = (val) => {
        setLaunchPopData(val);
        setIsOpen(true);
    }


    const localStorageLoginInfo = () => {
        const localData = localStorage.getItem('loginData')
        console.log(localData)
        if (localData) {
            return JSON.parse(localStorage.getItem('loginData'))
        } else { return [] }
    }
    const [localuserInfo, setLocalUserInfo] = useState(localStorageLoginInfo())
    console.log(localuserInfo)

    return (
        <>

            <header className="header_main">

                <a href={ROUTES.dashboard} className="site_logo"><img src={logo} alt="site_logo" ></img></a>
                <div className="right_side">
                   
                    <figure>
                        <img src={localuserInfo.picture.data.url}></img>
                        <figcaption>{localuserInfo.name}</figcaption>
                    </figure>
                    <NavLink activeClassName="active" to={ROUTES.login} onClick={clear}>Logout</NavLink>

                </div>
            </header>
            <div className="dashboard">
                <div className="total_launch"><h1>{data.length}</h1>
                    <p>Total launches</p>
                </div>
                <ul className="flight_launches">
                    { }
                    <header className="lauches_header">
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="age-native-label-placeholder">
                               Selection's
                           </InputLabel>

                            <NativeSelect
                                value={upcoming} onChange={handleChange} name="upcoming">
                                <option value="">All</option>
                                <option value="upcoming">Upcoming    Launches</option>
                                <option value="past">Past Launches</option>
                            </NativeSelect>

                        </FormControl>
                        <form className={classes.container} noValidate>
                            <TextField
                                id="date"
                                label="Start Date"
                                type="date"
                                defaultValue={date.startDate}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={onChangeStartDate}
                            />
                            <TextField
                                id="date2"
                                label="End Date"
                                type="date"
                                defaultValue={date.endDate}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={onChangeEndDate}
                            />
                        </form>
                    </header>
                    {data.map((val, id) => {
                        const { flight_number, mission_name, launch_year, launch_success, launch_date_local } = val;
                        return (

                            <li key={mission_name} id={flight_number} onClick={() => viewLaunchData(val)}>
                                <span><strong>FLIGHT-NO :</strong>  {flight_number}</span>
                                <span> <strong>LAUNCH-DATE :</strong>  {dayjs(launch_date_local).format('DD-MM-YYYY HH:mm:ss A')}</span>
                                <span> <strong> LAUNCH-YEAR :</strong> {launch_year}</span>
                                <span> <strong>MISSION-NAME :</strong> {mission_name}</span>
                                <span> <strong>LAUNCH-SUCCESS :</strong> {launch_success === true ? "TRUE" : "FALSE"}</span>

                            </li>

                        )
                    })}
                </ul>
            </div>
            { isOpen ? <LaunchDataModal data={launchPopUpData} handlePopUp={setIsOpen} /> : null}
        </>
    )
}

export default DashBoard
