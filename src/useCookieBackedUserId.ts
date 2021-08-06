import {useMemo} from 'react';
import Cookies from 'js-cookie';

export const useCookieBackedUserId = ({cookieName}: {cookieName: string}) => {
	return useMemo(() => {
	  const uidCookie = Cookies.get('uid')
	  let uid: number | undefined;
	  if (uidCookie) {
	    uid = parseInt(uidCookie, 10)
	  }
	  if (!uid) {
	    uid = Math.floor(Math.random() * 10000000)
	    Cookies.set('uid', uid.toString())
	  }
	  return uid;
	}, [cookieName]);
      }