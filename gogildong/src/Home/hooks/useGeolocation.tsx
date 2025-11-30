import { useEffect, useState } from "react";

interface LocationState {
  loaded: boolean;
  coordinates?: { lat: number; lng: number };
  error?: { code: number; message: string };
}

const useGeolocation = () => {
  const [location, setLocation] = useState<LocationState>({
    loaded: false
  });

  const onSuccess = (pos: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }
    });
  };

  //에러처리
  const onError = (
    error: GeolocationPositionError | { code: number; message: string }
  ) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message
      }
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported"
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useGeolocation;
