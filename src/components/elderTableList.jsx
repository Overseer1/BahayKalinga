const tableList = ({elderList}) => 
{
    return(
    <div>
        <td className="py-3 px-5">{elderList.NameOfElder}</td>
        <td className="py-3 px-5">{elderList.Birthday}</td>
        <td className="py-3 px-5">{elderList.Age}</td>
        <td className="py-3 px-5">{elderList.Address}</td>
        <td className="py-3 px-5">{elderList.LastVisited}</td>
        <td className="py-3 px-5">{elderList.Family}</td>
        <td className="py-3 px-5">
            <img className="w-14 h-14 m-auto" src="https://unsplash.it/100/100" alt="placeholder"/>
        </td>
        <td className="py-3 px-5">{elderList.Remarks}</td>
    </div>
    )
}

export default tableList;