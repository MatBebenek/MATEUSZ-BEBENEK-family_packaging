import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { FamilyProps } from "../../components/Family"
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const family = await prisma.family.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      members: {
        select: { name: true },
      },
    },
  });
  return {
    props: family,
  };
};

const Family: React.FC<FamilyProps> = (props) => {
  let name = props.name

  return (
    <Layout>
      <div>
        <h2>{name}</h2>
        <ReactMarkdown children={props.name} />
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Family
