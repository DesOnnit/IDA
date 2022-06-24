import './Card.css';
import CardStore from '../../store/CardData';
import { observer } from "mobx-react"
import { useState } from 'react';
export  const Card = observer((props)=> {
const [remove, setRemove] = useState('')
function cardDelete(data){
    setRemove('remove')
    setTimeout(()=> {
        CardStore.deleteCard(data)
        localStorage.setItem('cards',JSON.stringify(CardStore.cards)) 
    },500)
}
    return (
        <div className={`card card_${remove}`} >
            <img src={props.card.img} alt={props.card.title} className="card__img" />
            <div className="card__info">
                <h3 className="card__title">{props.card.title}</h3>
                <h4 className="card__text">{props.card.text}</h4>
                <h2 className="card__price">{props.card.price} руб.</h2>
            </div>
            {props.card.personal
            ?<button className="card__button" onClick={()=>cardDelete(props.card.id)}></button>
            :''}
        </div>
    )
})