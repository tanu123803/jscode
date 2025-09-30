import React, { useEffect, useState } from "react";


import Section1 from "./section1";
import Body from "./body";


const Home = ()=>{
    return(
        <>
        <Section1/>
        <hr className="border-t-2 border-gray-300 w-[90%] m-auto mt-6"/>
        <Body/>
        </>
    )  
}
export default Home
