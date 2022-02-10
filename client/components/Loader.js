export default function Loader(){

    return (<div className="page-loader" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        textAlign: 'center',
        transform: 'translate(-50%, -50%)',
    }}>
    <img src="/loading.gif" height="40px"></img>
    </div>);
}