import React from "react"
import ItemGrid from "../components/ItemGrid"
import LoadingGrid from "../components/LoadingGrid"
import { HomePageGrid } from "../styles/Grids"
import useLatestData from "../utils/useLatestData"
import SEO from '../components/SEO'

function CurrentlySlicing({slicemasters}) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters on</span>
      </h2>
      <p>Standing by, ready to slice you up!</p>
      {!slicemasters &&<LoadingGrid count={4}/>}
      {slicemasters && !slicemasters?.length && <p>Currently no one is working</p>}
      {slicemasters?.length && <ItemGrid items={slicemasters}/>}
    </div>)
}

function HotSlices({hotSlices}) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotSlices && <LoadingGrid count={4}/>}
      {hotSlices && !hotSlices.length && <p>Nothin' in the case</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices}/>}
    </div>)
}

export default function HomePage() {
  const {hotSlices, slicemasters} = useLatestData()
  return (
    <>
    <SEO title="Home"/>
    <div className="center">
      <h1>The Best Pizza Downtown</h1>
      <p>Open 11Am to 11Pm every single day</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters}/>
        <HotSlices hotSlices={hotSlices}/>
      </HomePageGrid>
    </div>
    </>
  )
}
