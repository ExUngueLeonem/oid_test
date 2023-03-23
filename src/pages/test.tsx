import { useOidc } from '@axa-fr/react-oidc';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { testStore } from 'store/TestStore';


function Test() {
    const { isAuthenticated, login, logout   /* , renewTokens */ } = useOidc();
    console.log("isAuthenticated", isAuthenticated);

    const loginHandler = () => {
        window.location.href = "http://192.168.210.244:5072/login?returnUrl=http://192.168.210.245:3001/authentication/callback"
        // http://192.168.210.245:3001/authentication/callback
    }

    return (
        <>
            <div>
                {window.location.href}
                <br />

                {!isAuthenticated && (
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => login()}
                    // onClick={() => loginHandler()}
                    >
                        Login
                    </button>
                )}
                {isAuthenticated && (
                    <>
                        <NavLink to="integrations">
                            integrations
                        </NavLink>
                        <br />
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => logout()}
                        >
                            logout
                        </button>
                    </>
                )}
                <br />
                <button type="button" onClick={() => testStore.postIntegration()}>postIntegration</button>

            </div>
        </>
    )
}

export default observer(Test);

// http://192.168.210.244:5072/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fredirect_uri%3Dhttp%253A%252F%252F192.168.210.245%253A3001%252Fauthentication%252Fcallback%26client_id%3Dservice-spa%26response_type%3Dcode%26state%3DBI1eBeCc1t%26scope%3Dopenid%2520profile%2520phone%2520offline_access%2520service-api%253Aaccess%26code_challenge%3D578vtFXKrzGyDIUliLKhbwqqeXVwq_kN5EQcApPgC9A%26code_challenge_method%3DS256
// http://192.168.210.244:5072/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fredirect_uri%3Dhttp%253A%252F%252F192.168.210.245%253A3001%252Fauthentication%252Fcallback%26client_id%3Dservice-spa%26response_type%3Dcode%26state%3DBI1eBeCc1t%26scope%3Dopenid%2520profile%2520phone%2520offline_access%2520service-api%253Aaccess%26code_challenge%3D578vtFXKrzGyDIUliLKhbwqqeXVwq_kN5EQcApPgC9A%26code_challenge_method%3DS256