import { useOidc } from '@axa-fr/react-oidc';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { authStore } from 'store/AuthStore';
import { testStore } from 'store/TestStore';


function Test() {
    const { isAuthenticated, login, logout   /* , renewTokens */ } = useOidc();
    console.log("isAuthenticated", isAuthenticated);

    console.log("authStore.token", authStore.token)

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