import { useEffect, useState } from "react"
import axios from "axios"
import {
  tokens,
  makeStyles,
  Card,
  Divider,
  Input,
  InputProps,
  useId,
  Label,
  Button,
  ButtonProps,
  Text,
} from "@fluentui/react-components"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  commandPanel: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 0,
    justifyContent: "flex-start",
  }
})

const CreateAgent = (props: InputProps) => {
  const classes = useStyles()
  const inputId = useId("input")
  const [inputText, setInputText] = useState<string>("")
  const [data, setData] = useState<any>(null)

  const handleClick = () => {
    const reqData = { symbol: inputText, faction: "COSMIC" }
    axios
      .post("https://api.spacetraders.io/v2/register", reqData)
      .then((response) => {
        console.log(response.data)
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
        setData(error.response.data)
      })
  }

  return (
    <>
      <Card className={classes.root}>
        <div className={classes.commandPanel}>
        <Label htmlFor={inputId}>Agent Name:</Label>
        <Input id={inputId} onChange={(e) => setInputText(e.target.value)} />
          <Button onClick={handleClick}>Create Agent</Button>
          </div>
        <Text>{JSON.stringify(data)}</Text>
      </Card>
    </>
  )
}

const SpaceTradersDashboard = () => {
  return (
    <>
      <CreateAgent />
    </>
  )
}

export default SpaceTradersDashboard
