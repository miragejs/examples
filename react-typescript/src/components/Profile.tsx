import React from "react";
import { Person } from "../fetchers";

export function Profile(props: Person) {
  return (
    <dl className="rounded-md m-6 p-6 bg-gray-100 prose">
      <dt className="font-bold">Name</dt>
      <dd>{props.name}</dd>
      <dt className="font-bold">Street address</dt>
      <dd>{props.streetAddress}</dd>
      <dt className="font-bold">City, State Zip</dt>
      <dd>{props.cityStateZip}</dd>
      <dt className="font-bold">Phone number</dt>
      <dd>{props.phone}</dd>
      <dt className="font-bold">Username</dt>
      <dd>{props.username}</dd>
      <dt className="font-bold">Password</dt>
      <dd>{props.password}</dd>
      <dt className="font-bold">Email</dt>
      <dd>{props.email}</dd>
      <dt className="font-bold">Avatar</dt>
      <dd>
        <img
          className="h-20 w-20 rounded-full"
          src={props.avatar}
          alt={props.name}
        />
      </dd>
    </dl>
  );
}
