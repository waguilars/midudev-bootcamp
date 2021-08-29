import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdote } from '../reducers/filterReducer';

const Filter = (props) => {

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const value = event.target.value
    props.filterAnecdote(value)
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

const mapDispatchToProps = {
  filterAnecdote
}

const connectedFilter = connect(undefined, mapDispatchToProps )(Filter)

export default connectedFilter