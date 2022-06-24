import './Modal.css'
export const Modal = ((props)=>{
    return (
        <div className={props.visible?"modal":"modal modal_disabled"}>
            <div className="modal__content">
                <h1 className="modal__text">Товар успешно добавлен!</h1>
            </div>
        </div>
    )
})