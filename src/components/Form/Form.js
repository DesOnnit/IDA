import Input from '../Input/Input';
import './Form.css';
import { useState, useEffect } from 'react'
import CardStore from '../../store/CardData';
import { observer } from "mobx-react"
export const Form = observer((props) => {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [disabled, setDisabled] = useState(true)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        Object.keys(values).filter((item) => item !== 'text').length === 3 && Object.values(errors).filter((elem) => elem === '').length === 3
            ? setDisabled(false)
            : setDisabled(true)
    }, [values, errors])
    function nameCheck(name, value) {
        value === ''
            ? setErrors({
                ...errors,
                [name]: 'Поле является обязательным'
            })
            : setErrors({
                ...errors,
                [name]: ''
            })
    }
    function priceCheck(name, value) {
        const regex = /[^0-9]/;
        regex.test(String(value.replace(/\s+/g, '')))
            ? setErrors({
                ...errors,
                [name]: 'Недопустимый символ (введите только цифры)'
            })
            : setErrors({
                ...errors,
                [name]: ''
            })
                || value === ''
                ? setErrors({
                    ...errors,
                    [name]: 'Поле является обязательным'
                })
                : setErrors({
                    ...errors,
                    [name]: ''
                })
    }
    function handleChange(e) {
        let { name, value } = e.target
        // eslint-disable-next-line default-case
        switch (name) {
            case 'price':
                let res = value.replace(/\s+/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                setValues({
                    ...values,
                    [name]: res
                })
                priceCheck(name, value)
                break;
            case 'title':
                setValues({
                    ...values,
                    [name]: value
                })
                nameCheck(name, value)
                break;
            case 'text':
                setValues({
                    ...values,
                    [name]: value
                })
                break;
            case 'img':
                setValues({
                    ...values,
                    [name]: value
                })
                nameCheck(name, value)
                break;
        }
    }
    function formSubmit(e) {
        e.preventDefault();
        let result = { ...values }
        result.personal = true
        result.id = Math.random()
        props.setVisible(true)
        setVisible(!visible)
        setTimeout(() => props.setVisible(false), 1000)
        setTimeout(() => {
            CardStore.addNewCard(result)
            localStorage.setItem('cards', JSON.stringify(CardStore.cards))
        }, 1200)
    }
    return (
        <form className={visible?"Form" : "Form Form_disabled"} onSubmit={formSubmit}>
            <div className={visible?"Form__content" : "Form__content Form__content_disabled"}>
                <Input label='Наименование товара' type='text' placeholder='Введите наименование товара' name='title' onChange={handleChange} value={values.title || ''} error={errors.title} />
                <Input label='Описание товара' type='textarea' placeholder='Введите описание товара' name='text' onChange={handleChange} value={values.text || ''} />
                <Input label='Ссылка на изображение товара' type='text' placeholder='Введите ссылку' name='img' onChange={handleChange} value={values.img || ''} error={errors.img} />
                <Input label='Цена товара' type='text' placeholder='Введите цену' name='price' onChange={handleChange} value={values.price || ''} error={errors.price} />
                <button disabled={disabled} className={disabled ? "Form__button" : "Form__button Form__button_active"} type="submit" >Добавить товар</button>
            </div>
            <button type="button" className={!visible?"Form__add" : "Form__add Form__add_close"} onClick={()=>setVisible(!visible)}>Открыть форму</button>
        </form>
    )
})