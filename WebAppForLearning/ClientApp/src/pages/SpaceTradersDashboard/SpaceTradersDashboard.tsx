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
import { clear } from "console";

interface resDataState {
  createAgentResData?: object;
  viewAgentResData?: object;
  resError?: object;
}

const API_USER_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiQ1JPQURUT0FEIiwiaWF0IjoxNjgzNjYzNzIyLCJzdWIiOiJhZ2VudC10b2tlbiJ9.gltNq7auewpKPwN0ceoZPNNhjEjGuoMIAk9wzn8_o3UBAo9d-vP0KUn-5xznMmmQB3gb-9n0BxU9ux3HwQfwqIHbdU7nyCiDfTrOnpA38wNSa-CyMC6gL8S-rv7Cfp-MefzMjHjmcP4blY6pvcpP-iOLExeoBv1wPl5V6Xbd9L7aMLrPSdzlW0oNn0GMGAl7LUf4Ov9s_QOSVF_AP91fTBplquNuDOuHNSNSU0y2qgEisBbotAF1yWxEZsmYi31dWLMj34iileKU6iZGRw-I6NWL46YcF5lpMZHbBz2pNyd5GtJ33e27657owjd6uzMBIgEUKWQsddllpUXWSfxyrOeXrIgseJwPPXWdkH1s0U2Wkck_MQz3JrQZFkliOu-aQxf6TpnIS-KlI3DXsggj5oHVW44sVuXkhHGWbSwGFRw7QHUAH4SbPLtOoJt-sj1Q1FYLIZsCD3JEF4_FhDmez8QMc1RqEqORJ0kcvc2poz4bfmofJqadIAdlyc116QZ-"


const apiUrl = "https://api.spacetraders.io/v2"

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
  },
  jsonRes: {
    wordWrap: "break-word",
  },
})



const SpaceTradersDashboard = () => {
  const classes = useStyles()
  const inputId = useId("input")
  const createAgentButtonId = useId("createAgentButton")
  const viewAgentButtonId = useId("viewAgentButton")
  const acceptContractButtonId = useId("acceptContractButton")
  const [inputText, setInputText] = useState<string>("")
  const [resDataState, setResDataState] = useState<resDataState | null>(null)

  const clearError = () => { 
    setResDataState((prevState) => ({ ...prevState, resError: undefined }))
  }

  const clearInput = () => {
    setInputText("")
  }

  const sendApiRequest = (
    urlBranch: string,
    reqMethod: string = "POST",
    reqData?: {}
  ) => {

    const handleAxiosResponse = (
      response: any,
      stateDataPropertyName: string
    ) => {
      const newStateData: { [index: string]: object } = {}
      newStateData[stateDataPropertyName] = response.data
      console.log(response.data)
      setResDataState((prevState) => ({ ...prevState, newStateData }))
    }

    const handleAxiosError = (error: any) => {
      setResDataState((prevState) => ({ ...prevState, resError: error }))
      console.error(error)
    }

    const reqUrl = `${apiUrl}/${urlBranch}`

    if (reqMethod === "POST" && urlBranch === "register") {
      axios.post(reqUrl, reqData)
        .then((res) => handleAxiosResponse(res, "createAgentResData"))
        .catch(handleAxiosError)
    } else if (reqMethod === "GET" && urlBranch === "my/agent") {
      axios.get(reqUrl, { headers: { Authorization: `Bearer ${API_USER_TOKEN}` } })
        .then((res) => handleAxiosResponse(res, "viewAgentResData"))
        .catch(handleAxiosError)
    }
  }

  const handleClick = (e:any) => {
   
    
    switch (e.target.id) {
      case createAgentButtonId:
        sendApiRequest("register", "POST", { symbol: inputText, faction: "COSMIC" })
        break
      
      case viewAgentButtonId:
        sendApiRequest("my/agent", "GET")
        break

      case acceptContractButtonId:
        sendApiRequest(`/my/contracts/${inputText}/accept`, "POST", { headers: { Authorization: `Bearer ${API_USER_TOKEN}` }})
        break
    }
    
    clearInput()
    clearError()
  }

  return (
    <>
      <Card className={classes.root}>
        <div className={classes.commandPanel}>
          <Label htmlFor={inputId}>Agent Name:</Label>
          <Input id={inputId} onChange={(e) => setInputText(e.target.value)} />
          <Button id={createAgentButtonId} onClick={handleClick}>Create Agent</Button>
          <Button id={viewAgentButtonId} onClick={handleClick}>View Agent</Button>
          <Button id={acceptContractButtonId} onClick={handleClick}>Accept Contract</Button>
        </div>
        <Text>{JSON.stringify(resDataState)}</Text>
      </Card>
    </>
  )
}

export default SpaceTradersDashboard
