import { useOidc } from '@axa-fr/react-oidc';
import { observer } from 'mobx-react-lite';


function Test() {
    const { isAuthenticated, login, logout } = useOidc();
    console.log("isAuthenticated", isAuthenticated);
    return (
        <>
            <div>
                {window.location.href}
                <br />
                <button type="button" onClick={() => login("/login")}>oid button</button>
            </div>
        </>
    )
}

export default observer(Test);