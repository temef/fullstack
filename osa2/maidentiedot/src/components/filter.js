const Filter = ({newFilter,handleFilter}) => {
    return(
    <form>
        <div>
            find countries <input
            value={newFilter}
            onChange={handleFilter}
            />
        </div>
    </form>
    )
}

export default Filter