"use client";
import React from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function HomePage() {
  return (
    <main>
      <section className="banner animate-fade-in">
        <Link href="/donate" className="animate-fade-in delay-1">Donate Food</Link>
      </section>

      <div className="content animate-fade-in delay-2">
        <p style={{ fontSize: '23px' }}>
          "Cutting food waste is a delicious way of saving money, helping to feed the world and protect the planet."
        </p>
      </div>

      <Reveal className="photo">
        <br />
        <p className="heading">Our Works</p>
        <br />
        <p style={{ fontSize: '28px', textAlign: 'center' }}>"Look what we can do together."</p>
        <br />
        <div className="wrapper">
          <div className="box"><img src="/img/p1.jpeg" alt="Work 1" /></div>
          <div className="box"><img src="/img/p4.jpeg" alt="Work 2" /></div>
          <div className="box"><img src="/img/p3.jpeg" alt="Work 3" /></div>
        </div>
        <br />
      </Reveal>

      <Reveal className="deli">
        <p className="heading">DOOR PICKUP</p>
        <br />
        <p className="para">"Your donate will be immediately collected and sent to needy people"</p>
        <img src="/img/delivery.gif" alt="Delivery Pickup" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
      </Reveal>
    </main>
  );
}
