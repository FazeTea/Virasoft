"use client";
import React from "react";

export default function Detail({ params }: any) {
  const resolvedParams: any = React.use(params); // Unwrap the Promise
  const { id } = resolvedParams;

  return <div>Detail Page for ID: {id}</div>;
}
