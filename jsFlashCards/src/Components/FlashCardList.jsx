import React from 'react'
import FlashCard from './FlashCard'

const FlashCardList = ({flashCards}) => {
  return (
    <div className='card-grid'>
        {flashCards.map(flashCard => {
            return <FlashCard flashCard = {flashCard} key={flashCard.id}/>
        })}
    </div>
 
  )
}

export default FlashCardList
