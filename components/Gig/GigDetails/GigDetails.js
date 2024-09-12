"use client";
import React, { useState } from "react";
import GigMainDetails from "./GigMainDetails";
import AboutSeller from "./AboutSeller";

function GigDetails({ slug }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="container">
      <div className=" flex flex-col md:flex-row py-10 md:gap-7">
        <GigMainDetails slug={slug} setOpen={setOpen} open={open} />
        <AboutSeller slug={slug} open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default GigDetails;
