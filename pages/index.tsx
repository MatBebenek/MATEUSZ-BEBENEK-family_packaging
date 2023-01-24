import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Family, { FamilyProps } from "../components/Family"

// pages/index.tsx
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.family.findMany({
    include: {
      members: {
        select: { name: true},
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: FamilyProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>List of families</h1>
        <main>
          {props.feed.map((family) => (
            <div key={family.id} className="family">
              <Family family={family} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
