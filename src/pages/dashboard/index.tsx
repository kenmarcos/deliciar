import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";

const Dashboard = () => {
  return <div>Dashboard</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Dashboard;
