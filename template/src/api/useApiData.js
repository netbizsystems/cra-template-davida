
import { useState, useEffect, useContext } from 'react';
import AppContext from '../app/context';

export default function useApiData (request, isCached = false) {
  const { appState,  } = useContext(AppContext);
  const cachedData = JSON.parse(localStorage.getItem('apiData'));
  const apiBase = document.querySelector('meta[name="davida-api-base"]').content;
  
  const [apiData, setApiData] = useState(cachedData);
  const [apiIsLoading, setApiIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const refreshData = () => setRefreshIndex((currentIndex) => currentIndex + 1);
  
  useEffect(() => {
    if (!apiIsLoading) {
      let resourceRoute = request;
      if (appState != null && appState.resourcesData) {
        resourceRoute = appState.resourcesData.find((x) => x.name === "deserts").href;
      } // todo: error processing
      setApiIsLoading(true);
      const fetchInput = apiBase + (request.startsWith("/") ? request : resourceRoute);
      fetch(fetchInput)
        .then(response => response.json())
        .then(data => {
            if (false || isCached) {
            // skip for now.. caching creates more problems than it solves
            localStorage.setItem('apiData', JSON.stringify(data))
            }
            return setApiData(data);
        })
        .catch(error => {
          console.log('useApiData-fetch-error',[error]);
          setApiError(error)
        })
        .finally(() => {
          setApiIsLoading(false)
        });
    }
  }, [refreshIndex]);
  
  return { apiData, apiIsLoading, apiError, refreshData };
};
