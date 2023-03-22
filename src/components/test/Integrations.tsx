import { useOidc } from "@axa-fr/react-oidc";
import { toJS } from "mobx";
import { useEffect } from "react";
import { testStore } from "store/TestStore";

const Integrations = () => {

    const { isAuthenticated } = useOidc()

    useEffect(() => {
        testStore.getIntegrations();
    }, [])

    console.log("isAuthenticated", isAuthenticated)
    console.log("integrations", toJS(testStore.integrations))
    return (
        <div>
            getIntegrations
        </div>
    );
};

export default Integrations;