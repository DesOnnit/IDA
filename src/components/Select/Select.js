import './Select.css'
export const Select = ((props) => {
    return (
        <select className="select" name='select' onChange={props.handleChange}>
            {props.option.map((option) => (
                <option style={option.selected?{display:'none'}:{display:'block'}} selected={option.selected} value={option.value} key={option.id}>{option.text}</option>
            ))}
        </select>
    )
})