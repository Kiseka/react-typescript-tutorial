type callBackFun = ()=>void
interface buttonPropsType {
    className:string,
    showLoader:boolean,
    text:string,
    callBackFun:callBackFun
}

const AppButton =(props:buttonPropsType)=>{

    const handleButtonClick = ()=>{
        props.callBackFun()
    }
    return(
        <button onClick={handleButtonClick} type="button" className={props.className}>
            {(!props.showLoader)? props.text:(
                <div>
                    <div className="spinner-border spinner-border-sm"></div>
                    Please wait
                </div>
            )}
        </button>
    )
};

export default AppButton;