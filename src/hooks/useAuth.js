import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'
import Splash from '../screens/Splash'
import Loading from '../screens/Loading'
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {
  signInWithCredential,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { auth } from '../../firebase';
import secrets from '../../secrets';

const GOOGLE_WEB_ID = process.env.GOOGLE_WEB_ID || secrets.GOOGLE_WEB_ID;
const GOOGLE_IOS_ID = process.env.GOOGLE_IOS_ID || secrets.GOOGLE_IOS_ID;
const GOOGLE_ANDROID_ID =
  process.env.GOOGLE_ANDROID_ID || secrets.GOOGLE_ANDROID_ID;

WebBrowser.maybeCompleteAuthSession();
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState();
  const [user, setUser] = useState();
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_WEB_ID,
    webClientId: GOOGLE_WEB_ID,
    iosClientId: GOOGLE_IOS_ID,
    androidClientId: GOOGLE_ANDROID_ID
  });

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        if (loading) setLoading(false);
        if (loadingInitial) setLoadingInitial(false);
      }),
    []
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { accessToken, idToken } = response.authentication;
      const credential = GoogleAuthProvider.credential(
        idToken,
        accessToken
      );

      signInWithCredential(auth, credential)
        .catch((e) => {
          setError(e);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [response]);

  const loginGoogle = () => {
    setLoading(true)
    promptAsync()
  }

  const logout = async () => {
    setLoading(true);
    signOut(auth)
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }

  const memoedValue = useMemo(() => ({
    user,
    loginGoogle,
    logout
  }), [user, loading, error])

  return (
    <AuthContext.Provider
      value={memoedValue}
    >
      {loadingInitial && <Splash />}
      {!loadingInitial && loading && <Loading />}
      {!loadingInitial && !loading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext);
}