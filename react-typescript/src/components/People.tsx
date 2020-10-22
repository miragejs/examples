import React from "react";
import useSWR from "swr";
import { Profile } from "./Profile";
import { fetchPeople } from "../fetchers";

export function People() {
  const { data, error } = useSWR("/api/people", fetchPeople);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <>
      <header className="prose m-6">
        <h1>
          <span role="img" aria-label="sparkles">
            ✨
          </span>
          People
          <span role="img" aria-label="sparkles">
            ✨
          </span>
        </h1>
      </header>

      <section className="flex flex-wrap">
        {data.people.map((person) => (
          <Profile key={`person-${person.id}`} {...person} />
        ))}
      </section>
    </>
  );
}
