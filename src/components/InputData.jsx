const InputData = ({title, placeholder, value, onChange}) => {
    return <p><strong>{title} : </strong>
    <input type="text" 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
    </p>
}

export default InputData