import { useState } from "react"
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  Outlet,
} from "react-router-dom"
import {
  makeStyles,
  tokens,
  Button,
  Text,
  shorthands,
} from "@fluentui/react-components"
import "./App.css"
import WeatherForecast from "./pages/WeatherForecast"
import SpaceTradersDashboard from "./pages/SpaceTradersDashboard/SpaceTradersDashboard"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  navBar: {
    position: "sticky",
    width: "100%",
    display: "flex",
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    flexDirection: "row",
    justifyContent: "flex-start",
    ...shorthands.borderRadius("none"),
    ...shorthands.borderBottom(
      tokens.strokeWidthThin,
      "solid",
      tokens.colorNeutralStroke1
    ),
    backgroundColor: tokens.colorNeutralBackground2,
    "& button": {
      ...shorthands.flex(0),
      marginLeft: tokens.spacingHorizontalS,
    },
  },
  mainContent: {
    ...shorthands.margin(tokens.spacingVerticalS, tokens.spacingHorizontalS),
  },
})

const Home = () => {
  const classes = useStyles()

  return (
    <Text className={classes.root}>
      <h1>Welcome</h1>
    </Text>
  )
}

const Root = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  return (
    <div className={classes.root}>
      <div className={classes.navBar}>
        <Button onClick={() => navigate("/")}>Home</Button>
        <Button onClick={() => navigate("/weather")}>Weather</Button>
        <Button onClick={() => navigate("/space-traders")}>SpaceTraders</Button>
      </div>
      <main className={classes.mainContent}>
        <Outlet />
      </main>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/weather",
        element: <WeatherForecast />,
      },
      {
        path: "/space-traders",
        element: <SpaceTradersDashboard />,
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
