import React, { useEffect, useState } from 'react'
import data from './data'
import "./style.css"

export const Accordion = () => {
  const [selected, setSelected] = useState(null)
  const [multiSelect, setMultiSelect]=useState(false)
  const [multiple, setMultiple]=useState([])

  const handleSingleSelect = (id) => {
    setSelected(id)
  }

  const handleEnableMultiSelectButton = () => {
    setMultiSelect(!multiSelect)
    setMultiple([])
  }
  
  const handleMultiSelect = (id) => {
    const isItemSelected = multiple.includes(id)
    if (isItemSelected) {
        const filteredItems = multiple.filter(i => i !== id)
        setMultiple([...filteredItems])
    } else {
        setMultiple([...multiple, id])
    }
  }

  return (
    <div className='accordion-container'>
        <div className="wrapper">
            <button className={multiSelect ? "deactive-button":"active-button"} onClick={handleEnableMultiSelectButton}>{multiSelect ? "Disable" : "Enable"} multi-selection</button>
            <div className="accordian">
                {
                    data && data.map(item => {
                        const {id, answer, question} = item
                        return (
                            <div key={id}>
                                <div className="item" onClick={multiSelect ? () => handleMultiSelect(id) : () => handleSingleSelect(id)}>
                                    <div className="title">
                                        {question}
                                        <span>{multiSelect ? (multiple.includes(id) ? "-" : "+") : selected === id ? "-" : "+"}</span>
                                    </div>
                                    {
                                    multiSelect ? (multiple.includes(id) ? <div className="content">{answer}</div> : null) : selected === id ? 
                                    <div className="content">{answer}</div> : null
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}


// single selected, multi selected