import { makeAutoObservable } from "mobx"
import card_img from '../imgs/card_img.svg'
class Card {
    cards = JSON.parse(localStorage.getItem('cards')) || [
        { id: 1, img: card_img, title: 'Наименование товара', text: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк', price: '10 000' },
        { id: 2, img: card_img, title: 'Наименование товара1', text: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк', price: '12 000' },
        { id: 3, img: card_img, title: 'Наименование товара2', text: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк', price: '15 000' },
        { id: 4, img: card_img, title: 'Наименование товара3', text: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк', price: '11 000' },
        { id: 5, img: card_img, title: 'Наименование товара4', text: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк', price: '16 000' },
        { id: 6, img: card_img, title: 'Наименование товара5', text: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк', price: '1 000' },
        { id: 7, img: card_img, title: 'Наименование товара6', text: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк', price: '10 200' },
    ]
    sort_cards = this.cards
    visible = true

    constructor() {
        makeAutoObservable(this)
    }
    addNewCard(data) {
        this.cards.push(data)
        this.sort_cards.push(data)
    }
    deleteCard(data) {
        this.cards = this.cards.filter((item) => item.id !== data)
        this.sort_cards = this.sort_cards.filter((item) => item.id !== data)
    }
    filterCard(data) {
        let regex = new RegExp(`${data}`, 'i');
        let result = (this.cards.map((item) => {
            if (Object.values(item).map((card) => (regex.test(card))).includes(true)) {
                return item
            }
        }).filter((item) => item !== undefined))
        this.sort_cards = result
        this.sort_cards.length === 0
            ? this.visible = false
            : this.visible = true
    }
    sortCard(data) {
        switch (data) {
            case 'max':
                this.sort_cards = this.sort_cards.sort((a, b) => a.price.replace(/\s+/g, '') - b.price.replace(/\s+/g, ''))
                break;
            case 'min':
                this.sort_cards = this.sort_cards.sort((a, b) => b.price.replace(/\s+/g, '') - a.price.replace(/\s+/g, ''))
                break;
        }
    }
}
const CardStore = new Card()
export default CardStore