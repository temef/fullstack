const Filter = ({newFilter,handleChange3}) => {
    return(
    <form>
        <div>
            filter shown with <input
            value={newFilter}
            onChange={handleChange3}
            />
        </div>
    </form>
    )
}

export default Filter