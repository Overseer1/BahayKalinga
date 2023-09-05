const ShowTableVA = ({visitors}) =>
{
    return(
        <div>
            <h3>{visitors.FullName}</h3>
            <p>{visitors.Address}</p>
            <br/>
        </div>
    )
}
export default ShowTableVA