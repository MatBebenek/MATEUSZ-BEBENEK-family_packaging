import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type FamilyProps = {
  id: string;
  name: string;
  members: {
    id: string;
    name: string;
  }
};

const Family: React.FC<{ family: FamilyProps }> = ({ family }) => {
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${family.id}`)}>
      <h2>{family.name}</h2>
      <small>id: {family.id}</small>
      <ReactMarkdown children={family.id} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Family;
