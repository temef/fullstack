import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = (props) => {

    // console.log(props)

    const handleChange = async (event) => {
      // console.log(event.target.value)
      const text = event.target.value
      props.filter(text)
    }


    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  
  
  export default connect(null, { filter })(Filter)