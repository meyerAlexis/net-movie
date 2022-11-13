import React, { useEffect, useState } from 'react';
import '../styles/Header.css';
import '../styles/Menu.css';

import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

import { red } from '@mui/material/colors';

//Icone
import MenuIco from '@material-ui/icons/Menu';
import CloseIco from '@material-ui/icons/Close';
import logo from "../img/logo_net_movie.png"

//Class
import { ButOk } from '../styles/Button';


export default function Header({ black, text, paramLocal }) {

    const [isMenuIco, setIsMenuIco] = useState(true);
    const [isMenu, setIsMenu] = useState(false);

    const [paramLocalLang, setParamLocalLang] = useState("fr");


    //Local movie cover grey
    const [paramLocalMovieCoverGrey, setParamLocalMovieCoverGrey] = useState();
    const handleChangeMovieCoverGrey = (event) => {
        console.log("handleChangeMovieCoverGrey : ", event.target.checked)
        setParamLocalMovieCoverGrey(event.target.checked);
    };

    //Local categorie movie
    const [paramLocalCatMovie, setParamLocalCatMovie] = useState([]);
    const [state, setState] = React.useState({
        originals: true,
        trending: true,
        toprated: true,
        action: true,
        comedy: true,
        horror: true,
        romance: true,
        documentary: true,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };
    const { originals, trending, toprated, action, comedy, horror, romance, documentary } = state;
    const error = [originals, trending, toprated, action, comedy, horror, romance, documentary].filter((v) => v).length < 2;


    useEffect(() => {
        const LoadAll = async () => {
            //Param lang site
            let _paramLocalLang = await paramLocal.getParamLang();
            if (typeof _paramLocalLang === "string") {
                setParamLocalLang(_paramLocalLang)
            }
            else {
                paramLocal.setParamLang("fr");
            }

            //param cover movie grey
            let _paramLocalMovieCoverGrey = await paramLocal.getParamMovieCoverGrey();
            setParamLocalMovieCoverGrey(_paramLocalMovieCoverGrey === "1" ? true : false)

        }
        LoadAll();
    }, []);


    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const colorTxtColor = { color: "red" };
    const styleCheckBox = {
        color: red[800],
        '&.Mui-checked': {
            color: red[600],
        }
    };

    return (
        <>
            <header className={black ? 'black' : ''}>
                <div className='header--logo'>
                    <a href='/'>
                        <img src={logo} alt="netmovie" />
                    </a>
                </div>
                <div className='header--user'>
                    {isMenuIco ?
                        <div className='menu-ico' onClick={() => {
                            setIsMenuIco(!isMenuIco);
                            setIsMenu(!isMenu);
                            //Scroll in top for see menu 
                            window.scrollTo(0, 0);
                        }}>
                            <div className='menu-ico' >
                                <MenuIco />
                            </div>
                        </div>
                        :
                        <div className='close-ico' onClick={() => {
                            setIsMenuIco(!isMenuIco);
                            setIsMenu(!isMenu);
                        }}>
                            <div className='close-ico' >
                                <CloseIco />
                            </div>
                        </div>
                    }
                </div>
            </header>

            {isMenu ?
                <div >
                    <div className="menu" >
                        <div style={{ display: "inline-block", width: "100%", marginLeft: "10px" }}>
                            <div>{text.menuLang} :
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} >
                                    <Select
                                        id="langSite-select-menu"
                                        label={text ? text.lblLangSite : "lblLangSite"}
                                        style={{ backgroundColor: "white" }}
                                        value={paramLocalLang}
                                        onChange={(e) => {
                                            setParamLocalLang(e.target.value);
                                        }} >
                                        <MenuItem value="fr">{text ? text.langFr : "fr"}</MenuItem>
                                        <MenuItem value="en">{text ? text.langEn : "en"}</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>{text.menuMovieCoverGrey} :
                                <Checkbox
                                    checked={paramLocalMovieCoverGrey}
                                    onChange={handleChangeMovieCoverGrey}
                                    sx={styleCheckBox} />
                            </div>


                            <div>
                                <span>{text.menuCatChoice} : </span>
                                <FormControl required sx={{ m: 8, margin: "5px" }} component="fieldset" variant="standard" error={error}>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox sx={styleCheckBox} checked={originals} onChange={handleChange} name="originals" />}
                                            label={text.homeOriginals}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox sx={styleCheckBox} checked={trending} onChange={handleChange} name="trending" />}
                                            label={text.homeTrending}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox sx={styleCheckBox} checked={toprated} onChange={handleChange} name="toprated" />}
                                            label={text.homeToprated}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox sx={styleCheckBox} checked={action} onChange={handleChange} name="action" />}
                                            label={text.homeAction}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox sx={styleCheckBox} checked={comedy} onChange={handleChange} name="comedy" />}
                                            label={text.homeComedy}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox sx={styleCheckBox} checked={horror} onChange={handleChange} name="horror" />}
                                            label={text.homeHorror}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox sx={styleCheckBox} checked={romance} onChange={handleChange} name="romance" />}
                                            label={text.homeRomance}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox sx={styleCheckBox} checked={documentary} onChange={handleChange} name="documentary" />}
                                            label={text.homeDocumentary}
                                        />
                                    </FormGroup>

                                    <FormHelperText>{text.homeErrorCatChoice}</FormHelperText>
                                </FormControl>

                            </div>

                            <div>
                                <ButOk variant="contained" onClick={() => {


                                    //List categorie movie
                                    let objCheck = {
                                        originals: originals,
                                        trending: trending,
                                        toprated: toprated,
                                        action: action,
                                        comedy: comedy,
                                        horror: horror,
                                        romance: romance,
                                        documentary: documentary,
                                    }

                                    let listCheck = [originals,
                                        trending,
                                        toprated,
                                        action,
                                        comedy,
                                        horror,
                                        romance,
                                        documentary,]

                                    let numCatValidate = 0;
                                    listCheck.forEach(choiceCat => {
                                        if (choiceCat) numCatValidate++;
                                    });

                                    //Save and close, if categorie >= 2
                                    if (numCatValidate >= 2) {
                                        //Save param lang
                                        paramLocal.setParamLang(paramLocalLang);

                                        //Save cover movie grey
                                        paramLocal.setParamMovieCoverGrey((paramLocalMovieCoverGrey ? "1" : "0"));

                                        //Save categorie movie
                                        paramLocal.setParamCatMovie()

                                        console.log("Update paramLocalMovieCoverGrey", (paramLocalMovieCoverGrey ? "1" : "0"))
                                        setIsMenuIco(!isMenuIco);
                                        setIsMenu(!isMenu);

                                        window.location.reload();

                                    }

                                }}>{text.menuButOk}</ButOk>
                            </div>
                        </div>
                    </div>
                </div >
                :
                <div >
                </div>
            }
        </>
    );
}