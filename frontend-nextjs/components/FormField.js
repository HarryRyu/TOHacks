

 const FormField = ({ id, label, register, type, errors }) => (
    <>
        <label className="form-label" htmlFor={id}>
            {label}
        </label>
        <input className="form-field" id={id} {...register(id)} type={type} />
        {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
    </>
)

export default FormField
