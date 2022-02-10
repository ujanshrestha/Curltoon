import Card from "react-bootstrap/Card";
import useDataFetch from "../../hooks/useDataFetch";
import Loader from "../Loader";
import Link from 'next/link';

export default function EducationList(){
    const eduData = useDataFetch("/api/freelancer/profile/education");

    const formatDate = value => {
        const todayDate = new Date(value); 
        const formatDate = todayDate.getDate() < 10 ? `0${todayDate.getDate()}`:todayDate.getDate();
        const formatMonth = todayDate.getMonth() < 10 ? `0${todayDate.getMonth()+1}`: todayDate.getMonth()+1;
        const formattedDate = [todayDate.getFullYear(), formatMonth, formatDate].join('-');
        return formattedDate;
    }
    return (
        <Card className="mb-2">
        <Card.Body>
            <div className="row d-flex">
                <div className="col-md-9">
                    <span className="fw-bold"> Education</span>
                </div>
                <div className="col-md-3">
                    <Link href="/freelancer/profile/education" > 
                    <span role="button"><img src="/add_icon.png" style={{
                        borderRadius:'50%',
                        border: '1px solid blue'
                    }}></img></span>
                    </Link>
                </div>
            </div>
            <hr></hr>

            {eduData.loaded && eduData.data.length>0 && eduData.data.map((w,i) => 
            <>
                <div className="row">
                    <div className="col-md-12"><span className="fw-bold"> Title : </span>   {w.title} 
                        {w.stillStudying ? <label className="badge bg-primary pull-right"> Still Studying </label>: ""}
                     </div>
                {w.description && <div className="col-md-12">
                    <span className="fw-bold">Description : </span>  
                    {w.description}<br/> </div>}
                {w.startDate && <div className="col-md-6">
                <span className="fw-bold"> Start Date : </span>  
                    {formatDate(w.startDate)}
                    <br/>
                 </div>}
                {w.endDate && <div className="col-md-6">
                <span className="fw-bold"> End Date: </span>
                {formatDate(w.endDate)}
                <br/></div>}
                 <hr />
                </div>

            </>
            )}

            {eduData.loaded && eduData.data.length==0 && <>
                <div className="row">
                    <span className="text-muted"> No items to display</span>
                </div>
            </>}

            {!eduData.loaded && <>
                                <Loader />
                           </>}
          
        </Card.Body>
    </Card>
    );
}