import { observer } from 'mobx-react-lite';


function Test() {

    return (
        <>
            <div>
                {window.location.href}
            </div>
        </>
    )
}

export default observer(Test);