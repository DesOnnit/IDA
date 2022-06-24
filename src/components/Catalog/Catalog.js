import { Card } from '../Card/Card';
import './Catalog.css';
import CardStore from '../../store/CardData';
import { observer } from "mobx-react"
import { useEffect, useState } from 'react';
import { Select } from '../Select/Select';


export const Catalog = observer(() => {
    const { cards, sort_cards, visible } = CardStore
    const [values, setValues] = useState({})
    const option = [
        { id: 1, value: 'max', text: 'По возрастанию цены' },
        { id: 2, value: 'min', text: 'По уменьшению цены' },
        { id: 3, value: '', text: 'Фильтр', selected: true },
    ]
    useEffect(() => {
        CardStore.sortCard(values.select)
    }, [values.select])

    function handleChange(e) {
        let { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    /*  function sort() {
         let regex = new RegExp(`${values.find}`, 'i');
         let sort_card = cards.map((card) => {
             let xx = []
             for (let property in card) {
                 if (property === 'img' || property === 'id' || property === 'personal') {
                     property = ''
                     card[property] = ''
                 } xx.push(`${property}: ${card[property]}`);
             }
             if (Object.values(xx).map((card) => (regex.test(card))).includes(true)) {
                 return xx
             }
         }).filter((item) => item !== undefined)
         console.log(sort_card)
     } */
    return (
        <section className="catalog">
            <div className="catalog__content">
                <div className="catalog__filters">
                    <div className="filter__search">
                        <input className="filter__input" name='find' type="text" onChange={handleChange} value={values.find || ''} placeholder='Поиск' />
                        <button className="filter__button" type='submit' onClick={() => { CardStore.filterCard(values.find) }}></button>
                    </div>
                    <Select option={option} handleChange={handleChange} />
                </div>
                <div className={visible ? "catalog__container" : "catalog__container catalog__container_disabled"}>
                    {visible
                        ? (sort_cards === null ? cards : sort_cards).map((card) => (
                            <Card
                                key={card.id}
                                card={card} />
                        ))
                        : <h1>Ничего не найдено</h1>}
                </div>
            </div>
        </section>
    )
})