import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "services/firebase";
import { AppDispatch, RootState } from "store";
import { updateAuth } from "store/slices/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const userState = user
        ? {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }
        : null;
      dispatch(updateAuth(userState));
    });
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
