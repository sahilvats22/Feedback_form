import { useEffect, useState } from 'react'
import Form from './component/Form'
import axios from 'axios'

function App() {

  const [getFeedbackData, setGetFeedbackData] = useState([])
  
  console.log(getFeedbackData)

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/feedback")
      setGetFeedbackData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Form getFeedbackData={getFeedbackData}
        setGetFeedbackData={setGetFeedbackData}
      />
    </>
  )
}

export default App
