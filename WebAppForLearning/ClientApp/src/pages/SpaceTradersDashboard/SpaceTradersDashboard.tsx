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

const API_USER_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiTlVSQkxORFNQVCIsImlhdCI6MTY4NDE5Nzk3MCwic3ViIjoiYWdlbnQtdG9rZW4ifQ.arsCwf12oaM0jnLlompXeXbxOm98W-aIs1B5OrANMt0WsxhdgzT40nHBkJmUQF257RgA0y1BY7rgHHMhr7olvpwOu-6nmmBVYYnxDvRxKEQTDtBC71yzaNUkmk_Zdp9zDxMFCl0s-MMKLmL-NuGwbO_6DGnkwU8fBrD_REDCsUeimNuYGuRXXCK6N1NSkZzmYBj2fy1NP8-68wqVPAlfe13uHN8Cc-BxRp8XohQi9aJRnHdO5bsyZmYkviMcYjIc1F7skB_goqZSGHy9Gp4o3JKrLOngP91mGJemxlLzQ0JsNMKzJdWCA1pGpWgYgdvMd0tc9aAvTcvTeUVIUD8u_w"


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
    action: string,
    urlBranch: string,
    reqMethod: string = "POST",
    reqData?: {},
    reqConfig?: {}
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
      let outputError = error.response ? error.response.data : error.request ? error.request : error.message
      setResDataState((prevState) => ({ ...prevState, resError: outputError }))
     
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
    } else if (action === "accept_contract" && reqMethod === "POST") {
      axios.post(reqUrl, reqData, { headers: { Authorization: `Bearer ${API_USER_TOKEN}` }})
        .then((res) => handleAxiosResponse(res, "acceptContractResData"))
        .catch(handleAxiosError)
    }
  }

  const handleClick = (e:any) => {
   
    
    switch (e.target.id) {
      case createAgentButtonId:
        sendApiRequest("register", "register", "POST", { symbol: inputText, faction: "COSMIC" })
        break
      
      case viewAgentButtonId:
        sendApiRequest("get_agent", "my/agent", "GET")
        break

      case acceptContractButtonId:
        sendApiRequest("accept_contract", `my/contracts/${inputText}/accept`, "POST")
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
