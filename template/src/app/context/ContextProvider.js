

import React, { useState } from 'react';
import AppContext from '.';

const ContextProvider = ({ children }) => {

    const [appState, setAppState] = useState({
        
        // these will be set in app.js and allow for consistent and easy usage
        showAlert: undefined, 
        showDialog: undefined, 
        showToast: undefined, 
        logIt: undefined, 

        // app needs to know which view is active 
        views: [],
        activeViewX: -1,
        connectView: (viewId, callBack) => {
            const viewX = appState.views.findIndex(v => v.viewId === viewId);
            if (viewX < 0) {
                appState.views.push({viewId, callBack});
                appState.activeViewX = appState.views.length - 1;

            } else {
                appState.activeViewX = viewX;
            }      
        }, 

        // once the app is done setting up
        isReady: false, 
    })
    const context = { setAppState, appState, };

    return (
        <AppContext.Provider value={ context }>
            {children}
        </AppContext.Provider>
    );
};

export default ContextProvider;
