import React from 'react'
import styled from 'styled-components'
import AreaStatic from './AreaStatic'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
`;


  const AreasList = styled.div`
    padding: 8px;
    list-style-type: none !important;
  `;

export default function Column(props) {
  
  return(
    <Container>
      <AreasList>
        {props.areas.map((area, index) =>{
          const newIndex = props.areas.length - index - 1
          return <AreaStatic key={props.areas[newIndex].orderIndex} area={props.areas[newIndex]} index={index} handleClickToItems={props.handleClickToItems} areasTerminadas={props.areasTerminadas}/>
        } 
          
        )}
      </AreasList>
    </Container>
  )
}