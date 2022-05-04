import React from 'react'
import { Button } from 'antd';

const MethodMaker = () => {

const datamethodid = window.$datamethodid

  return (
    <div>
        <Button onClick={() => console.log(datamethodid)}>Submit Method</Button>
        <h3>react - get artifact key's element by id</h3>
        <h4>{datamethodid}</h4>
    </div>
  )
}

export default MethodMaker
