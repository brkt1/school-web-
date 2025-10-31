'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthorizeService from '../authorize.service';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/store/slices/userSlices';
import { Spin } from 'antd';
import { AppState } from '@/store/store';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const authorizeService = useAuthorizeService();
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: AppState) => state?.user);

  useEffect(() => {
    if (user && user.id) {
      setAuthorized(true);
      setLoading(false);
    } else {
      authorizeService.authUser()
        .then((res) => {
          if (res?.data) {
            setAuthorized(true);
            dispatch(getUser(res.data));
          } else {
            router.push('/login');
          }
        })
        .catch(() => {
          router.push('/login');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (user && user.id) {
      setAuthorized(true);
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Authenticating..." />
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
}
