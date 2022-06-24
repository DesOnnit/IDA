import './Input.css';
export default function Input(props) {
    return (
        <label className="input__label">
            <span className="input__label_title">{props.label}<span className={props.error?"input__label_dot":''}></span></span>
            {props.type === 'textarea'
                ? <textarea className="input input_textarea" placeholder={props.placeholder} value={props.value} name={props.name} onChange={props.onChange} type={props.type}/>
                : <input className={props.error?"input input_error":"input"} name={props.name} value={props.value} placeholder={props.placeholder} onChange={props.onChange} type={props.type} />}
            {props.error
            ?<span className="input__error">{props.error}</span>
            :''
            }
        </label>
    )
}