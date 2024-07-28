import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// REACT
import { useEffect, useState } from "react";

// MATERIAL UI COMPONENT
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

// EXTERNAL LIBRARIES
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./WeatherApiSlice";

moment.locale("ar");

function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => {
    console.log(state.weather.isLoading);
    return state.weather.isLoading;
  });

  const temp = useSelector((state) => {
    console.log("**********************************");
    console.log(state.weather.weather);
    return state.weather.weather;
  });

  // states
  const { t, i18n } = useTranslation();

  const [dateAndTime, setDateAndTime] = useState("");
  const [locale, setLocale] = useState("ar");
  const [city, setCity] = useState("Riyadh");
  const [cityInput, setCityInput] = useState("Riyadh");
  const direction = locale === "ar" ? "rtl" : "ltr";

  //==== states

  const theme = createTheme({
    typography: {
      fontFamily: "IBM",
    },
  });

  // use effects and api
  useEffect(() => {
    i18n.changeLanguage("ar");

    dispatch(fetchWeather(city));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("calling");

    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));

    // eslint-disable-next-line
  }, []);

  //===== handlers
  function handleLanguageClick() {
    if (locale === "ar") {
      i18n.changeLanguage("en");
      setLocale("en");
      moment.locale("en");
    } else {
      i18n.changeLanguage("ar");
      setLocale("ar");
      moment.locale("ar");
    }

    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function handleFetchWeather() {
    dispatch(fetchWeather(city));
    setCityInput(city);
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* container content  */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {/* card  */}
            <TextField
              variant="outlined"
              value={city}
              onChange={handleCityChange}
              label={t("City Name")}
              style={{ marginRight: "10px", color: "white" }}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
              }}
            />
            <Button
              style={{ color: "white", marginBottom: "30px" }}
              variant="contained"
              onClick={handleFetchWeather}
            >
              {t("Get Weather")}
            </Button>
            <div
              style={{
                direction: direction,
                width: "100%",
                backgroundColor: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* card content  */}
              <div>
                {/* city and date  */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                >
                  <Typography style={{ marginRight: "10px" }} variant="h2">
                    {t(cityInput)}
                  </Typography>
                  <Typography style={{ marginRight: "10px" }} variant="h4">
                    {dateAndTime}
                  </Typography>
                </div>
                {/*=== city and date  ===*/}
                <hr />
                {/* container of degreen and cloud icon */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {/* degree and description  */}
                  <div>
                    {/* TEMP */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress style={{ color: "white" }} />
                      ) : (
                        ""
                      )}

                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>

                      <img src={temp.icon} alt="temperature" />
                    </div>
                    {/*=== TEMP ===*/}

                    <Typography variant="h6">{t(temp.description)}</Typography>
                    {/* MIN AND MAX */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>
                        {t("min")}: {temp.min}
                      </h5>
                      <h5 style={{ margin: "0 7px" }}>|</h5>
                      <h5>
                        {t("max")}: {temp.max}
                      </h5>
                    </div>
                    {/*=== MIN AND MAX ===*/}
                  </div>
                  {/*=== degree and description  ===*/}
                  <CloudIcon style={{ fontSize: "200px", color: "white" }} />
                </div>
                {/*=== container of degreen and cloud icon === */}
              </div>
              {/*=== card content  ===*/}
            </div>
            {/*=== card ===*/}
            <div
              style={{
                direction: direction,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                marginTop: "10px",
              }}
            >
              <Button
                style={{ color: "white" }}
                variant="text"
                onClick={handleLanguageClick}
              >
                {locale === "ar" ? "انجليزي" : "Arabic"}
              </Button>
            </div>
          </div>
          {/*=== container content  ===*/}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
